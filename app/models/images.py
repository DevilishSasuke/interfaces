from typing import TYPE_CHECKING

from app.database import Base, int_pk
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String

if TYPE_CHECKING:
  from app.models.products import Product

class Image(Base):
  __tablename__ = "images"

  id: Mapped[int_pk]
  path: Mapped[str] = mapped_column(String(255), nullable=False)
  product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))

  product: Mapped[list["Product"]] = relationship("Product", back_populates="images")
