from sqlalchemy import Column, Integer, String, DateTime, func
from config.database import Base

class Procedure(Base):
    __tablename__ = "procedures"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    description = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # packs = relationship("Pack", secondary=packs_and_procedures, back_populates="procedures")
    # instruments = relationship("Instrument", secondary=instruments_and_procedures, back_populates="procedures")