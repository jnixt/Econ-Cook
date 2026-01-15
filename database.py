from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from sqlalchemy import desc, func
from models import db, Player
from config import Config
import re

USERNAME_RE = re.compile(r"^[\w\-]{1,64}$")  # basic allowed characters and length

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)

    @app.before_first_request
    def create_tables():
        db.create_all()

    @app.route("/api/leaderboard/submit", methods=["POST"])
    def submit_score():
        """
        JSON body:
        {
          "username": "player1",
          "points": 123
        }

        Behavior: create player if needed. Sets player's latest 'points' to submitted value,
        and updates 'best_score' if submitted > best_score.
        """
        data = request.get_json(force=True, silent=True)
        if not data:
            return jsonify({"error": "Invalid JSON body"}), 400

        username = (data.get("username") or "").strip()
        if not username or not USERNAME_RE.match(username):
            return jsonify({"error": "Invalid username"}), 400

        try:
            points = int(data.get("points", 0))
        except (TypeError, ValueError):
            return jsonify({"error": "Invalid points value"}), 400

        # Protect negative points
        if points < 0:
            points = 0

        # Optional display name
        display_name = data.get("display_name")
        if display_name:
            display_name = display_name.strip()[:128]

        player = Player.query.filter_by(username=username).first()
        if not player:
            player = Player(username=username, display_name=display_name, points=points, best_score=points)
            db.session.add(player)
            db.session.commit()
        else:
            player.points = points
            if points > (player.best_score or 0):
                player.best_score = points
            if display_name:
                player.display_name = display_name
            db.session.commit()

        # compute rank
        higher = (
            db.session.query(func.count(Player.id))
            .filter(Player.best_score > player.best_score)
            .scalar()
        )
        rank = (higher or 0) + 1

        return jsonify({"player": player.to_dict(), "rank": rank}), 200

    @app.route("/api/leaderboard", methods=["GET"])
    def get_leaderboard():
        """
        Query params:
          limit: number of top entries (default 50, max 200)
        Response:
          { "leaders": [ {username, display_name, best_score, points}, ... ] }
        """
        try:
            limit = int(request.args.get("limit", 50))
        except (TypeError, ValueError):
            limit = 50
        limit = max(1, min(limit, 200))

        # Order by best_score desc, then latest points desc, then created_at asc
        leaders = (
            Player.query.order_by(desc(Player.best_score), desc(Player.points), Player.created_at)
            .limit(limit)
            .all()
        )

        result = []
        rank = 1
        prev_score = None
        # Compute simple 1-based rank; ties get same rank value (dense ranking)
        for p in leaders:
            if prev_score is None:
                prev_score = p.best_score
            else:
                if p.best_score != prev_score:
                    rank += 1
                    prev_score = p.best_score
            result.append(
                {
                    "rank": rank,
                    "username": p.username,
                    "display_name": p.display_name or p.username,
                    "best_score": p.best_score,
                    "points": p.points,
                }
            )

        return jsonify({"leaders": result}), 200

    @app.route("/api/user/<string:username>", methods=["GET"])
    def get_user(username):
        username = username.strip()
        if not USERNAME_RE.match(username):
            return jsonify({"error": "Invalid username"}), 400

        player = Player.query.filter_by(username=username).first()
        if not player:
            return jsonify({"error": "not_found"}), 404

        higher = (
            db.session.query(func.count(Player.id))
            .filter(Player.best_score > player.best_score)
            .scalar()
        )
        rank = (higher or 0) + 1

        return jsonify({"player": player.to_dict(), "rank": rank}), 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)