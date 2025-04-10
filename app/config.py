from pydantic_settings import BaseSettings, SettingsConfigDict
import os
from typing import List

class Settings(BaseSettings):
  DB_HOST: str
  DB_PORT: int
  DB_NAME: str
  DB_USER: str
  DB_PASSWORD: str
  SECRET_KEY: str
  ALGORITHM: str
  ACCESS_TOKEN_EXPIRES_MIN: int
  REFRESH_TOKEN_EXPIRES_DAY: int
  PERMITED_ROLES: List[str] = ["admin", "manager", "user"]
  model_config = SettingsConfigDict(
      env_file=os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
  )

settings = Settings()

def get_db_url():
   return (f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@"
            f"{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}")
