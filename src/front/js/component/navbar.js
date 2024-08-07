import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/index.css";
import BEER from "../../img/BEER.jpeg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();

  function logout() {
    actions.logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid w-75">
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
        <div className="collapse navbar-collapse " id="navbarNav">
          <div className="d-flex flex-grow-1">
            <ul id="menu" className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Estilos
                </a>
                <div id="mega" className="dropdown-menu">
                  <ul className="list-unstyled">
                    {store.styles.length > 0 ? (
                      store.styles.map((style) => (
                        <li key={style.id}>
                          <Link className="dropdown-item" to="/" type="submit">
                            {style.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <h6 className="text-center">Sin Estilos</h6>
                    )}
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cervecerías
                </a>
                <div id="mega" className="dropdown-menu">
                  <ul className="list-unstyled">
                    {store.breweries.length > 0 ? (
                      store.breweries.map((brewery) => (
                        <li key={brewery.id}>
                          <Link className="dropdown-item" to="/">
                            {brewery.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <h6 className="text-center">Sin Cervecerías</h6>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="beer-container text-center flex-grow-1 col-4">
            <Link to="/">
              <img src={BEER} alt="BEER" className="beer-image" />
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-end col-4">
            <ul className="navbar-nav d-none d-md-flex">
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input
                    className="form-control search mt-3"
                    type="search"
                    placeholder="Búsqueda"
                    aria-label="Search"
                  />
                  <Link
                    to="/"
                    className="nav-link d-flex align-items-center justify-content-center mx-3 text-center"
                    type="submit"
                  >
                    SOBRE NOSOTROS
                  </Link>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="signin-button btn-group">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-users"></i>
                  </button>
                  <ul className="signin-button dropdown-menu dropdown-menu-end menu">
                    <li>
                      <Link
                        to="/add_brewery"
                        className={`${
                          !jwt
                            ? "dropdown-item text-dark d-none"
                            : "dropdown-item text-dark"
                        }`}
                      >
                        Agregar Cervecería
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/add_beer"
                        className={`${
                          !jwt
                            ? "dropdown-item text-dark d-none"
                            : "dropdown-item text-dark"
                        }`}
                      >
                        Agregar Cerveza
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/add_event"
                        className={`${
                          !jwt
                            ? "dropdown-item text-dark d-none"
                            : "dropdown-item text-dark"
                        }`}
                      >
                        Agregar Evento
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my_account"
                        className={`${
                          !jwt
                            ? "dropdown-item text-dark d-none"
                            : "dropdown-item text-dark"
                        }`}
                      >
                        Mi cuenta
                      </Link>
                    </li>
                    <hr
                      className={`${
                        !jwt ? "dropdown-divider d-none" : "dropdown-divider"
                      }`}
                    />
                    <li>
                      <Link
                        to="/login"
                        className={`${
                          !jwt
                            ? "dropdown-item text-dark"
                            : "dropdown-item text-dark d-none"
                        }`}
                      >
                        Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <button
                        className={`${
                          !jwt
                            ? "dropdown-item text-dark d-none"
                            : "dropdown-item text-dark"
                        }`}
                        onClick={logout}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
