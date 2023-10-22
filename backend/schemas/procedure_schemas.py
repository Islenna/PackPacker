#Procedure Schema
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ProcedureBase(BaseModel):
    name: str
    description: str
    
class ProcedureCreate(ProcedureBase):
    pass

class ProcedureResponse(ProcedureBase):

    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ProcedureUpdate(ProcedureBase):
    pass

class DeleteResponse(BaseModel):
    message: str
