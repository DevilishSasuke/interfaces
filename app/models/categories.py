from typing import TYPE_CHECKING

from app.database import Base, int_pk, str_uniq
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

if TYPE_CHECKING:
  from app.models.products import Product

class Category(Base):
  __tablename__ = "categories"

  id: Mapped[int_pk]
  name: Mapped[str_uniq] = mapped_column(String(63))

  products: Mapped[list["Product"]] = relationship(back_populates="category")
