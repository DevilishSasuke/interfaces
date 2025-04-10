from fastapi import Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy import select

from app.database import get_db_session
from app.models.users import User
from app.schemas.tokens import Token
from app.auth.jwt import decode_access_token

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def hash_password(password) -> str:
    return pwd_context.hash(password)

async def auth_user(username: str, password: str) -> User | None:
    user = await get_user(username)

    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    
    return user

async def get_user(username: str) -> User | None:
    async for db in get_db_session():
      user = await db.execute(select(User).where(User.username == username))

    if not User:
        return None
    
    return user.scalars().one_or_none()

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    payload: Token = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid access token")
    
    if not payload.username:
        raise HTTPException(status_code=401, detail="Token missing username")

    user = await get_user(payload.username)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user

def require_role(*roles: str):
    async def role_checker(request: Request):
        token = request.cookies.get("access_token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")

        payload = await decode_access_token(token)
        if payload.role not in roles:
            raise HTTPException(status_code=403, detail="Forbidden: insufficient permissions")

    return role_checker

require_manager = require_role("manager", "admin")
require_admin = require_role("admin")