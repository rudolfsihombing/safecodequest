"""menambah kolom gpt

Revision ID: 6a8f12795229
Revises: d9d52ca81af4
Create Date: 2024-02-15 11:19:14.695079

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a8f12795229'
down_revision = 'd9d52ca81af4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gpt_solution', sa.String(length=250), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.drop_column('gpt_solution')

    # ### end Alembic commands ###
