import random

from cms.models.Base import engine, Session
from cms.models.db import *


class DBMS:
    def __init__(self):
        try:
            print("Creating Connection to database. . .")
            Base.metadata.create_all(engine)
        except Exception as e:
            print(e)
            print("ERROR! while creating db connection")
            exit(0)

    @staticmethod
    def search_user(username):
        session = Session()
        res = None
        try:
            res = session.query(Credential).filter(Credential.username == username).one()
        except Exception as e:
            print(e)
        finally:
            session.close()
        return res

    @staticmethod
    def get_all_students():
        session = Session()
        res = None
        try:
            res = session.query(Student.id, Student.name, Student.email, Student.enrolled_classes, Credential.username,
                                Credential.status).filter(Student.id == Credential.id).all()
        except Exception as e:
            print(e)
        finally:
            session.close()
        return res

    @staticmethod
    def get_all_teachers():
        session = Session()
        res = None
        try:
            res = session.query(Teacher.id, Teacher.name, Teacher.email, Teacher.assigned_classes, Credential.username,
                                Credential.status).filter(Teacher.id == Credential.id).all()
        except Exception as e:
            print(e)
        finally:
            session.close()
        return res

    @staticmethod
    def is_email_avail(email, user_type):
        session = Session()
        if user_type == "student":
            user_type = Student
        else:
            user_type = Teacher
        res = None
        try:
            res = session.query(user_type).filter(user_type.email == email).one()
            return False
        except Exception as e:
            print("ERROR!!!", e)
            return True
        finally:
            session.close()

    @staticmethod
    def is_username_avail(username, user_type):
        session = Session()
        res = None
        try:
            res = session.query(Credential).filter(
                Credential.username == username and Credential.type == user_type).one()
            return False
        except Exception as e:
            print("ERROR!!!", e)
            return True
        finally:
            session.close()

    """ [email, username, password, name, user_type] """

    @staticmethod
    def add_user(data):
        session = Session()
        if data[4] == "student":
            user_obj = Student(data[1], data[2], data[4], data[3], data[0])
        else:
            user_obj = Teacher(data[1], data[2], data[4], data[3], data[0])
        try:
            session.add(user_obj)
            session.commit()
            return True
        except Exception as e:
            print(e)
            return False
        finally:
            session.close()

    @staticmethod
    def get_teacher(user_id):
        session = Session()
        try:
            res = session.query(Teacher).filter(Teacher.id == user_id).one()
            return res
        except Exception as e:
            print("Exception in get_teacher", str(e))
            return None
        finally:
            session.close()

    def create_classroom(self, room):
        session = Session()
        try:
            ''' Finding unique id for class'''
            class_id = ""
            while True:
                class_id = ""
                for i in range(0, 5):
                    class_id += chr(random.randrange(98, 122, 2))
                if self.get_class(class_id) is None:
                    break
            room.set_id(class_id)
            res = session.add(room)
            room.display()
            ''' Incrementing Teacher assigned classes'''
            if self.increment_assigned_classes(room.teacher_id):
                session.commit()
                return class_id
            else:
                return None
        except Exception as e:
            print("Exception in create_classroom", str(e))
            return None
        finally:
            session.close()

    @staticmethod
    def get_class(class_id):
        session = Session()
        try:
            res = session.query(Classroom).filter(Classroom.class_id == class_id).one()
            return res
        except Exception as e:
            print("Exception in get_class", str(e))
            return None
        finally:
            session.close()

    def increment_assigned_classes(self, teacher_id):
        session = Session()
        try:
            res = self.get_teacher(teacher_id)
            if res is not None:
                res.assigned_classes = res.assigned_classes + 1
                session.commit()
                return True
        except Exception as e:
            print("Exception in increment_assigned_classes", str(e))
            return False
        finally:
            session.close()

    def decrement_assigned_classes(self, teacher_id):
        session = Session()
        try:
            res = self.get_teacher(teacher_id)
            if res is not None:
                res.assigned_classes = res.assigned_classes - 1
                session.commit()
                return True
        except Exception as e:
            print("Exception in increment_assigned_classes", str(e))
            return False
        finally:
            session.close()
