from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=100
class Blog(Base):
    __tablename__='blog'
    blid=Column(Integer,primary_key=True,autoincrement=True)
    url=Column(String(MAX_LENGTH))
    aid=Column(Integer,ForeignKey('admin.aid'))
    def __init__(self,url,aid):
        self.url=url
        self.aid=aid
    def update(self,blog):
        self.url=blog.url
        self.aid=blog.aid