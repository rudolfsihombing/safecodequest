"""upgrade long text

Revision ID: b42fe0a1880a
Revises: be1910f7fde7
Create Date: 2024-02-18 15:32:27.770886

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b42fe0a1880a'
down_revision = 'be1910f7fde7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.alter_column('quest',
               existing_type=mysql.LONGTEXT(),
               type_=sa.String(length=10000000),
               existing_nullable=False)
        batch_op.drop_column('gpt_solution')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('challenge', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gpt_solution', mysql.VARCHAR(length=250), nullable=True))
        batch_op.alter_column('quest',
               existing_type=sa.String(length=10000000),
               type_=mysql.LONGTEXT(),
               existing_nullable=False)

    # ### end Alembic commands ###
