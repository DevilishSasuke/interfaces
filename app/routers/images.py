from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.images import *
from app.models.images import Image


router = APIRouter(prefix='/images', tags=["Images"])

@router.get("/", summary="get all images")
async def get_all_images(db: AsyncSession = Depends(get_db_session)) -> list[ImageS]:
  result = await db.execute(select(Image))
  return result.scalars().all()

@router.post("/", summary="add new image")
async def add_new_image(image: ImageAdd, db: AsyncSession = Depends(get_db_session)) -> ImageS:
  db_image = Image(**image.model_dump())
  db.add(db_image)
  await db.commit()
  await db.refresh(db_image)
  return db_image

@router.put("/", summary="update image")
async def update_image(image: ImageUpd, db: AsyncSession = Depends(get_db_session)) -> ImageS:
  db_image = await db.get(Image, image.id)

  if not db_image:
    raise HTTPException(status_code=404, detail="no such a image, can't update")
  
  for field, value in image.model_dump().items():
    if field != "id":
      setattr(db_image, field, value)

  await db.commit()
  await db.refresh(db_image)
  return db_image

@router.delete("/{image_id}", summary="delete some image")
async def delete_image(image_id: int, db: AsyncSession = Depends(get_db_session)):
  db_image = await db.get(Image, image_id)
  img_path = db_image.path
  product_id = db_image.product_id

  if not db_image:
    raise HTTPException(status_code=404, detail="no such a image, can't update")
  
  await db.delete(db_image)
  await db.commit()
  return {"detail": f"Image {img_path} with id {image_id} deleted (product id: {product_id})"}
