from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routers import products, categories, brands, images
from app.database import init_db


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