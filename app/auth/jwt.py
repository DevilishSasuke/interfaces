from fastapi import HTTPException
from datetime import datetime, timedelta, timezone
from app.config import Settings
from jose import jwt, JWTError
from app.auth.security import validate_role
from app.auth.schemas import Token

# общая логика создания токенов
async def create_token(user_data: dict, token_type: str, expires_delta: timedelta):
    validate_role(user_data["role"])
    to_encode = user_data.copy()

    expire_time = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire_time, "type": token_type})

    return jwt.encode(to_encode, Settings.SECRET_KEY, algorithm=Settings.ALGORITHM)

async def create_access_token(user_data: dict, expires_delta: timedelta | None = None):
    if not expires_delta:
        expires_delta = timedelta(minutes=Settings.ACCESS_TOKEN_EXPIRES_MIN)
    return await create_token(user_data, "access", expires_delta)

async def create_refresh_token(user_data: dict, expires_delta: timedelta | None = None):
    if not expires_delta:
        expires_delta = timedelta(days=Settings.REFRESH_TOKEN_EXPIRES_DAY)
    return await create_token(user_data, "refresh", expires_delta)

async def decode_token(token: str, token_type: str) -> Token | None:
    try:
        payload = jwt.decode(token, Settings.SECRET_KEY, algorithms=Settings.ALGORITHM)
        if payload.get("type") != token_type:
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        username = payload.get("sub")
        role = payload.get("role") 
        
        if not username:
            raise HTTPException(status_code=401, detail="No such a user")

        validate_role(role)  
      
        return Token(username=username, role=role, type=token_type)
    
    except JWTError:
        raise HTTPException(status_code=401, detail=f"Invalid or expired {token_type} token")

async def decode_access_token(token: str) -> Token | None:
    return await decode_token(token, "access")

async def decode_refresh_token(token: str) -> Token | None:
    return await decode_token(token, "refresh")
