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