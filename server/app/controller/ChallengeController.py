from app.model.challenge import Challenge

from app import response
from flask import request

# leaderboard user lists
def index():
    try:
        challenge = Challenge.query.all()
        data = formatarray(challenge)
        return response.success(data, "success")
    except Exception as e:
        print(e)

def getexam(getexamid):
    try:
        if not getexamid:
            return response.badRequest([], "Unathorized access")
        
        challenge = Challenge.query.filter_by(id=getexamid).first()
        
        response_body = {
            "title": challenge.title,
            "quest": challenge.quest,
            "objektifitas": challenge.objektifitas,
            "challenge_point": challenge.challenge_point,
            "answer" : challenge.answer,
            "kode_quest": challenge.kode_quest,
            "kode_type": challenge.kode_type,
            "task_html" : challenge.task_html,
            "tujuan": challenge.tujuan
        }

        return response_body
    except Exception as e:
        print(e)


    except Exception as e:
        print(e)

def formatarray(datas):
    array = []
    for i in datas:
        array.append(singleObject(i))
    
    return array

def singleObject(data):
    data = {
        'id' : data.id,
        'title' : data.title,
        'quest' : data.quest,
        'challenge_point' : data.challenge_point,
        'objektifitas' : data.objektifitas,
        'caption' : data.caption
    }

    return data