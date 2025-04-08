from pydantic import BaseModel, ConfigDict

class ImageBase(BaseModel):
  path: str
  product_id: int

class ImageS(ImageBase):
  model_config = ConfigDict(from_attributes=True)
  id: int

class ImageAdd(ImageBase):
  pass

class ImageUpd(ImageBase):
  id: int