from ..models.Base import Base, MAX_LENGTH
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Dog(Base):
    __tablename__ = 'dog'
    did = Column(Integer, primary_key=True, autoincrement=True)
    sid = Column(Integer, ForeignKey('shelter.sid', ondelete='CASCADE'), primary_key=True)
    dname = Column(String(MAX_LENGTH))
    age = Column(String(MAX_LENGTH))
    imageurl = Column(String(MAX_LENGTH))
    bid = Column(Integer, ForeignKey('breed.bid', ondelete='CASCADE'))
    dog = relationship('List', cascade="all,delete", backref='Dog')
    dog = relationship('Diseasedog', cascade="all,delete", backref='Dog')

    def __init__(self, sid, dname, age, bid, image):
        self.sid = sid
        self.dname = dname
        self.age = age
        self.bid = bid
        self.imageurl = image

    def update(self, dog):
        self.sid = dog.sid
        self.dname = dog.dname
        self.age = dog.age
        self.bid = dog.bid
        self.imageurl = dog.imageurl

    def jsonify(self):
        return {'did': self.did,
                'sid': self.sid,
                'dname': self.dname,
                'age': self.age,
                'bid': self.bid,
                'imageurl': self.imageurl}
