__version__ = '0.1'

from flask import Flask

app = Flask('cms')
app.config['SECRET_KEY'] = 'random'
app.debug = True

from cms.controllers import *