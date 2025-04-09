from fastapi import APIRouter, Depends, HTTPException, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db_session
from app.auth.jwt import *
from app.auth.security import *
from app.models.users import User
from app.schemas.users import UserS, UserAdd
from app.config import Settings

router = APIRouter(prefix='/auth', tags=["Authentification"])

@router.post("/token", summary="Login and get tokens")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
  user = await get_user(form_data.username)

  if not user or not await verify_password(form_data.password, user.password):
    raise HTTPException(status_code=401, detail="Incorrect username or password")
  
  user_data = {"sub": user.username, "role": user.role}
  access_token = await create_access_token(user_data)
  refresh_token = await create_access_token(user_data)

  set_cookies(response, "access_token", access_token, Settings.ACCESS_TOKEN_EXPIRES_MIN * 60)
  set_cookies(response, "refresh_token", refresh_token, Settings.REFRESH_TOKEN_EXPIRES_DAY * 24 * 60 * 60)

  return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/register", summaтry="Register new user")
async def register_user(user: UserAdd, db: AsyncSession = Depends(get_db_session)) -> UserS:
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
    raise HTTPException(status_code=401, detail="refresh token was not found in cookies")
  
  payload = await decode_refresh_token(refresh_token)
  user_data = {"sub": payload.username, "role": payload.role}
  
  new_access_token = await create_access_token(user_data)
  new_refresh_token = await create_access_token(user_data)

  set_cookies(response, "access_token", new_access_token, Settings.ACCESS_TOKEN_EXPIRES_MIN * 60)
  set_cookies(response, "refresh_token", new_refresh_token, Settings.REFRESH_TOKEN_EXPIRES_DAY * 24 * 60 * 60)
  
  return {"access_token": new_access_token, "refresh_token": new_refresh_token}

@router.post("/logout", summary="Logout and delete tokens from cookies")
async def logout(response: Response):
  response.delete_cookie("access_token")
  response.delete_cookie("refresh_token")
  return {"detail": "Successfully logged out"}

async def set_cookies(response: Response, key: str, value, max_age):
  response.set_cookie(
    key=key,
    value=value,
    httponly=True,
    secure=True,
    samesite="Strict",
    max_age = max_age
    )
  