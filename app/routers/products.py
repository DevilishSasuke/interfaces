from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.products import *
from app.models.products import Product


router = APIRouter(prefix='/products', tags=["Products"])

@router.get("/", summary="get all products")
async def get_all_products(db: AsyncSession = Depends(get_db_session)) -> list[ProductS]:
  q = select(Product).limit(50)
  result = await db.execute(q)
  return result.scalars().all()

@router.post("/", summary="add new product", response_model=ProductS)
async def add_new_product(product: ProductAdd, db: AsyncSession = Depends(get_db_session)):
  db_product = Product(**product.model_dump())
  db.add(db_product)
  await db.commit()
  await db.refresh(db_product)
  return db_product