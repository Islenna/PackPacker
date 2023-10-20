from pydantic import BaseModel, model_validator
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session
from models.Instrument import instrument_name_exists_in_database
from typing import List

class InstrumentBase(BaseModel):
    name: str
    description: str
    img_url: str
    manufacturer: Optional[str] = None
    serial_number:Optional[str] = None

class InstrumentCreate(BaseModel):
    name: str
    description: Optional[str] = None
    onHand: Optional[int] = None
    img_url: Optional[str] = None
    manufacturer: Optional[str] = None
    serial_number:Optional[str] = None

class InstrumentResponse(InstrumentBase):
    id: int
    onHand: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    quantity: Optional[int] = None
    
    class Config:
        orm_mode = True

class InstrumentUpdate(InstrumentBase):
    pass

class PaginatedInstrumentResponse(BaseModel):
    instruments: List[InstrumentResponse]
    page: int
    total_pages: int
    total_records: int

class BulkAddInstrumentsRequest(BaseModel):
    instruments: List[int]

class MessageResponse(BaseModel):
    message: str