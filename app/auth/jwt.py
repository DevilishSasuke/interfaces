from fastapi import HTTPException
from datetime import datetime, timedelta, timezone
from app.config import Settings
from jose import jwt, JWTError
from app.schemas.tokens import Token

settings = Settings()

# общая логика создания токенов
async def create_token(user_data: dict, token_type: str, expires_delta: timedelta):
    validate_role(user_data["role"])
    to_encode = user_data.copy()

    expire_time = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire_time, "type": token_type})

    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def create_access_token(user_data: dict, expires_delta: timedelta | None = None):
    if not expires_delta:
        expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_MIN)
    return await create_token(user_data, "access", expires_delta)

async def create_refresh_token(user_data: dict, expires_delta: timedelta | None = None):
    if not expires_delta:
        expires_delta = timedelta(days=settings.REFRESH_TOKEN_EXPIRES_DAY)
    return await create_token(user_data, "refresh", expires_delta)

async def decode_token(token: str, token_type: str) -> Token | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
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

async def validate_role(role: str | None):
    if not role or role not in settings.PERMITED_ROLES:
        raise HTTPException(status_code=403, detail="Role is invalid")