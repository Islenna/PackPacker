from .User import User
from .Clinic import Clinic
from .Instrument import Instrument
from .Pack import Pack
from .Procedure import Procedure

# Relationship tables
from .relationships.instruments_and_procedures import InstrumentsAndProcedures  
from .relationships.packs_and_procedures import PacksAndProcedures  
from .relationships.packs_and_instruments import PacksAndInstruments  
from .relationships.users_and_clinics import users_and_clinics  
