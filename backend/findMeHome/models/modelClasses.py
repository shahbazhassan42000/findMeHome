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
    email=Column(String(MAX_LENGTH))
    admin=relationship('Blog',backref='Admin')
    def __init__(self,name,username,password,email):
        self.username=username
        self.name=name
        self.password=password
        self.email=email

class Blog(Base):
    __tablename__='blog'
    blid=Column(Integer,primary_key=True,autoincrement=True)
    url=Column(String(MAX_LENGTH))
    aid=Column(Integer,ForeignKey('admin.aid'))
    def __init__(self,url,aid):
        self.url=url
        self.aid=aid

class Breed(Base):
    __tablename__='breed'
    bid=Column(Integer,primary_key=True,autoincrement=True)
    bname=Column(String(MAX_LENGTH))
    breed = relationship('Dog',backref='Breed')
    def __init__(self,name):
        self.bname=name

class Disease(Base):
    __tablename__='disease'
    disid=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String(MAX_LENGTH))
    disease=relationship('Diseasedog',backref='Disease')
    def __init__(self,disease):
        self.name=disease

class Diseasedog(Base):
    __tablename__='diseasedog'
    description=Column(String(400))
    did=Column(Integer,ForeignKey('dog.did',ondelete='CASCADE'),primary_key=True)
    disid=Column(Integer,ForeignKey('disease.disid',ondelete='CASCADE'),primary_key=True)
    def __init__(self,description,did,disid):
        self.description=description
        self.did=did
        self.disid=disid

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
    shelter=relationship('Dog',backref='Shelter')
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

class List(Base):
    __tablename__='list'
    lid=Column(Integer,primary_key=True)
    uid=Column(Integer,ForeignKey('user.uid',ondelete='CASCADE'),primary_key=True)
    did=Column(Integer,ForeignKey('dog.did',ondelete='CASCADE'),primary_key=True)
    def __init__(self,uid,did,lid):
        self.lid=lid
        self.uid=uid
        self.did=did