# coding: utf-8
from sqlalchemy import Column, Date, ForeignKey, String, Table, text
from sqlalchemy.dialects.mysql import INTEGER, TINYINT
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Credential(Base):
    __tablename__ = 'credentials'

    id = Column(INTEGER(11), primary_key=True)
    username = Column(String(50), nullable=False)
    password = Column(String(65), nullable=False)
    type = Column(String(7), nullable=False)
    status = Column(String(8), server_default=text("'allowed'"))

    def __init__(self, u_name, pwd, u_type):
        self.username = u_name
        self.password = pwd
        self.type = u_type

    def set_id(self, user_id):
        self.id = user_id

    def display(self):  # display in tabular form
        print("-" * 71 + " YOUR PROFILE INFO " + "-" * 71 + "\n")
        print("%63s" % "" + "%-8s" % "ID" + "%10s" % ":" + "%9s" % "" + str(self.id))
        print("%63s" % "" + "%-8s" % "Username" + "%10s" % ":" + "%9s" % "" + self.username)
        print("\n" + "-" * 162)


class Student(Credential):
    __tablename__ = 'student'

    id = Column(ForeignKey('credentials.id'), primary_key=True)
    name = Column(String(30), nullable=False)
    email = Column(String(50), nullable=False)
    enrolled_classes = Column(TINYINT(4), nullable=False, server_default=text("0"))

    def __init__(self, u_name, pwd, u_type, stud_name, stud_email):
        super().__init__(u_name, pwd, u_type)
        self.name = stud_name
        self.email = stud_email

    def display(self):
        print(self.id, self.username, self.password, self.type, self.status, self.name, self.email,
              self.enrolled_classes)


class Teacher(Credential):
    __tablename__ = 'teacher'

    id = Column(ForeignKey('credentials.id'), primary_key=True)
    name = Column(String(30), nullable=False)
    email = Column(String(50), nullable=False)
    assigned_classes = Column(TINYINT(4), nullable=False, server_default=text("0"))

    def __init__(self, u_name, pwd, u_type, teacher_name, teacher_email):
        super().__init__(u_name, pwd, u_type)
        self.name = teacher_name
        self.email = teacher_email

    def set_id(self, teacher_id):
        self.id = teacher_id

    def display(self):
        print(self.id, self.username, self.password, self.type, self.status, self.name, self.email,
              self.assigned_classes)


class Inbox(Base):
    __tablename__ = 'inbox'

    message_id = Column(INTEGER(11), primary_key=True)
    sender = Column(ForeignKey('credentials.id'), nullable=False, index=True)
    receiver = Column(ForeignKey('credentials.id'), nullable=False, index=True)
    subject = Column(String(80), nullable=False)
    content = Column(String(2500), nullable=False)

    credential = relationship('Credential', primaryjoin='Inbox.receiver == Credential.id')
    credential1 = relationship('Credential', primaryjoin='Inbox.sender == Credential.id')


class Classroom(Base):
    __tablename__ = 'classroom'

    class_id = Column(String(5), primary_key=True, autoincrement=True)
    teacher_id = Column(ForeignKey('teacher.id'), nullable=False, index=True)
    class_name = Column(String(30), nullable=False)
    enrolled_students = Column(INTEGER(11), nullable=False, server_default=text("0"))
    date = Column(Date, nullable=False)

    teacher = relationship('Teacher')
    studs = relationship('Student', secondary='disallowed')

    def __init__(self, teacher_id, class_name, enrolled_students, date):
        self.teacher_id = teacher_id
        self.class_name = class_name
        self.enrolled_students = enrolled_students
        self.date = date

    def display(self):
        print(self.class_id, self.teacher_id, self.class_name, self.enrolled_students, self.date)

    def set_id(self, classroom_id):
        self.class_id = classroom_id


class DeletedClassroom(Base):
    __tablename__ = 'deleted_classroom'

    class_id = Column(String(5), primary_key=True)
    teacher_id = Column(ForeignKey('teacher.id'), nullable=False, index=True)
    class_name = Column(String(30), nullable=False)
    enrolled_students = Column(TINYINT(4), nullable=False, server_default=text("0"))
    date = Column(Date, nullable=False)

    teacher = relationship('Teacher')


t_disallowed = Table(
    'disallowed', metadata,
    Column('stud_id', ForeignKey('student.id'), primary_key=True, nullable=False),
    Column('class_id', ForeignKey('classroom.class_id', ondelete='CASCADE'), primary_key=True, nullable=False,
           index=True)
)


class Enroll(Base):
    __tablename__ = 'enroll'

    stud_id = Column(ForeignKey('student.id'), primary_key=True, nullable=False)
    class_id = Column(ForeignKey('classroom.class_id', ondelete='CASCADE'), primary_key=True, nullable=False,
                      index=True)
    assignment = Column(TINYINT(4), server_default=text("0"))
    quiz = Column(TINYINT(4), server_default=text("0"))
    project = Column(TINYINT(4), server_default=text("0"))

    _class = relationship('Classroom')
    stud = relationship('Student')


class Post(Base):
    __tablename__ = 'post'

    post_id = Column(INTEGER(11), primary_key=True, nullable=False)
    teacher_id = Column(ForeignKey('classroom.teacher_id', ondelete='CASCADE'), nullable=False, index=True)
    class_id = Column(ForeignKey('classroom.class_id', ondelete='CASCADE'), primary_key=True, nullable=False,
                      index=True)
    title = Column(String(80), nullable=False)
    content = Column(String(2500), nullable=False)

    _class = relationship('Classroom', primaryjoin='Post.class_id == Classroom.class_id')
    teacher = relationship('Classroom', primaryjoin='Post.teacher_id == Classroom.teacher_id')
