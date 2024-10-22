from flask import Blueprint, request, jsonify
from app.models import Task, db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import logging

tasks_bp = Blueprint('tasks', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

@tasks_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()

    # Log the user identity for debugging purposes
    logging.info(f"User ID from JWT: {user_id}")

    try:
        # Retrieve JSON data from request
        data = request.get_json()

        # Log the received data for debugging purposes
        print(f"Received task data: {data}")

        # Check for required fields
        if 'title' not in data or 'due_date' not in data:
            logging.warning("Missing required fields: title and due_date")  # Log warning
            return jsonify({"error": "Missing required fields: title and due_date"}), 422

        # Validate the due_date format
        try:
            due_date = datetime.strptime(data['due_date'], '%Y-%m-%d')
            logging.info(f"Parsed due_date: {due_date}")  # Log the parsed date
        except ValueError:
            logging.error("Invalid date format")  # Log error
            return jsonify({"error": "Invalid date format. Expected YYYY-MM-DD."}), 422

        # Create a new Task object
        new_task = Task(
            title=data['title'],
            description=data.get('description', ''),
            due_date=due_date,
            user_id=user_id
        )

        # Add the new task to the database session and commit
        db.session.add(new_task)
        db.session.commit()

        logging.info("Task created successfully!")  # Log success
        return jsonify(message="Task created successfully!"), 201

    except Exception as e:
        # Log the error for debugging purposes
        logging.error(f"An error occurred during task creation: {e}")
        return jsonify({"error": "Failed to create task due to an internal error."}), 500

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
