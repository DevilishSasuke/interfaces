from pydantic import BaseModel, ConfigDict

class UserBase(BaseModel):
  username: str
  role: str

class UserS(UserBase):
  model_config = ConfigDict(from_attributes=True)
  id: int

class UserAdd(UserBase):
  password: str

class UserLogin(BaseModel):
  username: str
  password: str