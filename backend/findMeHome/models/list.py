from ..models.Base import Base
from sqlalchemy import Column, Integer, ForeignKey


class List(Base):
    __tablename__ = 'list'
    lid = Column(Integer, primary_key=True)
    uid = Column(Integer, ForeignKey('user.uid', ondelete='CASCADE'), primary_key=True)
    did = Column(Integer, ForeignKey('dog.did', ondelete='CASCADE'), primary_key=True)

    def __init__(self, uid, did, lid):
        self.lid = lid
        self.uid = uid
        self.did = did

    def jsonify(self):
        return {'lid': self.lid,
                'uid': self.uid,
                'did': self.did}
