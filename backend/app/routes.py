from flask import current_app as app
from flask import request,jsonify,json
from pymongo import MongoClient

clientMongo = MongoClient('mongodb://localhost:27017')
db = clientMongo['MY_DB']

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
        app.logger.info("D A T A >>>>>>>>>>>{}".format(new))
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
        app.logger.info("D A T A >>>>>>>>>>>{}".format(new))
        # if not isinstance(data, list):
        #     return jsonify({"error": "Input data should be a list of nodes"}), 400
        db.templets.insert_many(new)  
        return jsonify({"message": "Templates inserted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    