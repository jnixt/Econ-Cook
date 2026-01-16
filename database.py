"""
Configuration settings for the Flask application.
"""
import os

# Get the absolute path of the directory containing this file.
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    """
    Main configuration class for the application.
    
    Attributes:
        SQLALCHEMY_DATABASE_URI (str): The database URI for SQLAlchemy. Defaults to a local
                                       SQLite database named 'leaderboard.db'.
        SQLALCHEMY_TRACK_MODIFICATIONS (bool): Disables modification tracking for SQLAlchemy
                                               to save resources.
        SECRET_KEY (str): A secret key for signing session cookies and other security-related
                          needs. Defaults to a development key.
    """
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "sqlite:///" + os.path.join(BASE_DIR, "leaderboard.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret")
