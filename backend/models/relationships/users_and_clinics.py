from sqlalchemy import Table, Column, Integer, ForeignKey
from config.database import Base

users_and_clinics = Table(
    "users_and_clinics",
    Base.metadata,
    Column("clinic_id", Integer, ForeignKey("clinics.id")),
    Column("user_id", Integer, ForeignKey("users.id")),
)
