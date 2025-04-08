from pydantic import BaseModel, ConfigDict

class BrandBase(BaseModel):
  name: str

class BrandS(BrandBase):
  model_config = ConfigDict(from_attributes=True)
  id: int

class BrandAdd(BrandBase):
  pass

class BrandUpd(BrandBase):
  id: int

class CategoryBase(BaseModel):
  name: str