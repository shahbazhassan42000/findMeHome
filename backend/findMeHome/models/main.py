from sqlalchemy import and_, or_
from Base import Base, engine
from Base import Session
from modelClases import *


class DBHandler():

    # ---------------------------------------Constructor---------------------------------------
    def __init__(self):
        Base.metadata.create_all(engine)

    # ---------------------------------------Session creator---------------------------------------
    def createSession(self):
        try:
            session = Session()
            return True, session
        except:
            return False, 'Unable to create session.'

    # ---------------------------------------------Object creation Functions---------------------------------------------
    def createObjUser(self, fname, lname, city, country, email, username, password, picture, phone):
        return User(fname, lname, city, country, email, username, password, picture, phone)

    def createObjShelter(self, name, street, city, country, email, username, password, picture, phone, proof):
        return Shelter(name, street, city, country, email, username, password, picture, phone, proof)

    def createObjDog(self, sid, dname, age, bid):
        return Dog(sid, dname, age, bid)

    def createObjBlog(self, url, aid):
        return Blog(url, aid)

    def createObjList(self, uid, did):
        return List(uid, did)

    def createObjDisease(self, disease):
        return Disease(disease)

    def createObjBreed(self, name):
        return Breed(name)

    def createObjDiseasedog(self, description, did, disid):
        return Diseasedog(description, did, disid)

    # -----------------------------------------------Checker Functions-----------------------------------------------
    def actorExists(self, user, session):
        results = session.query(User).filter(
            or_(User.username == user.username, User.email == user.email)).one_or_none()
        if (results != None):
            return True
        results = session.query(Shelter).filter(
            or_(Shelter.username == user.username, Shelter.email == user.email)).one_or_none()
        if (results != None):
            return True
        results = session.query(Admin).filter(Admin.username == user.username).one_or_none()
        if (results != None):
            return True
        return False

    def checkDogInList(self, list, session):
        results = session.query(List).filter(
            and_(List.lid == list.lid, List.did == list.did, List.uid == list.uid)).one_or_none()
        if (results == None):
            return False
        return True

    def actorExistsByID(self, type, id, session):
        results = None
        if type == 'user':
            results = session.query(User).filter(User.uid == id).one_or_none()
        elif type == 'shelter':
            results = session.query(Shelter).filter(Shelter.sid == id).one_or_none()
        elif type == 'admin':
            results = session.query(Admin).filter(Admin.aid == id).one_or_none()
        if (results == None):
            return False
        return True

    def dogExists(self, id, session):
        results = session.query(Dog).filter(Dog.did == id).one_or_none()
        if (results == None):
            return False
        return True

    def breedExists(self, id, session):
        results = session.query(Breed).filter(Breed.bid == id).one_or_none()
        if (results == None):
            return False
        return True

    def diseaseExists(self, id, session):
        results = session.query(Disease).filter(Disease.disid == id).one_or_none()
        if (results == None):
            return False
        return True

    def diseasedogExists(self, obj, session):
        results = session.query(Diseasedog).filter(
            and_(Diseasedog.disid == obj.disid, Diseasedog.did == obj.did)).one_or_none()
        if (results == None):
            return False
        return True

    # ---------------------------------------Adder function---------------------------------------
    def add(self, obj):
        flag, session = self.createSession()
        if flag == False:
            return flag, session
        if isinstance(obj, User) or isinstance(obj, Shelter) or isinstance(obj, Admin):
            if self.actorExists(obj, session):
                session.close()
                return False, 'User Exists.'
        if isinstance(obj, List):
            if self.checkDogInList(obj, session):
                session.close()
                return False, 'Dog exists.'
            if not self.actorExistsByID('user', obj.uid, session):
                session.close()
                return False, 'User Doesn\'t exist.'
            if not self.dogExists(obj.did, session):
                session.close()
                return False, 'Dog Doesn\'t exist.'
        if isinstance(obj, Blog):
            if not self.actorExistsByID('admin', obj.aid, session):
                session.close()
                return False, 'Admin Doesn\'t exist.'
        if isinstance(obj, Dog):
            if not self.actorExistsByID('shelter', obj.sid, session):
                session.close()
                return False, 'Shelter Doesn\'t exist.'
            if not self.breedExists(obj.bid, session):
                session.close()
                return False, 'Breed Doesn\'t exist.'
        if isinstance(obj, Diseasedog):
            if not self.dogExists(obj.did, session):
                session.close()
                return False, 'Dog Doesn\'t exist.'
            if not self.diseaseExists(obj.disid, session):
                session.close
                return False, 'Disease Doesn\'t exist.'
            if self.diseasedogExists(obj, session):
                session.close()
                return False, 'This Disease for this dog already exists'

        # if isinstance(obj,Breed):
        # return False,'Breed is not addable'
        # if isinstance(obj,Disease):
        # return False,'Disease is not addable'
        try:
            session.add(obj)
            session.commit()
            session.close()
            return True, 'Operation Success'
        except:
            session.rollback()
            session.close()
            return False, 'Error with database'

    # ---------------------------------------Getter functions---------------------------------------
    def getUser(self, id=None, username=None, email=None):
        flag, session = self.createSession()
        results = None
        if flag == False:
            return flag, session
        if id != None:
            results = session.query(User).filter(User.uid == id).one_or_none()
        if username != None:
            results = session.query(User).filter(User.username == username).one_or_none()
        if email != None:
            results = session.query(User).filter(User.email == email).one_or_none()
        session.close()
        if results == None:
            return False, 'No User found'
        return True, results

    def getShelter(self, id=None, username=None, email=None):
        flag, session = self.createSession()
        results = None
        if flag == False:
            return flag, session
        if id != None:
            results = session.query(Shelter).filter(Shelter.sid == id).one_or_none()
        if username != None:
            results = session.query(Shelter).filter(Shelter.username == username).one_or_none()
        if email != None:
            results = session.query(Shelter).filter(Shelter.email == email).one_or_none()
        session.close()
        if results == None:
            return False, 'No User found'
        return True, results

    def getDog(self, id=None, breed=None, age=None):
        flag, session = self.createSession()
        results = None
        if flag == False:
            return flag, session
        if id != None:
            results = session.query(Dog).filter(Dog.did == id).one_or_none()
        if breed != None:
            results = session.query(Dog).filter(Dog.did == id).all()
        if age != None:
            results = session.query(Dog).filter(Dog.did == id).all()
        session.close()
        if results == None:
            return False, 'Not found'
        return True, results

    def getDisease(self, id=None, all=False):
        flag, session = self.createSession()
        results = None
        if flag == False:
            return flag, session
        if id != None:
            results = session.query(Disease).filter(Disease.disid == id).one_or_none()
        if all != False:
            results = session.query(Disease).all()
        session.close()
        if results == None:
            return False, 'Not found'
        return True, results

    def getBreed(self, id=None, all=False):
        flag, session = self.createSession()
        results = None
        if flag == False:
            return flag, session
        if id != None:
            results = session.query(Breed).filter(Breed.bid == id).one_or_none()
        if all != False:
            results = session.query(Breed).all()
        session.close()
        if results == None:
            return False, 'Not found'
        return True, results

    def getDiseasesOfDog(self, id):
        flag, session = self.createSession()
        if flag == False:
            return flag, session
        results = session.query(Diseasedog).filter(Diseasedog.did == id).all()
        session.close()
        if results == None:
            return False, 'Not found'
        return True, results

# ------------------------------------------------------Testing---------------------------------------------------------------
# db=DBHandler()
# print(db.add(User('asd','asd','asd','asd','asd','asd','asd','efwe','fwe')))
# print(db.add(User('aefv','aevfrd','agrbsd','aytnsd','athnsd','atnsd','aaersd','etnfwe','frtgwe')))
# print(db.add(Shelter('rv','sdc','sdc','sdcsdc','wefwe','ddfv','dfvfdv','efv','ev','erv')))
# print(db.add(Shelter('rv','sdc','sdc','sdcswfedc','wefwwefe','ddfwedfv','dwffvfdv','efwefv','fweev','erv')))
# print(db.add(Disease('hepatitis')))
# print(db.add(Disease('captitus')))
# print(db.add(Breed('adssew')))
# print(db.add(Breed('adservfer')))
# print(db.add(Dog(1,'asd','34',1)))
# print(db.add(Dog(2,'asasdcwd','214',2)))
# print(db.add(List(1,1,1)))
# print(db.add(List(2,1,1)))
# print(db.add(Admin('wef','asfwed','asdas','aasdas')))
# print(db.add(Blog('asdas',1)))
# print(db.add(Diseasedog('bad',1,2)))
