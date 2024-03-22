from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(60), index=True, unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    user_point = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    completions = db.relationship('Completions', backref='user', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return '<User {}>'.format(self.name)
    
    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)