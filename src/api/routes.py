"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Brewery, Bar, Beer, Event, Review, EventBar, BarAddedBeer
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import re 
email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


#Endpoint de registro de usuario

@api.route("/signup", methods=["POST"])
def handle_signup():
    body = request.json
    email = body.get("email", None)
    username = body.get("username", None)
    password = body.get("password", None)
    country = body.get("country", None)
    profile_picture = body.get("profile_picture", None)
    rol= body.get("rol", None)
   
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del email no es válido"}), 400
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "email ya esta siendo utilizado"}), 400
    if User.query.filter_by(username = username).first() is not None:
        return jsonify({"error": "username ya esta siendo utilizado"}), 400
    if email is None or password is None or country is None or rol is None:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    
    password_hash = generate_password_hash(password)
    try: 
        new_user = User(email = email, username = username, password = password_hash, country = country, profile_picture = profile_picture, rol = rol)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"user": new_user.serialize()}), 201
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500


#Endpoint de inicio de sesion

@api.route('/signin', methods=['POST'])
def handle_signin():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    if email is None or password is None:
        return jsonify({"error": "El email y password es requerido para iniciar sesión"}), 400    
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404    
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Se ha producido un error al iniciar sesión, intente nuevamente"}), 400   
    user_token = create_access_token({"id": user.id, "username": user.username, "country": user.country, "email": user.email, "profile_picture": user.profile_picture, "rol": user.rol})
    return jsonify({"token": user_token}), 200

#Endpoint obtener usuario logueado
@api.route('/me', methods=['GET'])
@jwt_required()
def get_user_data():
    user_data = get_jwt_identity()
    return jsonify(user_data), 200

#Endpoint editar usuario logueado
@api.route('/edit_user', methods=['PUT'])
@jwt_required()
def edit_user():
    try:
        body = request.json
        get_user_data = get_jwt_identity()
        user_id = get_user_data.get("id")
        user = User.query.get(user_id)
        if user is None:
            return jsonify({"error": "User not found"}), 404
        user.email = body.get("email", user.email)
        user.username = body.get("username", user.username)
        if "password" in body and body["password"]:
            user.password = generate_password_hash(body["password"])
        user.country = body.get("country", user.country)
        user.profile_picture = body.get("profile_picture", user.profile_picture)
        user.is_brewer = body.get("is_brewer", user.is_brewer) 
        db.session.add(user)
        db.session.commit() 
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500

