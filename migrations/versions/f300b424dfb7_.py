"""empty message

Revision ID: f300b424dfb7
Revises: 
Create Date: 2024-09-17 19:36:29.967976

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f300b424dfb7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('profile_picture', sa.String(length=250), nullable=False),
    sa.Column('password', sa.String(length=180), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=False),
    sa.Column('rol', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('bar',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.Column('history', sa.Text(), nullable=True),
    sa.Column('facebook_url', sa.String(length=120), nullable=True),
    sa.Column('instagram_url', sa.String(length=120), nullable=True),
    sa.Column('x_url', sa.String(length=120), nullable=True),
    sa.Column('picture_of_bar_url', sa.String(length=250), nullable=False),
    sa.Column('logo_of_bar_url', sa.String(length=250), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('brewery',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.Column('history', sa.Text(), nullable=True),
    sa.Column('facebook_url', sa.String(length=120), nullable=True),
    sa.Column('instagram_url', sa.String(length=120), nullable=True),
    sa.Column('x_url', sa.String(length=120), nullable=True),
    sa.Column('picture_of_brewery_url', sa.String(length=250), nullable=False),
    sa.Column('logo_of_brewery_url', sa.String(length=250), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('beer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('bjcp_style', sa.String(length=120), nullable=False),
    sa.Column('IBUs', sa.String(length=120), nullable=False),
    sa.Column('volALC', sa.String(length=120), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('picture_of_beer_url', sa.String(length=250), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('brewery_id', sa.Integer(), nullable=True),
    sa.Column('bar_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bar_id'], ['bar.id'], ),
    sa.ForeignKeyConstraint(['brewery_id'], ['brewery.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('brewery_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.Column('picture_of_event_url', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['brewery_id'], ['brewery.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event_bar',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('bar_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.Column('picture_of_event_url', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['bar_id'], ['bar.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bar_added_beer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bar_id', sa.Integer(), nullable=False),
    sa.Column('beer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['bar_id'], ['bar.id'], ),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('beer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    op.drop_table('bar_added_beer')
    op.drop_table('event_bar')
    op.drop_table('event')
    op.drop_table('beer')
    op.drop_table('brewery')
    op.drop_table('bar')
    op.drop_table('user')
    # ### end Alembic commands ###
