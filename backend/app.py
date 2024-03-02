
#  Importing necessary libraries
from flask import Flask ,jsonify
from flask_cors import CORS, cross_origin
import pandas
from flask import jsonify, request
import numpy as np
import pickle
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import Column, String, Integer
from werkzeug.security import check_password_hash, generate_password_hash
from utils import *
import jwt
import datetime
import os
import json



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET"] = "jwt-secret-text"
db = SQLAlchemy(app)


CORS(app, resources={r"/*": {"origins": "*"}})

popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl','rb'))
books = pickle.load(open('books.pkl','rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl','rb'))

size = 10


@app.route("/popular/<page_number>/<page_size>")
def popular(page_number, page_size):
    list_popular = popular_df[int(page_size)*(int(page_number)-1) : int(page_size)*int(page_number)].values.tolist()
    list_popular_count = len(popular_df)
    list_popular_with_name = []

    for i in list_popular:
        list_popular_with_name.append(
            {
            "Book_Title":i[0],
            "ISBN": get_isbn(i[0]),
            "Description":get_desc(i[0]),
            "Publisher":get_publisher(i[0]),
            "year":get_year(i[0]),
            "Book_Author":i[1],
            "Image_URL_M":i[2],
            "Rating":get_rating(i[0]),
            "NoOfPages":i[3],
            # "Rating":get_rating(i[0]),
            }       
            )
    passing_value ={
        "data":list_popular_with_name,
        "success":True,
        "count":list_popular_count/int(page_size)

    }
    return jsonify(passing_value)



# Recommendation route according to book name and page number

@app.route("/books-recommended/<book_name>/<page_number>")
def recommended(book_name, page_number):
    try:
        lower_book_name = book_name.lower()
        lower_index_values = np.array([idx.lower() for idx in pt.index])

        # Find indices where the lower_book_name is a substring of any book title
        matching_indices = [i for i, idx in enumerate(lower_index_values) if lower_book_name in idx]

        if not matching_indices:
            raise IndexError

        # Select the first matching index
        index = matching_indices[0]
    except IndexError:
        # Handle the case where book_name is not found or not a substring in the index
        error_message = {"error": f"Book '{book_name}' not found or not a substring of any book title."}
        return error_message
    
    listAll = len(sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[0:50])
    
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[ (int(page_number)-1)*size:int(page_number)*size +1 ]

    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['ISBN'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        data.append(item)

    list_popular_with_name = []
    for i in data:
        list_popular_with_name.append(
            {
            "ISBN":i[0],
            "Book_Title":i[1],
            "Book_Author":i[2],
            "Image_URL_M":i[3],
            "year":get_year(i[1]),
            "Rating":get_rating(i[1]),
            "Publisher":get_publisher(i[1]),
            "Description":get_desc(i[1]),
            "NoOfPages":get_pg(i[1]),
            }       
            )
    passing_value ={
        "data":list_popular_with_name,
        "success":True,
        "count":listAll/size

    }

    return jsonify(passing_value)

class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(20), nullable=False, unique=True)
    password = Column(String(100), nullable=False)

    def __init__(self, username, password): 
        self.username = username
        self.password = password 

    def __repr__(self): 
        return "<User(%s,%s)>" % (self.username, self.password)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    isbn = db.Column(db.String(13), nullable=False)
    year = db.Column(db.Integer, nullable=True)
    avgRating = db.Column(db.Float, nullable=True)
    page = db.Column(db.Integer, nullable=True)


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    book_title = db.Column(db.String(100), nullable=False)




#        ------------------------------------------------------------------------------------------
#        ---------------------------------Login----------------------------------------------------
#        ------------------------------------------------------------------------------------------





@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    data = request.data.decode("utf-8")
    json_data = json.loads(data)
    username = json_data["username"]
    password = json_data["password"]
    
    if (username and password):
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "User doesn't exist, please login", "success": False}), 401
        if check_password_hash(str(user.password), password):
            token = jwt.encode({'id': user.id,
                                'exp': datetime.datetime.now() + datetime.timedelta(days=30)},
                               app.config['JWT_SECRET'], algorithm="HS256")
            
            return jsonify({'token': token, "success": True,
                           'user': {
                               'id': user.id,
                               'username': user.username
                           
                            }})
        return jsonify({'message': 'Invalid credentials', 'success': False}), 401
    
    else:
        return jsonify({'message': 'No credentials', 'success': False}), 400



