from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db, SessionLocal
from models.Procedure import Procedure as ProcedureModel
from schemas.procedure_schemas import ProcedureCreate, ProcedureResponse

router = APIRouter()

#Create a new procedure
@router.post("/procedure/new", response_model=ProcedureResponse, status_code = status.HTTP_201_CREATED)
def create_procedure(procedure: ProcedureCreate, db: Session = Depends(get_db)):
    #Check if the procedure name already exists
    existing_procedure = db.query(ProcedureModel).filter_by(name = procedure.name).first()
    if existing_procedure:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = "Procedure with this name already exists")
    
    db_procedure = ProcedureModel(name = procedure.name, description = procedure.description)
    db.add(db_procedure)
    db.commit()
    db.refresh(db_procedure)

    return db_procedure

#Get all procedures
@router.get("/procedures", response_model=List[ProcedureResponse])
def get_procedures(db: Session = Depends(get_db)):
    return db.query(ProcedureModel).all()

#Get one procedure
@router.get("/procedure/{procedure_id}", response_model=ProcedureResponse)
def get_procedure(procedure_id: int, db: Session = Depends(get_db)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Procedure not found")
    return db_procedure

#Update a procedure
@router.patch("/procedure/{procedure_id}", response_model=ProcedureResponse)
def update_procedure(procedure_id: int, procedure: ProcedureCreate, db: Session = Depends(get_db)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Procedure not found")
    db_procedure.name = procedure.name
    db_procedure.description = procedure.description
    db.commit()
    db.refresh(db_procedure)
    return db_procedure

#Delete a procedure
@router.delete("/procedure/{procedure_id}", response_model=ProcedureResponse)
def delete_procedure(procedure_id: int, db: Session = Depends(get_db)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Procedure not found")
    db.delete(db_procedure)
    db.commit()
    return db_procedure
