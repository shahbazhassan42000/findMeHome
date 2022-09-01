from flask_restful import Resource
from flask import request, Response, jsonify


class AdapterApi(Resource):
    def post(self):
        data = request.get_json()
        print("POST")
        print(data)


