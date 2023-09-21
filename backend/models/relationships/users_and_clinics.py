from sqlalchemy.orm import relationship
from config.database import Base
from sqlalchemy.orm import relationship

class UsersAndClinics(Base):
    # ... (other columns)

    users = relationship("User", secondary=users_and_clinics, back_populates="clinics")
    clinics = relationship("Clinic", secondary=users_and_clinics, back_populates="users")
