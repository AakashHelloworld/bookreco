from main import app, db
from model import User
from flask import jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

import jwt
import datetime
import os
import json 


@app.route("/login", methods=["POST"])
def login():
    data = request.data.decode("utf-8")
    json_data = json.loads(data)
    username = json_data["username"]
    password = json_data["password"]

    print(username, password)
    
    if (username and password):
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "User doesn't exist, please login", "success": False}), 401
        if check_password_hash(str(user.password), password):
            token = jwt.encode({'id': user.id,
                                'exp': datetime.datetime.now() + datetime.timedelta(hours=24)},
                               app.config['JWT_SECRET'])
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


@app.route("/get-user", methods=["GET"])

def get_user():
    return "hello"
