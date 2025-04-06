from fastapi import FastAPI, Request
from config.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware



#models
from models.User import User
from models.Clinic import Clinic
from models.Pack import Pack
from models.Instrument import Instrument
from models.Procedure import Procedure

#Create tables
Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI()

# Logging Middleware — fully inside the function
@app.middleware("http")
async def log_headers(request: Request, call_next):
    print("📥 Incoming request headers:")
    for k, v in request.headers.items():
        print(f"{k}: {v}")

    print("🔍 Raw headers list:", request.headers.raw)
    
    if "authorization" not in request.headers:
        print("❗ Authorization header missing from request.headers")
    
    response = await call_next(request)
    return response


# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

# *** ROUTE IMPORTS*** #

from routes.users import router as UserRouter
from routes.clinics import router as ClinicRouter
from routes.packs import router as PackRouter
from routes.instruments import router as InstrumentRouter
from routes.procedures import router as ProcedureRouter
from routes.relationships import router as RelationshipRouter

# *** ROUTES *** #
app.include_router(UserRouter,prefix="/api", tags=["Users"])
app.include_router(ClinicRouter, prefix="/api", tags=["Clinics"])
app.include_router(PackRouter, prefix="/api", tags=["Packs"])
app.include_router(InstrumentRouter, prefix="/api", tags=["Instruments"])
app.include_router(ProcedureRouter, prefix="/api", tags=["Procedures"])
app.include_router(RelationshipRouter, prefix="/api", tags=["Relationships"])
