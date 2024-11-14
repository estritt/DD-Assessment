from flask import Flask, make_response, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
from google.generativeai import GenerativeModel
# from .database.db import initialize_db

app = Flask(__name__)
# app.config['MONGODB_SETTINGS'] = {
#     'host': 'mongodb://localhost/convos'
# }

api = Api(app)
CORS(app)

import json
with open('sample_data.json') as f:
    img_data = json.load(f)

class Data(Resource):
    # We could manage a database from this view
    def __init__(self):
        self.data = img_data
    
    def get(self):
        return make_response(jsonify(self.data), 200)
    
api.add_resource(Data, '/data')

# todo: have gemini reply in json giving columns, rows, or cells to highlight
# make an angular service for highlighting
# should have one gemini chat per site session - remember chats from earlier in session
class Chat(Resource):
    def __init__(self):
        self.model = GenerativeModel(model_name='gemini-1.5-pro-latest')
        self.session_context = f"Answer problems using the following dataset: {img_data}"

    def post(self):
        data = request.json
        user_input = data.get('message', '')
        if not user_input:
            return {"error": "Message is required"}, 400
        
        response = self.model.generate_content(f"{self.session_context}\nUser: {user_input}").text
        return make_response({"response": response}, 200)

api.add_resource(Chat, '/chat')

# initialize_db(app)

if __name__ == '__main__':
    app.run(debug=True)