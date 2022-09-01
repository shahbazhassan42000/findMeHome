from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
#creating our engine
engine = create_engine("mysql+pymysql://root:@localhost/FMH",echo = False)
#remember that the engine needs to be passed to a Session object in order to be able to work with the ORM
Session = sessionmaker(bind=engine)
#the base class for defining our classes in order to produce the appropriate Tables
Base = declarative_base()
