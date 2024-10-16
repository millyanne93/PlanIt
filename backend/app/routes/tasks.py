from flask import Blueprint, request, jsonify
from app.models import Task, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    try:
        due_date = datetime.strptime(data['dueDate'], '%Y-%m-%d') 
    except ValueError as e:
        return jsonify({"error": "Invalid date format. Expected YYYY-MM-DD."}), 422
    
    new_task = Task(
        title=data['title'],
        description=data['description'],
        due_date=due_date,
        user_id=user_id
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(message="Task created successfully!"), 201

@tasks_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks]), 200

@tasks_bp.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify(message="Task not found or unauthorized"), 404

    data = request.get_json()

    # Update task fields if they are provided
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'due_date' in data:
        try:
            task.due_date = datetime.strptime(data['due_date'], '%Y-%m-%d')
        except ValueError:
            return jsonify(message="Invalid date format"), 400
    if 'status' in data:
        task.status = data['status']
    if 'priority' in data:
        task.priority = data['priority']

    db.session.commit()
    return jsonify(message="Task updated successfully!", task=task.to_dict()), 200

@tasks_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify(message="Task not found or unauthorized"), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify(message="Task deleted successfully!"), 200


