import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import beer from "../../img/beer.png";
import Login from "../pages/login.jsx";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg nav mb-5">
      <div className="container-fluid ">
        <a
          className="navbar-brand d-flex justify-content-center mx-2 m"
          href="#"
        >
          <Link to={"/"}>HOME</Link>
        </a>
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
              <a
                className="navbar-brand d-flex justify-content-center my-2 m-5"
                href="#"
              >
                ESTILOS
              </a>
            </li>
            <li className="nav-item">
              <a
                className="navbar-brand d-flex justify-content-center my-2 ms-5 "
                href="#"
              >
                CERVECERIA
              </a>
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
              <i class="fa-solid fa-users"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end my-4">
              <li>
                <a className="dropdown-item" href="">
                  Favoritos
                  <i class="fa-regular fa-heart mx-2"></i>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Link to={"/login"}> Iniciar Sesión</Link>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
