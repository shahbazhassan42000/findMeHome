from backend.findMeHome.models.main import DBHandler
from backend.findMeHome.models.shelter import Shelter
from backend.findMeHome.models.user import User
from flask_restful import Resource
from flask import request, Response, jsonify, make_response
import tensorflow as tf

db = DBHandler()
from PIL import Image
import requests


def breedPredict(url, model):
    class_names = ['Chihuahua', 'Japanese spaniel', 'Maltese dog', 'Pekinese', 'Shih-tzu', 'Blenheim spaniel',
                   'Papillon', 'Toy terrier', 'Rhodesian ridgeback', 'Afghan hound', 'Basset', 'Beagle', 'Bloodhound',
                   'Bluetick', 'Black-and-tan coonhound', 'Walker hound', 'English foxhound', 'Redbone', 'Borzoi',
                   'Irish wolfhound', 'Italian greyhound', 'Whippet', 'Ibizan hound', 'Norwegian elkhound',
                   'Otterhound', 'Saluki', 'Scottish deerhound', 'Weimaraner', 'Staffordshire bullterrier',
                   'American staffordshire terrier', 'Bedlington terrier', 'Border terrier', 'Kerry blue terrier',
                   'Irish terrier', 'Norfolk terrier', 'Norwich terrier', 'Yorkshire terrier',
                   'Wire-haired fox terrier', 'Lakeland terrier', 'Sealyham terrier', 'Airedale', 'Cairn',
                   'Australian terrier', 'Dandie dinmont', 'Boston bull', 'Miniature schnauzer', 'Giant schnauzer',
                   'Standard schnauzer', 'Scotch terrier', 'Tibetan terrier', 'Silky terrier',
                   'Soft-coated wheaten terrier', 'West highland white terrier', 'Lhasa', 'Flat-coated retriever',
                   'Curly-coated retriever', 'Golden retriever', 'Labrador retriever', 'Chesapeake bay retriever',
                   'German short-haired pointer', 'Vizsla', 'English setter', 'Irish setter', 'Gordon setter',
                   'Brittany spaniel', 'Clumber', 'English springer', 'Welsh springer spaniel', 'Cocker spaniel',
                   'Sussex spaniel', 'Irish water spaniel', 'Kuvasz', 'Schipperke', 'Groenendael', 'Malinois', 'Briard',
                   'Kelpie', 'Komondor', 'Old english sheepdog', 'Shetland sheepdog', 'Collie', 'Border collie',
                   'Bouvier des flandres', 'Rottweiler', 'German shepherd', 'Doberman', 'Miniature pinscher',
                   'Greater swiss mountain dog', 'Bernese mountain dog', 'Appenzeller', 'Entlebucher', 'Boxer',
                   'Bull mastiff', 'Tibetan mastiff', 'French bulldog', 'Great dane', 'Saint bernard', 'Eskimo dog',
                   'Malamute', 'Siberian husky', 'Affenpinscher', 'Basenji', 'Pug', 'Leonberg', 'Newfoundland',
                   'Great pyrenees', 'Samoyed', 'Pomeranian', 'Chow', 'Keeshond', 'Brabancon griffon', 'Pembroke',
                   'Cardigan', 'Toy poodle', 'Miniature poodle', 'Standard poodle', 'Mexican hairless', 'Dingo',
                   'Dhole', 'African hunting dog']
    img = Image.open(requests.get(url, stream=True).raw)
    img = tf.image.resize(img, [360, 360])
    pred = model.predict(tf.expand_dims(img, axis=0))
    pred = tf.argmax(pred)
    class_name = class_names[pred]
    return pred


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
        data = request.get_json()
        print(data)
        return make_response(jsonify("successful"), 200)
