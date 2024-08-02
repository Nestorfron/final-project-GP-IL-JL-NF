import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import beer from "../../img/beer.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container-fluid">
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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
          <div>
            <li className="nav-item mx-3">
              <a 
                className="nav-link active mx-2" 
                aria-current="page" 
                href="#" 
               
              >
                <Link to={"/"}  style={{ color: '#4B2E1D' }}>HOME</Link>
                
              </a>
            </li>
          </div>
          <li className="nav-item mx-4">
            <a 
              className="nav-link" 
              href="#" 
              style={{ color: '#4B2E1D' }}
            >
              ESTILOS
            </a>
          </li>
          <li className="nav-item mx-3">
            <a 
              className="nav-link active" 
              aria-current="page" 
              href="#" 
              style={{ color: '#4B2E1D' }}
            >
              CERVECERIA
            </a>
          </li>
        </ul>
        <div className="container d-flex justify-content-center">
          <a className="navbar-brand" href="#">
            <img
              src={beer}
              alt="Logo"
              width="90"
              height="90"
              className="d-inline-block align-top rounded-circle"
            />
          </a>
        </div>
        <div className="d-flex align-items-center">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "140px", height: "35px" }}
            />
            <button
              className="btn btn-outline"
              type="submit"
              style={{ width: "160px", height: "35px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: '#4B2E1D' }}
            >
              SOBRE NOSOTROS
            </button>
          </form>
        </div>
      </div>
      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle me-5"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i 
            className="fa-solid fa-user me-4" 
            style={{ color: '#4B2E1D' }}
          ></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-warning my-4">
          <li>
            <a 
              className="dropdown-item" 
              href="#" 
              style={{ color: 'black' }}
            >
              Iniciar Sesión
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a 
              className="dropdown-item" 
              href="#" 
              style={{ color: '#black' }}
            >
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
