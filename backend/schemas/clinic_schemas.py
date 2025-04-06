from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ClinicBase(BaseModel):
    name: str
    location: Optional[str] = None
    phone: str
    email: EmailStr

class ClinicCreate(ClinicBase):
    pass

class ClinicResponse(ClinicBase):
    id: int
    name: str
    location: Optional[str] = None
    phone: str
    email: EmailStr
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ClinicUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class ClinicDelete(ClinicBase):
    pass
