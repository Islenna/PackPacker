# schemas/log_schemas.py
from pydantic import BaseModel
from datetime import datetime
from schemas.user_schemas import UserResponse
from typing import Optional

class ActivityLogResponse(BaseModel):
    id: int
    user_id: int
    user: Optional[UserResponse]
    action: str
    target_type: str
    target_id: int
    message: Optional[str]
    timestamp: datetime

    class Config:
        orm_mode = True
