from app.database import Base, int_pk, str_uniq
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from app.models.product import Product

class Brand(Base):
  __tablename__ = "brands"

  id: Mapped[int_pk]
  name: Mapped[str_uniq] = mapped_column(String(63))

  products: Mapped[list[Product]] = relationship(back_populates="brand")