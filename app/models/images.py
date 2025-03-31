from typing import TYPE_CHECKING

from app.database import Base, int_pk
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

if TYPE_CHECKING:
  from app.models.products import Product

class Image(Base):
  __tablename__ = "images"

  id: Mapped[int_pk]
  path: Mapped[str]
  product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))

  products: Mapped[list["Product"]] = relationship(back_populates="images")
