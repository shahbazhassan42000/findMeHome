from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=60
class Dog(Base):
    __tablename__='dog'
    did=Column(Integer,primary_key=True,autoincrement=True)
    sid=Column(Integer,ForeignKey('shelter.sid'),primary_key=True)
    dname=Column(String(MAX_LENGTH))
    age=Column(Integer)
    bid=Column(Integer,ForeignKey('breed.bid'))
    dog=relationship('List',cascade="all,delete",backref='Dog')
    dog=relationship('Diseasedog',cascade="all,delete",backref='Dog')
    def __init__(self,sid,dname,age,bid):
        self.sid=sid
        self.dname=dname
        self.age=age
        self.bid=bid

