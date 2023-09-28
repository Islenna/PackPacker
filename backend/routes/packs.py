from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session, joinedload
from config.database import get_db, SessionLocal
from models.Pack import Pack as PackModel
from schemas.pack_schemas import PackCreate, PackResponse, PacksWithInstrumentsResponse
from schemas.instrument_schemas import InstrumentResponse
from repositories.repositories import query_pack_database, calculate_total_pack_records

router = APIRouter()

#Create a new pack
@router.post("/pack/new", response_model=PackResponse, status_code=status.HTTP_201_CREATED)
def create_pack(pack: PackCreate, db: Session = Depends(get_db)):
    # Check if the pack name already exists
    existing_pack = db.query(PackModel).filter_by(name=pack.name).first()
    if existing_pack:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Pack with this name already exists")

    # If the pack name is unique, create the new pack
    db_pack = PackModel(name=pack.name, notes=pack.notes)
    
    # Use SessionLocal to create a new database session
    db_session = SessionLocal()
    db_session.add(db_pack)
    db_session.commit()
    db_session.refresh(db_pack)

    return db_pack


#Get all packs
@router.get("/packs", response_model=List[PackResponse])
def get_packs(db: Session = Depends(get_db)):
    return db.query(PackModel).all()
# Get a single pack
@router.get("/pack/{pack_id}", response_model=PacksWithInstrumentsResponse)
def get_pack(pack_id: int, db: Session = Depends(get_db)):
    db_pack = (
        db.query(PackModel)
        .filter(PackModel.id == pack_id)
        .options(joinedload(PackModel.instruments))
        .first()
    )

    if not db_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack not found")

    # Convert the loaded instruments into valid responses
    instruments = []
    for instrument in db_pack.instruments:
        instrument_response = InstrumentResponse(
            id=instrument.id,
            name=instrument.name,
            description=instrument.description,
            img_url=instrument.img_url,
            onHand=instrument.onHand
        )
        instruments.append(instrument_response)

    # Create the response with valid instruments
    pack_response = PacksWithInstrumentsResponse(
        id=db_pack.id,
        name=db_pack.name,
        notes=db_pack.notes,
        created_at=db_pack.created_at,
        updated_at=db_pack.updated_at,
        instruments=instruments,
    )

    return pack_response

#Get paginated packs.
@router.get("/packs/pages")
async def get_paginated_packs(
    page: int = 1,  # Default page is 1
    items_per_page: int = 10,  # Default items per page is 10
    db: Session = Depends(get_db),  # Dependency injection to get the database session
):
    # Calculate offset based on page and items per page
    offset = (page - 1) * items_per_page

    # Query the database for a specific range of records
    packs = query_pack_database(db, offset, items_per_page)

    # Calculate the total number of records (total_records) for the query
    total_records = calculate_total_pack_records(db)

    # Calculate the total number of pages (total_pages)
    total_pages = (total_records + items_per_page - 1) // items_per_page

    return {
        "packs": packs,
        "page": page,
        "total_pages": total_pages,
        "total_records": total_records,
    }

#Update a pack
@router.patch("/pack/{pack_id}", response_model=PackResponse)
def update_pack(pack_id: int, pack: PackCreate, db: Session = Depends(get_db)):
    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack not found")
    db_pack.name = pack.name
    db_pack.notes = pack.notes  # Update the notes field
    db.commit()
    db.refresh(db_pack)
    return db_pack

#Delete a pack
@router.delete("/pack/{pack_id}", response_model=PackResponse)
def delete_pack(pack_id: int, db: Session = Depends(get_db)):
    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Pack not found")
    db.delete(db_pack)
    db.commit()
    return {"message": "Pack successfully deleted"}
