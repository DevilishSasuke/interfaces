from typing import TYPE_CHECKING

from app.database import Base, int_pk, str_uniq
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, Float

if TYPE_CHECKING:
  from app.models.categories import Category
  from app.models.brands import Brand
  from app.models.images import Image

class Product(Base):
  __tablename__ = "products"

  id: Mapped[int_pk]
  name: Mapped[str_uniq]
  desc: Mapped[str] = mapped_column(String(255))
  price: Mapped[float] = mapped_column(Float, nullable=False)
  category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
  brand_id: Mapped[int] = mapped_column(ForeignKey("brands.id"))

  images: Mapped[list["Image"]] = relationship("Image", back_populates="product")
  category: Mapped["Category"] = relationship("Category", back_populates="products")
  brand: Mapped["Brand"] = relationship("Brand", back_populates="products")