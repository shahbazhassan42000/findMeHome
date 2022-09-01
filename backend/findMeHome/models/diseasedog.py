from Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
class Diseasedog(Base):
    __tablename__='diseasedog'
    description=Column(String(400))
    did=Column(Integer,ForeignKey('dog.did',ondelete='CASCADE'),primary_key=True)
    disid=Column(Integer,ForeignKey('disease.disid',ondelete='CASCADE'),primary_key=True)
    def __init__(self,description,did,disid):
        self.description=description
        self.did=did
        self.disid=disid
    def update(self,diseasedog):
        self.description=diseasedog.description
        self.did=diseasedog.did
        self.disid=diseasedog.disid