from pydantic import BaseModel, ConfigDict

class PurchaseBase(BaseModel):
  product_id: int
  quantity: int = 1

class PurchaseS(PurchaseBase):
  model_config = ConfigDict(from_attributes=True)
  id: int
  user_id: int 

class PurchaseAdd(PurchaseBase):
  pass

class PurchaseUpd(PurchaseBase):
  id: int