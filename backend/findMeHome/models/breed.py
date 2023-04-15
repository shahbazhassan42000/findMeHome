from ..models.Base import Base, MAX_LENGTH
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Breed(Base):
    __tablename__ = 'breed'
    bid = Column(Integer, primary_key=True, autoincrement=True)
    bname = Column(String(MAX_LENGTH))
    breed = relationship('Dog', cascade="all,delete", backref='Breed')

    def __init__(self, name):
        self.bname = name

    def update(self, breed):
        self.bname = breed.bname

    def jsonify(self):
        return {'bid': self.bid,
                'bname': self.bname}
