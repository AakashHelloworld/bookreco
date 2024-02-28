from functools import wraps
from flask import request, jsonify
from model import User
import jwt
from app import app

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
            decoded = jwt.decode(token, app.config['JWT_SECRET'])
            user = User.query.filter_by(id=decoded['id']).first()
            if not user:
                return jsonify({'message': 'Invalid User', 'success': False}())
        except:
            return jsonify({'message': 'Invalid Token', 'success': False})
        return f(*args, **kwargs)
    return decorator