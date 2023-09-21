from fastapi import FastAPI


app = FastAPI()






# *** ROUTE IMPORTS*** #

from routes.users import router as UserRouter
from routes.clinics import router as ClinicRouter
from routes.packs import router as PackRouter
from routes.instruments import router as InstrumentRouter
# from routes.procedures import router as ProcedureRouter

# *** ROUTES *** #
app.include_router(UserRouter)
app.include_router(ClinicRouter)
app.include_router(PackRouter)
app.include_router(InstrumentRouter)
# app.include_router(ProcedureRouter)

