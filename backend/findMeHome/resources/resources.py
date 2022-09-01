from backend.findMeHome.models.main import DBHandler
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from flask_restful import Resource
from flask import request, Response, jsonify

db = DBHandler()


class AdapterApi(Resource):
    def post(self):
        data = request.get_json()
        if data.get("user") is not None:
            user = data["user"]
            # use db to create
            if data["user"]["type"] == "adopter":
                adp = User(None, None, None, None, user["email"], user["username"], user["password"],None,None)
                status, msg = db.add(adp)
            elif data["user"]["type"] == "shelter":
                shelter = Shelter(None, user["street"], user["city"], user["country"], user["email"], user["username"],
                                  user["password"], None, None, None)
                status, msg = db.add(shelter)

            if data["user"]["type"] == "adopter" or data["user"]["type"] == "shelter":
                if status:
                    return jsonify(msg), 201
                else:
                    return jsonify(msg), 412

            else:
                return "Invalid User type", 412
        else:
            return "Invalid Data posted", 412
