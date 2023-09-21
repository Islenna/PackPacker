from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ClinicBase(BaseModel):
    name: str
    address: str
    phone: str
    email: EmailStr

class ClinicCreate(ClinicBase):
    pass

class ClinicResponse(ClinicBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ClinicUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class ClinicDelete(ClinicBase):
    pass
