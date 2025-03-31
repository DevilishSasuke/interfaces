from pydantic import BaseModel, ConfigDict

class CategoryS(BaseModel):
  model_config = ConfigDict(from_attributes=True)
  id: int
  name: str

class CategoryAdd(BaseModel):
  name: str

class CategoryUpd(BaseModel):
  name: str

class CategoryDel(BaseModel):
  id: int