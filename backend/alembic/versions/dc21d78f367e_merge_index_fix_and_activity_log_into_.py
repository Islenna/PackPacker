"""Merge index fix and activity log into one branch

Revision ID: dc21d78f367e
Revises: 7130199f62aa, a2904be15f41
Create Date: 2025-04-10 19:33:09.146336

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dc21d78f367e'
down_revision: Union[str, None] = ('7130199f62aa', 'a2904be15f41')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
