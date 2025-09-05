from flask import Blueprint, request, jsonify
from app.models import Task
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from bson import json_util, ObjectId
import json
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
        result = Task.create_task(
            user_id=user_id,
            title=data['title'],
            description=data.get('description', ''),
            due_date=due_date,
            status=data.get('status', 'Pending'),
            priority=data.get('priority', 'Medium')
        )
        task_id = result.inserted_id
        
        # ✅ GET THE COMPLETE TASK OBJECT BACK FROM DATABASE
        created_task = Task.get_task_by_id(task_id)  # You'll need this method
        # OR if you don't have that method:
        # created_task = collection.find_one({'_id': task_id})
        
        logging.info("Task created successfully!")
        
        # ✅ CONVERT TO SAME FORMAT AS GET /tasks ROUTE
        # Convert BSON -> JSON string
        task_json_str = json_util.dumps(created_task)
        # Convert JSON string -> Python dict
        task_json = json.loads(task_json_str)
        # Convert ObjectId to plain string
        if "_id" in task_json and "$oid" in task_json["_id"]:
            task_json["_id"] = str(task_json["_id"]["$oid"])
            
        # ✅ RETURN COMPLETE TASK OBJECT (same format as GET route)
        return jsonify(task_json), 201
        
    except Exception as e:
        logging.error(f"An error occurred during task creation: {e}")
        return jsonify({"error": "Failed to create task due to an internal error."}), 500

@tasks_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    try:
        user_id = get_jwt_identity()
        logging.info(f"Fetching tasks for user {user_id}")

        # Get tasks from DB
        tasks = Task.get_tasks_by_user(user_id)
        logging.info(f"Tasks fetched from DB: {tasks}")

        # Convert BSON -> JSON string
        tasks_json_str = json_util.dumps(tasks)
        logging.debug(f"Tasks JSON string: {tasks_json_str}")

        # Convert JSON string -> Python list/dict
        tasks_json = json.loads(tasks_json_str)
        logging.debug(f"Tasks JSON object: {tasks_json}")

        # Ensure ObjectId is plain string
        for task in tasks_json:
            if "_id" in task and "$oid" in task["_id"]:
                task["_id"] = str(task["_id"]["$oid"])
        logging.info("Converted ObjectId fields to strings.")

        return jsonify(tasks_json), 200

    except Exception as e:
        logging.error(f"Error fetching tasks: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to fetch tasks"}), 500

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
    
    # ✅ FIXED: Handle different due_date formats
    if 'due_date' in data:
        due_date_value = data['due_date']
        try:
            # Case 1: String format from frontend form (YYYY-MM-DD)
            if isinstance(due_date_value, str):
                update_data['due_date'] = datetime.strptime(due_date_value, '%Y-%m-%d')
            
            # Case 2: MongoDB date object format {"$date": "..."}
            elif isinstance(due_date_value, dict) and '$date' in due_date_value:
                # Already in correct format for MongoDB
                update_data['due_date'] = datetime.fromisoformat(due_date_value['$date'].replace('Z', '+00:00'))
            
            # Case 3: Already a datetime object
            elif isinstance(due_date_value, datetime):
                update_data['due_date'] = due_date_value
                
            else:
                logging.warning(f"Unexpected due_date format: {due_date_value}")
                # Try to parse as string anyway
                update_data['due_date'] = datetime.strptime(str(due_date_value), '%Y-%m-%d')
                
        except (ValueError, TypeError) as e:
            logging.error(f"Error parsing due_date: {e}")
            return jsonify(message="Invalid date format"), 400

    if 'status' in data:
        update_data['status'] = data['status']
    if 'priority' in data:
        update_data['priority'] = data['priority']
    if 'reminder' in data:
        update_data['reminder'] = data['reminder']
    if 'shared_with' in data:
        update_data['shared_with'] = data['shared_with']

    # Add updated timestamp
    update_data['updated_at'] = datetime.utcnow()

    try:
        Task.update_task(task_id, update_data)
        
        # ✅ Return the updated task in consistent format
        updated_task = Task.get_task_by_id(task_id)
        task_json_str = json_util.dumps(updated_task)
        task_json = json.loads(task_json_str)
        
        # Convert ObjectId to string
        if "_id" in task_json and "$oid" in task_json["_id"]:
            task_json["_id"] = str(task_json["_id"]["$oid"])
            
        return jsonify(task_json), 200
        
    except Exception as e:
        logging.error(f"Error updating task: {e}")
        return jsonify(message="Failed to update task"), 500

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

    # Update to use "Completed" status instead of a separate field
    Task.update_task(task_id, {"status": "Completed", "updated_at": datetime.utcnow()})
    
    # Return the updated task object (same format as other endpoints)
    updated_task = Task.get_task_by_id(task_id)
    task_json_str = json_util.dumps(updated_task)
    task_json = json.loads(task_json_str)
    if "_id" in task_json and "$oid" in task_json["_id"]:
        task_json["_id"] = str(task_json["_id"]["$oid"])
    
    return jsonify(task_json), 200


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
