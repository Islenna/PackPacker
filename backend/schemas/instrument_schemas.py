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

class InstrumentCreate(BaseModel):
    name: str
    description: Optional[str] = None
    onHand: Optional[int] = None
    img_url: Optional[str] = None

class InstrumentResponse(InstrumentBase):
    id: int
    onHand: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class InstrumentUpdate(InstrumentBase):
    pass

class PaginatedInstrumentResponse(BaseModel):
    instruments: List[InstrumentResponse]
    page: int
    total_pages: int
    total_records: int