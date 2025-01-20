from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import firestore
import firebase_admin
from firebase_admin import credentials, storage
import uuid
import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources=r'/api/*', origins="*", methods=["*"])

# Initialize Firebase Admin SDK
cred = credentials.Certificate("creds-easemind.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'testing-sit-ed0c2.appspot.com'  # Replace with your storage bucket name
})

db = firestore.client()  # Database

# Helper function to generate unique IDs
def generate_id():
    return str(uuid.uuid4())

# -------------------- AUTHENTICATION --------------------
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    user_id = generate_id()

    user_data = {
        "userId": user_id,
        "username": data.get("username"),
        "email": data.get("email"),
        "password": data.get("password"),
        "age": data.get("age"),
        "preferences": data.get("preferences", []),
        "avatar": "default_avatar",
        "forumPosts": [],
        "moodEntries": [],
        "appointments": []
    }

    db.collection('Users').document(user_id).set(user_data)
    return jsonify({"success": True, "userId": user_id}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    users_ref = db.collection('Users')
    query = users_ref.where("email", "==", email).where("password", "==", password).stream()

    user = None
    for doc in query:
        user = doc.to_dict()
        break

    if user:
        return jsonify({"success": True, "userId": user["userId"], "token": "dummy_token"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

# -------------------- DASHBOARD --------------------
@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    user_id = request.args.get("userId")

    resources = [
        {"id": "res1", "type": "article", "title": "Managing Stress", "url": "https://example.com/stress"},
        {"id": "res2", "type": "video", "title": "Mindfulness Basics", "url": "https://youtube.com/video"}
    ]

    challenges = [
        {"id": "chal1", "title": "Mindfulness Challenge", "progress": 50},
        {"id": "chal2", "title": "Stress Relief Exercises", "progress": 20}
    ]

    progress = {
        "mood": [
            {"date": "2025-01-19", "mood": "Happy"},
            {"date": "2025-01-18", "mood": "Stressed"}
        ],
        "challengesCompleted": ["Mindfulness"]
    }

    return jsonify({"resources": resources, "challenges": challenges, "progress": progress})

# -------------------- FORUMS --------------------
@app.route('/api/forums', methods=['GET'])
def get_forums():
    forums_ref = db.collection('ForumPosts').stream()
    forums = [{"postId": doc.id, **doc.to_dict()} for doc in forums_ref]
    return jsonify({"forums": forums})

@app.route('/api/forums/create', methods=['POST'])
def create_forum_post():
    data = request.json
    post_id = generate_id()

    post_data = {
        "postId": post_id,
        "userId": data.get("userId"),
        "message": data.get("message"),
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "comments": []
    }

    db.collection('ForumPosts').document(post_id).set(post_data)
    return jsonify({"success": True, "postId": post_id})

# -------------------- COUNSELING --------------------
@app.route('/api/counseling/book', methods=['POST'])
def book_counseling():
    data = request.json
    appointment_id = generate_id()

    appointment_data = {
        "appointmentId": appointment_id,
        "userId": data.get("userId"),
        "counselorId": data.get("counselorId"),
        "slot": data.get("slot"),
        "status": "Booked",
        "sessionNotes": ""
    }

    db.collection('Appointments').document(appointment_id).set(appointment_data)
    return jsonify({"success": True, "appointmentId": appointment_id})

# -------------------- CHALLENGES --------------------
@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    challenges = [
        {"id": "chal1", "title": "Mindfulness Challenge", "progress": 50},
        {"id": "chal2", "title": "Stress Relief Exercises", "progress": 20}
    ]
    return jsonify({"challenges": challenges})

# -------------------- RUN THE APP --------------------
if __name__ == '__main__':
    app.run(debug=True)
