from fastapi import APIRouter, HTTPException, Depends, status, Query
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

router = APIRouter(
    prefix="/packs",
    tags=["Packs"],
    dependencies=[Depends(get_current_user)],  # Ensure user is authenticated for all endpoints in this router
)

#Create a new pack
@router.post("/new", response_model=PackResponse, status_code=status.HTTP_201_CREATED)
def create_pack(pack: PackCreate, db: Session = Depends(get_db)):
    # Check if the pack name already exists
    existing_pack = db.query(PackModel).filter_by(name=pack.name).first()
    if existing_pack:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Pack with this name already exists")

    # If the pack name is unique, create the new pack
    db_pack = PackModel(name=pack.name, description=pack.description)
    
    # Use SessionLocal to create a new database session
    db_session = SessionLocal()
    db_session.add(db_pack)
    db_session.commit()
    db_session.refresh(db_pack)

    return db_pack


@router.get("/pages")
async def get_paginated_packs(
    page: int = Query(1, ge=1),
    items_per_page: int = Query(10, ge=1),
    search: Optional[str] = Query(""),
    db: Session = Depends(get_db),
):

    # Calculate offset based on page number.
    offset = (page - 1) * items_per_page

    # Depending on whether a search term was provided, we will use different query functions.
    if search:
        packs = query_pack_database_with_search(db, offset, items_per_page, search)
        total_records = calculate_total_pack_records_with_search(db, search)
    else:
        packs = query_pack_database(db, offset, items_per_page)
        total_records = calculate_total_pack_records(db)

    # Calculate the total number of pages.
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
def update_pack(pack_id: int, pack: PackCreate, db: Session = Depends(get_db)):
    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pack not found")
    db_pack.name = pack.name
    db_pack.description = pack.description  # Update the description field
    db.commit()
    db.refresh(db_pack)
    return db_pack

@router.delete("/{pack_id}", response_model=PackDelete)
def delete_pack(pack_id: int, db: Session = Depends(get_db)):
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
        
        return {
            "name": db_pack.name,
            "img_url": db_pack.img_url,
            "message": "Pack successfully deleted"
}


    except Exception as e:
        db.rollback()  # Explicitly rolling back in case of error
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
