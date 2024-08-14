import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/beerCards.css";
import HazyIPA from "../../img/hazyipa.jpeg";
import { BeerDetails } from "../pages/beer_details.jsx";

export const BeerCards = () => {
  const { store, actions } = useContext(Context);
  const { beers, breweries, beerDetails } = store;
  const navigate = useNavigate();

  const [selectedBeer, setSelectedBeer] = useState(null);

  const latestBeers = Array.isArray(beers)
    ? beers.sort((a, b) => b.id - a.id).slice(0, 9)
    : [];

  const findBreweryName = (breweryId, breweries) => {
    const brewery = breweries.find((b) => b.id === breweryId);
    return brewery ? brewery.name : "Brewery not found";
  };

  const handleMoreInfoClick = async (beerId) => {
    await actions.getBeerDetails(beerId); // Call the flux action to get beer details
    navigate(`/beer/${beerId}`); // Navigate to the beer details page
  };

  return (
    <div className="container-fluid">
      <h6 className="beer-cards-title fw-bold my-2 mb-4">ULTIMOS ESTILOS:</h6>
      <div className="row d-flex justify-content-center">
        {latestBeers.length > 0 ? (
          latestBeers.map((beer) => (
            <div
              key={beer.id}
              className=" beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 mb-3"
            >
              <div className="d-flex justify-content-center">
                <img
                  src={beer.picture_of_beer_url || HazyIPA}
                  alt={beer.name}
                  className="beer-picture"
                />
              </div>
              <div>
                <h4 className="beer-name">{beer.name}</h4>
                <h5 className="beer-brewery">
                  {findBreweryName(beer.brewery_id, breweries)}
                </h5>
                <p className="beer-style d-flex justify-content-between">
                  <span>Estilo:</span>
                  <span> {beer.bjcp_style}</span>
                </p>
                <p className="beer-IBUs d-flex justify-content-between">
                  <span>IBUs:</span>
                  <span> {beer.IBUs}</span>
                </p>
                <p className="beer-abv d-flex justify-content-between">
                  <span>ABV:</span>
                  <span>{beer.volALC}%</span>
                </p>
                <button
                  className="add-to-basket"
                  onClick={() => handleMoreInfoClick(beer.id)}
                >
                  Más Info
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No beers available</p>
        )}
      </div>
      {selectedBeer && beerDetails && <BeerDetails beer={beerDetails} />}
    </div>
  );
};
