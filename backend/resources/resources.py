from os import getenv
from backend.dl_model.DLModel import breedPredict, model
from backend.models.main import DBHandler
from backend.models.shelter import Shelter
from backend.models.user import User
from backend.models.dog import Dog
from backend.models.diseasedog import Diseasedog
from flask_restful import Resource
from flask import request, jsonify, make_response
import random
import jwt
from geopy.distance import geodesic
import datetime
from opencage.geocoder import OpenCageGeocode
from dotenv import load_dotenv

# load environments variables
load_dotenv()
db = DBHandler()
DEFAULT_PIC = 'https://i.ibb.co/6skvT57/profile-pic.png'

# getting variables from environment
SECRET_KEY = getenv('SECRET_KEY')
opencagekey = getenv('OPEN_CAGE_KEY')


# COMPLETED
def convert_to_lat_long(location):
    geocoder = OpenCageGeocode(opencagekey)

    result = geocoder.geocode(location)
    lat = result[0]['geometry']['lat']
    lng = result[0]['geometry']['lng']
    return lat, lng


def find_distance(A, B):
    return geodesic(A, B).kilometers


def encode_auth_token(user_id, type):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'id': user_id,
            'type': type
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
        payload = jwt.decode(auth_token, SECRET_KEY, algorithms=["HS256"])
        return True, payload, -1
    except jwt.ExpiredSignatureError:
        return False, 'Signature expired. Please log in again.', 0
    except jwt.InvalidTokenError:
        return False, 'Invalid token. Please log in again.', 1


def user_access(token):
    if token is None:
        return False, make_response(jsonify("UnAuthorized"), 401)
    token = token.split()
    if token[0] != 'Bearer':
        return False, make_response(jsonify("UnAuthorized"), 401)
    token = token[1]
    status, auth, error = decode_auth_token(token)
    if not status:
        if error == 0:
            return False, make_response(jsonify(auth), 401)
        if error == 1:
            return False, make_response(jsonify(auth), 401)
    if auth['type'] != 'user':
        return False, make_response(jsonify("You're not allowed to access this page"), 403)
    return True, auth


def shelter_access(token):
    if token is None:
        return False, make_response(jsonify("UnAuthorized"), 401)
    token = token.split()
    if token[0] != 'Bearer':
        return False, make_response(jsonify("UnAuthorized"), 401)
    token = token[1]
    status, auth, error = decode_auth_token(token)
    if not status:
        if error == 0:
            return False, make_response(jsonify(auth), 401)
        if error == 1:
            return False, make_response(jsonify(auth), 401)
    if auth['type'] != 'shelter':
        return False, make_response(jsonify("You're not allowed to access this page"), 403)
    return True, auth


def common_access(token):
    if token is None:
        return False, make_response(jsonify("UnAuthorized"), 401)
    token = token.split()
    if token[0] != 'Bearer':
        return False, make_response(jsonify("UnAuthorized"), 401)
    token = token[1]
    status, auth, error = decode_auth_token(token)
    if not status:
        if error == 0:
            return False, make_response(jsonify(auth), 401)
        if error == 1:
            return False, make_response(jsonify(auth), 401)
    return True, auth


