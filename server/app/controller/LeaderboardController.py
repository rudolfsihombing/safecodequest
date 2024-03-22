from app.model.user import User

from app import response

def index():
    try:
        user = User.query.order_by(User.user_point.desc()).all()
        data = formatarray(user)
        return response.success(data, "success")
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
        'username' : data.username,
        'user_point' : data.user_point,
    }

    return data