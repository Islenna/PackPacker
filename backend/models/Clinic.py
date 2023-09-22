from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from config.database import Base
from models.relationships.users_and_clinics import users_and_clinics
from models.relationships.clinics_and_procedures import clinics_and_procedures

class Clinic(Base):
    __tablename__ = "clinics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True)
    clinicLoc = Column(String(255))
    phone = Column(String(255))
    email = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    users = relationship("User", secondary=users_and_clinics, back_populates="clinics")
    procedures = relationship("Procedure", secondary=clinics_and_procedures, back_populates="clinics")