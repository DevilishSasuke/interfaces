from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routers.products import router as router_product
from app.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_db()
  yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
def home():
  return "this is homepage"

app.include_router(router_product)