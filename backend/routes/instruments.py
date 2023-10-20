from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db, SessionLocal
from models.Instrument import Instrument as InstrumentModel
from schemas.instrument_schemas import InstrumentCreate, InstrumentResponse, MessageResponse
from repositories.repositories import query_database, calculate_total_records

router = APIRouter()

# Create a new instrument
@router.post("/instrument/new", response_model=InstrumentResponse, status_code=status.HTTP_201_CREATED)
def create_instrument(instrument: InstrumentCreate, db: Session = Depends(get_db)):
    # Check if the instrument name already exists
    existing_instrument = db.query(InstrumentModel).filter_by(name=instrument.name).first()
    if existing_instrument:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Instrument with this name already exists")

    # If the instrument name is unique, create the new instrument
    db_instrument = InstrumentModel(
        name=instrument.name, 
        description=instrument.description, 
        onHand = instrument.onHand, 
        img_url=instrument.img_url, 
        manufacturer=instrument.manufacturer, 
        serial_number=instrument.serial_number)
    
    # Use SessionLocal to create a new database session
    db_session = SessionLocal()
    db_session.add(db_instrument)
    db_session.commit()
    db_session.refresh(db_instrument)

    return db_instrument



#Get all instruments
@router.get("/instruments", response_model=List[InstrumentResponse])
def get_instruments(db: Session = Depends(get_db)):
    return db.query(InstrumentModel).all()

#Get paginated instruments. This is a GET request that returns a JSON object with a list of instruments, the current page, the total number of pages, and the total number of records.
@router.get("/instruments/pages")
async def get_paginated_instruments(
    page: int = 1,  # Default page is 1
    items_per_page: int = 10,  # Default items per page is 10
    db: Session = Depends(get_db),  # Dependency injection to get the database session
):
    # Calculate offset based on page and items per page
    offset = (page - 1) * items_per_page

    # Query the database for a specific range of records
    instruments = query_database(db, offset, items_per_page)

    # Calculate the total number of records (total_records) for the query
    total_records = calculate_total_records(db)

    # Calculate the total number of pages (total_pages)
    total_pages = (total_records + items_per_page - 1) // items_per_page

    return {
        "instruments": instruments,
        "page": page,
        "total_pages": total_pages,
        "total_records": total_records,
    }

#Get a single instrument
@router.get("/instrument/{instrument_id}", response_model=InstrumentResponse)
def get_instrument(instrument_id: int, db: Session = Depends(get_db)):
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    if not db_instrument:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Instrument not found")
    return db_instrument

#Update an instrument
@router.patch("/instrument/{instrument_id}", response_model=InstrumentResponse)
def update_instrument(instrument_id: int, instrument: InstrumentCreate, db: Session = Depends(get_db)):
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    if not db_instrument:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Instrument not found")
    db_instrument.name = instrument.name
    db_instrument.description = instrument.description
    db_instrument.img_url = instrument.img_url
    db_instrument.onHand = instrument.onHand
    db_instrument.manufacturer = instrument.manufacturer
    db_instrument.serial_number = instrument.serial_number
    db.commit()
    db.refresh(db_instrument)
    return db_instrument


@router.delete("/instrument/{instrument_id}", response_model=MessageResponse)
async def delete_instrument(instrument_id: int, db: Session = Depends(get_db)):
    # Fetch the instrument from the database
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    
    if not db_instrument:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instrument not found")
    
    try:
        db.delete(db_instrument)
        db.commit()
    except Exception as e:
        # Rollback the session in case of error
        db.rollback()
        
        # Return a 500 internal server error
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    
    # Return a success message
    return {"message": "Instrument deleted successfully"}