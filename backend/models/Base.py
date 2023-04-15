import hashlib
from os import getenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# creating our engine
DB_NAME = getenv('DB_NAME')
DB_USER = getenv('DB_USER')
DB_PASSWORD = getenv('DB_PASSWORD')
DB_HOST = getenv('DB_HOST')
db_url=f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

engine = create_engine(db_url, echo=False)
# remember that the engine needs to be passed to a Session object in order to be able to work with the ORM
Session = sessionmaker(bind=engine)
# the base class for defining our classes in order to produce the appropriate Tables
Base = declarative_base()
SALT=b'$2b$12$3LgU2HvI1hencOzHMD0T4e'
MAX_LENGTH = getenv("MAX_LENGTH")
