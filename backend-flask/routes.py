from flask import Blueprint, request, jsonify
from .mock_logic import handle_query
import json

api = Blueprint('api', __name__)

@api.route('/query', methods=['POST'])
def query():
    query = request.json.get('query')
    with open('app.data.json') as f:
        data = json.load(f)
    response = handle_query(query, data)
    return jsonify(response)