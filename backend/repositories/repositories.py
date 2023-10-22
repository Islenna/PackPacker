from sqlalchemy.orm import Session
from models.Instrument import Instrument as InstrumentModel
from models.Pack import Pack as PackModel
from models.Procedure import Procedure as ProcedureModel

def query_database(session: Session, offset: int, limit: int):
    # Use the SQLAlchemy session to query the database
    return session.query(InstrumentModel).offset(offset).limit(limit).all()

def calculate_total_records(session: Session):
    # Calculate the total number of records in the database
    return session.query(InstrumentModel).count()

def query_pack_database(session: Session, offset: int, limit: int):
    # Use the SQLAlchemy session to query the database
    return session.query(PackModel).offset(offset).limit(limit).all()

def calculate_total_pack_records(session: Session):
    # Calculate the total number of records in the database
    return session.query(PackModel).count()

def query_procedure_database(session: Session, offset: int, limit: int):
    # Use the SQLAlchemy session to query the database
    return session.query(ProcedureModel).offset(offset).limit(limit).all()

def calculate_total_procedure_records(session: Session):
    # Calculate the total number of records in the database
    return session.query(ProcedureModel).count()

def query_database_with_search(session: Session, offset: int, limit: int, search: str):
    # Use the SQLAlchemy session to query the database
    return session.query(InstrumentModel).filter(InstrumentModel.name.like(f"%{search}%")).offset(offset).limit(limit).all()

def calculate_total_records_with_search(session: Session, search: str):
    # Calculate the total number of records in the database
    return session.query(InstrumentModel).filter(InstrumentModel.name.like(f"%{search}%")).count()
