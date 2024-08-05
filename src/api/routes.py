"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Brewery, Beer, Event
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
    password = body.get("password", None)
    country = body.get("country", None)
    is_brewer= body.get("is_brewer", None)
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del email no es válido"}), 400
    if email is None or password is None or country is None or is_brewer is None:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400
    password_hash = generate_password_hash(password)
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "email ya esta siendo utilizado"}), 400
    try: 
        new_user = User(email = email, password = password_hash, country = country, is_brewer = is_brewer)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Usuario creado exitosamente"}), 201
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
    user_token = create_access_token({"id": user.id, "email": user.email})
    return jsonify({"token": user_token}), 200

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
    if name is None or picture_of_brewery_url is None or logo_of_brewery_url is None:
        return jsonify({"error": "Debes llenar al menos el nombre"}), 400
    try:
        new_brewery = Brewery(user_id=user_data["id"], name = name, address=address, history=history, facebook_url = facebook_url, 
                              instagram_url = instagram_url, x_url = x_url, picture_of_brewery_url = picture_of_brewery_url, 
                              logo_of_brewery_url = logo_of_brewery_url )
        db.session.add(new_brewery)
        db.session.commit()
        db.session.refresh(new_brewery)
        return jsonify({"new_brewery": new_brewery.serialize()}), 201  
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
        return jsonify({"error: f'{error}"}), 500
    
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
    
#Endpoint para obtener el nombre de las cervecerias

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
    
    
