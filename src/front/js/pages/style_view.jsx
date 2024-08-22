import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/breweryView.css";
import React from "react";
import fullGlass from "../../img/fullglass.png";
import emptyGlass from "../../img/empty.png";

export const Styles_View = () => {
  const { styleName } = useParams();
  const { store, actions } = useContext(Context);
  const { beers, averageRatings } = store;
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

  // Function to generate full and empty glasses based on rating
  const getRatingGlasses = (rating) => {
    const fullGlasses = Math.floor(rating);
    const emptyGlasses = 5 - fullGlasses;
    return {
      full: Array.from({ length: fullGlasses }),
      empty: Array.from({ length: emptyGlasses }),
    };
  };

  return (
    <div>
      <h6 className="text-light mx-3 mt-5 fw-bold">
        CERVEZAS ESTILO {decodeURIComponent(styleName)}:
      </h6>
      <div className="row d-flex justify-content-center">
        {filteredBeers.map((beer) => {
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
                    beer.picture_of_beer_url || "path/to/placeholder-image.jpg"
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
                    <span>{beer.bjcp_style}</span>
                  </p>
                  <p className="beer-IBUs d-flex justify-content-between">
                    <span className="fw-bold">IBUs:</span>
                    <span>{beer.IBUs}</span>
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
    </div>
  );
};
