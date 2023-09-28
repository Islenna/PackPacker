"""Add quantity to packs_and_instruments and instruments_and_procedures

Revision ID: a867d3bd5d86
Revises: 66cb4abe95a5
Create Date: 2023-09-27 22:05:58.117605

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'a867d3bd5d86'
down_revision: Union[str, None] = '66cb4abe95a5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        'packs_and_instruments',
        sa.Column('quantity', sa.Integer(), nullable=False, server_default='1')
    )

    # Add the 'quantity' column to the 'instruments_and_procedures' table
    op.add_column(
        'instruments_and_procedures',
        sa.Column('quantity', sa.Integer(), nullable=False, server_default='1')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('email', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('password', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('created_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_users_id', 'users', ['id'], unique=False)
    op.create_index('ix_users_email', 'users', ['email'], unique=False)
    op.create_table('clinics_and_procedures',
    sa.Column('clinic_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('procedure_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['clinic_id'], ['clinics.id'], name='clinics_and_procedures_ibfk_1'),
    sa.ForeignKeyConstraint(['procedure_id'], ['procedures.id'], name='clinics_and_procedures_ibfk_2'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('packs_and_instruments',
    sa.Column('pack_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('instrument_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['instrument_id'], ['instruments.id'], name='packs_and_instruments_ibfk_2'),
    sa.ForeignKeyConstraint(['pack_id'], ['packs.id'], name='packs_and_instruments_ibfk_1'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('users_and_clinics',
    sa.Column('clinic_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['clinic_id'], ['clinics.id'], name='users_and_clinics_ibfk_1'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='users_and_clinics_ibfk_2'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('packs_and_procedures',
    sa.Column('pack_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('procedure_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['pack_id'], ['packs.id'], name='packs_and_procedures_ibfk_1'),
    sa.ForeignKeyConstraint(['procedure_id'], ['procedures.id'], name='packs_and_procedures_ibfk_2'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('instruments',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('description', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('img_url', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('created_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.Column('onHand', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_instruments_name', 'instruments', ['name'], unique=False)
    op.create_index('ix_instruments_id', 'instruments', ['id'], unique=False)
    op.create_table('packs',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('created_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.Column('notes', mysql.VARCHAR(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_packs_name', 'packs', ['name'], unique=False)
    op.create_index('ix_packs_id', 'packs', ['id'], unique=False)
    op.create_table('procedures',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('description', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('created_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('instruments_and_procedures',
    sa.Column('instrument_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('procedure_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['instrument_id'], ['instruments.id'], name='instruments_and_procedures_ibfk_1'),
    sa.ForeignKeyConstraint(['procedure_id'], ['procedures.id'], name='instruments_and_procedures_ibfk_2'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('clinics',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('clinicLoc', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('phone', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('email', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('created_at', mysql.DATETIME(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('name', 'clinics', ['name'], unique=False)
    op.create_index('ix_clinics_id', 'clinics', ['id'], unique=False)
    # ### end Alembic commands ###