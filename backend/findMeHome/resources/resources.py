from backend.findMeHome.dl_model.DLModel import breedPredict, model
from backend.findMeHome.models.main import DBHandler
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from backend.findMeHome.models.dog import Dog
from backend.findMeHome.models.diseasedog import Diseasedog
from flask_restful import Resource
from flask import request, Response, jsonify, make_response
import random
import datetime
import jwt
import datetime
db = DBHandler()
SECRET_KEY='11HIXGkg1Bm1Epw0Du20TV'


def encode_auth_token(user_id,type):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'id': user_id,
            'type':type
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e
def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, SECRET_KEY,algorithms=["HS256"])
        return True,payload,-1
    except jwt.ExpiredSignatureError:
        return False,'Signature expired. Please log in again.',0
    except jwt.InvalidTokenError:
        return False,'Invalid token. Please log in again.',1

def user_access(token):
    if token is None:
        return False,make_response(jsonify("UnAuthorized"), 401)
    token=token.split()
    if token[0]!='Bearer':
        return False, make_response(jsonify("UnAuthorized"), 401)
    token=token[1]
    status,auth,error = decode_auth_token(token)
    if status==False:
        if error==0:
            return False,make_response(jsonify(auth), 401)
        if error==1:
            return False,make_response(jsonify(auth),401)
    if auth['type'] != 'user':
        return False,make_response(jsonify("You're not allowed to access this page"), 403)
    return True,auth['id']

def shelter_access(token):
    if token is None:
        return False,make_response(jsonify("UnAuthorized"), 401)
    token=token.split()
    if token[0]!='Bearer':
        return False, make_response(jsonify("UnAuthorized"), 401)
    token=token[1]
    status,auth,error = decode_auth_token(token)
    if status==False:
        if error==0:
            return False,make_response(jsonify(auth), 401)
        if error==1:
            return False,make_response(jsonify(auth),401)
    if auth['type'] != 'shelter':
        return False,make_response(jsonify("You're not allowed to access this page"), 403)
    return True,auth['id']
def common_access(token):
    if token is None:
        return False,make_response(jsonify("UnAuthorized"), 401)
    token=token.split()
    if token[0]!='Bearer':
        return False, make_response(jsonify("UnAuthorized"), 401)
    token=token[1]
    status,auth,error = decode_auth_token(token)
    if status==False:
        if error==0:
            return False,make_response(jsonify(auth), 401)
        if error==1:
            return False,make_response(jsonify(auth),401)
    return True,auth['id']

# Performs the sign-up operation for adopter, shelter or admin
# returns failure message if operation failed, and success message otherwise.
class SignUpApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get("user") is not None:
            user = data["user"]
            # use db to create
            if user.get("picture") is None:
                user['picture']='https://i.ibb.co/s5nT3Mg/profile-img.png'
            if data["user"].get("type") == "adopter":
                adp = User(user.get("fname"), user.get("lname"), user.get("city"), user.get("country"),
                           user.get("email"), user.get("username"),
                           user.get("password"), user.get("picture"), user.get("phone"))
                status, msg = db.add(adp)
            elif data["user"].get("type") == "shelter":
                shelter = Shelter(user.get("name"), user.get("street"), user.get("city"), user.get("country"),
                                  user.get("email")
                                  , user.get("username"), user.get("password"), user.get("picture"),
                                  user.get("phone"), user.get("proof"))
                status, msg = db.add(shelter)
            if data["user"].get("type") == "adopter" or data["user"].get("type") == "shelter":
                if status:
                    return make_response(jsonify("Sign up Successful"), 201)
                else:
                    return make_response(jsonify(msg), 412)
            else:
                return "Invalid User type", 412
        else:
            return "Invalid Data posted", 412


# Receives username and password
# Returns ID of user if login was successful
# Returns failure code otherwise
class SignInApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        # if there is no data for key user in json return failure
        if data.get("user") is None:
            return "Invalid Data posted", 412
        try:
            user = data["user"]
            if user.get("username") is None or user.get("password") is None:
                return "Couldn't login. Please try again 1", 412
            # call sign in function of db
            status, user = db.signIn(username=user.get("username"), password=user.get("password"))
            if status is True:
                token=''
                if isinstance(user,User):
                    token=encode_auth_token(user.uid,'user')
                elif isinstance(user,Shelter):
                    token=encode_auth_token(user.sid,'shelter')
                tok={}
                tok['token']=token
                return make_response(jsonify(tok), 201)
            else:
                return "Couldn't login. Please try again 2", 412
        except:
            return "Couldn't login. Please try again 3", 412


