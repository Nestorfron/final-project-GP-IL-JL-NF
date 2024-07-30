"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#Endpoint de registro de usuario

@api.route('/signup', methods=["POST"])
def handle_singnup():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    country = body.get("country", None)
    is_brewer= body.get("is_brewer", None)

#Validacion de llenado de todos los campos
    if email is None or password is None or country is None or is_brewer is None:
        return jsonify({"error": "Todos los campos deben ser llenados"}), 400


    password_hash= generate_password_hash(password)

    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "email ya esta siendo utilizado"}), 400


    try: 
        new_user = User(email = email, password = password, country = country, is_brewer = is_brewer)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Usuario creado exitosamente"})
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500


#Endpoint de inicio de sesion

@api.route('/signin', methods=['POST'])
def handle_sigin():
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
    return jsonify({"token": user_token})
