from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.products import *
from app.models.products import Product


router = APIRouter(prefix='/products', tags=["Products"])

@router.get("/", summary="get all products")
async def get_all_products(db: AsyncSession = Depends(get_db_session)) -> list[ProductS]:
  result = await db.execute(select(Product))
  return result.scalars().all()

@router.post("/", summary="add new product")
async def add_new_product(product: ProductAdd, db: AsyncSession = Depends(get_db_session)) -> ProductS:
  db_product = Product(**product.model_dump())
  db.add(db_product)
  await db.commit()
  await db.refresh(db_product)
  return db_product

@router.put("/", summary="update product")
async def update_product(product: ProductUpd, db: AsyncSession = Depends(get_db_session)) -> ProductS:
  db_product = await db.get(Product, product,id)

  if not db_product:
    raise HTTPException(status_code=404, detail="no such a product, can't update")
  
  for field, value in product.model_dump().items():
    setattr(product, field, value)

  await db.commit()
  await db.refresh(db_product)
  return db_product

@router.delete("/{product_id}", summary="delete some product")
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db_session)):
  db_product = await db.get(Product, product_id)

  if not db_product:
    raise HTTPException(status_code=404, detail="no such a product, can't update")
  
  await db.delete(db_product)
  await db.commit()
  return {"detail": "Product deleted"}