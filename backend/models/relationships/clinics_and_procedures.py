from sqlalchemy.orm import relationship
from config.database import Base
from sqlalchemy.orm import relationship

class ClinicsAndProcedures(Base):
    # ... (other columns)

    clinics = relationship("Clinic", secondary=clinics_and_procedures, back_populates="procedures")
    procedures = relationship("Procedure", secondary=clinics_and_procedures, back_populates="clinics")
