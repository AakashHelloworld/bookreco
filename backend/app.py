
#  Importing necessary libraries
from flask import Flask ,jsonify
from flask_cors import CORS
import pandas
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import Column, String, Integer
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
import numpy as np
import pickle
import jwt
import datetime
import os
import json



app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config["JWT_SECRET"] = "jwt-secret-text"

# db = SQLAlchemy(app)


# Importing pickle files
popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl','rb'))
# print(type(pt))
books = pickle.load(open('books.pkl','rb'))
# print(type(books))
similarity_scores = pickle.load(open('similarity_scores.pkl','rb'))

size = 10



# Creating database for user

# class User(db.Model):
#     id = Column(Integer, primary_key=True)
#     username = Column(String(20), nullable=False, unique=True)
#     password = Column(String(100), nullable=False)

#     def __init__(self, username, password): 
#         self.username = username
#         self.password = password 

#     def __repr__(self): 
#         return "<User(%s,%s)>" % (self.username, self.password)
    


# app = Flask(__name__)





# Popular books route according to page number


@app.route("/popular/<page_number>/<page_size>")
def popular(page_number, page_size):
    print(page_number, page_size)
    list_popular = popular_df[int(page_size)*(int(page_number)-1) : int(page_size)*int(page_number)].values.tolist()
    list_popular_count = len(popular_df)
    print(list_popular)
    list_popular_with_name = []

    for i in list_popular:
        list_popular_with_name.append(
            {
            "Book_Title":i[0],
            "Book_Author":i[1],
            "Image_URL_M":i[2],
            "NoOfPages":i[3],
            "Rating":i[4]
            }       
            )
    # print(list_popular_with_name)
    passing_value ={
        "data":list_popular_with_name,
        "success":True,
        "count":list_popular_count/int(page_size)

    }
    print(passing_value)
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
    
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[ (int(page_number)-1)*size:int(page_number)*size ]

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
            }       
            )
    # print(list_popular_with_name)
    passing_value ={
        "data":list_popular_with_name,
        "success":True,
        "count":listAll/size

    }

    return jsonify(passing_value)



# @app.route("/login", methods=["POST"])
# def login():
#     data = request.data.decode("utf-8")
#     json_data = json.loads(data)
#     username = json_data["username"]
#     password = json_data["password"]
    
#     if (username and password):
#         user = User.query.filter_by(username=username).first()
#         if not user:
#             return jsonify({"message": "User doesn't exist, please login", "success": False}), 401
#         if check_password_hash(str(user.password), password):
#             token = jwt.encode({'id': user.id,
#                                 'exp': datetime.datetime.now() + datetime.timedelta(days=30)},
#                                app.config['JWT_SECRET'], algorithm="HS256")
            
#             print(token)
#             return jsonify({'token': token})
#         return jsonify({'message': 'Invalid credentials', 'success': False}), 401
    
#     else:
#         return jsonify({'message': 'No credentials', 'success': False}), 400


# @app.route("/signup", methods=["POST"])
# def siginup(): 
#     try:
#         if {'username', 'password'} <= request.json.keys():
#             username = request.json['username']
#             password = request.json['password']
#             hashed_password = generate_password_hash(password)
#             new_user = User(username, hashed_password)
#             db.session.add(new_user)
#             db.session.commit()
#             return jsonify({'message': "User successfully created"}), 200
#         else:
#             return jsonify({'message': 'Please submi0t a username and a password', 'success': False}), 400
#     except Exception as e:
#         if os.environ.get('ENV', None) == 'production':
#             return jsonify({'message': 'Something went wrong', 'success': False}), 500
#         else:
#             return jsonify({'message': str(e), 'success': False}), 500
        



# from functools import wraps
# def auth_required(f):
#     @wraps(f)
#     def decorator(*args, **kwargs):
#         token = None
#         if 'Authorization' in request.headers or 'x-access-token' in request.headers or 'token' in request.json:
#             token = request.headers.get(
#                 'x-access-token', None) or request.json.get('token', None) or request.headers.get('Authorization')
#             token = token.replace('Bearer ', '')
#         else:
#             return jsonify({'message': 'Token required', 'success': False})
#         try:
#             decoded = jwt.decode(token, app.config['JWT_SECRET'], algorithms=["HS256"])
#             user = User.query.filter_by(id=decoded['id']).first()
#             if not user:
#                 return jsonify({'message': 'Invalid User', 'success': False})
#         except:
#             return jsonify({'message': 'Invalid Token', 'success': False})
#         return f(user, *args, **kwargs)
#     return decorator




# @app.route("/get-user", methods=["GET"])
# @auth_required
# def get_user(user):
#     print(user)
#     user_data = {
#         'id': user.id,
#         'username': user.username
#     }
#     return {"success": True, "user": user_data}






if __name__ == "__main__":
    # with app.app_context():
    #     db.create_all()
    
    app.run(port=8080, debug=True)
