from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    profile_picture= db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(180), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    rol = db.Column(db.String(120), nullable=False)

    brewery = db.relationship('Brewery', backref='owner', lazy=True)
    bars = db.relationship('Bar', backref='owner', lazy=True)
    beers = db.relationship('Beer', backref='creator', lazy=True)
    events = db.relationship('Event', backref='organizer', lazy=True)
    reviews = db.relationship('Review', backref='reviewer', lazy=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "country": self.country,
            "rol": self.rol,
            "username": self.username,
            "profile_picture": self.profile_picture
            # do not serialize the password, its a security breach
        }
    
class Brewery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=True)
    history = db.Column(db.Text, nullable=True)
    facebook_url = db.Column(db.String(120), nullable=True)
    instagram_url = db.Column(db.String(120), nullable=True)
    x_url = db.Column(db.String(120), nullable=True)
    picture_of_brewery_url = db.Column(db.String(250), nullable=False) 
    logo_of_brewery_url = db.Column(db.String(250), nullable=False) 
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    beers = db.relationship('Beer', backref='brewery', lazy=True)
    events = db.relationship('Event', backref='brewery', lazy=True)



    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "address": self.address,
            "history": self.history,
            "facebook_url": self.facebook_url,
            "instagram_url": self.instagram_url,
            "x_url": self.x_url,
            "picture_of_brewery_url": self.picture_of_brewery_url,
            "logo_of_brewery_url": self.logo_of_brewery_url,
            "lat": self.latitude,
            "lng": self.longitude
        }
        
class Bar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=True)
    history = db.Column(db.Text, nullable=True)
    facebook_url = db.Column(db.String(120), nullable=True)
    instagram_url = db.Column(db.String(120), nullable=True)
    x_url = db.Column(db.String(120), nullable=True)
    picture_of_bar_url = db.Column(db.String(250), nullable=False) 
    logo_of_bar_url = db.Column(db.String(250), nullable=False) 
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    beers = db.relationship('Beer', backref='bar', lazy=True)
    eventsBar = db.relationship('EventBar', backref='bar', lazy=True)
    

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "address": self.address,
            "history": self.history,
            "facebook_url": self.facebook_url,
            "instagram_url": self.instagram_url,
            "x_url": self.x_url,
            "picture_of_bar_url": self.picture_of_bar_url,
            "logo_of_bar_url": self.logo_of_bar_url,
            "lat": self.latitude,
            "lng": self.longitude
        }

    
class Beer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    

    name = db.Column(db.String(120), nullable=False)
    bjcp_style = db.Column(db.String(120), nullable=False)
    IBUs = db.Column(db.String(120), nullable=False)
    volALC = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    picture_of_beer_url = db.Column(db.String(250), nullable=True) 

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey('brewery.id'), nullable=True)
    bar_id = db.Column(db.Integer, db.ForeignKey('bar.id'), nullable=True)

    reviews = db.relationship('Review', backref='beer', lazy=True)


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
            "picture_of_beer_url": self.picture_of_beer_url,
      
            
        }
   
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
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

class EventBar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bar_id = db.Column(db.Integer, db.ForeignKey('bar.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    picture_of_event_url = db.Column(db.String(250), nullable=True) 

    

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "bar_id": self.bar_id,
            "name": self.name,
            "description": self.description,
            "date": self.date,
            "picture_of_event_url": self.picture_of_event_url
        }

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'), nullable=False)



    def __repr__(self):
        return f'<Review {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "beer_id": self.beer_id,
            "rating": self.rating,
            "comment": self.comment,
        }


    
    