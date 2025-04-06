from sqlalchemy.orm import Session
from config.database import SessionLocal
from models.User import User
from models.Clinic import Clinic
from utils.auth import hash_password
import os

def seed_superuser():
    db: Session = SessionLocal()

    # Get values from .env or hardcode fallback
    superuser_email = os.getenv("SUPERUSER_EMAIL", "admin@admin.com")
    superuser_password = os.getenv("SUPERUSER_PASSWORD", "adminpass")
    default_clinic_id = int(os.getenv("SUPERUSER_CLINIC_ID", 1))

    # Check if user already exists
    existing_user = db.query(User).filter(User.email == superuser_email).first()
    if existing_user:
        db.close()
        return  # ✅ Silently skip if superuser exists

    # Hash password and create user
    hashed_pw = hash_password(superuser_password)
    superuser = User(email=superuser_email, password=hashed_pw, role="superuser")

    # Assign to a default clinic
    clinic = db.query(Clinic).filter(Clinic.id == default_clinic_id).first()
    if clinic:
        superuser.clinics.append(clinic)

    db.add(superuser)
    db.commit()
    db.refresh(superuser)

    print("✅ Superuser created and assigned to clinic:", clinic.name if clinic else "Unknown")
    db.close()
