import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import Footerimg from "../../img/Footer.png";

export const Footer = () => {
  return (
    <footer className="footer sticky-bottom container-fluid text-light p-3 mt-2">
      <div className="container-fluid">
        <div className="row">
          <div className="section-footer col">
            <h5>Sobre Nosotros</h5>
            <small>
              Somos un grupo de desarrolladores apasionados por el desarrollo
              web, y nos complace presentarles una plataforma dedicada a los
              amantes de la cerveza artesanal. ¡Salud!
            </small>
          </div>
          <div className="section-footer col">
            <Link to="/">
              <img src={Footerimg} alt="Footer" className="footer-image" />
            </Link>
          </div>
          <div className="section-footer col">
            <h5>Contacto</h5>
            <small className="justify-content-center">
              <i className="fa-brands fa-instagram mx-2"></i> beerbookapp
            </small>
            <small className="justify-content-center">
              <i className="fa-solid fa-envelope mx-2"></i>{" "}
              cervezaartesanal082024@gmail.com
            </small>
          </div>
          <div className="text-center">
            <span className="span">
              &copy; 2024 Cervecería Artesanal. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
