import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/beerDetails.css";

export const BeerDetails = ({ beer }) => {
  const { store } = useContext(Context);
  const { beers, breweries } = store;

  return (
    <div>
      <div className="container-fluid">
        <div className="beer-details-header">
          <h5 className="beer-name">{beer.name}</h5>
          <h6 className="BJCP-style">{beer.bjcp_style}</h6>
        </div>
        <div className="Description">
          <p>{beer.description}</p>
        </div>
      </div>
    </div>
  );
};
