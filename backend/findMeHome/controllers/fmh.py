from cms import app
from flask import render_template, request, make_response
from cms.controllers.handler import DB_Handler

db_handler = DB_Handler()


@app.route('/')
def index():
    return render_template("client/index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    res = db_handler.validate_login()
    if res[0]:
        if res[1].type == "teacher":
            resp = make_response(render_template("client/teacher_dashboard.html", username=res[1].username))
            print(res[1].id)
            resp.set_cookie("id", str(res[1].id))
            resp.set_cookie("username", res[1].username)
            resp.set_cookie("password", res[1].password)
            resp.set_cookie("type", res[1].type)
            return resp
    else:
        return render_template("client/index.html", msg=res[1])
    # if res[0] == 1:  # Admin
    #     return render_template("client/dashboard.html")
    # if res[0] == 2:  # Student
    #     return render_template("client/teacher_dashboard.html", msg=res[1])
    # if res[0] == 3:  # Teacher
    #     return render_template("client/teacher_dashboard.html", msg=res[1])
    # else:
    #     return render_template("client/index.html", msg=res[1])


@app.route("/signup")
def signup():
    return render_template("client/signup.html")


@app.route("/validatesignup", methods=["GET", "POST"])
def validate_signup():
    res = db_handler.validate_signup()
    # input(res)
    if res[0]:
        return render_template("client/index.html", msg=res[1])
    else:
        return render_template("client/signup.html", msg=res[1])


@app.route("/showallusers")
def show_all_users():
    students = db_handler.get_all_students()
    teachers = db_handler.get_all_teachers()
    return render_template("client/showallusers.html", students=students, teachers=teachers)


@app.route("/logout")
def logout():
    resp = make_response(render_template("client/index.html"))
    resp.set_cookie("id", "", max_age=0)
    resp.set_cookie("username", "", max_age=0)
    resp.set_cookie("password", "", max_age=0)
    resp.set_cookie("type", "", max_age=0)
    return resp


@app.route("/showcreateclassroom")
def show_create_classroom():
    username = request.cookies.get("username")
    if username:
        print(username)
        return render_template("client/create_classroom.html")
    else:
        return render_template("client/index.html", msg="You need to sign in first")


@app.route("/createclassroom", methods=["POST", "GET"])
def create_classroom():
    username = request.cookies.get("username")
    if username:
        classname = request.form["className"]
        room_id = db_handler.create_classroom(classname, int(request.cookies.get("id")))
        if room_id:
            message = "Classroom is created with id: " + room_id
            return render_template("client/create_classroom.html", msg=message)
        else:
            return render_template("client/create_classroom.html", msg=room_id[1])
    else:
        return render_template("client/index.html", msg="You need to sign in first")
