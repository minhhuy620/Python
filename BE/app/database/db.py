# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "mysql+mysqldb://user:password@host/db_name" postgresql://user:password@postgresserver/db
DATABASE_URL = "postgresql://postgres:123456@127.0.0.1:5432/postgres"

db_engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=db_engine)

Base = declarative_base()
