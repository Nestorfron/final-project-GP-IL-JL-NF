import React from "react";
import Add_Breweries from "../component/form_add_breweries.jsx";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

const Add_Brewery = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <Add_Breweries btnBrewery={"Enviar"} />
    </div>
  );
};

export default Add_Brewery;
