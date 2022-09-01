from backend.findMeHome.models.Base import Base
from sqlalchemy import Column, String,Integer,ForeignKey
from sqlalchemy.orm import relationship
MAX_LENGTH=60
class Disease(Base):
    __tablename__='disease'
    disid=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String(MAX_LENGTH))
    disease=relationship('Diseasedog', cascade="all,delete",backref='Disease')
    def __init__(self,disease):
        self.name=disease

    def update(self,disease):
        self.name=disease.name