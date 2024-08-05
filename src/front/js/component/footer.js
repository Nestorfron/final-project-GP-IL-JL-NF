import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Footer = () => {
  return (
    <footer className="footer sticky-bottom container-fluid text-light p-3 mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h5>Sobre Nosotros</h5>
            <p>
              Somos una cervecería dedicada a la creación de cervezas
              artesanales únicas. Nuestro objetivo es proporcionar experiencias
              inolvidables a nuestros clientes.
            </p>
          </div>

          <div className="col-md-4 ms-auto">
            <h5>Contacto</h5>
            <p>
              <i className="fa-solid fa-envelope mx-2"></i> info@cerveceria.com
            </p>
            <p>
              <i className="fa-solid fa-phone mx-2"></i> +34 123 456 789
            </p>
            <p>
              <i className="fa-solid fa-location-dot mx-2"></i> Calle Falsa 123,
              Madrid, España
            </p>
          </div>
        </div>

        <div className="text-center">
          <span className="span">
            &copy; 2024 Cervecería Artesanal. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};
