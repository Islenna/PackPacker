from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base
from models.relationships.users_and_clinics import users_and_clinics
from models.relationships.clinics_and_procedures import clinics_and_procedures
from models.relationships.packs_and_procedures import PacksAndProcedures
from models.relationships.packs_and_instruments import PacksAndInstruments
from models.relationships.instruments_and_procedures import InstrumentsAndProcedures

class Clinic(Base):
    __tablename__ = "clinics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    location = Column(String(255))
    phone = Column(String(255))
    email = Column(String(255))
    users = relationship("User", secondary=users_and_clinics, back_populates="clinics")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    instruments = relationship("Instrument", back_populates="clinic")
    packs = relationship("Pack", back_populates="clinic")
    procedures = relationship("Procedure", back_populates="clinic")
