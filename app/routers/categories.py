from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.categories import *
from app.models.categories import Category
from app.auth.security import require_manager


router = APIRouter(prefix='/categories', tags=["Categories"])

@router.get("/", summary="get all categories")
async def get_all_categories(db: AsyncSession = Depends(get_db_session)) -> list[CategoryS]:
  result = await db.execute(select(Category))
  return result.scalars().all()

@router.get("/{category_name}", summary="get one category data")
async def get_one_category(category_name: str, 
                       db: AsyncSession = Depends(get_db_session)) -> CategoryS:
  result = await db.execute(
        select(Category)
        .where(Category.name == category_name)
    )
  db_category = result.scalar_one_or_none()
  if not db_category:
    raise HTTPException(status_code=404, detail="Category not found")
  return db_category

@router.post("/", summary="add new category")
async def add_new_category(category: CategoryAdd, 
                           db: AsyncSession = Depends(get_db_session)) -> CategoryS:
  db_category = Category(**category.model_dump())
  db.add(db_category)
  await db.commit()
  await db.refresh(db_category)
  return db_category

@router.put("/", summary="update category")
async def update_category(category: CategoryUpd, 
                          db: AsyncSession = Depends(get_db_session), 
                          user = Depends(require_manager)) -> CategoryS:
  db_category = await db.get(Category, category.id)

  if not db_category:
    raise HTTPException(status_code=404, detail="No such a category, can't update")
  
  db_category.name = category.name

  db.add(db_category)
  await db.commit()
  await db.refresh(db_category)
  return db_category

@router.delete("/{category_id}", summary="delete some category")
async def delete_category(category_id: int, 
                          db: AsyncSession = Depends(get_db_session), 
                          user = Depends(require_manager)):
  db_category = await db.get(Category, category_id)
  category_name = db_category.name

  if not db_category:
    raise HTTPException(status_code=404, detail="Category not found")
  
  await db.delete(db_category)
  await db.commit()
  return {"detail": f"Category {category_name} with id {category_id} deleted"}
