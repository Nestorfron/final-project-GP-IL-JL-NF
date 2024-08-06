import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/beerCards.css";
import HazyIPA from "../../img/hazyipa.jpeg";

export const BeerCards = () => {
  const { store } = useContext(Context);
  const { beers, breweries } = store;

  const latestBeers = Array.isArray(beers)
    ? beers.sort((a, b) => b.id - a.id).slice(0, 9)
    : [];

  const findBreweryName = (breweryId, breweries) => {
    const brewery = breweries.find((b) => b.id === breweryId);
    return brewery ? brewery.name : "Brewery not found";
  };

  return (
    <div className="cards-container container-fluid">
      <h3 className="beer-cards-title">Estilos:</h3>
      <div className="d-flex justify-content-between row">
        {latestBeers.length > 0 ? (
          latestBeers.map((beer) => (
            <div key={beer.id} className="beer-card col-4 mx-3 mb-3">
              <div className="d-flex justify-content-center">
                <img
                  src={beer.picture_of_beer_url || HazyIPA}
                  alt={beer.name}
                  className="beer-picture"
                />
              </div>
              <h4 className="beer-name">{beer.name}</h4>
              <h5 className="beer-brewery">
                {findBreweryName(beer.brewery_id, breweries)}
              </h5>
              <p className="beer-style">Estilo BJCP: {beer.bjcp_style}</p>
              <p className="beer-IBUs">IBUs: {beer.IBUs}</p>
              <p className="beer-abv">ABV: {beer.volALC}</p>
              <button className="add-to-basket">Más Info</button>
            </div>
          ))
        ) : (
          <p>No beers available</p>
        )}
      </div>
    </div>
  );
};
