import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import BEER from "../../img/beer.jpeg";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-md p-3 mb-5 nav">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
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

          <div className="d-flex flex-grow-1 justify-content-between align-items-center row">
            {/* Left side: Navbar links */}
            <div className="collapse navbar-collapse col-4" id="navbarNav">
              <ul className="navbar-nav">
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
                    <li className="nav-item">No hay</li>
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
            <div className="d-flex align-items-center justify-content-end col-4 ">
              <ul className="navbar-nav d-none d-md-flex">
                <li className="nav-item">
                  <form className="d-flex " role="search">
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
                  <div className=" signin-button btn-group">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-users"></i>
                    </button>
                    <ul className=" signin-button dropdown-menu dropdown-menu-end menu">
                      <li>
                        <Link className="dropdown-item " to="#">
                          Favoritos
                          <i className="fa-regular fa-heart mx-2"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/login" className="dropdown-item ">
                          Iniciar Sesión
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item text" to="#">
                          Cerrar Sesión
                        </Link>
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
