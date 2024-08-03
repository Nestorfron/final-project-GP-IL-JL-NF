import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import BEER from "../../img/beer.jpeg";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light p-3 mb-5">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark mx-3">
                HOME
              </Link>
            </li>
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ESTILOS
              </a>
              <ul className="dropdown-menu mx-3">
                <li className="nav-item">No hay</li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                CERVECERIA
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">No hay</li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item text-center">
              <img
                src={BEER}
                alt="BEER"
                width="115"
                height="115"
                className="rounded-circle"
              />
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <form className="d-flex me-3" role="search">
                <input
                  className="form-control me-2 mx-2 search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Link
                  to="/"
                  className="nav-link text-dark d-flex align-items-center justify-content-center"
                  type="submit"
                >
                  SOBRE NOSOTROS
                </Link>
              </form>
            </li>
            <li className="nav-item">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-users"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end menu">
                  <li>
                    <Link className="dropdown-item text-dark " to="#">
                      Favoritos
                      <i className="fa-regular fa-heart mx-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="dropdown-item text-dark">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item text" to="#">
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
