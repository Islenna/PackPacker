from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from config.database import get_db
from models.User import User as UserModel
from schemas.user_schemas import UserCreate, UserResponse

router = APIRouter()

#Register a new user
@router.post("/user/new", response_model=UserResponse, status_code = status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserModel(email = user.email, password = user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
    

#Login an existing user
@router.post("/user/login", response_model=UserResponse)
def login_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "User not found")
    if db_user.password != user.password:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Incorrect password")
    return db_user

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
    db_user.password = user.password
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

