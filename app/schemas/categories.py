from pydantic import BaseModel, ConfigDict

class CategoryBase(BaseModel):
  name: str

class CategoryS(CategoryBase):
  model_config = ConfigDict(from_attributes=True)
  id: int

class CategoryAdd(CategoryBase):
  pass

class CategoryUpd(CategoryBase):
  id: int