from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=60
class Dog(Base):
    __tablename__='dog'
    did=Column(Integer,primary_key=True,autoincrement=True)
    sid=Column(Integer,ForeignKey('shelter.sid',ondelete='CASCADE'),primary_key=True)
    dname=Column(String(MAX_LENGTH))
    age=Column(String(MAX_LENGTH))
    bid=Column(Integer,ForeignKey('breed.bid',ondelete='CASCADE'))
    dog=relationship('List',backref='Dog')
    dog=relationship('Diseasedog',backref='Dog')
    def __init__(self,sid,dname,age,bid):
        self.sid=sid
        self.dname=dname
        self.age=age
        self.bid=bid
    def update(self,dog):
        self.sid=dog.sid
        self.dname=dog.dname
        self.age=dog.age
        self.bid=dog.bid


