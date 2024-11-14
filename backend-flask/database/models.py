from .db import db

class Convo(db.Document):
    id = db.IntField(required=True)
    chats = db.StringField(required=True)