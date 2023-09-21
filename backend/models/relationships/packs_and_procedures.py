from sqlalchemy.orm import relationship
from config.database import Base
from sqlalchemy.orm import relationship

class PacksAndProcedures(Base):

    packs = relationship("Pack", secondary=packs_and_procedures, back_populates="procedures")
    procedures = relationship("Procedure", secondary=packs_and_procedures, back_populates="packs")