#        ------------------------------------------------------------------------------------------
#        ---------------------------------Signup----------------------------------------------------
#        ------------------------------------------------------------------------------------------




@app.route("/signup", methods=["POST"])
def siginup(): 
    try:
        if {'username', 'password'} <= request.json.keys():
            username = request.json['username']
            password = request.json['password']
            hashed_password = generate_password_hash(password)
            new_user = User(username, hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': "User successfully created", "success": True}), 200
        else:
            return jsonify({'message': 'Please submi0t a username and a password', 'success': False}), 400
    except Exception as e:
        if os.environ.get('ENV', None) == 'production':
            return jsonify({'message': 'Something went wrong', 'success': False}), 500
        else:
            return jsonify({'message': str(e), 'success': False}), 500
        



from functools import wraps
def auth_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers or 'x-access-token' in request.headers or 'token' in request.json:
            token = request.headers.get(
                'x-access-token', None) or request.json.get('token', None) or request.headers.get('Authorization')
            token = token.replace('Bearer ', '')
        else:
            return jsonify({'message': 'Token required', 'success': False})
        try:
            decoded = jwt.decode(token, app.config['JWT_SECRET'], algorithms=["HS256"])
            user = User.query.filter_by(id=decoded['id']).first()
            if not user:
                return jsonify({'message': 'Invalid User', 'success': False})
        except:
            return jsonify({'message': 'Invalid Token', 'success': False})
        return f(user, *args, **kwargs)
    return decorator




@app.route("/get-user" , methods=['POST'])
@auth_required
def get_user(user):
    user_data = {
        'id': user.id,
        'username': user.username
    }
    return {"success": True, "user": user_data}





#        ------------------------------------------------------------------------------------------
#        ---------------------------------Reviews----------------------------------------------------
#        ------------------------------------------------------------------------------------------





# Add a review

# ...

@app.route('/review', methods=['POST'])
def add_review():
    data = request.get_json()
    user_id = data.get('userID')
    book_id = data.get('bookID')
    rating = data.get('rating')
    book_title = data.get('book_title')

    if not (user_id and book_id and rating and book_title):
        return jsonify({'message': 'Incomplete data'}), 400
    
    existing_review = Review.query.filter_by(user_id=user_id, book_id=book_id).first()

    if existing_review:
        # Update the existing review
        existing_review.rating = rating
        existing_review.book_title = book_title
        db.session.commit()
        return jsonify({'message': 'Review updated successfully'}), 200
    else:
        # Create a new review
        review = Review(user_id=user_id, book_id=book_id, rating=rating, book_title=book_title)
        db.session.add(review)
        db.session.commit()
        return jsonify({'message': 'Review added successfully'}), 201


# Get a review

@app.route('/review/<book_id>/<user_id>')
def get_reviews(book_id, user_id):
    print(book_id, user_id)
    review = Review.query.filter_by(book_id=book_id, user_id=user_id).first()
    # print(review)
    if review:
        review_data = {
            'rating': review.rating,
            'user_id': review.user_id
        }
        print(review_data)
        return jsonify({'review': review_data})
    else:
        return jsonify({'message': 'Review not found'}), 404



# Get all reviews

@app.route('/reviews/<user_id>')
def get_user_reviews(user_id):

    if not user_id:
        return jsonify({'message': 'Incomplete data'}), 400
    reviews = Review.query.filter_by(user_id=user_id).all()
    review_data = []
    for review in reviews:
        review_data.append({
            'rating': review.rating,
            'book': {
                'ISBN': review.book_id,
                "Book_Title":review.book_title,
                "Book_Author":get_auth(review.book_title),
                "Image_URL_M":get_img(review.book_title),
                "year":get_year(review.book_title),
                "Rating":get_rating(review.book_title),
                "Publisher":get_publisher(review.book_title),
                "Description":get_desc(review.book_title),
                "NoOfPages":get_pg(review.book_title),}
                })
    return jsonify({'reviews': review_data, 'success': True}), 200
        






if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(port=8080, debug=True)

# if __name__ == "__main__":
#     # with app.app_context():
#     #     db.create_all()
    
#     app.run(port=8080, debug=True)
