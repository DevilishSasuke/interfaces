from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.users import *
from app.models.users import User
from app.auth.security import require_admin, \
  hash_password, get_user, get_current_user

router = APIRouter(prefix='/users', tags=["Users"]) #, dependencies=[Depends(require_admin)])

@router.get("/", summary="get all users")
async def get_all_users(db: AsyncSession = Depends(get_db_session)) -> list[UserS]:
  result = await db.execute(select(User))
  return result.scalars().all()

@router.get("/me", summary="get current user")
async def get_me(current_user: User = Depends(get_current_user)):
  return current_user

@router.get("/{username}", summary="get one user data")
async def get_one_user(username: str) -> UserS:
  user = await get_user(username)
  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  return user

@router.post("/", summary="add new user")
async def add_new_user(user: UserAdd, 
                        db: AsyncSession = Depends(get_db_session)) -> UserS:
  existing_user = await get_user(user.username)
  if existing_user:
    raise HTTPException(status_code=400, detail="Username already registered")

  user.password = await hash_password(user.password)

  db_user = User(username=user.username,
                 password=user.password,
                 role=user.role)
  
  db.add(db_user)
  await db.commit()
  await db.refresh(db_user)

  return db_user

@router.put("/", summary="update user")
async def update_user(user: UserUpd, 
                       db: AsyncSession = Depends(get_db_session)) -> UserS:
  db_user = await get_user(user.username)
  if not db_user:
    raise HTTPException(status_code=404, detail="User not found")
  
  if user.password:
    db_user.password = await hash_password(user.password)
  if user.role:
    db_user.role = user.role 

  db.add(db_user)
  await db.commit()
  await db.refresh(db_user)
  return db_user


@router.delete("/{user_id}", summary="delete some user")
async def delete_user(user_id: int, 
                       db: AsyncSession = Depends(get_db_session)):
  db_user = await db.get(User, user_id)

  if not db_user:
    raise HTTPException(status_code=404, detail="User not found")
  
  await db.delete(db_user)
  await db.commit()
  return {"detail": f"User {db_user.username} with id {user_id} deleted"}
