import logging
from app import create_app

# Log app startup
logging.info("Starting the Flask application...")

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

    # Log that the app is running
    logging.info("Flask app is running in debug mode!")
