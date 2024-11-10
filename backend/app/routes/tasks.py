from flask import Blueprint, request, jsonify
from app.models import Task
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from bson.objectid import ObjectId
import logging

tasks_bp = Blueprint('tasks', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

@tasks_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    logging.info(f"User ID from JWT: {user_id}")

    try:
        data = request.get_json()
        logging.info(f"Received task data: {data}")

        # Check for required fields
        if 'title' not in data or 'due_date' not in data:
            logging.warning("Missing required fields: title and due_date")
            return jsonify({"error": "Missing required fields: title and due_date"}), 422

        # Validate the due_date format
        try:
            due_date = datetime.strptime(data['due_date'], '%Y-%m-%d')
        except ValueError:
            logging.error("Invalid date format")
            return jsonify({"error": "Invalid date format. Expected YYYY-MM-DD."}), 422

        # Create the task in MongoDB
        task_id = Task.create_task(
            user_id=user_id,
            title=data['title'],
            description=data.get('description', ''),
            due_date=due_date,
        ).inserted_id

        logging.info("Task created successfully!")
        return jsonify(message="Task created successfully!", task_id=str(task_id)), 201

    except Exception as e:
        logging.error(f"An error occurred during task creation: {e}")
        return jsonify({"error": "Failed to create task due to an internal error."}), 500

@tasks_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.get_tasks_by_user(user_id)
    logging.info(f"Fetched tasks for user {user_id}: {tasks}")
    
    try:
        response = jsonify([Task.to_dict(task) for task in tasks])
        logging.info("Task data returned successfully")
        return response, 200
    except Exception as e:
        logging.error(f"Failed to process task data: {e}")
        return jsonify({"error": "Failed to retrieve tasks."}), 422

@tasks_bp.route('/tasks/<task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.get_task_by_id(task_id)

    if not task or task['user_id'] != user_id:
        return jsonify(message="Task not found or unauthorized"), 404

    data = request.get_json()
    update_data = {}

    if 'title' in data:
        update_data['title'] = data['title']
    if 'description' in data:
        update_data['description'] = data['description']
    if 'due_date' in data:
        try:
            update_data['due_date'] = datetime.strptime(data['due_date'], '%Y-%m-%d')
        except ValueError:
            return jsonify(message="Invalid date format"), 400
    if 'status' in data:
        update_data['status'] = data['status']
    if 'priority' in data:
        update_data['priority'] = data['priority']

    Task.update_task(task_id, update_data)
    return jsonify(message="Task updated successfully!"), 200

@tasks_bp.route('/tasks/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.get_task_by_id(task_id)

    if not task or task['user_id'] != user_id:
        return jsonify(message="Task not found or unauthorized"), 404

    Task.delete_task(task_id)
    return jsonify(message="Task deleted successfully!"), 200

@tasks_bp.route('/tasks/<task_id>/complete', methods=['PUT'])
@jwt_required()
def complete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.get_task_by_id(task_id)

    if not task or task['user_id'] != user_id:
        return jsonify(message="Task not found or unauthorized"), 404

    Task.mark_task_as_completed(task_id)
    return jsonify(message="Task marked as completed!"), 200

def get_task_by_id(task_id):
    try:
        task = Task.get_task_by_id(task_id)  # Assuming this is defined in your Task model
        return task
    except Exception as e:
        logging.error(f"Error retrieving task by ID {task_id}: {e}")
        return None
@tasks_bp.route('/tasks/<task_id>/set_reminder', methods=['PUT'])
@jwt_required()
def set_reminder(task_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    reminder = data.get('reminder')
    
    # Check if the reminder is valid
    try:
        datetime.strptime(reminder, '%Y-%m-%d %H:%M')
    except ValueError:
        return jsonify({"error": "Invalid reminder format. Expected format is YYYY-MM-DD HH:MM"}), 400

    Task.update_task(task_id, {"reminder": reminder})
    return jsonify(message="Reminder set successfully!"), 200

@tasks_bp.route('/tasks/<task_id>/share', methods=['PUT'])
@jwt_required()
def share_task(task_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    shared_user_id = data.get('shared_user_id')

    # Add shared user to task
    Task.update_task(task_id, {"$addToSet": {"shared_with": shared_user_id}})
    return jsonify(message="Task shared successfully!"), 200
