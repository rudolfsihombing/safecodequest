from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
    
from app.model import user, challenge, completions
from app import routes

if __name__ == '__main__':
    # Mengatur host menjadi '0.0.0.0' dan port menjadi 5000
    app.run(host='0.0.0.0', port=5000)