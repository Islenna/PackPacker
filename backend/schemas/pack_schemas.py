from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PackBase(BaseModel):
    name: str

class PackCreate(PackBase):
    pass

class PackResponse(PackBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class PackUpdate(PackBase):
    pass

class PackDelete(PackBase):
    pass
