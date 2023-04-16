import os

from flask_cors import CORS
from flask import Flask
from flask_restful import Api
from resources import routes

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Find Me Home!'


if __name__ == '__main__':
    app.debug = True
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    api = Api(app)
    routes.initialize_routes(api)
    PORT=os.getenv('PORT', 8080)
    app.run(port=PORT)
