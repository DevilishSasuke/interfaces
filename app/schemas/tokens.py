from pydantic import BaseModel

class Token(BaseModel):
    username: str | None = None
    role: str | None = None
    type: str | None = None