from app import db
from app.model.user import User
from app.model.challenge import Challenge

class Completions(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username = db.Column(db.String(60), db.ForeignKey(User.username, ondelete="CASCADE"), nullable=False)
    challengeid = db.Column(db.BigInteger, db.ForeignKey(Challenge.id, ondelete="RESTRICT"), nullable=False)

    def __repr__(self) -> str:
        return '<Completions {}>'.format(self.name)