from app.model.completions import Completions

from app import response
from app import response, app, db
from flask import request

def addCompletions():
    username = request.json.get("username")
    challengeid = request.json.get("challengeid")

    completions = Completions(username=username, challengeid=challengeid)
    db.session.add(completions)
    db.session.commit()

    return response.success([], "Sukses Menambahkan Completions")

def checkCompletions():
    username = request.json.get("username")
    challengeid = request.json.get("challengeid")

    exist = Completions.query.filter_by(username=username, challengeid=challengeid).first()

    if exist:
        return response.success(True, "Data ditemukan")
    else:
        return response.success(False, "Data tidak ditemukan")