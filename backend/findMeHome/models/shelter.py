from ..models.Base import Base, MAX_LENGTH, SALT
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
import bcrypt


class Shelter(Base):
    __tablename__ = 'shelter'
    sid = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(MAX_LENGTH))
    street = Column(String(MAX_LENGTH))
    city = Column(String(MAX_LENGTH))
    country = Column(String(MAX_LENGTH))
    email = Column(String(MAX_LENGTH))
    username = Column(String(MAX_LENGTH))
    password = Column(String(MAX_LENGTH))
    picture = Column(String(MAX_LENGTH))
    phone = Column(String(MAX_LENGTH))
    proof = Column(String(MAX_LENGTH))
    lat = Column(String(MAX_LENGTH))
    lng = Column(String(MAX_LENGTH))
    shelter = relationship('Dog', cascade="all,delete", backref='Shelter')

    def __init__(self, name, street, city, country, email, username, password, picture, phone, proof, lat, lng):
        self.name = name
        self.street = street
        self.city = city
        self.country = country
        self.email = email
        self.username = username
        self.password = self.hashPassword(password)
        self.picture = picture
        self.phone = phone
        self.proof = proof
        self.lat = lat
        self.lng = lng

    def update(self, shelter):
        self.name = shelter.name
        self.street = shelter.street
        self.city = shelter.city
        self.country = shelter.country
        self.email = shelter.email
        self.username = shelter.username
        self.password = self.hashPassword(shelter.password)
        self.picture = shelter.picture
        self.phone = shelter.phone
        self.proof = shelter.proof
        self.lat = shelter.lat
        self.lng = shelter.lng

    def hashPassword(self, password):
        return bcrypt.hashpw(password.encode(), SALT)

    def jsonify(self):
        return {'type': 'shelter',
                'id': self.sid,
                'name': self.name,
                'street': self.street,
                'city': self.city,
                'country': self.country,
                'email': self.email,
                'username': self.username,
                'picture': self.picture,
                'phone': self.phone,
                'proof': self.proof}
