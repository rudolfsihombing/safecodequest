"""membuat kolom answer

Revision ID: d9d52ca81af4
Revises: bc4039f0aef0
Create Date: 2024-01-07 16:46:21.887014

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd9d52ca81af4'
down_revision = 'bc4039f0aef0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.add_column(sa.Column('answer', sa.String(length=250), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.drop_column('answer')

    # ### end Alembic commands ###
