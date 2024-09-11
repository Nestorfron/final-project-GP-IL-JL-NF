import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from "jwt-decode";
import "../../styles/search.css";
import "../../styles/index.css";
import BEER from "../../img/BEER.png";
import SearchBar from "../component/SearchBar.jsx";
import { countryNameToCode } from "../component/CountryCodes.jsx";
import agFlag from "../../img/flags/ag.png";
import arFlag from "../../img/flags/ar.png";
import bbFlag from "../../img/flags/bb.png";
import bsFlag from "../../img/flags/bs.png";
import boFlag from "../../img/flags/bo.png";
import brFlag from "../../img/flags/br.png";
import caFlag from "../../img/flags/ca.png";
import clFlag from "../../img/flags/cl.png";
import coFlag from "../../img/flags/co.png";
import crFlag from "../../img/flags/cr.png";
import cuFlag from "../../img/flags/cu.png";
import dmFlag from "../../img/flags/dm.png";
import ecFlag from "../../img/flags/ec.png";
import usFlag from "../../img/flags/us.png";
import gdFlag from "../../img/flags/gd.png";
import gyFlag from "../../img/flags/gy.png";
import jmFlag from "../../img/flags/jm.png";
import mxFlag from "../../img/flags/mx.png";
import paFlag from "../../img/flags/pa.png";
import peFlag from "../../img/flags/pe.png";
import doFlag from "../../img/flags/do.png";
import srFlag from "../../img/flags/sr.png";
import ttFlag from "../../img/flags/tt.png";
import uyFlag from "../../img/flags/uy.png";
import veFlag from "../../img/flags/ve.png";

const flagImages = {
  ag: agFlag,
  ar: arFlag,
  bb: bbFlag,
  bs: bsFlag,
  bo: boFlag,
  br: brFlag,
  ca: caFlag,
  cl: clFlag,
  co: coFlag,
  cr: crFlag,
  cu: cuFlag,
  dm: dmFlag,
  ec: ecFlag,
  us: usFlag,
  gd: gdFlag,
  gy: gyFlag,
  jm: jmFlag,
  mx: mxFlag,
  pa: paFlag,
  pe: peFlag,
  do: doFlag,
  sr: srFlag,
  tt: ttFlag,
  uy: uyFlag,
  ve: veFlag,
};

const getFlagImage = (countryName) => {
  const countryCode = countryNameToCode[countryName];
  return flagImages[countryCode] || ""; // Return the imported image or an empty string if not found
};

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (store.detectedCountry) {
      setSelectedCountry(store.detectedCountry);
    }
  }, [store.detectedCountry]);

  const detectedCountry = store.detectedCountry;
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(detectedCountry); // Added state for selected country

  const user = store.me;
  const userImg = user.profile_picture;

  const selectCountry = (country) => {
    setSelectedCountry(country); // Update selected country state
    actions.getSelectedCountryAllInfo(country);
    if (country !== store.detectedCountry) {
      navigate(`/${country}`); // Navigate only if the country is not the initial one
    } else {
      navigate(`/`);
    }
  };

  const getFilteredCountries = (allCountries, detectedCountry) => {
    const uniqueCountries = [...new Set(allCountries)];
    return uniqueCountries.filter((country) => country !== detectedCountry);
  };
  const filteredCountries = getFilteredCountries(
    store.allCountries,
    selectedCountry
  );

  function logout() {
    actions.logout();
    navigate("/");
  }

  const getTokenInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.sub.rol);
      return decodedToken.sub.rol;
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
    setLoading(false);
  }, []);

  const uniqueStyles = [
    ...new Set(store.beers.map((beer) => beer.bjcp_style)),
  ].sort(); // Sort styles alphabetically

  const sortedBreweries = [...store.breweries].sort((a, b) =>
    a.name.localeCompare(b.name)
  ); // Sort breweries alphabetically

  const sortedBars = [...store.bars].sort((a, b) =>
    a.name.localeCompare(b.name)
  ); // Sort bars alphabetically

  const flagImage = getFlagImage(detectedCountry);

  return (
    <nav className="container-nav navbar navbar-expand-lg">
      <div className="beer-container mt-2">
        <Link to="/">
          <img src={BEER} alt="BEER" className="beer-image" />
        </Link>
      </div>
      <div className="container-fluid">
        <button
          className="navbar-toggler fs-dark"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <span className="navbar-toggler-icon">
            <i className="nav-icon fa-solid fa-bars"></i>
          </span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabindex="2"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close ms-auto mt-4"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body" id="navbarSupportedContent">
            <div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary flag-button dropdown-toggle"
                  type="button"
                  id="countryDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="flag-image"
                    src={getFlagImage(selectedCountry)}
                    alt={countryNameToCode[selectedCountry]}
                  />
                </button>
                <ul className="dropdown-menu" aria-labelledby="countryDropdown">
                  {filteredCountries.map((country, index) => (
                    <li key={country + index}>
                      <button
                        className="dropdown-item"
                        onClick={() => selectCountry(country)}
                      >
                        <img
                          className="flag-image me-2"
                          src={getFlagImage(country)}
                          alt={countryNameToCode[country]}
                        />
                        {country}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                  {uniqueStyles.length > 0 ? (
                    uniqueStyles.map((style, index) => (
                      <li key={index}>
                        <Link
                          className="dropdown-item"
                          to={`/styles/${encodeURIComponent(style)}`}
                        >
                          {style}
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
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  {sortedBreweries.length > 0 ? (
                    sortedBreweries.map((brewery) => (
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
            <div className="me-2">
              <ul id="menu" className="estilos navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Bares
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown2"
                  >
                    {sortedBars.length > 0 ? (
                      sortedBars.map((bar) => (
                        <li key={bar.id}>
                          <Link className="dropdown-item" to={`/bar/${bar.id}`}>
                            {bar.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <h6 className="text-center">Sin Bares</h6>
                    )}
                  </ul>
                </li>

                <hr />
              </ul>
            </div>
            <SearchBar />
            <hr />
            <div className="signin-button dropdown">
              <button
                type="button"
                className={!jwt ? "btn btn-warning" : "btn m-0 p-0"}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {!jwt ? (
                  <i className="fa-solid fa-user"></i>
                ) : (
                  <div className="conteiner-userImg">
                    <img className="userImg" src={userImg}></img>
                  </div>
                )}
              </button>

              <ul className="signin-button dropdown-menu dropdown-menu-lg-end">
                <li>
                  <Link
                    to="/add_brewery"
                    className={`${
                      getTokenInfo() === "Consumidor" ||
                      getTokenInfo() === "Vendedor" ||
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
                    to="/add_bar"
                    className={`${
                      getTokenInfo() === "Consumidor" || !jwt
                        ? "dropdown-item text-dark d-none"
                        : "dropdown-item text-dark"
                    }`}
                  >
                    Agregar Bar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add_beer"
                    className={`${
                      getTokenInfo() === "Consumidor" || !jwt
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
                      getTokenInfo() === "Consumidor" || !jwt
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
      </div>
    </nav>
  );
};
