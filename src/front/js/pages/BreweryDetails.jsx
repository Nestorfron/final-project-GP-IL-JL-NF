import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/breweryView.css";
import React from "react";
import fullGlass from "../../img/fullglass.png";
import emptyGlass from "../../img/empty.png";

export const BreweryDetails = () => {
  const { breweryId } = useParams();
  const { store, actions } = useContext(Context);
  const { beers, breweries, events, averageRatings } = store;
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAllBreweries();
    actions.getAllBeers();
    actions.getAllEvents();
  }, []);

  const brewery = breweries.find((b) => b.id === parseInt(breweryId));
  const breweryBeers = beers.filter(
    (beer) => beer.brewery_id === parseInt(breweryId)
  );
  const breweryEvents = events.filter(
    (event) => event.brewery_id === parseInt(breweryId)
  );

  if (!brewery) {
    return <p>Loading...</p>;
  }

  const handleMoreInfoClick = (beerId) => {
    navigate(`/beer/${beerId}`);
  };

  // Function to generate full and empty glasses based on rating
  const getRatingGlasses = (rating) => {
    const fullGlasses = Math.floor(rating);
    const emptyGlasses = 5 - fullGlasses;
    return {
      full: Array.from({ length: fullGlasses }),
      empty: Array.from({ length: emptyGlasses }),
    };
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  // Check if there are neither events nor beers
  if (breweryEvents.length === 0 && breweryBeers.length === 0) {
    return <p className="text-center text-muted">Nada por aquí...</p>;
  }

  return (
    <div className="brewery-details-container ">
      <div className="brewery-jumbotron">
        <div>
          <img
            src={brewery.picture_of_brewery_url}
            className="brewery-jumbotron-background"
          />
          <img
            src={brewery.logo_of_brewery_url}
            className="brewery-jumbotron-brewery-logo"
          />
        </div>
      </div>

      <div className="container d-flex align-items-center justify-content-center mt-5 ">
        <div className=" container text-light  brewery-contacts-info">
          {brewery.history && <p>{brewery.history}</p>}
        </div>
      </div>

      <div className="container d-flex justify-content-center my-3">
        {brewery.instagram_url && (
          <p>
            <a
              href={brewery.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light m-3"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </p>
        )}

        {brewery.facebook_url && (
          <p>
            <a
              href={brewery.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light m-3"
            >
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </p>
        )}

        {brewery.x_url && (
          <p>
            <a
              href={brewery.x_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light m-3"
            >
              <i className="fab fa-twitter"></i> X
            </a>
          </p>
        )}
      </div>

      <div className="container-fluid">
        {/* Display Events Section if there are any events */}
        {breweryEvents.length > 0 && (
          <>
            <h6 className="text-light mx-3 mt-5 fw-bold">EVENTOS:</h6>
            <div className="row d-flex justify-content-center">
              {breweryEvents.map((event) => (
                <div
                  key={event.id}
                  className="beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 my-3"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={
                        event.picture_of_event_url ||
                        "path/to/placeholder-image.jpg"
                      }
                      alt={event.name}
                      className="brewery-event-picture"
                    />
                  </div>
                  <h4 className="ms-2 beer-name fw-bold">{event.name}</h4>
                  <div className="py-2 text-light">
                    <p className="event-description">
                      <span className="fw-bold">Descripción:</span>
                      <span> {event.description}</span>
                    </p>
                    <p className="event-date d-flex justify-content-between">
                      <span className="fw-bold">Fecha:</span>
                      <span> {formatDate(event.date)}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Display Beers Section if there are any beers */}
        {breweryBeers.length > 0 && (
          <>
            <h6 className="text-light mx-3 mt-5 fw-bold">ESTILOS:</h6>
            <div className="row d-flex justify-content-center">
              {breweryBeers.map((beer) => {
                const rating = averageRatings[beer.id] || "N/A";
                const { full, empty } =
                  rating !== "N/A"
                    ? getRatingGlasses(parseFloat(rating))
                    : { full: [], empty: [] };

                return (
                  <div
                    key={beer.id}
                    className="beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 my-5"
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src={
                          beer.picture_of_beer_url ||
                          "path/to/placeholder-image.jpg"
                        }
                        alt={beer.name}
                        className="beer-picture"
                      />
                    </div>
                    <div className="beer-card-text">
                      <h5 className="ms-2 beer-name  fw-bold">{beer.name}</h5>
                      <div className="py-2 text-light">
                        <p className="beer-style d-flex justify-content-between">
                          <span className="fw-bold">Estilo BJCP:</span>
                          <span> {beer.bjcp_style}</span>
                        </p>
                        <p className="beer-IBUs d-flex justify-content-between">
                          <span className="fw-bold">IBUs:</span>
                          <span> {beer.IBUs}</span>
                        </p>
                        <p className="beer-abv d-flex justify-content-between">
                          <span className="fw-bold">ABV:</span>
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
                      </div>
                      <button
                        className="add-to-basket"
                        onClick={() => handleMoreInfoClick(beer.id)}
                      >
                        Más Info
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
