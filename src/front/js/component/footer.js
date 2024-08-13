import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footerimg.css";
import Footerimg from "../../img/Footer.png";

export const Footer = () => {
  return (
    <footer className="footer sticky-bottom container-fluid text-light p-3">
      <div className="container-fluid">
        <div className="row d-flex my-4 ">
          <div className="col">
            <h5>Sobre Nosotros</h5>
            <p>
              Somos un grupo de desarrolladores apasionados por el desarrollo
              web, y en esta ocasión, nos complace presentarles una plataforma
              dedicada a los amantes de la cerveza artesanal. Explora nuestras
              cervezas, descubre nuevos estilos y encuentra tu próxima favorita.
              ¡Salud!
            </p>
          </div>
          <div className="col m-auto">
            <Link to="/">
              <img src={Footerimg} alt="Footer" className="footer-image" />
            </Link>
          </div>
          <div className="col">
            <h5>Contacto</h5>
            <p className="d-flex justify-content-center pt-1 col-8">
              <i className="fa-brands fa-instagram mx-2"></i> beerbookapp
            </p>
            <p className="d-flex justify-content-center pt-1 col-11">
              <i className="fa-solid fa-envelope mx-2"></i>{" "}
              cervezaartesanal082024@gmail.com
            </p>
          </div>

          <div className="text-center mt-4">
            <span className="span">
              &copy; 2024 Cervecería Artesanal. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
