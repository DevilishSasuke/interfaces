"""reverse of last commit

Revision ID: bfc860743ce2
Revises: 0b2986b3623f
Create Date: 2025-04-08 21:05:24.367365

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bfc860743ce2'
down_revision: Union[str, None] = '0b2986b3623f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('images', sa.Column('product_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'images', 'products', ['product_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'images', type_='foreignkey')
    op.drop_column('images', 'product_id')
    # ### end Alembic commands ###
