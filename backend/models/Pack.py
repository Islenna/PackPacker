from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base
from models.relationships.packs_and_instruments import PacksAndInstruments
from models.relationships.packs_and_procedures import PacksAndProcedures


class Pack(Base):
    __tablename__ = "packs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    description = Column(String(255))
    img_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    clinic_id = Column(Integer, ForeignKey("clinics.id"))
    clinic = relationship("Clinic", back_populates="packs")
    instruments = relationship("Instrument", secondary=PacksAndInstruments.__table__, back_populates="packs")
    procedures = relationship("Procedure", secondary=PacksAndProcedures.__table__, back_populates="packs")
