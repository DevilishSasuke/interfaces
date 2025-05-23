"""deleted product reference in img

Revision ID: 0b2986b3623f
Revises: 6db2d963109d
Create Date: 2025-04-08 19:55:44.286325

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0b2986b3623f'
down_revision: Union[str, None] = '6db2d963109d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('brands', 'name',
               existing_type=sa.VARCHAR(length=63),
               type_=sa.String(length=62),
               existing_nullable=False)
    op.drop_constraint('images_product_id_fkey', 'images', type_='foreignkey')
    op.drop_column('images', 'product_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('images', sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('images_product_id_fkey', 'images', 'products', ['product_id'], ['id'])
    op.alter_column('brands', 'name',
               existing_type=sa.String(length=62),
               type_=sa.VARCHAR(length=63),
               existing_nullable=False)
    # ### end Alembic commands ###
