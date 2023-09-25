# Initialize database and database connection

import os
from sqlalchemy import create_engine, text, exc
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker
Base = declarative_base()


def create_database_if_not_exists(engine, db_name) -> None:
    """
    Create a new database in MySQL if it doesn't already exist.
    """
    connection = engine.connect()
    try:
        connection.execute(text(f"CREATE DATABASE IF NOT EXISTS {db_name}"))
        print(f"Ensured that database {db_name} exists")
    except exc.ProgrammingError as e:  # Catch the exception for database already exists
        print(f"Error occurred: {str(e)}")
    finally:
        connection.close()


# Environment variables for database connection
DB_USER: str = os.getenv("DB_USER", "root")
DB_PASSWORD: str = os.getenv("DB_PASSWORD", "root")
DB_HOST: str = os.getenv("DB_HOST", "localhost")
DB_NAME: str = "PackPacker"

# Connect to MySQL server without specifying a database
root_engine = create_engine(f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}")

# Create database if not exists
create_database_if_not_exists(root_engine, DB_NAME)

# Now specify the database to use
DATABASE_URL: str = (
    f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
