from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from schemas.instrument_schemas import InstrumentResponse

class PackBase(BaseModel):
    name: str
    img_url: Optional[str] = None

class PackCreate(PackBase):
    description: Optional[str] = None

class PackResponse(PackBase):
    id: int
    description: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


    class Config:
        orm_mode = True
        
class PacksWithInstrumentsResponse(PackBase):
    id: int
    description: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    instruments: Optional[List[InstrumentResponse]]

    class Config:
        orm_mode = True

class BulkAddPackRequest(BaseModel):
    packs: List[int]

class PackUpdate(PackBase):
    pass

class PackDelete(PackBase):
    pass
