from fastapi import APIRouter, HTTPException, Depends, status, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from config.database import get_db
from models.User import User as UserModel
from schemas.user_schemas import UserCreate, UserResponse, UserUpdate
from models.Clinic import Clinic
from utils.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token, 
    decode_refresh_token
)
from datetime import timedelta
from utils.dependencies import get_current_user, get_current_refresh_token
from typing import List
from jose import JWTError

router = APIRouter()
ACCESS_TOKEN_EXPIRE_MINUTES = 15

def require_superuser(user: UserModel = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Superuser access required")
    return user


# 🔐 Register User
@router.post("/user/register")
def create_user(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = hash_password(user.password)
    new_user = UserModel(email=user.email, password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": new_user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    refresh_token = create_refresh_token({"sub": new_user.email})
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="none",  # <-- instead of "strict"
        max_age=60 * 60 * 24 * 7
)


    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": new_user.id, "email": new_user.email, "role": new_user.role}
    }

# 🔐 Login User
@router.post("/user/login")
def login_user(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    refresh_token = create_refresh_token({"sub": db_user.email})
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=60 * 60 * 24 * 7,
        domain="packnest.net",
        path="/"
)


    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": db_user.id, "email": db_user.email, "role": db_user.role}
    }

# 🔄 Refresh Token
@router.post("/user/refresh")
def refresh_access_token(response: Response, refresh_token: str = Depends(get_current_refresh_token)):
    try:
        payload = decode_refresh_token(refresh_token)
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        new_token = create_access_token(data={"sub": email})
        return {"access_token": new_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

#Get all users
@router.get("/users", response_model=List[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    user: UserModel = Depends(require_superuser)
):
    return db.query(UserModel).all()

#Get a single user
@router.get("/user/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "User not found")
    return db_user

#Update a user
@router.patch("/user/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    db_user.email = user.email

    if user.password:
        db_user.password = hash_password(user.password)

    if user.role and current_user.role == "admin":
        db_user.role = user.role

    if user.clinic_ids is not None:
        db_user.clinics = db.query(Clinic).filter(Clinic.id.in_(user.clinic_ids)).all()

    db.commit()
    db.refresh(db_user)
    return db_user


#Logout user
@router.post("/user/logout")
def logout_user(response: Response):
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

#Get current user
@router.get("/user/me", response_model=UserResponse)
def read_users_me(current_user: UserModel = Depends(get_current_user)):
    return current_user

@router.delete("/user/{user_id}", response_class=JSONResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return {"message": "User successfully deleted"}
