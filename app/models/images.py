from app.database import Base, int_pk
from sqlalchemy.orm import Mapped, relationship
from app.models.product import Product

class Image(Base):
  __tablename__ = "images"

  id: Mapped[int_pk]
  path: Mapped[str]

  products: Mapped[list[Product]] = relationship(back_populates="images")
