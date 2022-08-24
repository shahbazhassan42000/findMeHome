from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=100
class Shelter(Base):
    __tablename__='shelter'
    sid=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String(MAX_LENGTH))
    street=Column(String(MAX_LENGTH))
    city=Column(String(MAX_LENGTH))
    country=Column(String(MAX_LENGTH))
    email=Column(String(MAX_LENGTH))
    username=Column(String(MAX_LENGTH))
    password=Column(String(MAX_LENGTH))
    picture=Column(String(MAX_LENGTH))
    phone=Column(String(MAX_LENGTH))
    proof=Column(String(MAX_LENGTH))
    shelter=relationship('Dog',cascade="all,delete",backref='Shelter')
    def __init__(self,name,street,city,country,email,username,password,picture,phone,proof):
        self.name=name
        self.street=street
        self.city=city
        self.country=country
        self.email=email
        self.username=username
        self.password=password
        self.picture=picture
        self.phone=phone
        self.proof=proof