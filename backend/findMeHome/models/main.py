from sqlalchemy import and_,or_
from backend.findMeHome.models.Base import Base, engine, Session
from backend.findMeHome.models.breed import Breed
from backend.findMeHome.models.disease import Disease
from backend.findMeHome.models.diseasedog import Diseasedog
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from backend.findMeHome.models.dog import Dog
from backend.findMeHome.models.list import List
from backend.findMeHome.models.admin import Admin
from backend.findMeHome.models.blog import Blog

class DBHandler():

    #---------------------------------------Constructor---------------------------------------
    def __init__(self):
        Base.metadata.create_all(engine)


    #---------------------------------------Session creator---------------------------------------
    def createSession(self):
        try:
            session=Session()
            return True,session
        except:
            return False,'Unable to create session.'



    #---------------------------------------------Object creation Functions---------------------------------------------
    def createObjUser(self,fname,lname,city,country,email,username,password,picture,phone):
        return User(fname,lname,city,country,email,username,password,picture,phone)
    def createObjShelter(self,name,street,city,country,email,username,password,picture,phone,proof):
        return Shelter(name,street,city,country,email,username,password,picture,phone,proof)
    def createObjDog(self,sid,dname,age,bid,image):
        return Dog(sid,dname,age,bid,image)
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



    # -----------------------------------------------Checker Functions-----------------------------------------------
    def actorExists(self,user,session):
        if self.isUsernameAvailable(user,session) and self.isEmailAvailable(user,session):
            return False
        return True

    def checkDogInList(self,list,session):
        results=session.query(List).filter(and_(List.lid==list.lid,List.did==list.did,List.uid==list.uid)).one_or_none()
        if (results==None):
            return False
        return True

    def actorExistsByID(self,type,id,session):
        results=None
        if type=='user':
            results=session.query(User).filter(User.uid==id).one_or_none()
        elif type=='shelter':
            results=session.query(Shelter).filter(Shelter.sid==id).one_or_none()
        elif type=='admin':
            results=session.query(Admin).filter(Admin.aid==id).one_or_none()
        if (results == None):
            return False
        return True
    def dogExists(self,id,session):
        results=session.query(Dog).filter(Dog.did==id).one_or_none()
        if (results == None):
            return False
        return True
    def breedExists(self,id,session):
        results=session.query(Breed).filter(Breed.bid==id).one_or_none()
        if (results == None):
            return False
        return True
    def diseaseExists(self,id,session):
        results=session.query(Disease).filter(Disease.disid==id).one_or_none()
        if (results == None):
            return False
        return True
    def diseasedogExists(self,obj,session):
        results=session.query(Diseasedog).filter(and_(Diseasedog.disid==obj.disid,Diseasedog.did==obj.did)).one_or_none()
        if (results == None):
            return False
        return True
    def isEmailAvailable(self,user,session):
        results=session.query(Admin).filter(Admin.email==user.email).one_or_none()
        if results!=None:
            return False
        results = session.query(User).filter(User.email == user.email).one_or_none()
        if results!=None:
            return False
        results = session.query(Shelter).filter(Shelter.email == user.email).one_or_none()
        if results!=None:
            return False
        return True
    def isUsernameAvailable(self,user,session):
        results=session.query(Admin).filter(Admin.username==user.username).one_or_none()
        if results!=None:
            return False
        results = session.query(User).filter(User.username == user.username).one_or_none()
        if results!=None:
            return False
        results = session.query(Shelter).filter(Shelter.username == user.username).one_or_none()
        if results!=None:
            return False
        return True
    #---------------------------------------Adder function---------------------------------------
    def add(self,obj):
        flag,session=self.createSession()
        if flag==False:
            return flag,session
        if isinstance(obj,User) or isinstance(obj,Shelter) or isinstance(obj,Admin):
            if self.actorExists(obj,session):
                session.close()
                return False,'User Exists.'
        if isinstance(obj,List):
            if self.checkDogInList(obj,session):
                session.close()
                return False,'Dog exists.'
            if not self.actorExistsByID('user',obj.uid,session):
                session.close()
                return False,'User Doesn\'t exist.'
            if not self.dogExists(obj.did,session):
                session.close()
                return False, 'Dog Doesn\'t exist.'
        if isinstance(obj,Blog):
            if not self.actorExistsByID('admin',obj.aid,session):
                session.close()
                return False,'Admin Doesn\'t exist.'
        if isinstance(obj,Dog):
            if not self.actorExistsByID('shelter',obj.sid,session):
                session.close()
                return False,'Shelter Doesn\'t exist.'
            if not self.breedExists(obj.bid,session):
                session.close()
                return False,'Breed Doesn\'t exist.'
        if isinstance(obj,Diseasedog):
            if not self.dogExists(obj.did,session):
                session.close()
                return False, 'Dog Doesn\'t exist.'
            if not self.diseaseExists(obj.disid,session):
                session.close
                return False,'Disease Doesn\'t exist.'
            if self.diseasedogExists(obj,session):
                session.close()
                return False,'This Disease for this dog already exists'

        #if isinstance(obj,Breed):
            #return False,'Breed is not addable'
        #if isinstance(obj,Disease):
            #return False,'Disease is not addable'
        try:
            session.add(obj)
            session.commit()
            session.close()
            return True,obj
        except:
            session.rollback()
            session.close()
            return False,'Error with database'

