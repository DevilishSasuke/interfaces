from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routers import products, categories, brands, images, auth
from app.database import init_db

from fastapi import Depends, APIRouter
from app.auth.security import oauth2_scheme


@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_db()
  yield


app = FastAPI(lifespan=lifespan)

@app.get("/")
def home():
  return "this is homepage"

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(brands.router)
app.include_router(images.router)
app.include_router(auth.router)

# тестирование авторизации через docs
test_router = APIRouter(prefix='/profile', tags=["test"])
@test_router.get("/")
async def get_profile(token: str = Depends(oauth2_scheme)):
    return {"token": token}

app.include_router(test_router)