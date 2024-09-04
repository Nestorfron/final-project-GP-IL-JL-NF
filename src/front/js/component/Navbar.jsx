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

  const [loading, setLoading] = useState(true);

  const user = store.me;
  const userImg = user.profile_picture;

  console.log(getFlagImage("Uruguay"));

  const selectCountry = (country) => {
    actions.getSelectedCountryAllInfo(country);
    console.log(country);
    navigate(`/${country}`);
  };

  const getFilteredCountries = (allCountries, detectedCountry) => {
    const uniqueCountries = [...new Set(allCountries)];
    return uniqueCountries.filter((country) => country !== detectedCountry);
  };
  const filteredCountries = getFilteredCountries(
    store.allCountries,
    store.detectedCountry
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
    setLoading(false);
  }, []);

  const uniqueStyles = [
    ...new Set(store.beers.map((beer) => beer.bjcp_style)),
  ].sort(); // Sort styles alphabetically

  const sortedBreweries = [...store.breweries].sort((a, b) =>
    a.name.localeCompare(b.name)
  ); // Sort breweries alphabetically

  const detectedCountry = store.detectedCountry;
  const flagImage = getFlagImage(detectedCountry);

  console.log(detectedCountry);

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
          <div className="col-1">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="countryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={getFlagImage(detectedCountry)}
                  alt={countryNameToCode[detectedCountry]}
                  style={{ width: "20px", marginRight: "10px" }}
                />
                {countryNameToCode[detectedCountry]}
              </button>
              <ul className="dropdown-menu" aria-labelledby="countryDropdown">
                {filteredCountries.map((country, index) => (
                  <li key={country + index}>
                    <button
                      className="dropdown-item"
                      onClick={() => selectCountry(country)}
                    >
                      <img
                        src={getFlagImage(country)}
                        alt={countryNameToCode[country]}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {countryNameToCode[country]}
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
          <SearchBar />
          <hr />
          <div className="signin-button">
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
                  Agregar Cerveza
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
