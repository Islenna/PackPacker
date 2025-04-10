from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import insert
from sqlalchemy.orm import Session
from config.database import get_db
from models.Procedure import Procedure
from models.Instrument import Instrument
from models.Pack import Pack
from models.relationships.instruments_and_procedures import InstrumentsAndProcedures
from models.relationships.packs_and_instruments import PacksAndInstruments
from models.relationships.packs_and_procedures import PacksAndProcedures
from schemas.instrument_schemas import InstrumentResponse, BulkAddInstrumentsRequest
from schemas.pack_schemas import PackResponse, BulkAddPackRequest
from schemas.procedure_schemas import ProcedureResponse

from typing import List

router = APIRouter()

# Route to add an instrument to a procedure
@router.post("/procedures/{procedure_id}/add-instrument/{instrument_id}")
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
@router.post("/procedures/{procedure_id}/add-pack/{pack_id}")
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
# Route to get all packs and instruments for a procedure
@router.get("/procedures/{procedure_id}/get-equipment")
def get_PacksAndInstruments_for_procedure(
    procedure_id: int, db: Session = Depends(get_db)
):
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    
    if procedure:
        packs = procedure.packs  
        instruments = procedure.instruments  
        
        procedure_details = {
            "procedure": {
                "id": procedure.id,
                "name": procedure.name,
                "description": procedure.description,
            },
            "packs": [
                {
                    "id": pack.id,
                    "name": pack.name,
                    "description": pack.description,
                }
                for pack in packs
            ],
            "instruments": [],
        }

        for instrument in instruments:
            instrument_quantity = (
                db.query(InstrumentsAndProcedures.quantity)
                .filter(
                    InstrumentsAndProcedures.procedure_id == procedure_id,
                    InstrumentsAndProcedures.instrument_id == instrument.id
                )
                .first()
            )
            
            instrument_data = {
                "id": instrument.id,
                "name": instrument.name,
                "description": instrument.description,
                "quantity": instrument_quantity[0] if instrument_quantity else 0
            }

            procedure_details["instruments"].append(instrument_data)
        
        return procedure_details

    return {"message": "Procedure not found"}

#Delete an instrument from a procedure:
@router.delete("/procedures/{procedure_id}/delete-instrument/{instrument_id}")
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
@router.post("/packs/{pack_id}/add-instrument/{instrument_id}")
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
@router.post("/packs/{pack_id}/add-instruments")
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



#Bulk Add Instruments to Procedure
@router.post("/procedures/{procedure_id}/add-instruments", response_model=ProcedureResponse)
def bulk_add_instruments_to_procedure(
    procedure_id: int,
    request_data: BulkAddInstrumentsRequest,  # Use the Pydantic model
    db: Session = Depends(get_db)
):
    selected_instruments = request_data.instruments

    # Retrieve the procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()

    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    
    # Create a list of InstrumentsAndProcedures objects to represent the relationships
    InstrumentsAndProcedures_entries = []
    for instrument_id in request_data.instruments:
        InstrumentsAndProcedures_entries.append(
        insert(InstrumentsAndProcedures).values(
            procedure_id=procedure_id,
            instrument_id=instrument_id,
            quantity=1,  # Defaults to 1.
        )
    )
        
    for entry in InstrumentsAndProcedures_entries:
        db.execute(entry)

    db.commit()  # Commit once after all the inserts are done

    return {
        "id": procedure.id,
        "name": procedure.name,
        "description": procedure.description,
        
}
# Bulk Add Packs to Procedure
@router.post("/procedures/{procedure_id}/add-packs", response_model=ProcedureResponse)
def bulk_add_packs_to_procedure(
    procedure_id: int,
    request_data: BulkAddPackRequest,  # Use the Pydantic model for the request
    db: Session = Depends(get_db)
):
    selected_packs = request_data.packs

    # Retrieve the procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()

    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    
    # Create a list of InstrumentsAndProcedures objects to represent the relationships
    PacksAndProcedures_entries = []
    for pack_id in request_data.packs:
        PacksAndProcedures_entries.append(
            insert(PacksAndProcedures).values(
                procedure_id=procedure_id,
                pack_id=pack_id,
            )
        )
        
    for entry in PacksAndProcedures_entries:
        db.execute(entry)

    db.commit()

    # Return the response data (ProcedureResponse) here
    return {
    "id": procedure.id,
    "name": procedure.name,
    "description": procedure.description,
    # include any other necessary fields
}


# Remove an instrument from a pack
@router.delete("/packs/{pack_id}/delete-instrument/{instrument_id}")
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

#Remove a pack from a procedure
@router.delete("/procedures/{procedure_id}/delete-pack/{pack_id}")
def delete_pack_from_procedure(
    procedure_id: int, pack_id: int, db: Session = Depends(get_db)
):
    # Perform the logic to delete the pack from the procedure
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    pack = db.query(Pack).filter(Pack.id == pack_id).first()
    
    if procedure and pack:
        procedure.packs.remove(pack)
        db.commit()
        return {"message": "Pack deleted from procedure successfully"}
    
    return {"message": "Procedure or pack not found"}

#Update the quantity of an instrument in a pack
@router.put("/packs/{pack_id}/update-instrument/{instrument_id}")
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

#Update the quantity of an instrument in a procedure
@router.put("/procedures/{procedure_id}/update-instrument/{instrument_id}")
def update_quantity_of_instrument_in_procedure(
    procedure_id: int,
    instrument_id: int,
    quantity: int,
    db: Session = Depends(get_db)
):
    
        # Check if the quantity is a valid number
        if not isinstance(quantity, int):
            raise HTTPException(status_code=422, detail="Invalid quantity value")
    
        with db.begin():
            # Find the InstrumentsAndProcedures object that represents the relationship
            InstrumentsAndProcedures_entry = db.query(InstrumentsAndProcedures).filter(
                InstrumentsAndProcedures.procedure_id == procedure_id,
                InstrumentsAndProcedures.instrument_id == instrument_id,
            ).first()
    
            if InstrumentsAndProcedures_entry:
                # Update the quantity
                InstrumentsAndProcedures_entry.quantity = quantity
                db.commit()
                return {"message": "Instrument quantity updated successfully"}
            else:
                db.rollback()
                raise HTTPException(status_code=404, detail="Procedure or instrument not found")