# Performs the sign-up operation for adopter, shelter or admin
# returns failure message if operation failed, and success message otherwise.
class SignUpApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get("user") is not None:
            user = data["user"]
            # use db to create
            loc = user.get('city') + ' ' + user.get('country')
            lat, long = convert_to_lat_long(loc)
            if user.get("picture") is None:
                user['picture'] = DEFAULT_PIC
            if data["user"].get("type") == "adopter":
                adp = User(user.get("fname"), user.get("lname"), user.get("city"), user.get("country"),
                           user.get("email"), user.get("username"),
                           user.get("password"), user.get("picture"), user.get("phone"), lat, long)
                status, msg = db.add(adp)
            elif data["user"].get("type") == "shelter":
                shelter = Shelter(user.get("name"), user.get("street"), user.get("city"), user.get("country"),
                                  user.get("email")
                                  , user.get("username"), user.get("password"), user.get("picture"),
                                  user.get("phone"), user.get("proof"), lat, long)
                status, msg = db.add(shelter)
            if data["user"].get("type") == "adopter" or data["user"].get("type") == "shelter":
                if status:
                    return make_response(jsonify("Sign up Successful"), 201)
                else:
                    return make_response(jsonify(msg), 409)
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
                token = ''
                if isinstance(user, User):
                    token = encode_auth_token(user.uid, 'user')
                elif isinstance(user, Shelter):
                    token = encode_auth_token(user.sid, 'shelter')
                tok = {}
                tok['token'] = token
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
        status, data = shelter_access(token)
        if not status:
            return data
        id = data['id']
        data = request.get_json()
        if data.get("dog") is None:
            return "Invalid Data posted 1", 412
        if data.get("dog").get("bid") is None:
            return "Invalid Data posted 2", 412
        try:
            # Create a dog object
            dog = Dog(id, data.get("dog").get("name"), data.get("dog").get("age")
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

    @staticmethod
    def get():
        token = request.headers.get('Authorization')
        status, data = common_access(token)
        if not status:
            return data
        id = data['id']
        try:
            flag, user = db.getUser(id=id)
            if not flag:
                return make_response(jsonify("Error loading user"), 502)
            flag, shelterData = db.getShelter(country=user.country)
            if not flag:
                return make_response(jsonify("Error loading shelters"), 502)
            distances = []
            userloc = (user.lat, user.lng)
            for x in shelterData:
                shelterloc = (x.lat, x.lng)
                distances.append(find_distance(userloc, shelterloc))
            shelterDistance = []
            for x, y in zip(shelterData, distances):
                shelterDistance.append((x, y))
            shelterDistance.sort(key=lambda x: x[1])
            dogsdata = []
            for x, y in shelterDistance:
                flag, res = db.getDog(sid=x.sid)
                if flag == False:
                    return make_response(jsonify("Error loading data"), 500)
                dogsdata.extend(res)
            return make_response(jsonify([x.jsonify() for x in dogsdata]), 200)
        except:
            return make_response(jsonify('Internal server error'), 500)

    @staticmethod
    def delete():
        token = request.headers.get('Authorization')
        status, data = shelter_access(token)
        if not status:
            return data
        id = data['id']
        data = request.get_json()
        if data.get('dog') is None:
            return make_response(jsonify('Wrong format 1'), 412)
        if data.get('dog').get('did') is None:
            return make_response(jsonify('Wrong format 2'), 412)
        did = data.get('dog').get('did')
        try:
            flag, dog = db.getDog(id=did)
            if flag == False:
                return make_response(jsonify('Error fetching dogs'), 502)
            flag, mess = db.delete(dog)
            if flag == False:
                return make_response(jsonify('Error deleting dogs'), 502)
            return make_response(jsonify(mess), 200)
        except:
            return make_response(jsonify("Error deleting dog"), 500)

    @staticmethod
    def put():
        token = request.headers.get('Authorization')
        status, data = shelter_access(token)
        if not status:
            return data
        id = data['id']
        data = request.get_json()
        if data.get('dog') is None:
            return make_response(jsonify('Wrong format 1'), 412)
        data = data.get('dog')
        if data.get('did') is None or data.get('sid') is None or data.get('dname') is None or data.get(
                'age') is None or data.get('bid') is None \
                or data.get('imageURL') is None:
            return make_response(jsonify('Wrong format 2'), 412)
        try:
            flag, obj = db.getDog(id=data.get('did'))
            if not flag:
                return make_response(jsonify('Error fetching dog'), 502)
            obj.dname = data.get('dname')
            obj.age = data.get('age')
            obj.imageURL = data.get('imageURL')
            obj.bid = data.get('bid')
            flag, mess = db.update(obj)
            if not flag:
                return make_response(jsonify('Error updating dog'), 502)
            return make_response(jsonify('Successful'), 200)
        except:
            return make_response(jsonify('Error'), 500)


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

    @staticmethod
    def post():
        token = request.headers.get('Authorization')
        status, data = user_access(token)
        if not status:
            return data

        rec = request.get_json()
        if rec.get('dog') is None:
            return make_response(jsonify('Wrong format 1'), 412)
        if rec.get('dog').get('did') is None:
            return make_response(jsonify('Wrong format 1'), 412)
        try:
            flag, diseases = db.getDiseasesOfDog(did=rec.get('dog').get('did'))
            if not flag:
                return make_response(jsonify('Unable to fetch data'), 502)
            return make_response(jsonify([x.jsonify() for x in diseases]))
        except:
            return make_response(jsonify('Error with server'), 500)


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
        status, data = common_access(token)
        if not status:
            return data
        id = data['id']
        try:
            flag, userData = db.getUser(id=id)
            if flag is True:
                return make_response(userData.jsonify(), 200)
            flag, userData = db.getShelter(id=id)
            if flag is True:
                return make_response(userData.jsonify(), 200)
            return make_response(jsonify('User not found'), 412)
        except:
            return make_response(jsonify('Error in database'), 512)

    @staticmethod
    def put():
        token = request.headers.get('Authorization')
        status, data = common_access(token)
        if status == False:
            return data
        updateddata = request.get_json()
        if updateddata.get('user') is None:
            return make_response(jsonify('Wrong Format'), 412)
        if updateddata.get('user').get('street') is None or updateddata.get('user').get('city') is None \
                or updateddata.get('user').get('country') is None or updateddata.get('user').get(
            'email') is None or updateddata.get('user').get('username') is None \
                or updateddata.get('user').get('phone') is None:
            return make_response(jsonify('Wrong format 2'), 412)
        try:
            loc = updateddata.get('user').get('city') + ' ' + updateddata.get('user').get('country')
            lat, long = convert_to_lat_long(loc)
            if data['type'] == 'shelter':
                flag, shelter = db.getShelter(id=data['id'])
                if flag == False:
                    return make_response(jsonify('Error fetching shelter'), 502)
                shelter.name = updateddata.get('user').get('name')
                shelter.street = updateddata.get('user').get('street')
                shelter.city = updateddata.get('user').get('city')
                shelter.country = updateddata.get('user').get('country')
                shelter.phone = updateddata.get('user').get('phone')
                shelter.lat = lat
                shelter.lng = long
                if updateddata.get('user').get('picture') is None:
                    shelter.picture = DEFAULT_PIC
                else:
                    shelter.picture = updateddata.get('user').get('picture')
                flag, mess = db.update(shelter)
                if flag == False:
                    return make_response(jsonify('Error updating shelter'), 502)
                return make_response(jsonify('Successful'), 200)
            if data['type'] == 'user':
                flag, user = db.getUser(id=data['id'])
                if flag == False:
                    return make_response(jsonify('Error fetching user'), 502)
                user.fname = updateddata.get('user').get('fname')
                user.lname = updateddata.get('user').get('lname')
                user.city = updateddata.get('user').get('city')
                user.country = updateddata.get('user').get('country')
                user.phone = updateddata.get('user').get('phone')
                user.lat = lat
                user.lng = long
                if updateddata.get('user').get('picture') is None:
                    user.picture = DEFAULT_PIC
                else:
                    user.picture = updateddata.get('user').get('picture')
                flag, mess = db.update(user)
                if flag == False:
                    return make_response(jsonify('Error updating user'), 502)
                return make_response(jsonify('Successful'), 200)
        except:
            return make_response(jsonify('Error with server'), 500)


# recieves shelter id enclosed in user object
# user.id
# returns dogs of a specific shelter
class ShelterDogsApi(Resource):
    @staticmethod
    def post():
        token = request.headers.get('Authorization')
        status, data = shelter_access(token)
        if not status:
            return data
        id = data['id']
        try:
            flag, dogData = db.getDog(sid=id)
            if not flag:
                return make_response(jsonify("Error loading dogs"), 502)
            return make_response(jsonify([dog.jsonify() for dog in dogData]), 200)
        except:
            return make_response(jsonify("Error loading dogs"), 500)


# takes nothing
# returns json dogs
class FeaturedDogsApi(Resource):
    @staticmethod
    def post():
        try:
            dogs = []
            flag, dogData = db.getDog(all=True)
            if not flag:
                return make_response(jsonify("Error loading dogs"), 502)
            if len(dogData) > 0:
                randInts = [random.randint(0, len(dogData) - 1) for x in range(0, 16)]
                for x in randInts:
                    dogs.append(dogData[x])
            return make_response(jsonify([dog.jsonify() for dog in dogs]), 200)

        except:
            return make_response(jsonify("Error loading dogs 1"), 500)


# takes authorization
# takes breed-id or age or both breed id and age
# returns filtered data
class getDogsFilteredAPI(Resource):
    @staticmethod
    def post():
        token = request.headers.get('Authorization')
        status, data = user_access(token)
        if not status:
            return data
        id = data['id']
        data = request.get_json()
        try:
            if data.get("breed") is not None and data.get("age") is not None:
                status, data = db.getDog(breed=data.get('breed'), age=data.get('age'))
                if not status:
                    return make_response(jsonify("Database error"), 502)
                return make_response(jsonify([x.jsonify() for x in data]), 200)
            elif data.get('breed') is not None:
                status, data = db.getDog(breed=data.get('breed'))
                if not status:
                    return make_response(jsonify("Database error"), 502)
                return make_response(jsonify([x.jsonify() for x in data]), 200)
            elif data.get('age') is not None:
                status, data = db.getDog(age=data.get('age'))
                if not status:
                    return make_response(jsonify("Database error"), 502)
                return make_response(jsonify([x.jsonify() for x in data]), 200)
            else:
                return make_response(jsonify('Invalid data posted'), 412)
        except:
            return make_response(jsonify("Error loading dogs"), 500)


class ShelterPage(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get('sid') is None:
            return make_response(jsonify("Please provide shelter id"), 412)
        flag, data = db.getShelter(id=data.get('sid'))
        if not flag:
            return make_response(jsonify("Shelter with given id not found"), 412)
        return make_response((jsonify(data.jsonify())), 200)

##------------------------------------------------------------------------------------------
# class DogByLocAPI(Resource):
#     @staticmethod
#     def post():
#         data=request.get_json()
#         if data.get('user') is None or data.get('breed') is None:
#             return make_response(jsonify('Wrong format 1'), 412)
#         if data.get('user').get('country') is None or data.get('user').get('city') is None or data.get('breed').get('id') is None:
#             return make_response(jsonify('Wrong format 2'), 412)
#         try:
#             flag,shelterData=db.getShelter(country=data.get('user').get('country'),breed=data.get('breed').get('id'))
#             if flag is False:
#                 return make_response(jsonify("Error loading dog of breed"), 502)
#             distances=[]
#             userloc=data.get('user').get('city') + ' ' + data.get('user').get('country')
#             for x in shelterData:
#                 shelterloc=x.city+' '+x.country
#                 distances.append(find_distance(userloc,shelterloc))
#             shelterDistance=[]
#             for x,y in zip(shelterData,distances):
#                 shelterDistance.append((x,y))
#             shelterDistance.sort(key=lambda x:x[1])
#             dogsdata=[]
#             for x,y in shelterDistance:
#                 flag,res=db.getDog(sid=x.sid,breed=data.get('breed').get('id'))
#                 if flag==False:
#                     return make_response(jsonify("Error loading data"), 500)
#                 dogsdata.extend(res)
#             return make_response(jsonify([x.jsonify() for x in dogsdata]),200)
#         except:
#             return make_response(jsonify("Error loading Shelter 1"), 500)
