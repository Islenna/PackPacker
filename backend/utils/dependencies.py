from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from config.database import get_db
from models.User import User as UserModel
from utils.auth import SECRET_KEY, ALGORITHM

bearer_scheme = HTTPBearer(auto_error=False) 
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme), db: Session = Depends(get_db)):
    if not credentials:
        print("❌ No credentials")
        raise HTTPException(status_code=403)

    if credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=403)
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            print("❌ No sub in payload")
            raise HTTPException(status_code=403)
    except JWTError as e:
        print("❌ JWT error:", e)
        raise HTTPException(status_code=403)

    user = db.query(UserModel).filter(UserModel.email == email).first()
    print("🧍 Found user:", user)
    if user is None:
        print("❌ No user in DB")
        raise HTTPException(status_code=403)

    return user
