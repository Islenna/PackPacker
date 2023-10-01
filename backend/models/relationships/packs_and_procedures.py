from sqlalchemy import Table, Column, Integer, ForeignKey
from config.database import Base

# Define the table for the many-to-many relationship
packs_and_procedures = Table(
    "packs_and_procedures",
    Base.metadata,
    Column("pack_id", Integer, ForeignKey("packs.id")),
    Column("procedure_id", Integer, ForeignKey("procedures.id")),
)
