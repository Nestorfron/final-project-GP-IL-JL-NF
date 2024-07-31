"""empty message

Revision ID: 6860748274a6
Revises: 
Create Date: 2024-07-30 17:14:09.185507

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6860748274a6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=180), nullable=False),
    sa.Column('is_brewer', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('brewery',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('addres', sa.String(length=120), nullable=True),
    sa.Column('history', sa.String(length=500), nullable=True),
    sa.Column('facebook_url', sa.String(length=120), nullable=True),
    sa.Column('instagram_url', sa.String(length=120), nullable=True),
    sa.Column('x_url', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('beer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('brewery_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('bjcp_style', sa.String(length=120), nullable=False),
    sa.Column('IBUs', sa.String(length=120), nullable=False),
    sa.Column('volALC', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.ForeignKeyConstraint(['brewery_id'], ['brewery.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('brewery_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.ForeignKeyConstraint(['brewery_id'], ['brewery.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('event')
    op.drop_table('beer')
    op.drop_table('brewery')
    op.drop_table('user')
    # ### end Alembic commands ###