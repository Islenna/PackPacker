from sqlalchemy import Table, Column, Integer, ForeignKey
from config.database import Base

# For the, "table", many-to-many relationship between packs and instruments.
packs_and_instruments  = Table(
    "packs_and_instruments",
    Base.metadata,
    Column("pack_id", Integer, ForeignKey("packs.id")),
    Column("instrument_id", Integer, ForeignKey("instruments.id")),
    Column("quantity", Integer, default=1),
)
