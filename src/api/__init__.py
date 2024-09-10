from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your-database.db'
    db.init_app(app)
    return app

# Import all models to ensure they are registered with SQLAlchemy
from .models import *