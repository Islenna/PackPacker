from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from config.database import Base
from models.relationships.instruments_and_procedures import InstrumentsAndProcedures
from models.relationships.packs_and_procedures import PacksAndProcedures
from models.relationships.clinics_and_procedures import clinics_and_procedures

class Procedure(Base):
    __tablename__ = "procedures"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    description = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    instruments = relationship("Instrument", secondary=InstrumentsAndProcedures.__table__, back_populates="procedures")
    packs = relationship("Pack", secondary=PacksAndProcedures.__table__, back_populates="procedures")
    clinics = relationship("Clinic", secondary=clinics_and_procedures, back_populates="procedures")