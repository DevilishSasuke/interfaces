from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Annotated

from app.database import get_db_session
from app.schemas.purchases import *
from app.models.purchases import Purchase
from app.models.products import Product
from app.models.users import User
from app.auth.security import require_manager, get_current_user


router = APIRouter(prefix="/purchase", tags=["Purchase"])

@router.get("/", summary="get all purchases")
async def get_all_purchases(db: AsyncSession = Depends(get_db_session), 
                         user = Depends(require_manager)) -> list[PurchaseS]:
  result = await db.execute(select(Purchase))
  return result.scalars().all()

@router.post("/", summary="add new purchase")
async def make_purchase(purchase: PurchaseAdd,
                        db: AsyncSession = Depends(get_db_session),
                        current_user: User = Depends(get_current_user)) -> PurchaseS:
  db_product = await db.get(Product, purchase.product_id)
  if not db_product:
    raise HTTPException(status_code=404, detail="Product not found")
  
  db_purchase = Purchase(
    user_id = current_user.id,
    product_id = purchase.product_id,
    quantity = purchase.quantity
  )

  db.add(db_purchase)
  await db.commit()
  await db.refresh(db_purchase)
  return db_purchase

@router.put("/", summary="update purchase")
async def update_purchase(purchase: PurchaseUpd, 
                          db: AsyncSession = Depends(get_db_session), 
                          user = Depends(require_manager)) -> PurchaseS:
  db_purchase: Purchase = db.get(Purchase, purchase.id)

  if not db_purchase:
    raise HTTPException(status_code=404, detail="No such a purchase, can't update")
  
  if purchase.product_id:
    db_purchase.product_id = purchase.product_id
  if purchase.quantity:
    db_purchase.quantity = purchase.quantity

  db.add(db_purchase)
  await db.commit()
  await db.refresh(db_purchase)
  return db_purchase
  

@router.delete("/{purchase_id}", summary="delete purchase")
async def delete_product(purchase_id: int, 
                         db: AsyncSession = Depends(get_db_session), 
                         user = Depends(require_manager)):
  db_purchase = await db.get(Purchase, purchase_id)
  if not db_purchase:
    raise HTTPException(status_code=404, detail="Purchase not found")
  
  await db.delete(db_purchase)
  await db.commit()
  return {"detail": f"Purchase with id {purchase_id} deleted"}