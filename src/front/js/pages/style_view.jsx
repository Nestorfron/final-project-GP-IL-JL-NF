import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/breweryView.css";
import React from "react";

export const Styles_View = () => {
  const { styleName } = useParams();
  const { store, actions } = useContext(Context);
  const { beers } = store;
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAllBeers();
  }, []);

  const filteredBeers = beers.filter(
    (beer) => beer.bjcp_style === decodeURIComponent(styleName)
  );

  if (filteredBeers.length === 0) {
    return (
      <p className="text-center text-muted">
        No hay cervezas disponibles para este estilo.
      </p>
    );
  }

  const handleMoreInfoClick = (beerId) => {
    navigate(`/beer/${beerId}`);
  };

  return (
    <div className="bg-white">
      <h4 className="text-dark my-3 fw-bold">
        Cervezas del estilo {decodeURIComponent(styleName)}:
      </h4>
      <div className="row d-flex justify-content-center">
        {filteredBeers.map((beer) => (
          <div
            key={beer.id}
            className="brewery-beer-card col-12 col-sm-6 col-md-4 col-lg-3 mx-2 my-3"
          >
            <div className="d-flex justify-content-center">
              <img
                src={
                  beer.picture_of_beer_url || "path/to/placeholder-image.jpg"
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
                <span>{beer.bjcp_style}</span>
              </p>
              <p className="brewery-beer-IBUs d-flex justify-content-between">
                <span className="fw-bold">IBUs:</span>
                <span>{beer.IBUs}</span>
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
    </div>
  );
};
