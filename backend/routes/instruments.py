from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db, SessionLocal
from models.Instrument import Instrument as InstrumentModel
from schemas.instrument_schemas import InstrumentCreate, InstrumentResponse

router = APIRouter()

# Create a new instrument
@router.post("/instrument/new", response_model=InstrumentResponse, status_code=status.HTTP_201_CREATED)
def create_instrument(instrument: InstrumentCreate, db: Session = Depends(get_db)):
    # Check if the instrument name already exists
    existing_instrument = db.query(InstrumentModel).filter_by(name=instrument.name).first()
    if existing_instrument:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Instrument with this name already exists")

    # If the instrument name is unique, create the new instrument
    db_instrument = InstrumentModel(name=instrument.name, description=instrument.description, onHand = instrument.onHand, img_url=instrument.img_url)
    
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
    db.commit()
    db.refresh(db_instrument)
    return db_instrument

#Delete an instrument
@router.delete("/instrument/{instrument_id}", response_model=InstrumentResponse)
def delete_instrument(instrument_id: int, db: Session = Depends(get_db)):
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    if not db_instrument:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Instrument not found")
    db.delete(db_instrument)
    db.commit()
    return {"message": "Instrument deleted"}