# ---------------------------------------Updater function---------------------------------------
    def update(self,obj):
        flag,session=self.createSession()
        if flag==False:
            return flag,session
        results=None
        if isinstance(obj,Blog):
            results=session.query(Blog).filter(Blog.blid==obj.blid).one_or_none()
            if results==None:
                session.close()
                return False,'Blog Doesn\'t exist'
            if not self.actorExistsByID('admin',obj.aid,session):
                return False,'Admin Doesn\'t exist'
        elif isinstance(obj,Breed):
            results=session.query(Breed).filter(Breed.bid == obj.bid).one_or_none()
            if results==None:
                session.close()
                return False,'Breed Does\'t exist'
        elif isinstance(obj,Disease):
            results=session.query(Disease).filter(Disease.disid == obj.disid).one_or_none()
            if results==None:
                session.close()
                return False,'Disease Does\'t exist'
        elif isinstance(obj,Diseasedog):
            results=session.query(Diseasedog).filter(and_(Diseasedog.did==obj.did,Diseasedog.disid==obj.disid)).one_or_none()
            if results==None:
                session.close()
                return False,'This disease for this dog doesn\'t exist'
        elif isinstance(obj,Dog):
            results=session.query(Dog).filter(and_(Dog.did==obj.did,Dog.sid==obj.sid)).one_or_none()
            if results==None:
                return False,'Dog not found'
        elif isinstance(obj,User):
            results=session.query(User).filter(User.uid==obj.uid).one_or_none()
            if results==None:
                return False,'User not found'
            if obj.email!=results.email:
                if not self.isEmailAvailable(obj,session):
                    return False,'Choose a unique email'
            if obj.username!=results.username:
                if not self.isUsernameAvailable(obj,session):
                    return False,'Choose a unique username'
        elif isinstance(obj,Shelter):
            results=session.query(Shelter).filter(Shelter.sid==obj.sid).one_or_none()
            if results==None:
                return False,'Shelter not found'
            if obj.email != results.email:
                if not self.isEmailAvailable(obj, session):
                    return False, 'Choose a unique email'
            if obj.username != results.username:
                if not self.isUsernameAvailable(obj, session):
                    return False, 'Choose a unique username'
        elif isinstance(obj,Admin):
            results=session.query(Admin).filter(Admin.aid==obj.aid).one_or_none()
            if results==None:
                return False,'Admin not found'
            if obj.email!=results.email:
                if not self.isEmailAvailable(obj,session):
                    return False,'Choose a unique email'
            if not obj.username!=results.username:
                if self.isUsernameAvailable(obj,session):
                    return False,'Choose a unique username'
        else:
            return False,'Are you sure you can update this?'
        try:
            results.update(obj)
            session.commit()
            session.close()
            return True,obj
        except:
            session.rollback()
            session.close()
            return False,'Error changing'


