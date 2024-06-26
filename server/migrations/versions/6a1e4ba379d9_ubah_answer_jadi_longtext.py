"""Ubah answer jadi longtext

Revision ID: 6a1e4ba379d9
Revises: 4612afff17bd
Create Date: 2024-02-18 15:59:20.467511

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6a1e4ba379d9'
down_revision = '4612afff17bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.alter_column('quest',
               existing_type=mysql.LONGTEXT(),
               type_=sa.String(length=10000000),
               existing_nullable=False)
        batch_op.alter_column('answer',
               existing_type=mysql.VARCHAR(length=250),
               type_=sa.String(length=10000000),
               existing_nullable=False)
        batch_op.alter_column('kode_quest',
               existing_type=mysql.LONGTEXT(),
               type_=sa.String(length=10000000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.alter_column('kode_quest',
               existing_type=sa.String(length=10000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)
        batch_op.alter_column('answer',
               existing_type=sa.String(length=10000000),
               type_=mysql.VARCHAR(length=250),
               existing_nullable=False)
        batch_op.alter_column('quest',
               existing_type=sa.String(length=10000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)

    # ### end Alembic commands ###
