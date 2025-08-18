from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from . import mongo
from bson.objectid import ObjectId  # Use this to handle MongoDB ObjectIds

class User:
    @staticmethod
    def create_user(username, email, password):
        password_hash = generate_password_hash(password)
        user_data = {
            "username": username,
            "email": email,
            "password_hash": password_hash,
            "tasks": []
        }
        return mongo.db.users.insert_one(user_data)
    
    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({"username": username})

    @staticmethod
    def check_password(stored_password, password):
        return check_password_hash(stored_password, password)


class Task:
    @staticmethod
    def create_task(user_id, title, description, due_date, reminder=None, shared_with=None,status="Pending", priority="Medium"):
        task_data = {
            "title": title,
            "description": description,
            "due_date": due_date,
            "status": status,
            "priority": priority,
            "user_id": user_id,
            "reminder": reminder,  # New field for reminders
            "shared_with": shared_with or [], 
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()

        }
        return mongo.db.tasks.insert_one(task_data)

    @staticmethod
    def get_tasks_by_user(user_id):
        return list(mongo.db.tasks.find({"user_id": user_id}))

    @staticmethod
    def get_task_by_id(task_id):
        # Ensure task_id is a valid ObjectId
        if not ObjectId.is_valid(task_id):
            return None

        task = mongo.db.tasks.find_one({"_id": ObjectId(task_id)})
        return task  # Returns None if task is not found

    @staticmethod
    def update_task(task_id, update_data):
        return mongo.db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": update_data})

    @staticmethod
    def delete_task(task_id):
        return mongo.db.tasks.delete_one({"_id": ObjectId(task_id)})

    @staticmethod
    def mark_task_as_completed(task_id):
        return mongo.db.tasks.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": "Completed"}}
        )

    @staticmethod
    def to_dict(task):
        return {
            'id': str(task['_id']),
            'title': task['title'],
            'description': task['description'],
            'due_date': task['due_date'].strftime('%Y-%m-%d') if task['due_date'] else None,
            'status': task['status'],
            'priority': task['priority'],
            'user_id': task['user_id'],
            'reminder': task.get('reminder'),  # Accessed safely with .get
            'shared_with': task.get('shared_with', []),
            'created_at': task['created_at'].strftime('%Y-%m-%d %H:%M:%S'),
        }
