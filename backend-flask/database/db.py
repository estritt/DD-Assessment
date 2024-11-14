# this was going to be for saving chats based on session id and reaccessing them from a history tab

from flask_mongoengine import MongoEngine

db = MongoEngine()

def initialize_db(app):
    db.init_app(app)