#---------------------------------------Getter functions---------------------------------------

    def signIn(self,username,password):
        flag,results=self.getUser(username=username,password=password)
        if flag==True:
            return True, results

        flag,results=self.getShelter(username=username,password=password)
        if flag==True:
            return True, results
        flag,results=self.getAdmin(username=username,password=password)
        if flag==True:
            return True, results
        return False,'User doesn\'t exist'

    def getUser(self,id=None,username=None,email=None,password=None):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if username!=None and password!=None:
            results = session.query(User).filter(and_(User.username == username,User.password==password)).one_or_none()
        elif email != None and password != None:
            results = session.query(User).filter(and_(User.email == email, User.password == password)).one_or_none()
        elif id!=None:
            results=session.query(User).filter(User.uid == id).one_or_none()
        elif username!=None:
            results=session.query(User).filter(User.username == username).one_or_none()
        elif email!=None:
            results=session.query(User).filter(User.email==email).one_or_none()
        session.close()
        if results==None:
            return False,'No User found'
        return True,results

    def getShelter(self,id=None,username=None,email=None,password=None):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if username!=None and password!=None:
            results = session.query(Shelter).filter(and_(Shelter.username == username,Shelter.password==password)).one_or_none()
        elif email != None and password != None:
            results = session.query(Shelter).filter(and_(Shelter.email == email, Shelter.password == password)).one_or_none()
        elif id!=None:
            results=session.query(Shelter).filter(Shelter.sid == id).one_or_none()
        elif username!=None:
            results=session.query(Shelter).filter(Shelter.username == username).one_or_none()
        elif email!=None:
            results=session.query(Shelter).filter(Shelter.email == email).one_or_none()
        session.close()
        if results==None:
            return False,'No User found'
        return True,results

    def getAdmin(self,id=None,username=None,email=None,password=None):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if username!=None and password!=None:
            results = session.query(Admin).filter(and_(Admin.username == username,Admin.password==password)).one_or_none()
        elif email != None and password != None:
            results = session.query(Admin).filter(and_(Admin.email == email, Admin.password == password)).one_or_none()
        elif id!=None:
            results=session.query(Admin).filter(Admin.uid == id).one_or_none()
        elif username!=None:
            results=session.query(Admin).filter(Admin.username == username).one_or_none()
        elif email!=None:
            results=session.query(Admin).filter(Admin.email==email).one_or_none()
        session.close()
        if results==None:
            return False,'No Admin found'
        return True,results

    def getDog(self,id=None,breed=None,age=None):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if id!=None:
            results = session.query(Dog).filter(Dog.did == id).one_or_none()
        if breed!=None:
            results = session.query(Dog).filter(Dog.did == id).all()
        if age!=None:
            results = session.query(Dog).filter(Dog.did == id).all()
        session.close()
        if results==None:
            return False,'Not found'
        return True,results

    def getDisease(self,id=None,all=False):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if id!=None:
            results = session.query(Disease).filter(Disease.disid == id).one_or_none()
        if all!=False:
            results = session.query(Disease).all()
        session.close()
        if results==None:
            return False,'Not found'
        return True,results

    def getBreed(self,id=None,all=False):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if id!=None:
            results = session.query(Breed).filter(Breed.bid == id).one_or_none()
        if all!=False:
            results = session.query(Breed).all()
        session.close()
        if results==None:
            return False,'Not found'
        return True,results

    def getDiseasesOfDog(self,did=None,dsid=None):
        flag,session=self.createSession()
        results=None
        if flag==False:
            return flag,session
        if did!=None and dsid!=None:
            results=session.query(Diseasedog).filter(and_(Diseasedog.disid == dsid,Diseasedog.did == did)).one_or_none()
        elif did!=None:
            results = session.query(Diseasedog).filter(Diseasedog.did == did).all()
        elif dsid!=None:
            results = session.query(Diseasedog).filter(Diseasedog.disid == dsid).all()
        session.close()
        if results==None:
            return False,'Not found'
        return True,results
    def getBlog(self,id=None,all=False,aid=None):
        flag,session=self.createSession()
        if flag==False:
            return flag,session
        results=None
        if id!=None:
            results = session.query(Blog).filter(Blog.blid == id).one_or_none()
        elif all!=False:
            results = session.query(Blog).all()
        elif aid!=None:
            results = session.query(Blog).filter(Blog.aid == aid).all()
        session.close()
        if results==None:
            return False,'Not found'
        return True,results
    def getList(self,uid=None,lid=None,did=None):
        flag,session=self.createSession()
        if flag==False:
            return flag,session
        results=None
        if uid!=None and lid!=None and did!=None:
            results = session.query(List).filter(and_(List.uid == uid,List.lid == lid,List.did == did)).one_or_none()
        if uid!=None:
            results = session.query(List).filter(List.uid == uid).all()
        elif lid!=None:
            results = session.query(List).filter(List.lid == lid).all()
        elif did!=None:
            results = session.query(List).filter(List.did == did).all()
        session.close()
        if results==None:
            return False,'Not found'
        return True,results


