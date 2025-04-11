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
from utils.activity_logger import log_activity

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
    if not user.clinics:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not associated with any clinic"
        )

    clinic_id = user.clinics[0].id

    existing_procedure = (
        db.query(ProcedureModel)
        .filter(ProcedureModel.name == procedure.name, ProcedureModel.clinic_id == clinic_id)
        .first()
    )
    if existing_procedure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Procedure with this name already exists in your clinic"
        )

    db_procedure = ProcedureModel(
        name=procedure.name,
        description=procedure.description,
        clinic_id=clinic_id
    )
    print(f"Creating procedure: {procedure.name} for clinic ID: {clinic_id}")


    db.add(db_procedure)
    db.commit()
    db.refresh(db_procedure)

    log_activity(
        db=db,
        user_id=user.id,
        action="create",
        target_type="procedure",
        target_id=db_procedure.id,
        message=f"Created procedure: {db_procedure.name}"
    )

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
    user: UserModel = Depends(get_current_user),
):
    print("Incoming query params:", page, items_per_page, search)

    offset = (page - 1) * items_per_page
    clinic_ids = [clinic.id for clinic in user.clinics]

    query = db.query(ProcedureModel).filter(ProcedureModel.clinic_id.in_(clinic_ids))

    if search:
        query = query.filter(ProcedureModel.name.ilike(f"%{search}%"))

    total_records = query.count()
    procedures = query.offset(offset).limit(items_per_page).all()
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
def update_procedure(procedure_id: int, procedure: ProcedureCreate, db: Session = Depends(get_db), user: UserModel = Depends(get_current_user)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Procedure not found")

    db_procedure.name = procedure.name
    db_procedure.description = procedure.description
    db.commit()
    db.refresh(db_procedure)

    log_activity(
        db=db,
        user_id=user.id,
        action="update",
        target_type="procedure",
        target_id=procedure_id,
        message=f"Updated procedure: {db_procedure.name}"
    )

    return db_procedure


#Delete a procedure
@router.delete("/{procedure_id}", response_model=DeleteResponse)
def delete_procedure(procedure_id: int, db: Session = Depends(get_db), user: UserModel = Depends(get_current_user)):
    db_procedure = db.query(ProcedureModel).filter(ProcedureModel.id == procedure_id).first()
    if not db_procedure:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Procedure not found")

    try:
        # Delete associated instruments and packs
        db.query(InstrumentsAndProcedures).filter_by(procedure_id=procedure_id).delete()
        db.query(PacksAndProcedures).filter_by(procedure_id=procedure_id).delete()
        db.delete(db_procedure)
        db.commit()

        log_activity(
            db=db,
            user_id=user.id,
            action="delete",
            target_type="procedure",
            target_id=procedure_id,
            message=f"Deleted procedure: {db_procedure.name}"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {"message": "Successfully deleted"}
