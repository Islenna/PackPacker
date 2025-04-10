from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from config.database import get_db
from models.Logging import ActivityLog
from models.User import User as UserModel
from utils.dependencies import get_current_user
from typing import List
from schemas.log_schemas import ActivityLogResponse
from models.Clinic import Clinic
from fastapi.exceptions import HTTPException

router = APIRouter(
    prefix="/logs",
    tags=["Activity Logs"],
)

# Get Activity Logs
@router.get("", response_model=List[ActivityLogResponse])
def get_logs(
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
    limit: int = 50,
):
    if user.role in ["admin", "superuser"]:
        # Admins and superusers get all logs
        return (
            db.query(ActivityLog)
            .options(joinedload(ActivityLog.user))
            .order_by(ActivityLog.timestamp.desc())
            .limit(limit)
            .all()
        )
    
    # Otherwise, deny access or return nothing
    raise HTTPException(status_code=403, detail="You do not have access to logs.")

