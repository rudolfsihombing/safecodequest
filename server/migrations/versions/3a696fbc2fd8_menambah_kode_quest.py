"""menambah kode quest

Revision ID: 3a696fbc2fd8
Revises: b42fe0a1880a
Create Date: 2024-02-18 15:33:16.672673

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3a696fbc2fd8'
down_revision = 'b42fe0a1880a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.add_column(sa.Column('kode_quest', sa.String(length=10000000), nullable=False))
        batch_op.alter_column('quest',
               existing_type=mysql.LONGTEXT(),
               type_=sa.String(length=10000000),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.alter_column('quest',
               existing_type=sa.String(length=10000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)
        batch_op.drop_column('kode_quest')

    # ### end Alembic commands ###
