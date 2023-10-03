from sqlalchemy import Table, Column, Integer, ForeignKey
from config.database import Base


class InstrumentsAndProcedures(Base):
    __tablename__ = "instruments_and_procedures"

    procedure_id = Column(Integer, ForeignKey("procedures.id"), primary_key=True)
    instrument_id = Column(Integer, ForeignKey("instruments.id"), primary_key=True)
    quantity = Column(Integer, default=1)
