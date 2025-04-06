from sqlalchemy import Column, Integer, ForeignKey
from config.database import Base

class PacksAndProcedures(Base):
    __tablename__ = "packs_and_procedures"

    pack_id = Column(Integer, ForeignKey("packs.id"), primary_key=True)
    procedure_id = Column(Integer, ForeignKey("procedures.id"), primary_key=True)
