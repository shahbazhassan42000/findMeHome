__version__ = '0.1'

from flask_cors import CORS
from flask import Flask
from flask_restful import Api
from backend.resources import routes

app = Flask('fmh')
app.debug = True
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

routes.initialize_routes(api)
