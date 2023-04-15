from ..models.Base import Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Diseasedog(Base):
    __tablename__ = 'diseasedog'
    description = Column(String(400))
    did = Column(Integer, ForeignKey('dog.did', ondelete='CASCADE'), primary_key=True)
    disid = Column(Integer, ForeignKey('disease.disid', ondelete='CASCADE'), primary_key=True)

    def __init__(self, description, did, disid):
        self.description = description
        self.did = did
        self.disid = disid

    def update(self, diseasedog):
        self.description = diseasedog.description
        self.did = diseasedog.did
        self.disid = diseasedog.disid

    def jsonify(self):
        return {'did': self.did,
                'disid': self.disid,
                'description': self.description}
