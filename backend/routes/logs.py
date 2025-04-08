from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from config.database import get_db
from models.Logging import ActivityLog
from models.User import User as UserModel
from utils.dependencies import get_current_user
from typing import List
from schemas.log_schemas import ActivityLogResponse
from models.Clinic import Clinic

router = APIRouter(
    prefix="/logs",
    tags=["Activity Logs"],
)
@router.get("", response_model=List[ActivityLogResponse])
def get_logs(
    db: Session = Depends(get_db),
    user: UserModel = Depends(get_current_user),
    limit: int = 50,
):
    clinic_ids = [clinic.id for clinic in user.clinics]
    return (
        db.query(ActivityLog)
        .options(joinedload(ActivityLog.user))  # This ensures `.user` is populated
        .join(UserModel)
        .filter(UserModel.clinics.any(Clinic.id.in_(clinic_ids)))
        .order_by(ActivityLog.timestamp.desc())
        .limit(limit)
        .all()
    )
