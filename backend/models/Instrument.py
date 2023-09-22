from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship, Session
from config.database import Base
from models.relationships.instruments_and_procedures import instruments_and_procedures
from models.relationships.packs_and_instruments import packs_and_instruments

# Assume you have a function to check if an instrument name exists in the database
def instrument_name_exists_in_database(db: Session, name: str):
    existing_instrument = db.query(Instrument).filter_by(name=name).first()
    return existing_instrument is not None


class Instrument(Base):
    __tablename__ = "instruments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    description = Column(String(255))
    img_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    procedures = relationship("Procedure", secondary=instruments_and_procedures, back_populates="instruments")
    packs = relationship("Pack", secondary= packs_and_instruments, back_populates="instruments")
