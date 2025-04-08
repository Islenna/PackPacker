from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from config.database import Base
from models.relationships.users_and_clinics import users_and_clinics

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    role = Column(String(50), default="tech")  # 'tech', 'admin', 'admin'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    clinics = relationship("Clinic", secondary=users_and_clinics, back_populates="users")
    logs = relationship("ActivityLog", back_populates="user")