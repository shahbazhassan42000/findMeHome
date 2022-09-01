__version__ = '0.1'

from flask import Flask, jsonify,request, render_template
from flask_restful import Api,Resource
from backend.findMeHome.models.main import DBHandler


app = Flask('cms')
app.config['SECRET_KEY'] = 'random'
app.debug = True

api=Api(app)

db_handler = DBHandler()

# db.initialize_db(app)
# routes.initialize_routes(api)

# from fineMeHome.controllers import *
from backend.findMeHome.controllers import *
