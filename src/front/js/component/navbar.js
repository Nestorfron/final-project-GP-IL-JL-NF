import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import beer from "../../img/beer.png";
import Login from "../pages/login.jsx";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg nav mb-5">
      <div className="container-fluid ">
        <Link to={"/"}>HOME</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 my-2">
            <li className="nav-item container-fluid g-5">
              <Link
                className="navbar-brand d-flex justify-content-center my-2 m-5"
                to="#"
              >
                ESTILOS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="navbar-brand d-flex justify-content-center my-2 ms-5 "
                to="#"
              >
                CERVECERIA
              </Link>
            </li>
            <div className="mx-5 ms-5">
              <img
                src={beer}
                alt="BEER"
                width="50"
                height="50"
                className="mx-5"
              />
            </div>
          </ul>
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              SOBRE NOSOTROS
            </button>
          </form>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
              <i className="fa-solid fa-users"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end my-4">
              <li>
                <Link className="dropdown-item" to="">
                  Favoritos
                  <i className="fa-regular fa-heart mx-2"></i>
                </Link>
              </li>
              <li>
                <Link to={"/login"}> Iniciar Sesión</Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
