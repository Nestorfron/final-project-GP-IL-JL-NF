import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/beerDetails.css";
import React from "react";

export const BeerDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const { beerDetails, breweries } = store;
  const navigate = useNavigate();

  useEffect(() => {
    actions.getBeerDetails(id);
    actions.getAllBreweries();
  }, [id]);

  if (!beerDetails || !breweries) {
    return <p>Loading...</p>;
  }

  const findBreweryLogo = (breweryId, breweries) => {
    const brewery = breweries.find((b) => b.id === breweryId);
    return brewery ? brewery.logo_of_brewery : "path/to/placeholder-image.jpg";
  };

  const handleBreweryClick = (breweryId) => {
    navigate(`/brewery/${breweryId}`);
  };

  return (
    <div className="container-fluid beer-details-whole-body w-100 text-dark bg-white p-5">
      <div className="logo-header d-flex justify-content-center row mb-5">
        <img
          className="brewery-beer-details-picture col-12"
          src={findBreweryLogo(beerDetails.brewery_id, breweries)}
          onClick={() => handleBreweryClick(beerDetails.brewery_id)}
          style={{ cursor: "pointer" }}
          alt="Brewery Logo"
        />
      </div>
      <div className="container-fluid beer-details-body d-flex justify-content-center align-items-center">
        <div className="beer-text">
          <div className="beer-details-header">
            <h2 className="beer-details-name fw-bold ms-2">
              {beerDetails.name}
            </h2>
            <p className="beer-details-description ms-2">
              {beerDetails.description}
            </p>
            <p className="BJCP-style ms-2 mt-4">
              <span>Estilo:</span>
              <span>{beerDetails.bjcp_style}</span>
            </p>
          </div>
          <div className="ms-2 mt-3">
            <p className="beer-details-IBUs">
              <span>IBU's:</span>
              <span>{beerDetails.IBUs}</span>
            </p>
            <p className="beer-details-ABV">
              <span>ABV:</span>
              <span>{beerDetails.volALC}%</span>
            </p>
          </div>
        </div>
        <div className=" container container-logo d-flex justify-content-center align-items-center ">
          <img
            className="beer-detail-picture m-4"
            src={beerDetails.picture_of_beer_url}
            alt="Beer"
          />
        </div>
      </div>
    </div>
  );
};
