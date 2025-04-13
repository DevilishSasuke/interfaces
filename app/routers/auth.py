from fastapi import APIRouter, Depends, HTTPException, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db_session
from app.auth.jwt import *
from app.auth.security import *
from app.models.users import User
from app.schemas.users import UserS, UserLogin
from app.config import Settings


router = APIRouter(prefix='/auth', tags=["Authentification"])
settings = Settings()

@router.post("/token", summary="Login and get tokens")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
  user = await get_user(form_data.username)

  if not user or not await verify_password(form_data.password, user.password):
    raise HTTPException(status_code=401, detail="Incorrect username or password")
  
  user_data = {"sub": user.username, "role": user.role}
  access_token = await create_access_token(user_data)
  refresh_token = await create_refresh_token(user_data)

  response.set_cookie(
    key="refresh_token",
    value=refresh_token,
    httponly=True,
    secure=True,
    samesite="none",
    max_age = settings.REFRESH_TOKEN_EXPIRES_DAY * 24 * 60 * 60
    )

  return { "access_token": access_token, "token_type": "bearer"}

@router.post("/register", summary="Register new user")
async def register_user(user: UserLogin, db: AsyncSession = Depends(get_db_session)) -> UserS:
  existing_user = await get_user(user.username)
  if existing_user:
    raise HTTPException(status_code=400, detail="Username already registered")

  user.password = await hash_password(user.password)

  db_user = User(username=user.username,
                 password=user.password)
  
  db.add(db_user)
  await db.commit()
  await db.refresh(db_user)

  return db_user

@router.post("/refresh", summary="Refresh access token")
async def refresh_token(request: Request, response: Response):
  refresh_token = request.cookies.get("refresh_token")
  if not refresh_token:
    raise HTTPException(status_code=401, detail="Refresh token was not found in cookies")
  
  payload = await decode_refresh_token(refresh_token)
  user_data = {"sub": payload.username, "role": payload.role}
  
  new_access_token = await create_access_token(user_data)
  new_refresh_token = await create_refresh_token(user_data)

  response.set_cookie(
    key="refresh_token",
    value=new_refresh_token,
    httponly=True,
    secure=True,
    samesite="none",
    max_age = settings.REFRESH_TOKEN_EXPIRES_DAY * 24 * 60 * 60
    )
  
  return {"access_token": new_access_token, "token_type": "bearer"}

@router.post("/logout", summary="Logout and delete tokens from cookies")
async def logout(response: Response):
  response.delete_cookie("refresh_token")
  return {"detail": "Successfully logged out"}

  