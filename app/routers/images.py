from fastapi import APIRouter, Depends, HTTPException, UploadFile, \
                    File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select

from app.database import get_db_session
from app.schemas.images import *
from app.models.images import Image
from app.models.products import Product
from app.auth.security import require_manager

import shutil
import uuid
import os

router = APIRouter(prefix='/images', tags=["Images"])

@router.get("/", summary="get all images")
async def get_all_images(db: AsyncSession = Depends(get_db_session)) -> list[ImageS]:
  query = select(Image) \
            .options(joinedload(Image.product))
  result = await db.execute(query)
  return result.scalars().all()

@router.get("/{image_id}", summary="get all images")
async def get_all_images(image_id: int,
                         db: AsyncSession = Depends(get_db_session)) -> list[ImageS]:
  query = select(Image) \
          .options(joinedload(Image.product)) \
          .where(Image.id == image_id)

  result = await db.execute(query)
  return result.scalar_one_or_none()

MAX_FILE_SIZE = 1024 * 1024 * 5
@router.post("/upload")
async def upload_img(file: UploadFile = File(...),
                     product_id: int = Form(...),
                     db: AsyncSession = Depends(get_db_session), 
                     user = Depends(require_manager)) -> ImageBase:
  if file.content_type not in ["image/jpeg", "image/png"]:
    raise HTTPException(status_code=400, detail="Wrong file type")
  
  if file.size > MAX_FILE_SIZE:
    raise HTTPException(status_code=400, detail="Wrong file size")
  
  db_product = (await db.get(Product, product_id))

  if not db_product:
    raise HTTPException(status_code=400, detail="Picked product doesn't exist")

  filename = f"{str(uuid.uuid4())}.{file.filename.split('.')[-1]}"

  dir_path = f"./static/images"

  os.makedirs(dir_path, exist_ok=True)

  with open(os.path.join(dir_path, filename), "xb") as buffer:
        shutil.copyfileobj(file.file, buffer)

  db_image = Image(path=f"/static/images/{filename}", product_id=product_id)

  db.add(db_image)
  await db.commit()
  await db.refresh(db_image)

  return db_image

@router.put("/", summary="update image")
async def update_image(image: ImageUpd, 
                       db: AsyncSession = Depends(get_db_session), 
                       user = Depends(require_manager)) -> ImageS:
  db_image = await db.get(Image, image.id)

  if not db_image:
    raise HTTPException(status_code=404, detail="No such a image, can't update")
  
  db_image.path = image.path

  db.add(db_image)
  await db.commit()
  await db.refresh(db_image)
  return db_image

@router.delete("/{image_id}", summary="delete some image")
async def delete_image(image_id: int, 
                       db: AsyncSession = Depends(get_db_session), 
                       user = Depends(require_manager)):
  db_image = await db.get(Image, image_id)
  img_path = db_image.path
  product_id = db_image.product_id

  if not db_image:
    raise HTTPException(status_code=404, detail="Image not found")
  
  await db.delete(db_image)
  await db.commit()
  return {"detail": f"Image {img_path} with id {image_id} deleted (product id: {product_id})"}
