from pydantic import BaseModel, ConfigDict

class ImageS(BaseModel):
  model_config = ConfigDict(from_attributes=True)
  id: int
  path: str

class ImageAdd(BaseModel):
  path: str

class ImageUpd(BaseModel):
  path: str

class ImageDel(BaseModel):
  id: int