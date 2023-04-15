import os

import tensorflow as tf
from PIL import Image
import requests
import numpy as np

gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)
model = tf.keras.models.load_model("dl_model//fine_tuned.h5")


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
    img = np.array(Image.open(requests.get(url, stream=True).raw))
    print('model is analyzing dog image...')
    img = tf.image.resize(img, [360, 360])
    pred = model.predict(tf.expand_dims(img, axis=0), verbose=0)
    pred = tf.argmax(tf.squeeze(pred))
    class_name = class_names[pred]
    return class_name
