"""Add image column to packs and manufacturer, serial number to instruments

Revision ID: 6a50563eb679
Revises: a867d3bd5d86
Create Date: 2023-10-16 12:05:59.459239

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '6a50563eb679'
down_revision: Union[str, None] = 'a867d3bd5d86'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('packs', sa.Column('image', sa.String(length=255), nullable=True))
    op.add_column('instruments', sa.Column('manufacturer', sa.String(length=255), nullable=True))
    op.add_column('instruments', sa.Column('serial_number', sa.String(length=255), nullable=True))
    


def downgrade() -> None:
    with op.batch_alter_table('packs') as batch_op:
        batch_op.drop_column('image')

    with op.batch_alter_table('instruments') as batch_op:
        batch_op.drop_column('manufacturer')
        batch_op.drop_column('serial_number')
    # ### end Alembic commands ###
