#Clinic Model
#id
#name
#clinicLoc
#phone
#email
#created_at
#updated_at

from sqlalchemy import Column, Integer, String, DateTime, func
from config.database import Base

class Clinic(Base):
    __tablename__ = "clinics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    clinicLoc = Column(String(255))
    phone = Column(String(255))
    email = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # users = relationship("User", secondary=users_and_clinics, back_populates="clinics")
