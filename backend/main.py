from fastapi import FastAPI, Request
from config.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from utils.seed_superuser import seed_superuser
from fastapi.staticfiles import StaticFiles
from pathlib import Path

# Models
from models.User import User
from models.Clinic import Clinic
from models.Pack import Pack
from models.Instrument import Instrument
from models.Procedure import Procedure

# Static path setup
BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
IMAGES_DIR = STATIC_DIR / "images"
import os


# Ensure static and images directories exist
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

# Initialize app
app = FastAPI()

# Hello world route
@app.get("/")
def root():
    return {"message": "Hello from PackPacker!"}

# Mount static directory
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Create tables
Base.metadata.create_all(bind=engine)

# Seed superuser
@app.on_event("startup")
def startup_event():
    seed_superuser()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Import routes
from routes.users import router as UserRouter
from routes.clinics import router as ClinicRouter
from routes.packs import router as PackRouter
from routes.instruments import router as InstrumentRouter
from routes.procedures import router as ProcedureRouter
from routes.relationships import router as RelationshipRouter
from routes.uploads import router as UploadRouter

# Register routes
app.include_router(UserRouter, prefix="/api", tags=["Users"])
app.include_router(ClinicRouter, prefix="/api", tags=["Clinics"])
app.include_router(PackRouter, prefix="/api", tags=["Packs"])
app.include_router(InstrumentRouter, prefix="/api", tags=["Instruments"])
app.include_router(ProcedureRouter, prefix="/api", tags=["Procedures"])
app.include_router(RelationshipRouter, prefix="/api", tags=["Relationships"])
app.include_router(UploadRouter, prefix="/api", tags=["Uploads"])
