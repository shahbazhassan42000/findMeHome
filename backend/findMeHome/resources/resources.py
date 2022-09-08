from backend.findMeHome.dl_model.DLModel import breedPredict, model
from backend.findMeHome.models.main import DBHandler
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from backend.findMeHome.models.dog import Dog
from backend.findMeHome.models.diseasedog import Diseasedog
from flask_restful import Resource
from flask import request, Response, jsonify, make_response, session

db = DBHandler()


# Performs the sign-up operation for adopter, shelter or admin
# returns failure message if operation failed, and success message otherwise.
class SignUpApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get("user") is not None:
            user = data["user"]
            # use db to create
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
            status, user = db.signIn(user.get("username"), user.get("password"))
            if status is True:
                session["userName"] = user.username
                return make_response(jsonify(user.username), 201)
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
        data = request.get_json()
        if data.get("user") is None or data.get("dog") is None:
            return "Invalid Data posted", 412
        if session.get(data.get("user").get("username")) is None:
            return "Shelter not logged in", 412

        try:
            # Create a dog object
            dog = Dog(data.get("user").get("id"), data.get("dog").get("name"), data.get("dog").get("age")
                      , data.get("dog").get("bid"), data.get("dog").get("imgURL"))

            # add dog to db
            status, result = db.add(dog)
            # if add operation failed
            if status is False:
                return make_response(jsonify(result), 412)
            # if add operation succeeded
            diseases = data.get("diseases")
            if diseases is not None:
                for diseaseId in diseases:
                    dogDisease = Diseasedog(data.get("dog").get("dieseaseDescription"), result.did,
                                            diseaseId)

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

