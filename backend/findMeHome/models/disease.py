from ..models.Base import Base, MAX_LENGTH
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Disease(Base):
    __tablename__ = 'disease'
    disid = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(MAX_LENGTH))
    disease = relationship('Diseasedog', cascade="all,delete", backref='Disease')

    def __init__(self, disease):
        self.name = disease

    def update(self, disease):
        self.name = disease.name

    def jsonify(self):
        return {'disid': self.disid,
                'name': self.name}
