from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=100
class List(Base):
    __tablename__='list'
    lid=Column(Integer,primary_key=True,autoincrement=True)
    uid=Column(Integer,ForeignKey('user.uid'),primary_key=True)
    did=Column(Integer,ForeignKey('dog.did'),primary_key=True)
    def __init__(self,uid,did):
        self.uid=uid
        self.did=did