#Endpoint para obtener username y profile_picture por user_id
@api.route('/users/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    if not users:
        return jsonify({"error": "Users not found"}), 404
    users_data = [
        {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "country": user.country,
            "profile_picture": user.profile_picture
        } for user in users
    ]
    return jsonify(users_data), 200


#Endpoint de POST de Nueva Cerveceria  (requiere token)

@api.route("/create_new_brewery", methods= ["POST"])
@jwt_required()
def create_new_brewery():
    body= request.json
    user_data= get_jwt_identity()
    name= body.get("name", None)
    address= body.get("address", None)
    history= body.get("history", None)
    facebook_url = body.get("facebook_url", None)
    instagram_url = body.get("instagram_url", None)
    x_url = body.get("x_url", None)
    picture_of_brewery_url =  body.get("picture_of_brewery_url", None)
    logo_of_brewery_url = body.get("logo_of_brewery_url", None)
    latitude = body.get("latitude",None)
    longitude = body.get("longitude",None)
    if name is None or picture_of_brewery_url is None or logo_of_brewery_url is None:
        return jsonify({"error": "Debes llenar al menos el nombre"}), 400
    try:
        new_brewery = Brewery(
        user_id=user_data["id"],
        name = name,
        address=address,
        history=history,
        facebook_url = facebook_url,
        instagram_url = instagram_url,
        x_url = x_url,
        picture_of_brewery_url = picture_of_brewery_url, 
        logo_of_brewery_url = logo_of_brewery_url,
        latitude = latitude,
        longitude = longitude )
        db.session.add(new_brewery)
        db.session.commit()
        db.session.refresh(new_brewery)
        return jsonify({"new_brewery": new_brewery.serialize()}), 201  
    except Exception as error:
        db.session.rollback()
        return jsonify({"error: f'{error}"}), 500

#Endpoint de POST de Nuevo Bar (requiere Token)

@api.route("/create_new_bar", methods= ["POST"])
@jwt_required()
def create_new_bar():
    body= request.json
    user_data= get_jwt_identity()
    name= body.get("name", None)
    address= body.get("address", None)
    history= body.get("history", None)
    facebook_url = body.get("facebook_url", None)
    instagram_url = body.get("instagram_url", None)
    x_url = body.get("x_url", None)
    picture_of_bar_url =  body.get("picture_of_bar_url", None)
    logo_of_bar_url = body.get("logo_of_bar_url", None)
    latitude = body.get("latitude",None)
    longitude = body.get("longitude",None)
    if name is None or picture_of_bar_url is None or logo_of_bar_url is None:
        return jsonify({"error": "Debes llenar al menos el nombre"}), 400
    try:
        new_bar = Bar(
        user_id=user_data["id"],
        name = name,
        address=address,
        history=history,
        facebook_url = facebook_url,
        instagram_url = instagram_url,
        picture_of_bar_url = picture_of_bar_url,
        x_url = x_url,
        logo_of_bar_url = logo_of_bar_url,
        latitude = latitude,
        longitude = longitude )
        db.session.add(new_bar)
        db.session.commit()
        db.session.refresh(new_bar)
        return jsonify({"new_bar": new_bar.serialize()}), 201  
    except Exception as error:
        db.session.rollback()
        return jsonify({"error: f'{error}"}), 500

#Endpoint de POST de Nueva Cerveza (requiere token)

@api.route("/create_new_beer", methods= ["POST"])
@jwt_required()
def create_new_beer():
    body= request.json
    user_data= get_jwt_identity()
    name= body.get("name", None)
    brewery_id = body.get("brewery_id", None)
    bjcp_style = body.get("bjcp_style", None)
    IBUs = body.get("IBUs", None)
    volALC = body.get("volALC", None)
    description = body.get("description", None)
    picture_of_beer_url = body.get("picture_of_beer_url", None)
    if name is None or brewery_id is None or bjcp_style is None or IBUs is None or volALC is None or description is None:
        return jsonify({"error": "Debes llenar los campos obligatorios"}), 400
    try:
        brewery = Brewery.query.filter_by(id=brewery_id, user_id=user_data["id"]).first()
        if not brewery:
            return jsonify({"error": "Debes elegir una cervecería de la lista"}), 404
        new_beer = Beer(
            user_id=user_data["id"],
            brewery_id=brewery_id,
            name=name,
            bjcp_style=bjcp_style,
            IBUs=IBUs,
            volALC=volALC,
            description=description,
            picture_of_beer_url=picture_of_beer_url
        )
        db.session.add(new_beer)
        db.session.commit()
        db.session.refresh(new_beer)
        return jsonify({"new_beer": new_beer.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500

#Endpoint de POST de Nuevo evento (requiere token)

@api.route("/create_new_event", methods=["POST"])
@jwt_required()
def create_new_event():
    body = request.json
    user_data = get_jwt_identity()
    name = body.get("name", None)
    brewery_id = body.get("brewery_id", None)
    description = body.get("description", None)
    date = body.get("date", None)
    picture_of_event_url = body.get("picture_of_event_url", None)  
    if name is None or brewery_id is None or description is None or date is None:
        return jsonify({"error": "Debes llenar los campos obligatorios"}), 400
    try:
        brewery = Brewery.query.filter_by(id=brewery_id, user_id=user_data["id"]).first()
        if not brewery:
            return jsonify({"error": "Debes elegir una cervecería de la lista"}), 404
        new_event = Event(
            user_id=user_data["id"],
            brewery_id=brewery_id,
            name=name,
            description=description,
            date=date,
            picture_of_event_url=picture_of_event_url
        )
        db.session.add(new_event)
        db.session.commit()
        db.session.refresh(new_event)
        return jsonify({"new_event": new_event.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500
    
#endpoint para crear un evento de un Bar
    
@api.route("/create_new_event_bar", methods=["POST"])
@jwt_required()
def create_new_event_bart():
    body = request.json
    user_data = get_jwt_identity()
    name = body.get("name", None)
    bar_id = body.get("bar_id", None)
    description = body.get("description", None)
    date = body.get("date", None)
    picture_of_event_url = body.get("picture_of_event_url", None)  
    if name is None or bar_id is None or description is None or date is None:
        return jsonify({"error": "Debes llenar los campos obligatorios"}), 400
    try:
        bar = Bar.query.filter_by(id=bar_id, user_id=user_data["id"]).first()
        if not bar:
            return jsonify({"error": "Debes elegir un bar de la lista"}), 404
        new_event = EventBar(
            user_id=user_data["id"],
            bar_id=bar_id,
            name=name,
            description=description,
            date=date,
            picture_of_event_url=picture_of_event_url
        )
        db.session.add(new_event)
        db.session.commit()
        db.session.refresh(new_event)
        return jsonify({"new_event": new_event.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500


#Endpoint para obtener los estilos

@api.route('/styles', methods=['GET'])
def get_styles():
    try:
        styles = Beer.query.all()
        style_list = [style.serialize() for style in styles ]
        return jsonify({"styles": style_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500 
    

#Endpoint para obtener todas las cervezas por estilo

@api.route('/beers_by_style/<style>', methods=['GET'])
def get_beers_by_style(style):
    try:
        beers = Beer.query.filter_by(bjcp_style = style).all()
        beers_list = [beer.serialize() for beer in beers]
        return jsonify ({"beers": beers_list}), 200
    except Exception as error:
        return jsonify ({"error": f"{error}"}), 500
    
#Endpoint para obtener  las cervecerias

@api.route('/breweries', methods=['GET'])
def get_breweries():
    try:
        breweries = Brewery.query.all()
        brewerie_list = [brewerie.serialize() for brewerie in breweries]
        return jsonify({"breweries": brewerie_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para obtener todas las cervecerías del usuario logueado

@api.route('/user/breweries', methods=['GET'])
@jwt_required()
def get_user_breweries():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get("id")
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        brewerie_list = [brewery.serialize() for brewery in user.brewery]
        return jsonify({"breweries": brewerie_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para obtener todas los bares del usuario logueado

@api.route('/user/bars', methods=['GET'])
@jwt_required()
def get_user_bars():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get("id")
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        bars_list = [bar.serialize() for bar in user.bars]
        return jsonify({"bars": bars_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para obtener todas las cervecerias del usuario por ID
    
@api.route('/<int:id>/breweries', methods=['GET'])
def get_user_breweries_country(id):
    try: 
        user_id = id
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        brewerie_list = [brewery.serialize() for brewery in user.brewery]
        return jsonify({"breweries": brewerie_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
#Endpoint para obtener todas las cervezas del usuario logueado

@api.route('/user/beers', methods=['GET'])
@jwt_required()
def get_user_beers():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get("id")
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        beer_list = [beer.serialize() for beer in user.beers]
        return jsonify({"beers": beer_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
#Endpoint para obtener todas las cervezas del usuario por ID
    
@api.route('/<int:id>/beers', methods=['GET'])
def get_user_beers_country(id):
    try: 
        user_id = id
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        beer_list = [beer.serialize() for beer in user.beers]
        return jsonify({"beers": beer_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para obtener todos los eventos del usuario logueado

@api.route('/user/events', methods=['GET'])
@jwt_required()
def get_user_events():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get("id")
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        event_list = [event.serialize() for event in user.events]
        return jsonify({"events": event_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para obtener todos los eventos de un Bar

@api.route('/bar/events', methods=['GET'])
@jwt_required()
def get_bar_events():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get("id")
        bar = Bar.query.filter_by(user_id = user_id).first()
        if bar is None:
            return  jsonify({'error': 'bar not found'}),404
        event_list = [event.serialize() for event in bar.eventsBar]
        return jsonify({"bar_events": event_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para obtener todas las eventos del usuario por ID
    
@api.route('/<int:id>/events', methods=['GET'])
def get_user_events_country(id):
    try: 
        user_id = id
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        event_list = [event.serialize() for event in user.events]
        return jsonify({"events": event_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
#Endpoint para obtener todas las eventos del usuario por ID
    
@api.route('/<int:id>/bar_events', methods=['GET'])
def get_bar_events_country(id):
    try: 
        user_id = id
        user = User.query.get(user_id)
        if user is None:
            return  jsonify({'error': 'user not found'}),404
        event_list = [event.serialize() for event in user.eventsBar]
        return jsonify({"events": event_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
   
    
#endpoint para obtener todas las cervezas
    
@api.route('/beers', methods=['GET'])
def get_all_beers():
    try:
        beers = Beer.query.all()
        serialized_beers = [beer.serialize() for beer in beers]
        return jsonify(serialized_beers), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#endpoint para obtener todos los eventos

@api.route('/events', methods=['GET'])
def get_events():
    try:
        events = Event.query.all()
        serialized_events = [event.serialize() for event in events]
        return jsonify(serialized_events), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    

#endpoint para obtener los eventos de una cerveceria REQUIERE TOKEN


@api.route('/brewery/events', methods=['GET'])
@jwt_required()
def get_brewery_events():
    try:
        current_user = get_jwt_identity()
        user_id = current_user.get("id")
        brewery = Brewery.query.filter_by(user_id = user_id).first()
        if brewery is None:
            return  jsonify({'error': 'brewery not found'}),404
        
        event_list = [event.serialize() for event in brewery.events]
        return jsonify({"events": event_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
#Endpoint para borrar Cervecería REQUIERE TOKEN

@api.route('/delete_brewery', methods=['DELETE'])
@jwt_required()
def delete_brewery():
    try:
        body = request.json
        user_data = get_jwt_identity()
        brewery_id = body.get("brewery_id", None)
        user_id = user_data.get("id")
        brewery = Brewery.query.filter_by(user_id = user_id, id=brewery_id).first()
        if brewery is None:
            return  jsonify({'error': 'brewery not found'}),404
        db.session.delete(brewery)
        db.session.commit()
        return jsonify({"message": f"Brewery removed"}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#Endpoint para borrar Bar REQUIERE TOKEN

@api.route('/delete_bar', methods=['DELETE'])
@jwt_required()
def delete_bar():
    try:
        body = request.json
        user_data = get_jwt_identity()
        bar_id = body.get("bar_id", None)
        user_id = user_data.get("id")
        bar = Bar.query.filter_by(user_id = user_id, id=bar_id).first()
        if bar is None:
            return  jsonify({'error': 'Bar not found'}),404
        db.session.delete(bar)
        db.session.commit()
        return jsonify({"message": f"Bar removed"}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
 
    #endpoint para editar cerveceria REQUIERE TOKEN
@api.route('/edit_breweries', methods=['PUT'])
@jwt_required()    
def edit_breweries():
    try:
        body = request.json
        user_data = get_jwt_identity()
        brewery_id = body.get("id", None)
        user_id = user_data.get("id")

        
        brewery = Brewery.query.filter_by(id=brewery_id, user_id=user_id).first()
        if brewery is None:
            return jsonify({'error': 'Brewery not found'}), 404

        
        brewery.name = body.get("name", brewery.name)
        brewery.address = body.get("address", brewery.address)
        brewery.history = body.get("history", brewery.history)
        brewery.facebook_url = body.get("facebook_url", brewery.facebook_url)
        brewery.instagram_url = body.get("instagram_url", brewery.instagram_url)
        brewery.x_url = body.get("x_url", brewery.x_url)
        brewery.logo_of_brewery_url = body.get("logo_of_brewery_url", brewery.logo_of_brewery_url)
        brewery.picture_of_brewery_url = body.get("picture_of_brewery_url", brewery.picture_of_brewery_url)

        db.session.commit()

        return jsonify({"message": "Brewery updated successfully"}), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500

    #endpoint para editar Bar REQUIERE TOKEN
@api.route('/edit_bar', methods=['PUT'])
@jwt_required()    
def edit_bar():
    try:
        body = request.json
        user_data = get_jwt_identity()
        bar_id = body.get("id", None)
        user_id = user_data.get("id")

        
        bar = Bar.query.filter_by(id=bar_id, user_id=user_id).first()
        if bar is None:
            return jsonify({'error': 'Bar not found'}), 404

        
        bar.name = body.get("name", bar.name)
        bar.address = body.get("address", bar.address)
        bar.history = body.get("history", bar.history)
        bar.facebook_url = body.get("facebook_url", bar.facebook_url)
        bar.instagram_url = body.get("instagram_url", bar.instagram_url)
        bar.x_url = body.get("x_url", bar.x_url)
        bar.logo_of_bar_url = body.get("logo_of_bar_url", bar.logo_of_bar_url)
        bar.picture_of_bar_url = body.get("picture_of_bar_url", bar.picture_of_bar_url)

        db.session.commit()

        return jsonify({"message": "Bar updated successfully"}), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500
    
    
#endpoint para editar cervezas REQUIERE TOKEN
@api.route('/edit_beers', methods=['PUT'])
@jwt_required()    
def edit_beers():
    try:
         body = request.json
         user_data = get_jwt_identity()
         beer_id = body.get("id", None)
         user_id = user_data.get("id")
        
         
         beer = Beer.query.filter_by(id=beer_id, user_id=user_id).first()
         if beer is None:
            return jsonify({'error': 'Beer not found'}), 404
        
         beer.name= body.get("name", beer.name)
         beer.bjcp_style= body.get("bjcp_style", beer.bjcp_style)
         beer.IBUs= body.get("IBUs", beer.IBUs)
         beer.volALC= body.get("volALC", beer.volALC)
         beer.description= body.get("description", beer.description)
         beer.picture_of_beer_url=body.get("picture_of_beer_url", beer.picture_of_beer_url)
         
         db.session.commit()
         
         return jsonify({"message": "Beer updated successfully"}), 200
        
    except Exception as error:
        return jsonify({"error": str(error)}), 500
    
#endpoint para editar eventos REQUIERE TOKEN
@api.route('/edit_event', methods=['PUT'])
@jwt_required()    
def edit_event():
    try:
         body = request.json
         user_data = get_jwt_identity()
         event_id = body.get("id", None)
         user_id = user_data.get("id")
        
         
         event = Event.query.filter_by(id=event_id, user_id=user_id).first()
         if event is None:
            return jsonify({'error': 'Event not found'}), 404
        
         event.name= body.get("name", event.name)
         event.date= body.get("bjcp_style", event.date)
         event.description= body.get("description", event.description)
         event.picture_of_event_url= body.get("picture_of_event_url", event.picture_of_event_url)
         
         db.session.commit()
         
         return jsonify({"message": "Beer updated successfully"}), 200
        
    except Exception as error:
        return jsonify({"error": str(error)}), 500
    
#endpoint para editar eventos REQUIERE TOKEN
@api.route('/edit_event_bar', methods=['PUT'])
@jwt_required()    
def edit_event_bar():
    try:
         body = request.json
         user_data = get_jwt_identity()
         event_id = body.get("id", None)
         user_id = user_data.get("id")
        
         
         event = EventBar.query.filter_by(id=event_id, user_id=user_id).first()
         if event is None:
            return jsonify({'error': 'Event not found'}), 404
        
         event.name= body.get("name", event.name)
         event.date= body.get("bjcp_style", event.date)
         event.description= body.get("description", event.description)
         event.picture_of_event_url= body.get("picture_of_event_url", event.picture_of_event_url)
         
         db.session.commit()
         
         return jsonify({"message": "Event updated successfully"}), 200
        
    except Exception as error:
        return jsonify({"error": str(error)}), 500

#endpoint para borrar cervezas REQUIERE TOKEN

@api.route('/delete_beer', methods=['DELETE'])
@jwt_required()
def delete_beer():
    try:
        body = request.json
        user_data = get_jwt_identity()
        beer_id = body.get("beer_id", None)
        user_id = user_data.get("id")
        beer = Beer.query.filter_by(user_id = user_id, id=beer_id).first()
        if beer is None:
            return  jsonify({'error': 'beer not found'}),404
        db.session.delete(beer)
        db.session.commit()
        return jsonify({"message": f"Beer removed"}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
    
#endpoint para borrar evento REQUIERE TOKEN

@api.route('/delete_event', methods=['DELETE'])
@jwt_required()
def delete_event():
    try:
        body = request.json
        user_data = get_jwt_identity()
        event_id = body.get("event_id", None)
        event = Event.query.filter_by(id=event_id).first()
        if event is None:
            return  jsonify({'error': 'event not found'}),404
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": f"Event removed"}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500

#endpoint para borrar evento REQUIERE TOKEN

@api.route('/delete_event_bar', methods=['DELETE'])
@jwt_required()
def delete_event_bar():
    try:
        body = request.json
        user_data = get_jwt_identity()
        event_id = body.get("event_id", None)
        event = EventBar.query.filter_by(id=event_id).first()
        if event is None:
            return  jsonify({'error': 'event not found'}),404
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": f"Event removed"}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    

#endopoint para obtener vista de detalles de cerveza

@api.route('/beer/<int:beer_id>', methods=['GET'])
def get_beer_details(beer_id):
    try:
        beer = Beer.query.get(beer_id)
        if beer is None:
            return jsonify({"error": "Cerveza no encontrada"}), 404
        return jsonify(beer.serialize()), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
@api.route('/bar_beer/<int:beer_id>', methods=['GET'])
def get_bar_beer_details(beer_id):
    try:
        beer = BarAddedBeer.query.get(beer_id)
        if beer is None:
            return jsonify({"error": "Cerveza no encontrada"}), 404
        return jsonify(beer.serialize()), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    

#endopoint para crear un review
@api.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    body = request.json
    user_data = get_jwt_identity()

    rating = body.get("rating", None)
    comment = body.get("comment", None)
    beer_id = body.get("beer_id", None)  

    # Validate input
    if beer_id is None:
        return jsonify({"error": "Debes especificar un beer_id"}), 400

    if rating is None or not (1 <= rating <= 5):
        return jsonify({"error": "Debes dar un rating válido entre 1 y 5 jarritos"}), 400

    if comment is None or comment.strip() == "":
        return jsonify({"error": "Debes llenar el campo de  comentar"}), 400

    try:
        # Check if the beer exists
        beer = Beer.query.get(beer_id)
        if not beer:
            return jsonify({"error": "Cerveza no encontrada"}), 404

        new_review = Review(
            user_id=user_data["id"], 
            beer_id=beer_id, 
            rating=rating, 
            comment=comment
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify({"new_review": new_review.serialize()}), 201

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500


#endopoint para eliminar un review
@api.route('/review/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    user_data = get_jwt_identity()

    try:
       
        review = Review.query.get(review_id)
        
        if not review:
            return jsonify({"error": "Reseña no encontrada"}), 404
        
       
        if review.user_id != user_data["id"]:
            return jsonify({"error": "No estás autorizado para eliminar esta reseña"}), 403

       
        db.session.delete(review)
        db.session.commit()

        return jsonify({"message": "Reseña eliminada correctamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f'{error}'}), 500

    
 #Endpoint para obtener los reviews de una cerveza por id   

@api.route('/reviews/<int:beer_id>', methods=['GET'])

def get_reviews_for_beer(beer_id):
    try:
        # Query reviews based on beer_id
        reviews = Review.query.filter_by(beer_id=beer_id).all()
        
        # If no reviews found, return an empty list
        if not reviews:
            return jsonify({"reviews": []}), 200
        
        # Serialize the review data
        serialized_reviews = [review.serialize() for review in reviews]

        return jsonify({"reviews": serialized_reviews}), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500
    
#Endpoint para editar una review por id

@api.route('/reviews/<int:id>', methods=['PUT'])
@jwt_required()    
def edit_reviews(id):
    try:
        body = request.json
        user_data = get_jwt_identity()
        user_id = user_data.get("id")
        review = Review.query.filter_by(id=id, user_id=user_id).first()
        if review is None:
            return jsonify({'error': 'Review no encontrada o no estas autorizado'}), 404

        
        review.comment = body.get("comment", review.comment) 
        rating = body.get("rating")
        if rating is not None:
            try:
                review.rating = int(rating)
            except ValueError:
                return jsonify({"error": "Invalid rating value"}), 400
        else:
            # If rating is not provided, keep the existing value
            review.rating = review.rating
        

        db.session.commit()

        return jsonify({"message": "Review editada exitosamente"}), 200

    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500
    




#Endpoint para obtener todos los reviews

@api.route('/reviews', methods=['GET'])
def get_all_reviews():
    try:
        reviews = Review.query.all()
        serialized_reviews = [review.serialize() for review in reviews]
        return jsonify({"reviews": serialized_reviews}), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500

@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')

    if not query:
        return jsonify({"error": "No search query provided"}), 400

    try:
        # Buscar cervezas
        beer_results = Beer.query.filter(Beer.name.ilike(f'%{query}%')).all()
        beers = [{
            "id": beer.id,
            "name": beer.name,
            "bjcp_style": beer.bjcp_style,
            "IBUs": beer.IBUs,
            "volALC": beer.volALC,
            "description": beer.description,
            "picture_of_beer_url": beer.picture_of_beer_url
        } for beer in beer_results]

        # Buscar cervecerías
        brewery_results = Brewery.query.filter(Brewery.name.ilike(f'%{query}%')).all()
        breweries = [{
            "id": brewery.id,
            "name": brewery.name,
            "address": brewery.address,
            "history": brewery.history,
            "facebook_url": brewery.facebook_url,
            "instagram_url": brewery.instagram_url,
            "x_url": brewery.x_url,
            "picture_of_brewery_url": brewery.picture_of_brewery_url,
            "logo_of_brewery": brewery.logo_of_brewery_url,
            "lat": brewery.latitude,
            "lng": brewery.longitude
        } for brewery in brewery_results]

        return jsonify({"beers": beers, "breweries": breweries}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Endpoint para obtener todos los bares de todos los usuarios

@api.route('/bars', methods=['GET'])
def get_all_bars():
    try:
        bars = Bar.query.all()
        bars_list = [bar.serialize() for bar in bars]
        return jsonify({"bars": bars_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    

#Endpoint para obtener bar por id 

@api.route('/bar/<int:id>', methods=['GET'])
def get_bar_by_id(id):
    try:
        # Fetch the bar details from the database using the provided ID
        bar = Bar.query.get(id)
        if bar is None:
            return jsonify({'error': 'Bar not found'}), 404
        
        # Return the bar details as a JSON response
        return jsonify({
            'id': bar.id,
            'name': bar.name,
            'address': bar.address,
            'facebook_url': bar.facebook_url,
            'instagram_url': bar.instagram_url,
            'lat': bar.lat,
            'lng': bar.lng,
            'logo_of_brewery_url': bar.logo_of_brewery_url,
            'picture_of_brewery_url': bar.picture_of_brewery_url,
            'user_id': bar.user_id,
            'x_url': bar.x_url
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

    #Endpoint para anadir cerveza a bar

@api.route('/add_beer_to_bar/<int:id>', methods=['POST'])
@jwt_required()  
def add_beer_to_bar(id):
    body = request.json
    user_data = get_jwt_identity()
    user_id_bar = user_data["id"]
    bar_id= body.get("bar_id", None)
    id= body.get("id", None)
    user_id= body.get("user_id", None)
    brewery_id = body.get("brewery_id", None)
    name= body.get("name", None)
    bjcp_style = body.get("bjcp_style", None)
    IBUs = body.get("IBUs", None)
    volALC = body.get("volALC", None)
    description = body.get("description", None)
    picture_of_beer_url = body.get("picture_of_beer_url", None)
    try:
        existing_beer = BarAddedBeer.query.filter_by(beer_id=id, bar_id=bar_id).first()
        if existing_beer is not None:
            return jsonify({"error": "Cerveza ya añadida al bar"}), 400
        bar_added_beer = BarAddedBeer(
            bar_id=bar_id,
            beer_id=id,
            user_id=user_id,
            brewery_id=brewery_id,
            name=name,
            bjcp_style=bjcp_style,
            IBUs=IBUs,
            volALC=volALC,
            description=description,
            picture_of_beer_url=picture_of_beer_url,
        )
        db.session.add(bar_added_beer)
        db.session.commit()
        return jsonify({"nueva cerveza anadida": bar_added_beer.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500

@api.route('/beers_added_to_bar', methods=['GET'])
@jwt_required()
def get_beer_added_to_bar():
    try: 
        user_data = get_jwt_identity()
        user_id = user_data["id"]
        bar = Bar.query.filter_by(user_id=user_id).first()
        if bar is None:
            return  jsonify({'error': 'user not found'}),404
        beer_added_list = [barAddedBeer.serialize() for barAddedBeer in bar.added_beers]
        return jsonify({"beers": beer_added_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500
    
@api.route('/get_all_beers_added_to_bar', methods=['GET'])
def get_all_beer_added_to_bar():
    try:   
        beers = BarAddedBeer.query.all()
        serialized_beer_added_list = [beer.serialize() for beer in beers]
        return jsonify({"beers_added": serialized_beer_added_list}), 200
    except Exception as error:
        return jsonify({"error": f"{error}"}), 500



