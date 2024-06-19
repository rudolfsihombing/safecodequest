from app.model.user import User
from app.model.challenge import Challenge
from app import response, app, db

from app import response
from flask import request

def index():
    try:
        user = User.query.order_by(User.username).all()
        data = formatarray(user)
        return response.success(data, "success")
    except Exception as e:
        print(e)

def indexChallenge():
    try:
        challenge = Challenge.query.all()
        data = formatarrchallenge(challenge)
        return response.success(data, "success")
    except Exception as e:
        print(e)

def formatarray(datas):
    array = []
    
    for i in datas:
        array.append(singleObject(i))
    
    return array

def formatarrchallenge(datas):
    array = []

    for i in datas:
        array.append(singleChallenge(i))

    return array

def singleObject(data):
    data = {
        'id': data.id,
        'nama' : data.nama,
        'username' : data.username,
        'password' : data.password,
        'role': data.role,
        'avatar': data.avatar
    }

    return data

def singleChallenge(data):
    data  = {
        "id": data.id,
        "title": data.title,
        "quest": data.quest,
        "objektifitas": data.objektifitas,
        "challenge_point": data.challenge_point,
        "answer" : data.answer,
        "kode_quest": data.kode_quest,
        "kode_type": data.kode_type,
        "task_html" : data.task_html,
        "caption": data.caption
    }

    return data

def update(id):
    try:
        user = User.query.filter_by(id=id).first()

        if not user:
            return response.badRequest([], 'User not found')
        
        user.id = request.json.get('id', user.id)
        user.nama = request.json.get('nama', user.nama)
        user.username = request.json.get('username', user.username)
        password = request.json.get('password', user.password)
        
        user.setPassword(password)
        user.role = request.json.get('role', user.role)
        user.avatar = request.json.get('avatar', user.avatar)

        db.session.commit()

        data = singleObject(user)

        return response.success(data, "Mengupdate user sukses")

    except Exception as e:
        print(e)
        db.session.rollback()
        return response.badRequest([], "Gagal Mengupdate User")

def delete(id):
    try:
        user = User.query.filter_by(id=id).first()
        if not user:
            return response.badRequest([], 'User tidak ditemukan')
        
        db.session.delete(user)
        db.session.commit()

        return response.success([], "User sukses dihapus")

    except Exception as e:
        print(e)
        db.session.rollback()
        return response.badRequest([], "Gagal menghapus user")

def create():
    try:
        # Mengambil data dari request JSON
        nama = request.json.get('nama')
        username = request.json.get('username')
        password = request.json.get('password')
        role = request.json.get('role')
        avatar = request.json.get('avatar')

        user_exist = User.query.filter_by(username=username).first() is not None

        if user_exist:
            return response.badRequest([], 'Username telah terdaftar')

        # Membuat objek user baru
        new_user = User(nama=nama, username=username, role=role, avatar=avatar)

        # Mengatur password menggunakan metode setPassword
        new_user.setPassword(password)

        # Menyimpan user baru ke dalam basis data
        db.session.add(new_user)
        db.session.commit()

        # Mengembalikan respons berhasil
        data = singleObject(new_user)
        return response.success(data, "Menambahkan user berhasil")

    except Exception as e:
        print(e)
        db.session.rollback()
        return response.badRequest([], "Gagal menambahkan user")

def updatechallenge(id):
    try:
        challenge = Challenge.query.filter_by(id=id).first()

        if not challenge:
            return response.badRequest([], 'Challenge not found')

        challenge.answer = request.json.get('answer', challenge.answer)
        challenge.caption = request.json.get('caption', challenge.caption)
        challenge.challenge_point = request.json.get('challenge_point', challenge.challenge_point)
        challenge.kode_quest = request.json.get('kode_quest', challenge.kode_quest)
        challenge.kode_type = request.json.get('kode_type', challenge.kode_type)
        challenge.objektifitas = request.json.get('objektifitas', challenge.objektifitas)
        challenge.quest = request.json.get('quest', challenge.quest)
        challenge.title = request.json.get('title', challenge.title)
        challenge.task_html = request.json.get('objektifitas', challenge.task_html)

        db.session.commit()

        data = singleChallenge(challenge)

        return response.success(data, "Mengupdate challenge sukses")

    except Exception as e:
        print(e)
        db.session.rollback()
        return response.badRequest([], "Gagal Mengupdate Challenge")
    
def addChallenge():
    try:
        # Mengambil data dari request JSON
        title = request.json.get('title')
        quest = request.json.get('quest')
        objektifitas = request.json.get('objektifitas')
        challenge_point = request.json.get('challenge_point')
        answer = request.json.get('answer')
        kode_quest = request.json.get('kode_quest')
        kode_type = request.json.get('kode_type')
        task_html = request.json.get('task_html')
        caption = request.json.get('caption')

        # Membuat objek challenge baru
        new_challenge = Challenge(
            title=title,
            quest=quest,
            objektifitas=objektifitas,
            challenge_point=challenge_point,
            answer=answer,
            kode_quest=kode_quest,
            kode_type=kode_type,
            task_html=task_html,
            caption=caption
        )

        # Menyimpan challenge baru ke dalam basis data
        db.session.add(new_challenge)
        db.session.commit()

        # Mengembalikan respons berhasil
        data = singleChallenge(new_challenge)
        return response.success(data, "Menambahkan challenge berhasil")

    except Exception as e:
        print(e)
        db.session.rollback()
        return response.badRequest([], "Gagal menambahkan challenge")
    
def deleteChallenge(id):
    try:
        challenge = Challenge.query.filter_by(id=id).first()

        if not challenge:
            return response.badRequest([], "Gagal menghapus challenge")

        db.session.delete(challenge)
        db.session.commit()
        return response.success([], "Berhasil menghapus challenge")
    except Exception as e:
        print(e)
        db.session.rollback()
        return response.badRequest([], "Gagal menambahkan challenge")