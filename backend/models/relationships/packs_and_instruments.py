from sqlalchemy.orm import relationship
from config.database import Base
from sqlalchemy.orm import relationship

class PacksAndInstruments(Base):

    packs = relationship("Pack", secondary=packs_and_instruments, back_populates="instruments")
    instruments = relationship("Instrument", secondary=packs_and_instruments, back_populates="packs")