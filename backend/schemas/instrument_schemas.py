from pydantic import BaseModel, model_validator
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session
from models.Instrument import instrument_name_exists_in_database

class InstrumentBase(BaseModel):
    name: str
    description: str
    img_url: str

class InstrumentCreate(InstrumentBase):
    pass

class InstrumentResponse(InstrumentBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class InstrumentUpdate(InstrumentBase):
    pass

