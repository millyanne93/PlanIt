import logging
from app import create_app, mongo

logging.basicConfig(level=logging.INFO)
logging.info("Starting the Flask application...")

app = create_app()

# Move the connection check into an app context
# It's best practice to run this check after the app has been initialized
# to ensure all configurations, including the MongoDB URI, are loaded.
with app.app_context():
    try:
        mongo.db.list_collection_names()
        logging.info("Connected to MongoDB successfully!")
    except Exception as e:
        logging.error(f"Failed to connect to MongoDB: {e}")

if __name__ == "__main__":
    logging.info("Running Flask app in debug mode...")
    app.run(debug=True)
