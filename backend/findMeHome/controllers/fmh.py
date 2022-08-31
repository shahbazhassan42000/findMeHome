from backend.findMeHome import app
from flask import render_template, request, make_response
# from backend.findMeHome.controllers.handler import DB_Handler
from backend.findMeHome.models.main import DBHandler
db_handler = DBHandler()


