# leaderboard_server.py
"""
Flask server for the E.Cookie project leaderboard API.
"""
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import desc, func, and_

from database import Config
from models import db, Player

# --- Constants and Configuration ---

# A simple regex to validate usernames. Allows alphanumeric characters, hyphens, and underscores.
USERNAME_RE = re.compile(r"^[\w\-]{3,64}$")

# --- App Factory ---

def create_app(config_class=Config):
    """
    Creates and configures the Flask application.
    This is an application factory, a standard pattern for Flask apps.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)

    # --- Error Handlers ---

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "Bad Request", "message": str(error)}), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not Found", "message": str(error)}), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        db.session.rollback()
        return jsonify({"error": "Internal Server Error", "message": "An unexpected error occurred."}), 500

    # --- API Routes ---

    @app.route("/api/leaderboard/submit", methods=["POST"])
    def submit_score():
        """
        Handles score submission for a player.
        Creates a new player or updates an existing one.
        
        JSON Body:
        {
          "username": "player1",
          "points": 123,
          "display_name": "Player One" (optional)
        }
        """
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON body."} ), 400

        username = (data.get("username") or "").strip()
        points = data.get("points")

        if not username or not USERNAME_RE.match(username):
            return jsonify({"error": "Invalid username. Must be 3-64 chars, alphanumeric."} ), 400
        
        try:
            points = int(points)
            if points < 0:
                raise ValueError
        except (TypeError, ValueError,):
            return jsonify({"error": "Invalid points value. Must be a non-negative integer."} ), 400

        try:
            player = Player.query.filter_by(username=username).first()

            if not player:
                # Create a new player
                player = Player(
                    username=username,
                    display_name=(data.get("display_name") or username).strip()[:128],
                    points=points,
                    best_score=points
                )
                db.session.add(player)
            else:
                # Update existing player
                player.points = points
                if points > player.best_score:
                    player.best_score = points
                if "display_name" in data:
                    player.display_name = (data["display_name"] or username).strip()[:128]
            
            db.session.commit()

            return jsonify({"success": True, "player": player.to_dict()}), 200

        except Exception as e:
            db.session.rollback()
            # In a real app, you'd log this error.
            print(f"Error in submit_score: {e}")
            return jsonify({"error": "Could not process score submission."} ), 500


    @app.route("/api/leaderboard", methods=["GET"])
    def get_leaderboard():
        """
        Gets the top players for the leaderboard.
        
        Query Params:
          limit (int): Number of top entries to return. Default 50, max 200.
        """
        try:
            limit = int(request.args.get("limit", 50))
        except (TypeError, ValueError):
            limit = 50
        limit = max(1, min(limit, 200)) # Clamp limit between 1 and 200

        # Create a subquery with a rank window function
        rank_subquery = db.session.query(
            Player.id,
            func.rank().over(
                order_by=[desc(Player.best_score), Player.updated_at.asc()]
            ).label('rank')
        ).subquery()

        # Join the main query with the ranking subquery
        leaders = db.session.query(Player, rank_subquery.c.rank) \
            .join(rank_subquery, Player.id == rank_subquery.c.id) \
            .order_by(rank_subquery.c.rank) \
            .limit(limit) \
            .all()
        
        # Format the result
        result = [
            {*player.to_dict(), "rank": rank}
            for player, rank in leaders
        ]

        return jsonify({"leaders": result}), 200

    @app.route("/api/user/<string:username>", methods=["GET"])
    def get_user(username):
        """
        Gets a specific user's score and rank.
        """
        if not USERNAME_RE.match(username):
            return jsonify({"error": "Invalid username."} ), 400

        # Subquery to find the rank of the specific user
        rank_subquery = db.session.query(
            Player.id,
            func.rank().over(
                order_by=[desc(Player.best_score), Player.updated_at.asc()]
            ).label('rank')
        ).filter(Player.username == username).subquery()
        
        # Join to get the player data and their rank
        user_data = db.session.query(Player, rank_subquery.c.rank) \
            .join(rank_subquery, Player.id == rank_subquery.c.id) \
            .first()

        if not user_data:
            return jsonify({"error": "User not found."} ), 404
        
        player, rank = user_data
        
        return jsonify({"player": player.to_dict(), "rank": rank}), 200

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        # Create database tables if they don't exist
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
