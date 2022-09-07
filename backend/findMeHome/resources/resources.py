from backend.findMeHome.dl_model.DLModel import breedPredict, model
from backend.findMeHome.models.main import DBHandler
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from backend.findMeHome.models.dog import Dog
from flask_restful import Resource
from flask import request, Response, jsonify, make_response, session

db = DBHandler()

class signUpApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get("user") is not None:
            user = data["user"]
            # use db to create
            if data["user"].get("type") == "adopter":
                adp =User(user.get("fname"),user.get("lname"),user.get("city"),user.get("country"),user.get("email"),user.get("username"),
                          user.get("password"),user.get("picture"),user.get("phone"))
                status, msg = db.add(adp)
            elif data["user"].get("type") == "shelter":
                shelter = Shelter(None, user["street"], user["city"], user["country"], user["email"], user["username"],
                                  user["password"], None, None, None)
                status, msg = db.add(shelter)
            if data["user"].get("type") == "adopter" or data["user"].get("type") == "shelter":
                if status:
                    return make_response(jsonify(msg), 201)
                else:
                    return make_response(jsonify(msg), 412)

            else:
                return "Invalid User type", 412
        else:
            return "Invalid Data posted", 412

#Recieves username and password
#Returns Id of user if login was successfull
#Returns faiure code otherwise
class signInApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()

        #if there is no data for key user in json return failure
        if data.get("user") is None:
            return "Invalid Data posted", 412
        try:
            user = data["user"]
            if user.get("username") is None or user.get("password") is None:
                return "Couldn't login. Please try again", 412
            #call sign in function of db
            status, id = db.signIn(user.get("username"), user.get("password"))
            if status is True:
                session["userid"] = id
                return make_response(jsonify(id)), 200
            else:
                return "Couldn't login. Please try again", 412
        except:
            return "Couldn't login. Please try again", 412


#user.id
#dog.name
#dog.age
#dog.image
class dogApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get("user") is None or data.get("dog") is None:
            return "Invalid Data posted", 412
        if session.get(data.get("user").get("id")) is None:
            return "Shelter not logged in", 412

        #Create a dog object
        dog = Dog(data.get("user").get("id"), data.get("dog").get("name"), data.get("dog").get("age")
                  ,data.get("dog").get("dig"))
        #add dog to db
        status, message = db.add(dog)
        #if add operation failed
        if status is False:
            return make_response(jsonify(message), 412)
        #if add operation succecceded
        return make_response(jsonify(message), 200)
#

class ModelApi(Resource):
    @staticmethod
    def post():
        url = request.get_json()
        if url.get('dogURL') is None:
            return "Invalid Data posted", 412
        res = breedPredict(url['dogURL'], model)
        return make_response(jsonify(res), 200)
