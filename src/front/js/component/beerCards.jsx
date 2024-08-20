import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/beerCards.css";
import HazyIPA from "../../img/hazyipa.jpeg";
import fullGlass from "../../img/fullglass.png";
import emptyGlass from "../../img/empty.png";

export const BeerCards = () => {
  const { store, actions } = useContext(Context);
  const { beers, breweries, averageRatings } = store;
  const navigate = useNavigate();

  const latestBeers = Array.isArray(beers)
    ? beers.sort((a, b) => b.id - a.id).slice(0, 9)
    : [];

  // Function to generate full and empty glasses based on rating
  const getRatingGlasses = (rating) => {
    const fullGlasses = Math.floor(rating);
    const emptyGlasses = 5 - fullGlasses;
    return {
      full: Array.from({ length: fullGlasses }),
      empty: Array.from({ length: emptyGlasses }),
    };
  };

  const findBreweryName = (breweryId, breweries) => {
    const brewery = breweries.find((b) => b.id === breweryId);
    return brewery ? brewery.name : "Brewery not found";
  };

  const handleMoreInfoClick = async (beerId) => {
    await actions.getBeerDetails(beerId); // Fetch beer details
    navigate(`/beer/${beerId}`); // Navigate to the beer details page
  };

  return (
    <div className="container-fluid">
      <h6 className="beer-cards-title fw-bold my-2 mb-4">ULTIMOS ESTILOS:</h6>
      <div className="row d-flex justify-content-center">
        {latestBeers.length > 0 ? (
          latestBeers.map((beer) => {
            const rating = averageRatings[beer.id] || "N/A";
            const { full, empty } =
              rating !== "N/A"
                ? getRatingGlasses(parseFloat(rating))
                : { full: [], empty: [] };

            return (
              <div
                key={beer.id}
                className="beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 mb-3 shadow-lg"
              >
                <div className="d-flex justify-content-center">
                  <img
                    src={beer.picture_of_beer_url || HazyIPA}
                    alt={beer.name}
                    className="beer-picture"
                  />
                </div>
                <div className="beer-card-text">
                  <h4 className="beer-name">{beer.name}</h4>
                  <h5 className="beer-brewery">
                    {findBreweryName(beer.brewery_id, breweries)}
                  </h5>
                  <p className="beer-style d-flex justify-content-between">
                    <span>Estilo:</span>
                    <span>{beer.bjcp_style}</span>
                  </p>
                  <p className="beer-IBUs d-flex justify-content-between">
                    <span>IBUs:</span>
                    <span>{beer.IBUs}</span>
                  </p>
                  <p className="beer-abv d-flex justify-content-between">
                    <span>ABV:</span>
                    <span>{beer.volALC}%</span>
                  </p>
                  <p className="beer-rating d-flex justify-content-between">
                    <span className="me-2">Rating:</span>
                    <span>
                      {full.map((_, index) => (
                        <img
                          key={`full-${index}`}
                          src={fullGlass}
                          alt="Full Glass"
                          style={{ width: "20px", marginRight: "3px" }}
                        />
                      ))}
                      {empty.map((_, index) => (
                        <img
                          key={`empty-${index}`}
                          src={emptyGlass}
                          alt="Empty Glass"
                          style={{ width: "20px", marginRight: "3px" }}
                        />
                      ))}
                    </span>
                  </p>
                  <button
                    className="add-to-basket"
                    onClick={() => handleMoreInfoClick(beer.id)}
                  >
                    Más Info
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No beers available</p>
        )}
      </div>
    </div>
  );
};
