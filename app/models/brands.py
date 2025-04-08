from typing import TYPE_CHECKING

from app.database import Base, int_pk, str_uniq
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

if TYPE_CHECKING:
  from app.models.products import Product

class Brand(Base):
  __tablename__ = "brands"

  id: Mapped[int_pk]
  name: Mapped[str_uniq] = mapped_column(String(62))

  products: Mapped[list["Product"]] = relationship("Product", back_populates="brand")