"""change procedure name unique index to composite with clinic_id"""
from alembic import op

revision = '7130199f62aa'
down_revision = '6a50563eb679'
branch_labels = None
depends_on = None

def upgrade():
    # PROCEDURES: Drop old index on name and add composite unique index
    op.drop_index('ix_procedures_name', table_name='procedures')
    op.create_index(
        'ix_procedures_name_clinic',
        'procedures',
        ['name', 'clinic_id'],
        unique=True
    )

    # PACKS: Drop old index on name and add composite unique index
    op.drop_index('ix_packs_name', table_name='packs')
    op.create_index(
        'ix_packs_name_clinic',
        'packs',
        ['name', 'clinic_id'],
        unique=True
    )


def downgrade():
    # Reverse for PROCEDURES
    op.drop_index('ix_procedures_name_clinic', table_name='procedures')
    op.create_index(
        'ix_procedures_name',
        'procedures',
        ['name'],
        unique=True
    )

    # Reverse for PACKS
    op.drop_index('ix_packs_name_clinic', table_name='packs')
    op.create_index(
        'ix_packs_name',
        'packs',
        ['name'],
        unique=True
    )
