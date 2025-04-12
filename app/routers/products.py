from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select
from typing import Annotated

from app.database import get_db_session
from app.schemas.products import *
from app.models.products import Product
from app.auth.security import require_manager


router = APIRouter(prefix='/products', tags=["Products"])

@router.get("/", summary="get products with pagination and search")
async def get_products(db: AsyncSession = Depends(get_db_session),
                        name: Annotated[str | None, Query(max_length=50)] = None,
                        min_price: Annotated[float | None, Query(ge=0)] = None,
                        max_price: Annotated[float | None, Query(ge=0)] = None,
                        skip: Annotated[int, Query(ge=0)] = 0,
                        limit: Annotated[int, Query(ge=1, le=50)] = 10,
                        ) -> list[ProductS]:
    
  query = select(Product).options(joinedload(Product.category), joinedload(Product.brand))

  if name:
    query = query.where(Product.name.ilike(f"%{name}%"))

  if min_price:
    query = query.where(Product.price >= min_price)

  if max_price:
    query = query.where(Product.price <= max_price)

  query = query.limit(limit).offset(skip)

  result = await db.execute(query)
  return result.scalars().all()

@router.get("/all", summary="get all products")
async def get_all_products(db: AsyncSession = Depends(get_db_session)) -> list[ProductS]:
  result = await db.execute(select(Product)
                            .options(joinedload(Product.category), 
                                     joinedload(Product.brand)))
  return result.scalars().all()

@router.get("/{product_id}", summary="get one product data")
async def get_one_product(product_id: int, 
                          db: AsyncSession = Depends(get_db_session)) -> ProductS:
  result = await db.execute(
        select(Product)
        .options(
            joinedload(Product.category),
            joinedload(Product.brand)
        )
        .where(Product.id == product_id)
    )
  db_product = result.scalar_one_or_none()
  if not db_product:
    raise HTTPException(status_code=404, detail="Product not found")
  return db_product

@router.post("/", summary="add new product")
async def add_new_product(product: ProductAdd, 
                          db: AsyncSession = Depends(get_db_session), 
                          user = Depends(require_manager)) -> ProductS:
  db_product = Product(**product.model_dump())
  db.add(db_product)
  await db.commit()
  await db.refresh(db_product)
  return db_product

@router.put("/", summary="update product")
async def update_product(product: ProductUpd, 
                         db: AsyncSession = Depends(get_db_session), 
                         user = Depends(require_manager)) -> ProductS:
  db_product = await db.get(Product, product.id)

  if not db_product:
    raise HTTPException(status_code=404, detail="No such a product, can't update")
  
  for field, value in product.model_dump().items():
    if field != "id":
      setattr(db_product, field, value)

  db.add(db_product)
  await db.commit()
  await db.refresh(db_product)
  return db_product

@router.delete("/{product_id}", summary="delete some product")
async def delete_product(product_id: int, 
                         db: AsyncSession = Depends(get_db_session), 
                         user = Depends(require_manager)):
  db_product = await db.get(Product, product_id)
  product_name = db_product.name

  if not db_product:
    raise HTTPException(status_code=404, detail="Product not found")
  
  await db.delete(db_product)
  await db.commit()
  return {"detail": f"Product {product_name} with id {product_id} deleted"}