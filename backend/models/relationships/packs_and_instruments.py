from sqlalchemy import Column, Integer, ForeignKey
from config.database import Base

class PacksAndInstruments(Base):
    __tablename__ = "packs_and_instruments"

    pack_id = Column(Integer, ForeignKey("packs.id"), primary_key=True)
    instrument_id = Column(Integer, ForeignKey("instruments.id"), primary_key=True)
    quantity = Column(Integer, default=1)
