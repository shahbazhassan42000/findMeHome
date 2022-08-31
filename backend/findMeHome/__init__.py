__version__ = '0.1'

from flask import Flask

app = Flask('cms')
app.config['SECRET_KEY'] = 'random'
app.debug = True

# from fineMeHome.controllers import *
from backend.findMeHome.controllers import *