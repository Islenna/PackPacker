from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from config.database import Base
from models.relationships.packs_and_instruments import packs_and_instruments
from models.relationships.packs_and_procedures import packs_and_procedures


class Pack(Base):
    __tablename__ = "packs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    instruments = relationship("Instrument", secondary="packs_and_instruments", back_populates="packs")
    procedures = relationship("Procedure", secondary="packs_and_procedures", back_populates="packs")
