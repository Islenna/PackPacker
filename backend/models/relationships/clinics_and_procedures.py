from sqlalchemy import Table, Column, Integer, ForeignKey
from config.database import Base

# Define the table for the many-to-many relationship
clinics_and_procedures = Table(
    "clinics_and_procedures",
    Base.metadata,
    Column("clinic_id", Integer, ForeignKey("clinics.id")),
    Column("procedure_id", Integer, ForeignKey("procedures.id")),
)
