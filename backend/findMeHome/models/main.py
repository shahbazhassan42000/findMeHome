from sqlalchemy import and_,or_
from Base import Base, engine
from Base import Session
from breed import Breed
from disease import Disease
from diseasedog import Diseasedog
from shelter import Shelter
from user import User
from dog import Dog
from list import List
from admin import Admin
from blog import Blog

class DBHandler():

    # Constructor
    def __init__(self):
        Base.metadata.create_all(engine)

    # Session creator
    def createSession(self):
        try:
            session=Session()
            return True,session
        except:
            return False,'Unable to create session.'

    #Object creation Functions
    def createObjUser(self,fname,lname,city,country,email,username,password,picture,phone):
        return User(fname,lname,city,country,email,username,password,picture,phone)
    def createObjShelter(self,name,street,city,country,email,username,password,picture,phone,proof):
        return Shelter(name,street,city,country,email,username,password,picture,phone,proof)
    def createObjDog(self,sid,dname,age,bid):
        return Dog(sid,dname,age,bid)
    def createObjBlog(self,url,aid):
        return Blog(url,aid)
    def createObjList(self,uid,did):
        return List(uid,did)
    def createObjDisease(self,disease):
        return Disease(disease)
    def createObjBreed(self,name):
        return Breed(name)
    def createObjDiseasedog(self,description,did,disid):
        return Diseasedog(description,did,disid)

    # Check if the Instance of User,Shelter or Admin Exists
    def instanceExists(self,user,session):
        results=None
        if isinstance(user,User):
            results=session.query(User).filter(or_(User.username==user.username,User.email==user.email)).one_or_none()
        elif isinstance(user,Shelter):
            results=session.query(Shelter).filter(or_(Shelter.username==user.username,Shelter.email==user.email)).one_or_none()
        elif isinstance(user,Admin):
            results=session.query(Admin).filter(or_(Admin.username==user.username,Admin.email==user.email)).one_or_none()
        if (results == None):
            return False
        return True

    # Add user or shelter to database
    def add(self,user):
        flag,session=self.createSession()
        if flag==False:
            return flag,session
        if self.instanceExists(user,session):
            session.close()
            return False,'User Exists.'
        else:
            try:
                session.add(user)
                session.commit()
                session.close()
                return True,'User added successfully'
            except:
                session.rollback()
                session.close()
                return False,'Error with database'

db=DBHandler()
