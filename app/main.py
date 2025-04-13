from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from fastapi.staticfiles import StaticFiles
from app.routers import products, categories, \
  brands, images, auth, users, purchases, notify_mng
from app.database import init_db

from fastapi import Depends, APIRouter
from app.auth.security import oauth2_scheme


@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_db()
  yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
  return "this is homepage"

app.mount("/static", StaticFiles(directory='static'), name='static')

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(brands.router)
app.include_router(images.router)
app.include_router(users.router)
app.include_router(purchases.router)
app.include_router(auth.router)
app.include_router(notify_mng.router)


# тестирование авторизации через docs
test_router = APIRouter(prefix='/profile', tags=["test"])
@test_router.get("/")
async def get_profile(token: str = Depends(oauth2_scheme)):
    return {"token": token}

app.include_router(test_router)