from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy import select
from app.database import get_db_session
from app.models.users import User
from app.config import Settings

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

async def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def get_password_hash(password) -> str:
    return pwd_context.hash(password)

async def auth_user(username: str, password: str) -> User | None:
    user = get_user(username)

    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    
    return user

async def get_user(username: str) -> User | None:
    db = get_db_session()
    user = await db.execute(select(User).where(User.username == username))
    return user.scalars().one_or_none()

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    pass

async def validate_role(role: str | None):
    if not role or role not in Settings.PERMITED_ROLES:
        raise HTTPException(status_code=401, detail="Role is invalid")