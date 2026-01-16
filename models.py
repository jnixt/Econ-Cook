"""
Database models for the E.Cookie project.
"""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import datetime

# Initialize the database instance
db = SQLAlchemy()

class Player(db.Model):
    """
    Represents a player in the leaderboard.
    """
    __tablename__ = 'player'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    display_name = db.Column(db.String(128))
    points = db.Column(db.Integer, default=0, nullable=False)
    best_score = db.Column(db.Integer, default=0, nullable=False, index=True)
    
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        """Serializes the Player object to a dictionary."""
        return {
            "username": self.username,
            "display_name": self.display_name or self.username,
            "points": self.points,
            "best_score": self.best_score,
            "joined_at": self.created_at.isoformat(),
        }

    def __repr__(self):
        return f"<Player {self.username}>"
