from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from .clinic_schemas import ClinicResponse

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    role: Optional[str] = None
    clinics: Optional[List[ClinicResponse]] = None
    class Config:
        orm_mode = True

class UserUpdate(UserBase):
    password: Optional[str] = None
    role: Optional[str] = None
    clinic_ids: Optional[List[int]] = None
