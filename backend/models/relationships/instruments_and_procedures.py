from sqlalchemy.orm import relationship
from sqlalchemy import Table, Column, Integer, ForeignKey
from config.database import Base

# Define the table for the many-to-many relationship
instruments_and_procedures = Table(
    "instruments_and_procedures",
    Base.metadata,
    Column("instrument_id", Integer, ForeignKey("instruments.id")),
    Column("procedure_id", Integer, ForeignKey("procedures.id")),
)

