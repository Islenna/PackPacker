from fastapi import APIRouter, HTTPException, Depends, status, Query, File, UploadFile
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db, SessionLocal
from models.Instrument import Instrument as InstrumentModel
from schemas.instrument_schemas import InstrumentCreate, InstrumentResponse, MessageResponse
from repositories.repositories import query_database, calculate_total_records
from typing import Optional
from repositories.repositories import query_database_with_search, calculate_total_records_with_search
from utils.dependencies import get_current_user
from models.User import User as UserModel
import os
from utils.activity_logger import log_activity

router = APIRouter(
    prefix="/instruments",
    tags=["Instruments"],
    dependencies=[Depends(get_current_user)],  # Ensure user is authenticated for all endpoints in this router
)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_FILE_SIZE_MB = 5  # Maximum file size in MB

# Create a new instrument
@router.post("/new", response_model=InstrumentResponse, status_code=status.HTTP_201_CREATED)
def create_instrument(
    instrument: InstrumentCreate, 
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
):
    existing_instrument = db.query(InstrumentModel).filter_by(name=instrument.name).first()
    if existing_instrument:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Instrument with this name already exists")

    db_instrument = InstrumentModel(
        name=instrument.name,
        description=instrument.description,
        onHand=instrument.onHand,
        img_url=instrument.img_url,
        manufacturer=instrument.manufacturer,
        serial_number=instrument.serial_number,
    )

    db.add(db_instrument)
    db.commit()
    log_activity(
        db=db,
        user_id=user.id,
        action="create",
        target_type="instrument",
        target_id=db_instrument.id,
        message=f"Created instrument: {db_instrument.name}"
    )
    db.refresh(db_instrument)


    return db_instrument




#Get all instruments
@router.get("/", response_model=List[InstrumentResponse])
def get_instruments(db: Session = Depends(get_db)):
    return db.query(InstrumentModel).all()

#Get paginated instruments. This is a GET request that returns a JSON object with a list of instruments, the current page, the total number of pages, and the total number of records.
@router.get("/pages")
async def get_paginated_instruments(
    page: int = 1,
    items_per_page: int = 10,
    search: Optional[str] = None,  # Add a search parameter
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
):
    offset = (page - 1) * items_per_page
    # Modify your query to include the search logic if a search term is provided
    
    if search:
        instruments = query_database_with_search(db, offset, items_per_page, search)  # Pass the session object (db)
        total_records = calculate_total_records_with_search(db, search)  # Pass the session object (db)
    else:
        instruments = query_database(db, offset, items_per_page)  # Pass the session object (db)
        total_records = calculate_total_records(db)  # Pass the session object (db)


    total_pages = (total_records + items_per_page - 1) // items_per_page

    return {
        "instruments": instruments,
        "page": page,
        "total_pages": total_pages,
        "total_records": total_records,
    }


#Get a single instrument
@router.get("/{instrument_id}", response_model=InstrumentResponse)
def get_instrument(instrument_id: int, db: Session = Depends(get_db)):
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    if not db_instrument:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Instrument not found")
    return db_instrument

#Update an instrument
@router.patch("/{instrument_id}", response_model=InstrumentResponse)
def update_instrument(
    instrument_id: int, 
    instrument: InstrumentCreate, 
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
):
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

    log_activity(
        db=db,
        user_id=user.id,
        action="update",
        target_type="instrument",
        target_id=db_instrument.id,
        message=f"Updated instrument: {db_instrument.name}"
    )
    
    return db_instrument

# Upload an image for an instrument
@router.patch("/upload-image/{instrument_id}", response_model=InstrumentResponse)
async def upload_instrument_image(
    instrument_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
):
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    if not db_instrument:
        raise HTTPException(status_code=404, detail="Instrument not found")

    contents = await file.read()
    file_size_mb = len(contents) / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=413, detail="Image too large. Maximum size is 5MB.")
    filename = f"{instrument_id}_{file.filename}"
    filepath = f"static/uploads/{filename}"
    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    db_instrument.img_url = f"/static/uploads/{filename}"
    db.commit()
    
    db.refresh(db_instrument)

    return db_instrument

@router.delete("/{instrument_id}", response_model=MessageResponse)
async def delete_instrument(
    instrument_id: int, 
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
    ):
    # Fetch the instrument from the database
    db_instrument = db.query(InstrumentModel).filter(InstrumentModel.id == instrument_id).first()
    
    if not db_instrument:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instrument not found")
    
    try:
        db.delete(db_instrument)
        db.commit()


        log_activity(
            db=db,
            user_id=user.id,
            action="delete",
            target_type="instrument",
            target_id=instrument_id,
            message=f"Deleted instrument: {db_instrument.name}"
        )

    except Exception as e:
        # Rollback the session in case of error
        db.rollback()
        
        # Return a 500 internal server error
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    
    # Return a success message
    return {"message": "Instrument deleted successfully"}