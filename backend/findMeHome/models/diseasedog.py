from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
class Diseasedog(Base):
    __tablename__='diseasedog'
    description=Column(String(400))
    did=Column(Integer,ForeignKey('dog.did'),primary_key=True)
    disid=Column(Integer,ForeignKey('disease.disid'),primary_key=True)
    def __init__(self,description,did,disid):
        self.description=description
        self.did=did
        self.disid=disid