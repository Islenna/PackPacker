from sqlalchemy.orm import relationship
from config.database import Base
from sqlalchemy.orm import relationship

class InstrumentsAndProcedures(Base):
    # ... (other columns)

    instruments = relationship("Instrument", secondary=instruments_and_procedures, back_populates="procedures")
    procedures = relationship("Procedure", secondary=instruments_and_procedures, back_populates="instruments")

