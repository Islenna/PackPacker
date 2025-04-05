from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db, SessionLocal
from models.Procedure import Procedure as ProcedureModel
from schemas.procedure_schemas import ProcedureCreate, ProcedureResponse, DeleteResponse
from repositories.repositories import query_procedure_database, calculate_total_procedure_records, query_procedure_database_with_search, calculate_total_procedure_records_with_search
from models.relationships.instruments_and_procedures import InstrumentsAndProcedures
from models.relationships.packs_and_procedures import PacksAndProcedures
from models.Instrument import Instrument
from models.Pack import Pack
from utils.dependencies import get_current_user
from typing import Optional
from models.User import User as UserModel


router = APIRouter(
    prefix="/procedures",
    tags=["Procedures"],
)
@router.post("/new", response_model=ProcedureResponse, status_code=status.HTTP_201_CREATED)
def create_procedure(
    procedure: ProcedureCreate,
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
):
    print("✅ Route was hit!")
    print("🧪 Authenticated user:", user.email)
    existing_procedure = db.query(ProcedureModel).filter_by(name=procedure.name).first()
    if existing_procedure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Procedure with this name already exists"
        )
    
    db_procedure = ProcedureModel(name=procedure.name, description=procedure.description)
    db.add(db_procedure)
    db.commit()
    db.refresh(db_procedure)

    return db_procedure

@router.get("/me")
def read_users_me(user: UserModel = Depends(get_current_user)):
    return {"email": user.email}

#Get all procedures
@router.get("/", response_model=List[ProcedureResponse])
def get_procedures(db: Session = Depends(get_db)):
    return db.query(ProcedureModel).all()

#Get all procedures with pagination and search
@router.get("/pages")
async def get_paginated_procedures(
    page: int = 1,
    items_per_page: int = 10,
    search: Optional[str] = Query(default=""),
    db: Session = Depends(get_db),
):
    print("Incoming query params:", page, items_per_page, search)

    # Calculate offset based on page number.
    offset = (page - 1) * items_per_page

    # Depending on whether a search term was provided, we will use different query functions.
    if search:
        procedures = query_procedure_database_with_search(db, offset, items_per_page, search)
        total_records = calculate_total_procedure_records_with_search(db, search)
    else:
        procedures = query_procedure_database(db, offset, items_per_page)
        total_records = calculate_total_procedure_records(db)

    # Calculate the total number of pages.
    total_pages = (total_records + items_per_page - 1) // items_per_page

    return {
        "procedures": procedures,
        "page": page,
        "total_pages": total_pages,
        "total_records": total_records,
    }

#Get one procedure
@router.get("/{procedure_id}", response_model=ProcedureResponse)
def get_procedure(procedure_id: int, db: Session = Depends(get_db)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Procedure not found")
    return db_procedure

#Update a procedure
@router.patch("/{procedure_id}", response_model=ProcedureResponse)
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
@router.delete("/{procedure_id}", response_model=DeleteResponse)
def delete_procedure(procedure_id: int, db: Session = Depends(get_db)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Procedure not found")

    try:
        # Delete associated instruments
        associated_instruments = db.query(InstrumentsAndProcedures).filter(InstrumentsAndProcedures.procedure_id == procedure_id).all()
        for instrument in associated_instruments:
            db.delete(instrument)

        # Delete associated packs
        associated_packs = db.query(PacksAndProcedures).filter(PacksAndProcedures.procedure_id == procedure_id).all()
        for pack in associated_packs:
            db.delete(pack)

        # After removing all associations, delete the main procedure
        db.delete(db_procedure)

        # Commit all changes at once
        db.commit()

    except Exception as e:
        db.rollback()  # Explicitly rolling back in case of error
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return {"message": "Successfully deleted"}