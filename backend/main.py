from fastapi import FastAPI


app = FastAPI()






# *** ROUTE IMPORTS*** #

from routes.users import router as UserRouter
from routes.clinics import router as ClinicRouter
from routes.packs import router as PackRouter
from routes.instruments import router as InstrumentRouter
from routes.procedures import router as ProcedureRouter

# *** ROUTES *** #
app.include_router(UserRouter,prefix="/api", tags=["Users"])
app.include_router(ClinicRouter, prefix="/api", tags=["Clinics"])
app.include_router(PackRouter, prefix="/api", tags=["Packs"])
app.include_router(InstrumentRouter, prefix="/api", tags=["Instruments"])
app.include_router(ProcedureRouter, prefix="/api", tags=["Procedures"])

