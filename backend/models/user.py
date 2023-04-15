import os

from ..models.Base import Base, SALT
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
import bcrypt

MAX_LENGTH = os.getenv('MAX_LENGTH', 100)


class User(Base):
    __tablename__ = 'user'
    uid = Column(Integer, primary_key=True, autoincrement=True)
    fname = Column(String(MAX_LENGTH))
    lname = Column(String(MAX_LENGTH))
    city = Column(String(MAX_LENGTH))
    country = Column(String(MAX_LENGTH))
    email = Column(String(MAX_LENGTH))
    username = Column(String(MAX_LENGTH))
    password = Column(String(MAX_LENGTH))
    picture = Column(String(MAX_LENGTH))
    phone = Column(String(MAX_LENGTH))
    lat = Column(String(MAX_LENGTH))
    lng = Column(String(MAX_LENGTH))
    user = relationship('List', cascade="all,delete", backref='User')

    def __init__(self, fname, lname, city, country, email, username, password, picture, phone, lat, lng):
        self.fname = fname
        self.lname = lname
        self.city = city
        self.country = country
        self.email = email
        self.username = username
        self.password = self.hashPassword(password)
        self.picture = picture
        self.phone = phone
        self.lat = lat
        self.lng = lng

    def update(self, user):
        self.fname = user.fname
        self.lname = user.lname
        self.city = user.city
        self.country = user.country
        self.email = user.email
        self.username = user.username
        self.password = self.hashPassword(user.password)
        self.picture = user.picture
        self.phone = user.phone
        self.lat = user.lat
        self.lng = user.lng

    def hashPassword(self, password):
        return bcrypt.hashpw(password.encode(), SALT)

    def jsonify(self):
        return {'type': 'adopter',
                'id': self.uid,
                'fname': self.fname,
                'lname': self.lname,
                'city': self.city,
                'country': self.country,
                'email': self.email,
                'username': self.username,
                'picture': self.picture,
                'phone': self.phone}
