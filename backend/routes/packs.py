from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session, joinedload
from config.database import get_db
from models.Pack import Pack as PackModel
from schemas.pack_schemas import PackCreate, PackResponse, PacksWithInstrumentsResponse
from schemas.instrument_schemas import InstrumentResponse

router = APIRouter()

#Create a new pack
@router.post("/pack/new", response_model=PackResponse, status_code = status.HTTP_201_CREATED)
def create_pack(pack: PackCreate, db: Session = Depends(get_db)):
    db_pack = PackModel(name = pack.name)
    db.add(db_pack)
    db.commit()
    db.refresh(db_pack)

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
            img_url=instrument.img_url
        )
        instruments.append(instrument_response)

    # Create the response with valid instruments
    pack_response = PacksWithInstrumentsResponse(
        id=db_pack.id,
        name=db_pack.name,
        created_at=db_pack.created_at,
        updated_at=db_pack.updated_at,
        instruments=instruments,
    )

    return pack_response
#Update a pack
@router.patch("/pack/{pack_id}", response_model=PackResponse)
def update_pack(pack_id: int, pack: PackCreate, db: Session = Depends(get_db)):
    db_pack = db.query(PackModel).filter(PackModel.id == pack_id).first()
    if not db_pack:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Pack not found")
    db_pack.name = pack.name
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
