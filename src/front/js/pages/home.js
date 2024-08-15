import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Carousel } from "../component/carousel.jsx";
import { BeerCards } from "../component/beerCards.jsx";
import Map from "../component/map.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid d-flex flex-column">
      <div className="container-fluid m-0 p-0">
        <Carousel />
      </div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <BeerCards />
      </div>
      <div className="container-fluid justify-content-center mt-3">
        <label
          htmlFor="logo_of_brewery"
          className="form-label fw-bold text-white fs-3"
        >
          CERVECERÍAS CERCA:
        </label>
        <Map />
      </div>
    </div>
  );
};
