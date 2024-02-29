from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import Column, String, Integer
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

import jwt
import datetime
import os
import json



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET"] = "jwt-secret-text"

db = SQLAlchemy(app)



class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(20), nullable=False, unique=True)
    password = Column(String(100), nullable=False)

    def __init__(self, username, password): 
        self.username = username
        self.password = password 

    def __repr__(self): 
        return "<User(%s,%s)>" % (self.username, self.password)



@app.route("/login", methods=["POST"])
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
            
            print(token)
            return jsonify({'token': token})
        return jsonify({'message': 'Invalid credentials', 'success': False}), 401
    
    else:
        return jsonify({'message': 'No credentials', 'success': False}), 400


@app.route("/signup", methods=["POST"])
def siginup(): 
    try:
        if {'username', 'password'} <= request.json.keys():
            username = request.json['username']
            password = request.json['password']
            hashed_password = generate_password_hash(password, method='sha256')
            new_user = User(username, hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': "User successfully created"}), 200
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




@app.route("/get-user", methods=["GET"])
@auth_required
def get_user(user):
    user_data = {
        'id': user.id,
        'username': user.username
    }
    return {"success": True, "user": user_data}


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(port=8080, debug=True)
