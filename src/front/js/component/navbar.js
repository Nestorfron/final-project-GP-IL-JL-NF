import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from "jwt-decode";
import "../../styles/search.css";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTokenInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub.is_brewer;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!getTokenInfo()) {
      navigate("/");
      return;
    }
    getTokenInfo();
  }, []);
  useEffect(() => {
    if (searchQuery) {
      if (store.searchResults && store.searchResults.length === 0 && !loading) {
        setShowResults(true); // Mostrar "No se encontraron resultados"
      } else {
        setShowResults(true); // Mostrar resultados si hay
      }
    } else {
      setShowResults(false); // Ocultar resultados si no hay consulta
    }
  }, [store.searchResults, searchQuery, loading]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      setLoading(true); // Establecer carga en true antes de buscar
      actions.searchBeers(query).finally(() => {
        setLoading(false); // Restablecer carga después de buscar
      });
    } else {
      setShowResults(false);
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setLoading(true); // Establecer carga en true antes de buscar
      actions.searchBeers(searchQuery).finally(() => {
        setLoading(false); // Restablecer carga después de buscar
      });
      setShowResults(true); // Mostrar resultados después de enviar
    }
  };

  return (
    <nav className="container-nav navbar navbar-expand-lg">
      <div className="beer-container">
        <Link to="/">
          <img src={BEER} alt="BEER" className="beer-image" />
        </Link>
      </div>
      <div className="container-fluid">
        <button
          className="navbar-toggler fs-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="nav-icon fa-solid fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul id="menu" className="estilos navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Estilos
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {store.beers.length > 0 ? (
                  store.beers.map((beer) => (
                    <li key={beer.id}>
                      <Link
                        className="dropdown-item"
                        to={`/styles/${encodeURIComponent(beer.bjcp_style)}`}
                        type="submit"
                      >
                        {beer.bjcp_style}
                      </Link>
                    </li>
                  ))
                ) : (
                  <h6 className="text-center">Sin Estilos</h6>
                )}
              </ul>
            </li>

            <hr />
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
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {store.breweries.length > 0 ? (
                  store.breweries.map((brewery) => (
                    <li key={brewery.id}>
                      <Link
                        className="dropdown-item"
                        to={`/brewery/${brewery.id}`}
                      >
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
          <hr />
          <form
            className="d-flex position-relative"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {showResults && (
              <ul className="search-results list-group position-absolute">
                {loading ? (
                  <li className="list-group-item">Cargando...</li> // Mensaje de carga
                ) : store.searchResults?.length > 0 ? (
                  store.searchResults.map((beer) => (
                    <li key={beer.id} className="list-group-item">
                      <Link to={`/beer/${beer.id}`} className="dropdown-item">
                        {beer.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">
                    No se encontraron resultados
                  </li>
                )}
              </ul>
            )}
          </form>
          <hr />
          <div className="signin-button">
            <button
              type="button"
              className="btn btn-warning "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user"></i>
            </button>

            <ul className="signin-button dropdown-menu dropdown-menu-end menu">
              <li>
                <Link
                  to="/add_brewery"
                  className={`${
                    !getTokenInfo()
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
                    !getTokenInfo()
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
                    !getTokenInfo()
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
        </div>
      </div>
    </nav>
  );
};
