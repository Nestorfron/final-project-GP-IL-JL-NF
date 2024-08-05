import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/index.css";
import BEER from "../../img/beer.jpeg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();

  function logout() {
    actions.logout();
    navigate("/");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    actions.getStyles(); // Fetch styles on component mount
  }, [actions]);

  return (
    <nav className="navbar navbar-expand navbar-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex flex-grow-1 justify-content-between align-items-center row">
            {/* Left side: Navbar links */}
            <div className="collapse navbar-collapse col-4" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown mx-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                  >
                    ESTILOS
                  </a>
                  <ul className="dropdown-menu mx-3">
                    {store.styles.length > 0 ? (
                      store.styles.map((style) => (
                        <li key={style.id}>{style.name}</li>
                      ))
                    ) : (
                      <h6 className="text-center">Sin Estilos</h6>
                    )}
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
                    CERVECERÍAS
                  </a>
                  <ul className="dropdown-menu">
                    {store.breweries.length > 0 ? (
                      store.breweries.map((brewery) => (
                        <li key={brewery.id}>{brewery.name}</li>
                      ))
                    ) : (
                      <h6 className="text-center">Sin Cervecerías</h6>
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            {/* Center: BEER image */}
            <div className="beer-container text-center flex-grow-1 col-4">
              <Link to="/">
                <img src={BEER} alt="BEER" className="beer-image" />
              </Link>
            </div>

            {/* Right side: Search and other links */}
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
                          to="/add_style"
                          className={`${
                            !jwt
                              ? "dropdown-item text-dark d-none"
                              : "dropdown-item text-dark"
                          }`}
                        >
                          Agregar producto
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
      </div>
    </nav>
  );
};
