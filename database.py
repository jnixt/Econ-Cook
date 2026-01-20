from datetime import datetime, timedelta
import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

# Configuration
DB_PATH = os.environ.get("ECOOK_DB", "sqlite:///users.db")
SECRET_KEY = os.environ.get("ECOOK_SECRET", "please_change_this_in_production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRES_MINUTES = 24 * 60  # 1 day

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
CORS(app, resources={r"/api/*": {"origins": "*"}})

engine = create_engine(DB_PATH, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(300), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


def create_access_token(identity: str, expires_minutes: int = JWT_EXPIRES_MINUTES):
    now = datetime.utcnow()
    payload = {"sub": identity, "iat": now, "exp": now + timedelta(minutes=expires_minutes)}
    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except Exception:
        return None


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "username and password required"}), 400

    if not (3 <= len(username) <= 30) or not all(c.isalnum() or c in "-_" for c in username):
        return jsonify({"error": "invalid username (3-30 chars: letters, numbers, - or _)"}), 400

    pw_hash = generate_password_hash(password, method="pbkdf2:sha256", salt_length=16)

    db = SessionLocal()
    user = User(username=username, password_hash=pw_hash)
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        db.close()
        # Username already exists -> enforce uniqueness
        return jsonify({"error": "username already exists"}), 409

    db.close()
    token = create_access_token(identity=username)
    return jsonify({"msg": "user_created", "username": username, "access_token": token}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "username and password required"}), 400

    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    db.close()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "invalid credentials"}), 401

    token = create_access_token(identity=username)
    return jsonify({"msg": "login_success", "username": username, "access_token": token}), 200


@app.route("/api/profile", methods=["GET"])
def profile():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return jsonify({"error": "missing_token"}), 401
    token = auth.split(" ", 1)[1]
    payload = decode_access_token(token)
    if not payload:
        return jsonify({"error": "invalid_or_expired_token"}), 401

    username = payload.get("sub")
    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    db.close()
    if not user:
        return jsonify({"error": "user_not_found"}), 404

    return jsonify({"username": user.username, "created_at": user.created_at.isoformat()}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)