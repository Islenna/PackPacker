from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from models.Procedure import Procedure
from models.Instrument import Instrument
from models.Pack import Pack

router = APIRouter()

# Route to add an instrument to a procedure
@router.post("/procedure/{procedure_id}/add-instrument/{instrument_id}")
def add_instrument_to_procedure(
    procedure_id: int, instrument_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to add the instrument to the procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    instrument = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    
    if procedure and instrument:
        procedure.instruments.append(instrument)
        db.commit()
        return {"message": "Instrument added to procedure successfully"}
    
    return {"message": "Procedure or instrument not found"}

# Route to add a pack to a procedure (similar to add-instrument)
@router.post("/procedure/{procedure_id}/add-pack/{pack_id}")
def add_pack_to_procedure(
    procedure_id: int, pack_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to add the pack to the procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    pack = db.query(Pack).filter(Pack.id == pack_id).first()
    
    if procedure and pack:
        procedure.packs.append(pack)
        db.commit()
        return {"message": "Pack added to procedure successfully"}
    
    return {"message": "Procedure or pack not found"}

# Route to get all packs and instruments for a procedure:
@router.get("/procedure/{procedure_id}/get-equipment")
def get_packs_and_instruments_for_procedure(
    procedure_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to get all packs and instruments for a procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    
    if procedure:
        # Load the associated packs and instruments using the relationship
        packs = procedure.packs  # Assuming you have a "packs" relationship defined
        instruments = procedure.instruments  # Assuming you have an "instruments" relationship defined
        
        return {
            "procedure": procedure,
        }
    return {"message": "Procedure not found"}

#Delete an instrument from a procedure:
@router.delete("/procedure/{procedure_id}/delete-instrument/{instrument_id}")
def delete_instrument_from_procedure(
    procedure_id: int, instrument_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to delete the instrument from the procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    instrument = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    
    if procedure and instrument:
        procedure.instruments.remove(instrument)
        db.commit()
        return {"message": "Instrument deleted from procedure successfully"}
    
    return {"message": "Procedure or instrument not found"}

#Add an instrument to a pack:
@router.post("/pack/{pack_id}/add-instrument/{instrument_id}")
def add_instrument_to_pack(
    pack_id: int, instrument_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to add the instrument to the pack
    pack = db.query(Pack).filter(Pack.id == pack_id).first()
    instrument = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    
    if pack and instrument:
        pack.instruments.append(instrument)
        db.commit()
        return {"message": "Instrument added to pack successfully"}
    
    return {"message": "Pack or instrument not found"}