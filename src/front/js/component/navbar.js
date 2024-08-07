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

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown me-5">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Estilos
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cervecerías
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
            </li>
          </ul>
          <div class="beer-container text-center flex-grow-1 col-4">
            <Link to="/">
              <img src={BEER} alt="BEER" className="beer-image" />
            </Link>
          </div>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
          </form>
          <div>
            <Link
              to="/"
              className="nav-link d-flex align-items-center justify-content-center mx-3 text-center"
              type="submit"
            >
              SOBRE NOSOTROS
            </Link>
          </div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <div class="signin-button btn-group">
                <button
                  type="button"
                  class="btn btn-warning"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-users"></i>
                </button>
                <ul class="signin-button dropdown-menu dropdown-menu-end menu">
                  <li>
                    <a href="#" class="dropdown-item text-dark">
                      Agregar Cervecería
                    </a>
                  </li>
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
                  <li>
                    <hr
                      className={`${
                        !jwt ? "dropdown-divider d-none" : "dropdown-divider"
                      }`}
                    />
                  </li>
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
          <div></div>
        </div>
      </div>
    </nav>
  );
};
