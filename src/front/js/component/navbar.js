import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import beer from "../../img/beer.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  function logout() {
    actions.logout();
    navigate("/login");
  }
  return (
    <nav
      className="navbar navbar-expand-lg nav mb-5"
      style={{ backgroundColor: "#FFD479" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Link
            to="/"
            className="nav-link mx-3"
            style={{ color: "#4B2E1D", textDecoration: "underline" }}
          >
            HOME
          </Link>
          <Link to="/" className="nav-link mx-3" style={{ color: "#4B2E1D" }}>
            ESTILOS
          </Link>
          <Link to="/" className="nav-link mx-3" style={{ color: "#4B2E1D" }}>
            CERVECERIA
          </Link>
        </div>
        <div className="text-center">
          <img
            src={beer}
            alt="BEER"
            width="80"
            height="80"
            className="rounded-circle"
          />
        </div>
        <div className="d-flex align-items-center">
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "150px" }}
            />
            <button
              className="btn btn-outline d-flex align-items-center justify-content-center"
              style={{ color: "#4B2E1D" }}
              type="submit"
            >
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
              <i className="fa-solid fa-users"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end my-4">
              <li>
                <Link className="dropdown-item" to="#">
                  Favoritos
                  <i className="fa-regular fa-heart mx-2"></i>
                </Link>
              </li>
              <li>
                <Link to="/login" className="dropdown-item">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
