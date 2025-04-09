from fastapi import HTTPException
from datetime import datetime, timedelta
from app.config import Settings
from jose import jwt, JWTError
from app.auth.security import validate_role

def create_access_token(user_data: dict, expires_delta: timedelta | None = None):
    validate_role(user_data["role"])

    expire_time = datetime.now() + (expires_delta or timedelta(minutes=Settings.ACCESS_TOKEN_EXPIRES_MIN))
    user_data.update({"exp": expire_time})

    return jwt.encode(user_data, Settings.SECRET_KEY, algorithm=Settings.ALGORITHM)

def decode_access_token(token: str) -> dict | None:
    try:
        decoded_token = jwt.decode(token, Settings.SECRET_KEY, algorithm=Settings.ALGORITHM)
        username = decoded_token.get("sub")
        role = decoded_token.get("role") 
        
        if not username:
            raise HTTPException(status_code=401, detail="No such a user")

        validate_role(role)
        return decoded_token
        
    except JWTError:
        return None