# Response and App Controller
from app import app, response

# Component Controller
from app.controller import UserController
from app.controller import ChallengeController
from app.controller import LeaderboardController
from app.controller import CompletionsController
from app.controller import AiController
from app.controller import AdminController

# Flask neccessary
from flask_jwt_extended import get_jwt_identity, unset_jwt_cookies, get_jwt
from flask_jwt_extended import jwt_required
from flask import jsonify

@app.route('/')
def index():
    return 'Hello Flask'

@app.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return response.success(current_user, 'Sukses')

@app.route('/user/<getusername>', methods=['GET'])
@jwt_required()
def users(getusername):
    return UserController.index(getusername)

@app.route('/challenge/<getexamid>', methods=['GET'])
@jwt_required()
def getexam(getexamid):
    return ChallengeController.getexam(getexamid)

@app.route("/challenge", methods=['GET'])
def challenge():
    return ChallengeController.index()

@app.route("/signup", methods=['POST'])
def signup():
    return UserController.signup()

@app.route("/login", methods=['POST'])
def login():
    return UserController.login()

@app.route("/logout", methods=["POST"])
def logout():
    return UserController.logout()

@app.route("/leaderboard", methods=['GET'])
def leaderboard():
    return LeaderboardController.index()

@app.route("/userupdate/<username>", methods=["PUT"])
def userupdate(username):
    return UserController.userupdate(username)

@app.route("/addcompletions", methods=["POST"])
def addCompletions():
    return CompletionsController.addCompletions()

@app.route("/checkCompletions", methods=["POST"])
def checkCompletions():
    return CompletionsController.checkCompletions()

@app.route("/checkgpt", methods=["POST"])
def checkGPT():
    return AiController.chat_endpoint()

@app.route("/helpgpt", methods=["POST"])
def helpGPT():
    return AiController.help_endpoint()

@app.route("/usermanager", methods=["GET"])
def userManager():
    return AdminController.index()

@app.route("/updateUser/<id>", methods=["POST"])
def updateUser(id):
    return AdminController.update(id)

@app.route("/deleteUser/<id>", methods=["POST"])
def deleteUser(id):
    return AdminController.delete(id)

@app.route("/adminCreate", methods=["POST"])
def adminCreate():
    return AdminController.create()

@app.route("/adminChallenge", methods=["GET"])
def adminChallenge():
    return AdminController.indexChallenge()

@app.route("/updateChallenge/<id>", methods=["POST"])
def updateChallenge(id):
    return AdminController.updatechallenge(id)

@app.route("/addChallenge", methods=["POST"])
def addChallenge():
    return AdminController.addChallenge()

@app.route("/deleteChallenge/<id>", methods=["POST"])
def deleteChallenge(id):
    return AdminController.deleteChallenge(id)