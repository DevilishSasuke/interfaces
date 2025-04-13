from typing import TYPE_CHECKING

from app.database import Base, int_pk
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import ForeignKey, Integer

if TYPE_CHECKING:
  from app.models.users import User
  from app.models.products import Product


class Purchase(Base):
  __tablename__ = "purchases"

  id: Mapped[int_pk]
  user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
  product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
  quantity: Mapped[int] = mapped_column(Integer, default=1)

  user: Mapped["User"] = relationship("User", back_populates="purchases", lazy="selectin")
  product: Mapped["Product"] = relationship("Product", back_populates="purchases", lazy="selectin")
