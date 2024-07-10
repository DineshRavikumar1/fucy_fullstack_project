from flask import current_app as app
from flask import request,jsonify,json
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

clientMongo = MongoClient('mongodb://localhost:27017')
db = clientMongo['MY_DB']

@app.route('/register', methods=['POST'])
def register():
    try:
        username = request.form.get('username')
        password = request.form.get('password')
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        # Check if the username already exists
        if db.accounts.find_one({'username': username}):
            return jsonify({"error": "Username already exists"}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        db.accounts.insert_one({'username': username, 'password': hashed_password})
        return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.form.get('username')
        password = request.form.get('password')
        
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        user = db.accounts.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            return jsonify({"message": "Logged in successfully!"}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/request-reset-password', methods=['POST'])
def request_reset_password():
    try:
        username = request.form.get('username')

        if not username:
            return jsonify({"error": "Username is required"}), 400
        
        user = db.accounts.find_one({'username': username})
        print(username)
        if user:
            reset_token = str(uuid.uuid4())
            db.accounts.insert_one({'username': username, 'reset_token': reset_token})
            return jsonify({"message": "Password reset requested. Check your email for the reset link.", "reset_token": reset_token}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/reset-password', methods=['POST'])
def reset_password():
    # if request.content_type != 'application/json':
    #     return jsonify({"error": "Content-Type must be application/json"}), 415

    try:
        new_password = request.form.get('new_password')
        reset_token = request.form.get('reset_token')

        if not reset_token or not new_password:
            return jsonify({"error": "Reset token and new password are required"}), 400

        reset_entry = db.accounts.find_one({'reset_token': reset_token})
        if reset_entry:
            hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256')
            db.accounts.update_one({'username': reset_entry['username']}, {'$set': {'password': hashed_password}})
            db.accounts.delete_one({'reset_token': reset_token})
            return jsonify({"message": "Password has been reset successfully!"}), 200
        else:
            return jsonify({"error": "Invalid or expired reset token"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_details/sidebarNode', methods=['POST'])
def sideBarNode():
    data = list(db.side_bar_nodes.find({}))
    for item in data:
        item['_id'] = str(item['_id'])
    
    return jsonify(data)

@app.route('/get_details/templates', methods=['POST'])
def tepmlet():
    data = list(db.templates.find({}))
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@app.route('/add/sidebarNode', methods=['POST'])
def addSideBarNode():
    try:
        data = request.form.get('sidebars')
        new=json.loads(data)
        # app.logger.info("D A T A >>>>>>>>>>>{}".format(new))
        # if not isinstance(data, list):
        #     return jsonify({"error": "Input data should be a list of nodes"}), 400
        db.side_bar_nodes.insert_many(new)  
        return jsonify({"message": "Side Bar Node inserted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/add/templates', methods=['POST'])
def addTemplets():
    try:
        data = request.form.get('templates')
        new=json.loads(data)
        # app.logger.info("D A T A >>>>>>>>>>>{}".format(new))
        # if not isinstance(data, list):
        #     return jsonify({"error": "Input data should be a list of nodes"}), 400
        db.templets.insert_many(new)  
        return jsonify({"message": "Templates inserted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    