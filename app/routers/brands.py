from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.brands import *
from app.models.brands import Brand
from app.auth.security import require_manager

router = APIRouter(prefix='/brands', tags=["Brands"])

@router.get("/", summary="get all brands")
async def get_all_brands(db: AsyncSession = Depends(get_db_session)) -> list[BrandS]:
  result = await db.execute(select(Brand))
  return result.scalars().all()

@router.get("/{brand_name}", summary="get one brand data")
async def get_one_brand(brand_name: str, 
                       db: AsyncSession = Depends(get_db_session)) -> BrandS:
  result = await db.execute(
        select(Brand)
        .where(Brand.name == brand_name)
    )
  db_brand = result.scalar_one_or_none()
  if not db_brand:
    raise HTTPException(status_code=404, detail="Brand not found")
  return db_brand

@router.post("/", summary="add new brand")
async def add_new_brand(brand: BrandAdd, 
                        db: AsyncSession = Depends(get_db_session), 
                        user = Depends(require_manager)) -> BrandS:
  db_brand = Brand(**brand.model_dump())
  db.add(db_brand)
  await db.commit()
  await db.refresh(db_brand)
  return db_brand

@router.put("/", summary="update brand")
async def update_brand(brand: BrandUpd, 
                       db: AsyncSession = Depends(get_db_session), 
                       user = Depends(require_manager)) -> BrandS:
  db_brand = await db.get(Brand, brand.id)

  if not db_brand:
    raise HTTPException(status_code=404, detail="No such a brand, can't update")
  
  db_brand.name = brand.name

  db.add(db_brand)
  await db.commit()
  await db.refresh(db_brand)
  return db_brand

@router.delete("/{brand_id}", summary="delete some brand")
async def delete_brand(brand_id: int, 
                       db: AsyncSession = Depends(get_db_session), 
                       user = Depends(require_manager)):
  db_brand = await db.get(Brand, brand_id)
  brand_name = db_brand.name

  if not db_brand:
    raise HTTPException(status_code=404, detail="Brand not found")
  
  await db.delete(db_brand)
  await db.commit()
  return {"detail": f"Brand {brand_name} with id {brand_id} deleted"}