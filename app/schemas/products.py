from pydantic import BaseModel, ConfigDict

class ProductS(BaseModel):
  model_config = ConfigDict(from_attributes=True)
  id: int
  name: str
  desc: str
  price: float
  category_id: float
  brand_id: float

class ProductAdd(BaseModel):
  name: str
  desc: str
  price: float
  category_id: float
  brand_id: float

class ProductUpd(BaseModel):
  name: str
  desc: str
  price: float
  category_id: float
  brand_id: float

class ProductDel(BaseModel):
  id: int