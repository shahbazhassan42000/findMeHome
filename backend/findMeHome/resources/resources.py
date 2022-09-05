from backend.findMeHome.dl_model.DLModel import breedPredict, model
from backend.findMeHome.models.main import DBHandler
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from flask_restful import Resource
from flask import request, Response, jsonify, make_response

db = DBHandler()


class AdapterApi(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        if data.get("user") is not None:
            user = data["user"]
            # use db to create
            if data["user"]["type"] == "adopter":
                adp = User(None, None, None, None, user["email"], user["username"], user["password"], None, None)
                status, msg = db.add(adp)
            elif data["user"]["type"] == "shelter":
                shelter = Shelter(None, user["street"], user["city"], user["country"], user["email"], user["username"],
                                  user["password"], None, None, None)
                status, msg = db.add(shelter)
            if data["user"]["type"] == "adopter" or data["user"]["type"] == "shelter":
                if status:
                    return make_response(jsonify(msg), 201)
                else:
                    return make_response(jsonify(msg), 412)

            else:
                return "Invalid User type", 412
        else:
            return "Invalid Data posted", 412


class ModelApi(Resource):
    @staticmethod
    def post():
        url = request.get_json()
        if url.get('dogURL') is None:
            return "Invalid Data posted", 412
        res = breedPredict(url['dogURL'], model)
        return make_response(jsonify(res), 200)
