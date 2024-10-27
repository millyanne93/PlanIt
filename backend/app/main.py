import logging
from app import create_app, mongo  # Import `mongo` along with `create_app`

# Log app startup
logging.info("Starting the Flask application...")

app = create_app()

# Log MongoDB connection status after app creation
try:
    mongo.db.list_collection_names()  # Access MongoDB through `mongo.db`
    logging.info("Connected to MongoDB successfully!")
except Exception as e:
    logging.error(f"Failed to connect to MongoDB: {e}")

if __name__ == "__main__":
    app.run(debug=True)

    # Log that the app is running
    logging.info("Flask app is running in debug mode!")
