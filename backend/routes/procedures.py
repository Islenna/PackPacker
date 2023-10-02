from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db, SessionLocal
from models.Procedure import Procedure as ProcedureModel
from schemas.procedure_schemas import ProcedureCreate, ProcedureResponse
from repositories.repositories import query_procedure_database, calculate_total_procedure_records


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


#Get paginated procedures.
@router.get("/procedures/pages")
async def get_paginated_procedures(
    page: int = 1,  # Default page is 1
    items_per_page: int = 10,  # Default items per page is 10
    db: Session = Depends(get_db),  # Dependency injection to get the database session
):
    # Calculate offset based on page and items per page
    offset = (page - 1) * items_per_page

    # Query the database for a specific range of records
    procedures = query_procedure_database(db, offset, items_per_page)

    # Calculate the total number of records (total_records) for the query
    total_records = calculate_total_procedure_records(db)

    # Calculate the total number of pages (total_pages)
    total_pages = (total_records + items_per_page - 1) // items_per_page

    return {
        "procedures": procedures,
        "page": page,
        "total_pages": total_pages,
        "total_records": total_records,
    }

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
