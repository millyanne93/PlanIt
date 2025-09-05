from flask import Blueprint, request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if User.find_by_username(data['username']):
        return jsonify({"error": "Username already exists"}), 409

    User.create_user(username=data['username'], email=data['email'], password=data['password'])
    return jsonify(message="User registered successfully!"), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_username(data['username'])

    if user and User.check_password(user['password_hash'], data['password']):
        access_token = create_access_token(identity=str(user['_id']))
        user_data = {
            'id': str(user['_id']),
            'username': user['username'],
            'email': user['email']
        }
        return jsonify(access_token=access_token, user=user_data), 200

    return jsonify(message="Invalid credentials"), 401
