from fastapi import APIRouter, HTTPException, Depends, status, Query, UploadFile, File
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload, aliased
from config.database import get_db, SessionLocal
from models.Pack import Pack as PackModel
from schemas.pack_schemas import PackCreate, PackResponse, PacksWithInstrumentsResponse, PackDelete
from schemas.instrument_schemas import InstrumentResponse
from repositories.repositories import query_pack_database, calculate_total_pack_records, query_pack_database_with_search, calculate_total_pack_records_with_search
from models.relationships.packs_and_instruments import PacksAndInstruments
from models.Instrument import Instrument
from utils.dependencies import get_current_user
from models.User import User as UserModel
import os
from utils.activity_logger import log_activity


router = APIRouter(
    prefix="/packs",
    tags=["Packs"],
    dependencies=[Depends(get_current_user)],  # Ensure user is authenticated for all endpoints in this router
)
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
MAX_FILE_SIZE_MB = 5  # Maximum file size in MB

@router.post("/new", response_model=PackResponse, status_code=status.HTTP_201_CREATED)
def create_pack(
    pack: PackCreate, 
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user)
):
    clinic_id = user.clinics[0].id  # Assuming users are only scoped to one clinic

    # ✅ Fix: Check for existing pack with same name in the same clinic
    existing_pack = (
        db.query(PackModel)
        .filter(PackModel.name == pack.name, PackModel.clinic_id == clinic_id)
        .first()
    )
    if existing_pack:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Pack with this name already exists in your clinic"
        )

    db_pack = PackModel(
        name=pack.name,
        description=pack.description,
        clinic_id=clinic_id
    )

    db.add(db_pack)
    db.commit()

    log_activity(
        db=db,
        user_id=user.id,
        action="create",
        target_type="pack",
        target_id=db_pack.id,
        message=f"Created pack: {db_pack.name}"
    )

    db.refresh(db_pack)
    return db_pack


#Get paginated packs.
@router.get("/pages")
async def get_paginated_packs(
    page: int = Query(1, ge=1),
    items_per_page: int = Query(10, ge=1),
    search: Optional[str] = Query(""),
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
):
    # Calculate offset based on page number.
    offset = (page - 1) * items_per_page
    clinic_ids = [clinic.id for clinic in user.clinics]

    # Start base query scoped to user clinics
    query = db.query(PackModel).filter(PackModel.clinic_id.in_(clinic_ids))

    # Apply search if present
    if search:
        query = query.filter(
            PackModel.name.ilike(f"%{search}%") |
            PackModel.description.ilike(f"%{search}%")
        )

    total_records = query.count()
    packs = query.offset(offset).limit(items_per_page).all()

    # Calculate the total number of pages
    total_pages = (total_records + items_per_page - 1) // items_per_page

    return {
        "packs": packs,
        "page": page,
        "total_pages": total_pages,
        "total_records": total_records,
    }


# Get a pack and its instruments
@router.get("/{pack_id}", response_model=PacksWithInstrumentsResponse)
def get_pack(pack_id: int, db: Session = Depends(get_db)):

    db_pack = (
        db.query(PackModel)
        .filter(PackModel.id == pack_id)
        .options(joinedload(PackModel.instruments))
        .first()
        
    )

    if not db_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack not found")

    # Retrieve the instruments and quantities associated with the pack
    instruments_and_quantities = (
        db.query(Instrument, PacksAndInstruments.quantity)
        .join(PacksAndInstruments, Instrument.id == PacksAndInstruments.instrument_id)
        .filter(PacksAndInstruments.pack_id == pack_id)
        .all()
    )

    # Convert the loaded instruments and quantities into valid responses
    instruments = []
    for instrument, quantity in instruments_and_quantities:
        instrument_response = InstrumentResponse(
            id=instrument.id,
            name=instrument.name,
            description=instrument.description,
            img_url=instrument.img_url,
            onHand=instrument.onHand,
            manufacturer=instrument.manufacturer,
            serial_number=instrument.serial_number,
            quantity=quantity, 
        )
        instruments.append(instrument_response)

    # Create the response with valid instruments
    pack_response = PacksWithInstrumentsResponse(
        id=db_pack.id,
        img_url=db_pack.img_url,
        name=db_pack.name,
        description=db_pack.description,
        created_at=db_pack.created_at,
        updated_at=db_pack.updated_at,
        instruments=instruments,
    )

    return pack_response

#Get all packs
@router.get("/", response_model=List[PackResponse])
def get_packs(db: Session = Depends(get_db)):
    return db.query(PackModel).all()


#Update a pack
@router.patch("/{pack_id}", response_model=PackResponse)
def update_pack(
    pack_id: int, 
    pack: PackCreate, 
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user)
):
    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack not found")
    db_pack.name = pack.name
    db_pack.description = pack.description  # Update the description field
    db_pack.img_url = pack.img_url # Update the img_url field
    db.commit()
    db.refresh(db_pack)

    log_activity(
        db=db,
        user_id=user.id,
        action="update",
        target_type="pack",
        target_id=pack_id,
        message=f"Updated pack: {db_pack.name}"
    )
    return db_pack

#Add an image to a pack
@router.patch("/upload-image/{pack_id}")
async def upload_pack_image(
    pack_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only .jpg, .jpeg, and .png files are allowed.")

    contents = await file.read()
    file_size_mb = len(contents) / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=413, detail="Image too large. Maximum size is 5MB.")

    filename = f"{pack_id}_{file.filename.replace(' ', '_')}"
    filepath = f"static/uploads/{filename}"
    
    # Rewind file pointer since we already read it
    with open(filepath, "wb") as buffer:
        buffer.write(contents)

    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code=404, detail="Pack not found")

    db_pack.img_url = f"/static/uploads/{filename}"
    db.commit()
    db.refresh(db_pack)

    log_activity(
        db=db,
        user_id=user.id,
        action="update",
        target_type="pack",
        target_id=pack_id,
        message=f"Updated pack image: {db_pack.name}"
    )
    return db_pack

#Delete a pack
@router.delete("/{pack_id}", response_model=PackDelete)
def delete_pack(pack_id: int, db: Session = Depends(get_db),user: UserModel = Depends(get_current_user)):
    # Retrieve the pack
    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack not found")

    try:
        # Delete associated instruments
        associated_instruments = db.query(PacksAndInstruments).filter(PacksAndInstruments.pack_id == pack_id).all()
        for instrument in associated_instruments:
            db.delete(instrument)

        # Delete the main pack
        db.delete(db_pack)
        
        # Commit the transaction
        db.commit()

        log_activity(
            db=db,
            user_id=user.id,
            action="delete",
            target_type="pack",
            target_id=pack_id,
            message=f"Deleted pack: {db_pack.name}"
        )

        return {
            "name": db_pack.name,
            "img_url": db_pack.img_url,
            "message": "Pack successfully deleted"
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
