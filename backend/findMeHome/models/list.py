from backend.findMeHome.models.Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=100
class List(Base):
    __tablename__='list'
    lid=Column(Integer,primary_key=True)
    uid=Column(Integer,ForeignKey('user.uid',ondelete='CASCADE'),primary_key=True)
    did=Column(Integer,ForeignKey('dog.did',ondelete='CASCADE'),primary_key=True)
    def __init__(self,uid,did,lid):
        self.lid=lid
        self.uid=uid
        self.did=did