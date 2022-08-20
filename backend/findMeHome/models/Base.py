import io
from sqlalchemy import create_engine, MetaData
from sqlacodegen.codegen import CodeGenerator
from sqlalchemy.orm import sessionmaker
import sqlalchemy.orm


def generate_model(host, user, password, database, outfile=None):
    print("Generating model file . . .")
    engine = create_engine(f'mysql+pymysql://{user}:{password}@{host}/{database}')
    metadata = MetaData(bind=engine)
    metadata.reflect()
    outfile = io.open(outfile, 'w', encoding='utf-8')
    if not outfile:
        print("ERROR!!! while creating model file")
        exit(0)
    generator = CodeGenerator(metadata)
    generator.render(outfile)
    print("Successfully generated mode file as db.py")


if __name__ == '__main__':
    generate_model('localhost', 'root', '123', 'cms', 'db.py')
try:
    engine = sqlalchemy.create_engine("mysql+pymysql://root:123@localhost/cms", echo=False)
    Session = sqlalchemy.orm.sessionmaker(bind=engine)
    Base = sqlalchemy.orm.declarative_base()
except Exception as e:
    print(e)
    exit(0)
