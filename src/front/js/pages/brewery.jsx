import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/breweryView.css";
import React from "react";

export const BreweryDetails = () => {
  const { breweryId } = useParams(); // Make sure this matches your route parameter
  const { store, actions } = useContext(Context);
  const { beers, breweries } = store;

  useEffect(() => {
    actions.getAllBreweries();
    actions.getAllBeers();
  }, []);

  const brewery = breweries.find((b) => b.id === parseInt(breweryId));
  const breweryBeers = beers.filter(
    (beer) => beer.brewery_id === parseInt(breweryId)
  );

  // Adjusted condition to check for data availability
  if (!brewery || !breweryBeers || breweryBeers.length === 0) {
    return <p>Loading...</p>;
  }

  console.log("Brewery:", brewery);
  console.log("Brewery Beers:", breweryBeers);
  console.log("Brewery Picture URL:", brewery.picture_of_brewery_url);
  console.log("Brewery Logo URL:", brewery.logo_of_brewery);

  return (
    <div className="brewery-details-container">
      <div className="brewery-jumbotron">
        <div>
          <img
            src={brewery.picture_of_brewery_url}
            className="brewery-jumbotron-background"
          />
          <img
            src={brewery.logo_of_brewery}
            className="brewery-jumbotron-brewery-logo"
          />
        </div>
      </div>

      <div className="container-fluid">
        <h4 className="text-light my-5">Cervezas de {brewery.name}:</h4>
        <div className="row d-flex justify-content-center">
          {breweryBeers.map((beer) => (
            <div
              key={beer.id}
              className="beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 mb-3"
            >
              <div className="d-flex justify-content-center">
                <img
                  src={
                    beer.picture_of_beer_url || "path/to/placeholder-image.jpg"
                  }
                  alt={beer.name}
                  className="beer-picture"
                />
              </div>
              <h4 className="beer-name">{beer.name}</h4>
              <p className="beer-style">Estilo BJCP: {beer.bjcp_style}</p>
              <p className="beer-IBUs">IBUs: {beer.IBUs}</p>
              <p className="beer-abv">ABV: {beer.volALC}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
