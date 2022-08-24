from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=100
class Admin(Base):
    __tablename__='admin'
    aid=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String(MAX_LENGTH))
    username=Column(String(MAX_LENGTH))
    password=Column(String(MAX_LENGTH))
    admin=relationship('Blog',backref='Admin')
    def __int__(self,name,username,password):
        self.username=username
        self.name=name
        self.password=password