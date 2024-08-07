import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Carousel } from "../component/carousel.jsx";
import { BeerCards } from "../component/beerCards.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllBreweries();
    actions.getAllBeers();
    actions.getAllEvents();
    actions.getStyles();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column w-75">
      <div className="container-fluid d-flex justify-content-center carousel-wrapper">
        <Carousel />
      </div>
      <div className="container-fluid d-flex justify-content-center mt-3">
        <BeerCards />
      </div>
    </div>
  );
};
