from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app)  # Enable CORS for all routes

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register Blueprints
    from .routes.auth import auth_bp
    from .routes.tasks import tasks_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp)

    return app
