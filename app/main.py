from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return "this is homepage"