# adds a dog to the data base
# Requires following arguments
# user.username
# dog.name
# dog.age
# dog.imageURL
# dog.bid
# dog.diseasesId
# dog.diseaseDescription (one description)

class DogApi(Resource):
    @staticmethod
    def post():
        token = request.headers.get('Authorization')
        status,id=shelter_access(token)
        if status==False:
            return id
        data = request.get_json()
        if data.get("user") is None or data.get("dog") is None:
            return "Invalid Data posted 1", 412
        if data.get("user").get("id") is None or data.get("user").get("username") is None:
            return "Invalid data", 412
        if data.get("dog").get("bid") is None:
            return "Invalid Data posted 2", 412
        try:
            # Create a dog object
            dog = Dog(data.get("user").get("id"), data.get("dog").get("name"), data.get("dog").get("age")
                      , data.get("dog").get("bid"), data.get("dog").get("imageURL"))
            # add dog to db
            status, result = db.add(dog)
            # if add operation failed
            if status is False:
                return make_response(jsonify(result), 412)
            # if add operation succeeded
            diseases = data.get('dog').get("diseasesId")
            if diseases is not None:
                for diseaseId in diseases:
                    dogDisease = Diseasedog(data.get("dog").get("diseaseDescription"), result.did,
                                            diseaseId)
                    db.add(dogDisease)

            return make_response(jsonify("Dog added Successfully"), 200)
        except:
            return "Couldn't add dog. Please try again", 412


# Returns list of all the breads in database.
# Requires no arguments
class BreedsApi(Resource):
    @staticmethod
    def get():
        try:
            status, breeds = db.getBreed(all=True)
            if status is True:
                return make_response(jsonify([b.jsonify() for b in breeds]), 200)
            return make_response(jsonify("Couldn't load breeds"), 502)
        except:
            return make_response(jsonify("Couldn't load breeds"), 500)


# Returns list of all the diseases in the database
# Requires no arguments
class DiseasesApi(Resource):
    @staticmethod
    def get():
        try:
            status, diseases = db.getDisease(all=True)
            if status is True:
                return make_response(jsonify([d.jsonify() for d in diseases]), 200)
            return make_response(jsonify("Couldn't load breeds"), 502)
        except:
            return make_response(jsonify("Couldn't load breeds"), 500)


class ModelApi(Resource):
    @staticmethod
    def post():
        url = request.get_json()
        if url.get('dogURL') is None:
            return "Invalid Data posted", 412
        res = breedPredict(url['dogURL'], model)
        return make_response(jsonify(res), 200)

class UsersApi(Resource):
    @staticmethod
    def post():
        token = request.headers.get('Authorization')
        status,res=common_access(token)
        if status==False:
            return res
        data=request.get_json()
        if data.get('user') is None:
            return make_response(jsonify('Wrong format'),412)
        if data.get('user').get('username') is None:
            return make_response(jsonify('Wrong format'),412)
        try:
            flag, userData = db.getUser(username=data.get('user').get('username'))
            if flag is True:
                return make_response(userData.jsonify(), 200)
            flag, userData = db.getShelter(username=data.get('user').get('username'))
            if flag is True:
                return make_response(userData.jsonify(), 200)
            return make_response(jsonify('User not found'), 412)
        except:
            return make_response(jsonify('Error in database'), 512)

# recieves shelter id enclosed in user object
#user.id
#returns dogs of a specific shelter
class ShelterDogsApi(Resource):
    @staticmethod
    def post():
        token = request.headers.get('Authorization')
        status,id=shelter_access(token)
        if status==False:
            return id
        data=request.get_json()
        if data.get('user') is None:
            return make_response(jsonify('Wrong format 1'), 412)
        if data.get('user').get('id') is None or data.get('user').get('username') is None:
            return make_response(jsonify('Wrong format 2'), 412)
        try:
            flag,dogData=db.getDog(sid=data.get('user').get('id'))
            if flag==False:
                return make_response(jsonify("Error loading dogs"), 502)
            return make_response(jsonify([dog.jsonify() for dog in dogData]), 200)
        except:
            return make_response(jsonify("Error loading dogs"), 500)

#takes nothing
#returns json dogs
class FeaturedDogsApi(Resource):
    @staticmethod
    def post():
        try:
            dogs=[]
            flag, dogData = db.getDog(all=True)
            if flag == False:
                return make_response(jsonify("Error loading dogs"), 502)
            randInts = [random.randint(0, len(dogData)-1) for x in range(0, 16)]
            for x in randInts:
                dogs.append(dogData[x])
            return make_response(jsonify([dog.jsonify() for dog in dogs]),200)

        except:
            return make_response(jsonify("Error loading dogs 1"), 500)