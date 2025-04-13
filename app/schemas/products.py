from typing import List
from pydantic import BaseModel, ConfigDict
from app.schemas.categories import CategoryBase
from app.schemas.brands import BrandBase
from app.schemas.images import ImageBase

class ProductBase(BaseModel):
  name: str
  desc: str
  price: float
  category_id: float
  brand_id: float

class ProductS(ProductBase):
  model_config = ConfigDict(from_attributes=True)
  id: int
  category: CategoryBase
  brand: BrandBase
  images: List[ImageBase] | None = None

class ProductAdd(ProductBase):
  pass

class ProductUpd(ProductBase):
  id: int