from app.model.user import User

from app import response, app, db
from flask import request, jsonify
from flask_jwt_extended import *

import datetime

def index(getusername):
    try:
        if not getusername:
            return response.badRequest([], "Unathorized access")
        
        user = User.query.filter_by(username=getusername).first()
        
        response_body = {
            "nama" : user.nama,
            "username" : user.username,
            "user_point": user.user_point
        }

        return response_body
    except Exception as e:
        print(e)

def signup():
    try:
        nama = request.json.get('nama')
        username = request.json.get('username')
        password = request.json.get('password')
        user_point = 0

        user_exist = User.query.filter_by(username=username).first() is not None

        if user_exist:
            return response.badRequest([], 'Username telah terdaftar')

        users = User(nama=nama, username=username, user_point=user_point)
        users.setPassword(password)
        db.session.add(users)
        db.session.commit()

        return response.success('', 'Sukses menambahkan data user')

    except Exception as e:
        print(e)


def login():
    try:
        username = request.json.get('username')
        password = request.json.get('password')

        user = User.query.filter_by(username=username).first()

        if not user:
            return response.badRequest([], 'Username tidak terdaftar')
        
        if not user.checkPassword(password):
            return response.badRequest([], 'Kombinasi password salah')

        expires = datetime.timedelta(days=7)
        expires_refresh = datetime.timedelta(days=7)

        access_token = create_access_token(identity=username, fresh=True, expires_delta=expires)
        refresh_token = create_refresh_token(identity=username, expires_delta=expires_refresh)

        role = user.role

        return jsonify({
            "access_token" : access_token,
            "refresh_token" : refresh_token,
            "username" : username,
            "role": role
        })

    except Exception as e:
        print(e)

def logout():
    try:
        response = jsonify({"msg": "logout successfull"})
        unset_jwt_cookies(response)
        return response
    except Exception as e:
        print(e)

def userupdate(username):
    try:
        user = User.query.filter_by(username=username).first()
        point = request.json['point']
        user.user_point = user.user_point + point
        db.session.commit()
        return response.success('', 'Sukses menambahkan point')
    except Exception as e:
        print(e)

