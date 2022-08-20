import re
from datetime import datetime

import bcrypt

from cms.models.DBMS import DBMS
from flask import request

from cms.models.db import *


class DB_Handler:
    def __init__(self):
        self.dbms = DBMS()

    def validate_login(self):
        """ getting user data """
        if request.method == "POST":
            username = request.form["username"]
            password = request.form["password"]
        else:
            username = request.args.get("username")
            password = request.args.get("password")
        """ validating user data """
        user_obj = self.dbms.search_user(username)
        if user_obj is None:
            return False, "No user found against this username"

        """ if username found in db check for password """
        if not bcrypt.checkpw(password.encode('utf8'), user_obj.password.encode('utf8')):
            return False, "Wrong password"
        return True, user_obj
        # if user_obj.type == "admin":
        #     return 1, "Successfully logged in"
        # elif user_obj.type == "student":
        #     return 2, "Successfully logged in"
        # else:
        #     return 3, "Successfully logged in"

    def get_all_students(self):
        return self.dbms.get_all_students()

    def get_all_teachers(self):
        return self.dbms.get_all_teachers()

    def validate_signup(self):
        data = get_signup_data()
        if is_valid_gmail(data[0]):
            if self.dbms.is_email_avail(data[0], data[4]):
                if is_valid_username(data[1]):
                    if self.dbms.is_username_avail(data[1], data[4]):
                        if is_valid_password(data[2]):
                            data[2] = encrypt_password(data[2])
                            if is_name_valid_name(data[3]):
                                if self.dbms.add_user(data):
                                    return True, "Congratulations, your account has been successfully created"
                                else:
                                    return False, "ERROR!!! while creating your account"
                            else:
                                return False, "Invalid Name\nName should not contain digits"
                        else:
                            return False, "Invalid Password\nPassword must have 1 uppercase 1 lowercase 1 special " \
                                          "character and 1 digit"
                    else:
                        return False, "A {} account already exists against this username, please sign in or use " \
                                      "another username".format(data[4])
                else:
                    return False, "Invalid username\nUsername should be in lowercase and should not contain " \
                                  "any special character except hyphen and underscore"
            else:
                return False, "A {} account already exists against this email, please sign in or use another " \
                              "email".format(data[4])
        else:
            return False, "Invalid Email"

    def create_classroom(self, classname, teacher_id):
        print(teacher_id)
        user = Credential("", "", "teacher")
        user.set_id(teacher_id)
        user.display()
        teacher = self.dbms.get_teacher(user.id)
        if teacher is not None:
            if teacher.assigned_classes >= 5:
                return False, "You can't create more classes anymore\nYou are allowed to create max 5 classes at a time"
            date = datetime.now()
            room = Classroom(teacher.id, classname, 0, date)
            room_id = self.dbms.create_classroom(room)
            if room_id is not None:
                return True, room_id
            else:
                return False, "ERROR! While creating classroom"
        else:
            return False, "ERROR! While creating classroom"


def get_signup_data():
    if request.method == "POST":
        email = request.form["email"]
        username = request.form["username"]
        password = request.form["password"]
        name = request.form["name"]
        user_type = request.form["user_type"]
    else:
        email = request.args.get("email")
        username = request.args.get("username")
        password = request.args.get("password")
        name = request.args.get("name")
        user_type = request.args.get("user_type")
    return [email, username, password, name, user_type]


def is_valid_gmail(email):
    if re.fullmatch("^([a-zA-Z\d\._+]*[a-zA-Z]+[a-zA-Z\d\._+]*)@(yahoo|gmail|outlook)(\.com)$", email):
        return True
    return False


def is_valid_username(username):
    if re.fullmatch("^[a-z0-9-_]+$", username):
        return True
    return False


def is_valid_password(password):
    if re.fullmatch("^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$", password):
        return True
    return False


def encrypt_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())


def is_name_valid_name(name):
    if re.fullmatch("^[^\d]+$", name):
        return True
    return False
