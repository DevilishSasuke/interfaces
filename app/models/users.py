from app.database import Base, int_pk, str_uniq, str_not_null
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String

class User(Base):
  __tablename__ = "users"

  id: Mapped[int_pk]
  username: Mapped[str_uniq]
  password: Mapped[str_not_null]
  role: Mapped[str_not_null] = mapped_column(String(63), default="user")
