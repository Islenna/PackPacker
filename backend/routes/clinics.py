from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db
from models.Clinic import Clinic as ClinicModel
from schemas.clinic_schemas import ClinicCreate, ClinicResponse
from typing import List
from utils.dependencies import get_current_user

superuser_required = Depends(get_current_user)

router = APIRouter(
    prefix="/clinics",
    tags=["Clinics"],
    dependencies=[Depends(get_current_user)],  # Ensure user is authenticated for all endpoints in this router
)

# Register a new clinic
@router.post("/new", response_model=ClinicResponse, status_code=status.HTTP_201_CREATED)
def create_clinic(clinic: ClinicCreate, db: Session = Depends(get_db)):
    db_clinic = ClinicModel(name=clinic.name, location=clinic.location, phone=clinic.phone, email=clinic.email)
    db.add(db_clinic)
    db.commit()
    db.refresh(db_clinic)
    return db_clinic

#Get all clinics
@router.get("/", response_model=List[ClinicResponse])
def get_clinics(db: Session = Depends(get_db)):
    return db.query(ClinicModel).all()

#Get a single clinic
@router.get("/{clinic_id}", response_model=ClinicResponse)
def get_clinic(clinic_id: int, db: Session = Depends(get_db)):
    db_clinic = db.query(ClinicModel).filter(ClinicModel.id == clinic_id).first()
    if not db_clinic:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Clinic not found")
    return db_clinic


# Update a clinic
@router.put("/{clinic_id}", response_model=ClinicResponse)  # Change from PATCH to PUT
def update_clinic(clinic_id: int, clinic: ClinicCreate, db: Session = Depends(get_db)):
    db_clinic = db.query(ClinicModel).filter(ClinicModel.id == clinic_id).first()
    if not db_clinic:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Clinic not found")
    db_clinic.name = clinic.name
    db_clinic.location = clinic.location
    db_clinic.phone = clinic.phone
    db_clinic.email = clinic.email
    db.commit()
    db.refresh(db_clinic)
    return db_clinic


#Delete a clinic
@router.delete("/{clinic_id}", response_model=ClinicResponse)
def delete_clinic(clinic_id: int, db: Session = Depends(get_db)):
    db_clinic = db.query(ClinicModel).filter(ClinicModel.id == clinic_id).first()
    if not db_clinic:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Clinic not found")
    db.delete(db_clinic)
    db.commit()
    return {"message": "Clinic successfully deleted"}

