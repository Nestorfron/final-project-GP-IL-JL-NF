from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    is_brewer = db.Column(db.Boolean(), nullable=False)
    brewery = db.relationship('Brewery', backref='user', lazy=True)
    beers = db.relationship('Beer', backref='user', lazy=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "country": self.country,
            "is_brewer": self.is_brewer
            # do not serialize the password, its a security breach
        }
    
class Brewery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=True)
    history = db.Column(db.String(500), nullable=True)
    facebook_url = db.Column(db.String(120), nullable=True)
    instagram_url = db.Column(db.String(120), nullable=True)
    x_url = db.Column(db.String(120), nullable=True)
    picture_of_brewery_url = db.Column(db.String(250), nullable=True) 
    logo_of_brewery_url = db.Column(db.String(250), nullable=True) 
    beers = db.relationship('Beer', backref='brewery', lazy=True)
    events = db.relationship('Event', backref='brewery', lazy=True)



    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "address": self.addres,
            "history": self.history,
            "facebook_url": self.facebook_url,
            "instagram_url": self.instagram_url,
            "x_url": self.x_url,
            "picture_of_brewery_url": self.picture_of_brewery_url,
            "logo_of_brewery": self.logo_of_brewery_url
        }
    
class Beer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    bjcp_style = db.Column(db.String(120), nullable=False)
    IBUs = db.Column(db.String(120), nullable=False)
    volALC = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    picture_of_beer_url = db.Column(db.String(250), nullable=True) 


    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "brewery_id": self.brewery_id,
            "name": self.name,
            "bjcp_style": self.bjcp_style,
            "IBUs": self.IBUs,
            "volALC": self.volALC,
            "description": self.description,
            "picture_of_beer_url": self.picture_of_beer_url
            
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    picture_of_event_url = db.Column(db.String(250), nullable=True) 

    

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "brewery_id": self.brewery_id,
            "name": self.name,
            "description": self.description,
            "date": self.date,
            "picture_of_event_url": self.picture_of_event_url
        }




    
    