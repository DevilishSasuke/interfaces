from typing import TYPE_CHECKING

from app.database import Base, int_pk, str_uniq, str_not_null
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String

if TYPE_CHECKING:
  from app.models.purchases import Purchase

class User(Base):
  __tablename__ = "users"

  id: Mapped[int_pk]
  username: Mapped[str_uniq]
  password: Mapped[str_not_null]
  role: Mapped[str_not_null] = mapped_column(String(63), default="user")

  purchases: Mapped["Purchase"] = relationship("Purchase", back_populates="user")
