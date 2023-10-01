from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import insert
from sqlalchemy.orm import Session
from config.database import get_db
from models.Procedure import Procedure
from models.Instrument import Instrument
from models.Pack import Pack
from models.relationships.packs_and_instruments import PacksAndInstruments
from schemas.instrument_schemas import InstrumentResponse, BulkAddInstrumentsRequest
from schemas.pack_schemas import PackResponse
from schemas.procedure_schemas import ProcedureResponse

from typing import List

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
def get_PacksAndInstruments_for_procedure(
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

# Add an instrument to a pack
@router.post("/pack/{pack_id}/add-instrument/{instrument_id}")
def add_instrument_to_pack(
    pack_id: int,
    instrument_id: int,
    quantity: int,  # Include the quantity parameter
    db: Session = Depends(get_db)
):
    # Retrieve the pack and instrument
    pack = db.query(Pack).filter(Pack.id == pack_id).first()
    instrument = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    
    if not pack or not instrument:
        raise HTTPException(status_code=404, detail="Pack or instrument not found")
    
    # Create a PacksAndInstruments object to represent the relationship with quantity
    PacksAndInstruments_entry = PacksAndInstruments.insert().values(
        pack_id=pack_id, instrument_id=instrument_id, quantity=quantity
    )
    
    # Add the PacksAndInstruments object to the database
    db.execute(PacksAndInstruments_entry)
    db.commit()
    
    return {"message": f"{quantity} instruments added to pack successfully"}

#Bulk add instruments to a pack
@router.post("/pack/{pack_id}/add-instruments")
def bulk_add_instruments_to_pack(
    pack_id: int,
    request_data: BulkAddInstrumentsRequest,  # Use the Pydantic model
    db: Session = Depends(get_db)
):
    selected_instruments = request_data.instruments

    # Retrieve the pack
    pack = db.query(Pack).filter(Pack.id == pack_id).first()
    
    if not pack:
        raise HTTPException(status_code=404, detail="Pack not found")
    
    # Create a list of PacksAndInstruments objects to represent the relationships
    PacksAndInstruments_entries = []
    for instrument_id in request_data.instruments:
        PacksAndInstruments_entries.append(
        insert(PacksAndInstruments).values(
            pack_id=pack_id,
            instrument_id=instrument_id,
            quantity=1,  # Defaults to 1.
        )
    )
        
    for entry in PacksAndInstruments_entries:
        db.execute(entry)

    db.commit()  # Commit once after all the inserts are done
    
    return {"message": f"{len(selected_instruments)} instruments added to pack successfully"}

# Remove an instrument from a pack
@router.delete("/pack/{pack_id}/delete-instrument/{instrument_id}")
def delete_instrument_from_pack(
    pack_id: int, instrument_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to delete the instrument from the pack
    pack = db.query(Pack).filter(Pack.id == pack_id).first()
    instrument = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    
    if pack and instrument:
        pack.instruments.remove(instrument)
        db.commit()
        return {"message": "Instrument deleted from pack successfully"}
    
    return {"message": "Pack or instrument not found"}

#Update the quantity of an instrument in a pack
@router.put("/pack/{pack_id}/update-instrument/{instrument_id}")
def update_quantity_of_instrument_in_pack(
    pack_id: int,
    instrument_id: int,
    quantity: int,
    db: Session = Depends(get_db)
):

    # Check if the quantity is a valid number
    if not isinstance(quantity, int):
        raise HTTPException(status_code=422, detail="Invalid quantity value")

    with db.begin():
        # Find the PacksAndInstruments object that represents the relationship
        PacksAndInstruments_entry = db.query(PacksAndInstruments).filter(
            PacksAndInstruments.pack_id == pack_id,
            PacksAndInstruments.instrument_id == instrument_id,
        ).first()

        if PacksAndInstruments_entry:
            # Update the quantity
            PacksAndInstruments_entry.quantity = quantity
            db.commit()
            return {"message": "Instrument quantity updated successfully"}
        else:
            db.rollback()
            raise HTTPException(status_code=404, detail="Pack or instrument not found")