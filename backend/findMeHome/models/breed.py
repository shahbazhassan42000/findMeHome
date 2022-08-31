from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=100
class Breed(Base):
    __tablename__='breed'
    bid=Column(Integer,primary_key=True,autoincrement=True)
    bname=Column(String(MAX_LENGTH))
    breed = relationship('Dog', cascade="all,delete",backref='Breed')
    def __init__(self,name):
        self.bname=name
    def update(self,breed):
        self.bname=breed.bname