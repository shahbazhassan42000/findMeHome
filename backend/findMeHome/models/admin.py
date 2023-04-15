from ..models.Base import Base, SALT, MAX_LENGTH
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
import bcrypt


class Admin(Base):
    __tablename__ = 'admin'
    aid = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(MAX_LENGTH))
    username = Column(String(MAX_LENGTH))
    password = Column(String(MAX_LENGTH))
    email = Column(String(MAX_LENGTH))
    admin = relationship('Blog', backref='Admin')

    def __init__(self, name, username, password, email):
        self.username = username
        self.name = name
        self.password = self.hashPassword(password)
        self.email = email

    def update(self, admin):
        self.username = admin.username
        self.name = admin.name
        self.password = self.hashPassword(admin.password)
        self.email = admin.email

    def hashPassword(self, password):
        return bcrypt.hashpw(password.encode(), SALT)