#------------------------------------------------------Delete object---------------------------------------------------------------
    def deleteWholeList(self,lid):
        flag, session = self.createSession()
        result=None
        if flag == False:
            return flag, session
        flag,result=self.getList(lid=lid)
        if flag==False:
            return False,'This list doesn\'t exist'
        try:
            session.delete(result)
            session.commit()
            session.close()
            return True,'List deleted successfully'
        except:
            session.rollback()
            session.close()
            return False,'List cannot be deleted'
    def delete(self,obj):
        flag, session = self.createSession()
        if flag == False:
            return flag, session
        if isinstance(obj,Admin):
            if not self.actorExistsByID('admin',obj.aid,session):
                return False,'This admin doesn\'t exist'
        elif isinstance(obj,User):
            if not self.actorExistsByID('user',obj.uid,session):
                return False,'This user doesn\'t exist'
        elif isinstance(obj,Shelter):
            if not self.actorExistsByID('shelter',obj.sid,session):
                return False,'This Shelter doesn\'t exist'
        elif isinstance(obj,Blog):
            flag,result=self.getBlog(id=obj.blid)
            if flag==False:
                return flag,'This blog is not in database'
        elif isinstance(obj,Breed):
            flag,result=self.getBreed(obj.bid)
            if flag == False:
                return flag, 'This Breed is not in database'
        elif isinstance(obj,Disease):
            flag,result=self.getDisease(obj.disid)
            if flag == False:
                return flag, 'This Disease is not in database'
        elif isinstance(obj,Dog):
            flag,result=self.getDog(obj.bid)
            if flag == False:
                return flag, 'This Dog is not in database'
        elif isinstance(obj,Diseasedog):
            flag,result=self.getDiseasesOfDog(obj.did,obj.disid)
            if flag==False:
                return flag,'This disease is not in database for this dog'
        elif isinstance(obj,List):
            flag,result=self.getList(obj.uid,obj.lid,obj.did)
            if flag==False:
                return flag,'This element in list doesn\'t exist'
        else:
            return False,'Input a right object'
        try:
            session.delete(obj)
            session.commit()
            session.close()
            return True,'Object Deleted successfully'
        except Exception as e:
            session.rollback()
            session.close()
            print(e)
            return False,'Unable to delete object'


#------------------------------------------------------Testing---------------------------------------------------------------
#db=DBHandler()
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

#flag,res=db.getBreed(id=2)
#print(flag)
#print(db.delete(res))