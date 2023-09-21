from pydantic import BaseModel
from datetime import datetime
from typing import Optional

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

