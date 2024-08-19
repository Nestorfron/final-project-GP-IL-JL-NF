import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/breweryView.css";
import React from "react";

export const BreweryDetails = () => {
  const { breweryId } = useParams();
  const { store, actions } = useContext(Context);
  const { beers, breweries, events } = store;
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

  // Check if there are neither events nor beers
  if (breweryEvents.length === 0 && breweryBeers.length === 0) {
    return <p className="text-center text-muted">Nada por aquí...</p>;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="brewery-details-container bg-white">
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
        {/* Display Events Section if there are any events */}
        {breweryEvents.length > 0 && (
          <>
            <h4 className="text-dark my-3 fw-bold">
              Eventos de {brewery.name}:
            </h4>
            <div className="row d-flex justify-content-center">
              {breweryEvents.map((event) => (
                <div
                  key={event.id}
                  className="brewery-event-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 my-3"
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
                  <h4 className="ms-2 brewery-event-name text-dark fw-bold">
                    {event.name}
                  </h4>
                  <div className="py-2 text-dark">
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
            <h4 className="text-dark my-3 fw-bold">
              Estilos de {brewery.name}:
            </h4>
            <div className="row d-flex justify-content-center">
              {breweryBeers.map((beer) => (
                <div
                  key={beer.id}
                  className="brewery-beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 my-3"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={
                        beer.picture_of_beer_url ||
                        "path/to/placeholder-image.jpg"
                      }
                      alt={beer.name}
                      className="brewery-beer-picture"
                    />
                  </div>
                  <h4 className="ms-2 brewery-beer-name text-dark fw-bold">
                    {beer.name}
                  </h4>
                  <div className="py-2 text-dark">
                    <p className="brewery-beer-style d-flex justify-content-between">
                      <span className="fw-bold">Estilo BJCP:</span>
                      <span> {beer.bjcp_style}</span>
                    </p>
                    <p className="brewery-beer-IBUs d-flex justify-content-between">
                      <span className="fw-bold">IBUs:</span>
                      <span> {beer.IBUs}</span>
                    </p>
                    <p className="brewery-beer-abv d-flex justify-content-between">
                      <span className="fw-bold">ABV:</span>
                      <span>{beer.volALC}%</span>
                    </p>
                  </div>
                  <button
                    className="add-to-basket"
                    onClick={() => handleMoreInfoClick(beer.id)}
                  >
                    Más Info
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
