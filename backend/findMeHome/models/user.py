from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=60
class User(Base):
    __tablename__='user'
    uid=Column(Integer,primary_key=True,autoincrement=True)
    fname=Column(String(MAX_LENGTH))
    lname=Column(String(MAX_LENGTH))
    city=Column(String(MAX_LENGTH))
    country=Column(String(MAX_LENGTH))
    email=Column(String(MAX_LENGTH))
    username=Column(String(MAX_LENGTH))
    password=Column(String(MAX_LENGTH))
    picture=Column(String(MAX_LENGTH))
    phone=Column(String(MAX_LENGTH))
    user=relationship('List',cascade="all,delete",backref='User')
    def __init__(self,fname,lname,city,country,email,username,password,picture,phone):
        self.fname=fname
        self.lname=lname
        self.city=city
        self.country=country
        self.email=email
        self.username=username
        self.password=password
        self.picture=picture
        self.phone=phone
