import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/beerCards.css";
import HazyIPA from "../../img/hazyipa.jpeg";
import fullGlass from "../../img/fullglass.png";
import emptyGlass from "../../img/empty.png";
import BarSelectModal from "../component/BarSelectModal.jsx";

export const BeerCards = () => {
  const { store, actions } = useContext(Context);
  const { beers, breweries, averageRatings } = store;
  const [showModal, setShowModal] = useState(false);
  const [beer, setBeer] = useState();
  const [selectedBeer, setSelectedBeer] = useState(null);
  const navigate = useNavigate();

  const latestBeers = Array.isArray(beers)
    ? beers.sort((a, b) => b.id - a.id).slice(0, 12)
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

  const handleAddBeerToBar = ({ beer }) => {
    console.log(
      beer.id,
      beer.user_id,
      beer.brewery_id,
      beer.name,
      beer.bjcp_style,
      beer.IBUs,
      beer.volALC,
      beer.description,
      beer.picture_of_beer_url
    );
    setBeer(beer);
    setShowModal(true);
  };

  const handleSelectBar = (barId) => {
    console.log(barId);
    console.log(beer);
    actions.addBeerToBar(
      barId,
      beer.id,
      beer.user_id,
      beer.brewery_id,
      beer.name,
      beer.bjcp_style,
      beer.IBUs,
      beer.volALC,
      beer.description,
      beer.picture_of_beer_url
    );
    setShowModal(false);
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
                  <h5 className="beer-name fw-bold">{beer.name}</h5>
                  <h6 className="beer-brewery">
                    {findBreweryName(beer.brewery_id, breweries)}
                  </h6>
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
                  {store.me.rol === "Vendedor" && (
                    <button
                      className="add-to-basket"
                      onClick={() => handleAddBeerToBar({ beer })}
                    >
                      Añadir a Mi Bar
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No beers available</p>
        )}
        {showModal && (
          <BarSelectModal
            bars={store.bars}
            onSelectBar={handleSelectBar}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};
