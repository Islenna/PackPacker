# utils/activity_logger.py

from models.Logging import ActivityLog

def log_activity(db, user_id, action, target_type, target_id, message=None):
    log = ActivityLog(
        user_id=user_id,
        action=action,
        target_type=target_type,
        target_id=target_id,
        message=message
    )
    db.add(log)
    db.commit()
