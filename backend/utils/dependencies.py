from fastapi import Depends, HTTPException, status, Cookie
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from config.database import get_db
from models.User import User as UserModel
from utils.auth import SECRET_KEY, ALGORITHM

bearer_scheme = HTTPBearer(auto_error=False) 
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme), db: Session = Depends(get_db)):
    if not credentials:
        raise HTTPException(status_code=403)

    if credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=403)
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=403)
    except JWTError as e:
        raise HTTPException(status_code=403)

    user = db.query(UserModel).filter(UserModel.email == email).first()
    if user is None:
        raise HTTPException(status_code=403)

    return user

def get_current_refresh_token(refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
    return refresh_token

