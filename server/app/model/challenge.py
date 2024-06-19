from app import db

class Challenge(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True, nullable=False)
    title = db.Column(db.String(250), nullable=False)
    quest = db.Column(db.String(10000000), nullable=False)
    challenge_point = db.Column(db.Integer, default=0)
    task_html = db.Column(db.String(10000000), nullable=False)
    objektifitas = db.Column(db.String(10000000), nullable=False)
    caption = db.Column(db.String(250), nullable=False)
    answer = db.Column(db.String(10000000), nullable=False)
    kode_quest = db.Column(db.String(10000000), nullable=False)
    kode_type = db.Column(db.String(250), nullable=False)

    completions = db.relationship('Completions', backref='challenge', lazy=True)

    def __init__(self, quest):
        self.long_text_column = quest

    def __repr__(self):
        return '<Challenge {}>'.format(self.name)
    
    def __init__(self, title, quest, objektifitas, challenge_point, answer, kode_quest, kode_type, task_html, caption):
        self.title = title
        self.quest = quest
        self.objektifitas = objektifitas
        self.challenge_point = challenge_point
        self.answer = answer
        self.kode_quest = kode_quest
        self.kode_type = kode_type
        self.task_html = task_html
        self.caption = caption