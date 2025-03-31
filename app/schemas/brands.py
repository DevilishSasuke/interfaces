from pydantic import BaseModel, ConfigDict

class BrandS(BaseModel):
  model_config = ConfigDict(from_attributes=True)
  id: int
  name: str

class BrandAdd(BaseModel):
  name: str

class BrandUpd(BaseModel):
  name: str

class BrandDel(BaseModel):
  id: int