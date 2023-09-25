from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ClinicBase(BaseModel):
    name: str
    clinicLoc: str
    phone: str
    email: EmailStr

class ClinicCreate(ClinicBase):
    pass

class ClinicResponse(ClinicBase):
    id: int
    name: str
    clinicLoc: str
    phone: str
    email: EmailStr
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ClinicUpdate(BaseModel):
    name: Optional[str] = None
    clinicLoc: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class ClinicDelete(ClinicBase):
    pass
