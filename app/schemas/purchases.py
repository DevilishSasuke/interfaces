from pydantic import BaseModel, ConfigDict
from app.schemas.users import UserBase
from app.schemas.products import ProductBase

class PurchaseBase(BaseModel):
  product_id: int
  quantity: int = 1

class PurchaseS(PurchaseBase):
  model_config = ConfigDict(from_attributes=True)
  id: int
  user_id: int
  user: UserBase
  product: ProductBase

class PurchaseAdd(PurchaseBase):
  pass

class PurchaseUpd(PurchaseBase):
  id: int