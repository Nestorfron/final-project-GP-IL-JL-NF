import React from "react";
import "../../styles/home.css";
import { Carousel } from "../component/carousel.jsx";
import { BeerCards } from "../component/beerCards.jsx";
import Map from "../component/map.jsx";

export const Home = () => {
  return (
    <div className="container-fluid d-flex flex-column">
      <div className="container-fluid m-0 p-0 shadow">
        <Carousel />
      </div>
      <div className="container-fluid d-flex justify-content-center mt-3 shadow">
        <BeerCards />
      </div>
      <div className="container-fluid justify-content-center mt-3 shadow">
        <h6 className="map-title fw-bold my-2 mb-4">CERVECERÍAS CERCA:</h6>
        <Map />
      </div>
    </div>
  );
};
