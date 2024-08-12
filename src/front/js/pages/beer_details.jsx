import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/beerDetails.css";
import React from "react";

export const BeerDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const { beerDetails, breweries } = store;

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
  return (
    <div>
      <div className="m-5 text-center">
        <img
          className=" brewery-beer-details-picture"
          src={findBreweryLogo(beerDetails.brewery_id, breweries)}
        />
      </div>
      <div className="container-fluid text-light d-flex justify-content-center row">
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
        <div className="container text-center col-6">
          <img
            className="beer-detail-picture"
            src={beerDetails.picture_of_beer_url}
          />
        </div>
      </div>
    </div>
  );
};
