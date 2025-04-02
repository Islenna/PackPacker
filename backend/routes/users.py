from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db
from models.User import User as UserModel
from schemas.user_schemas import UserCreate, UserResponse
from utils.auth import hash_password
from utils.auth import verify_password, create_access_token
from datetime import timedelta

router = APIRouter()

@router.post("/user/register")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
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
        expires_delta=timedelta(minutes=60)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email
        }
    }


#Login an existing user
@router.post("/user/login")
def login_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=timedelta(minutes=60)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "email": db_user.email
        }
    }


#Get all users
@router.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
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
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "User not found")
    db_user.email = user.email
    if user.password:
        db_user.password = hash_password(user.password)
    db.commit()
    db.refresh(db_user)
    return db_user

#Delete a user
@router.delete("/user/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User successfully deleted"}

