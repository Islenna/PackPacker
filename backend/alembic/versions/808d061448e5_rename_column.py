"""rename_column

Revision ID: 808d061448e5
Revises: 6a50563eb679
Create Date: 2023-10-20 10:15:00.500006

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '808d061448e5'
down_revision: Union[str, None] = '6a50563eb679'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # You should replace sa.String() with the actual type of the 'image' and 'notes' columns.
    op.alter_column('packs', 'image', new_column_name='img_url', existing_type=sa.String(255), type_=sa.String(255))
    op.alter_column('packs', 'notes', new_column_name='description', existing_type=sa.String(255), type_=sa.String(255))


def downgrade() -> None:
    # Reverse the operations, with the correct types
    op.alter_column('packs', 'img_url', new_column_name='image', existing_type=sa.String(255), type_=sa.String(255))
    op.alter_column('packs', 'description', new_column_name='notes', existing_type=sa.String(255), type_=sa.String(255))
