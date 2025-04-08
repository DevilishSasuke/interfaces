from pydantic import BaseModel, ConfigDict

class ProductBase(BaseModel):
  name: str
  desc: str
  price: float
  category_id: float
  brand_id: float

class ProductS(ProductBase):
  model_config = ConfigDict(from_attributes=True)
  id: int

class ProductAdd(ProductBase):
  pass

class ProductUpd(ProductBase):
  id: int