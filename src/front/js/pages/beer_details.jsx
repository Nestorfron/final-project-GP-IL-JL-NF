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
  }, []);

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
    <div w-75>
      <div className="logo-header p-5 d-flex justify-content-center row">
        <img
          className=" brewery-beer-details-picture col-12"
          src={findBreweryLogo(beerDetails.brewery_id, breweries)}
          onClick={() => handleBreweryClick(beerDetails.brewery_id)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="container-fluid text-light d-flex justify-content-center align-items-center row">
        <div className="beer-text col-6">
          <div className="beer-details-header">
            <h2 className="beer-name">{beerDetails.name}</h2>
            <h4 className="BJCP-style ms-2 mt-4">{beerDetails.bjcp_style}</h4>
          </div>
          <div className="Description ms-2 mt-3">
            <p>{beerDetails.description}</p>
            <p>IBU's: {beerDetails.IBUs}</p>
            <p>ABV: {beerDetails.volALC}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center col-6">
          <img
            className="beer-detail-picture"
            src={beerDetails.picture_of_beer_url}
          />
        </div>
      </div>
    </div>
  );
};
