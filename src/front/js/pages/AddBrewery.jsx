import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import BreweriesForm from "../component/BreweriesForm.jsx";

const AddBrewery = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <BreweriesForm btnBrewery={"Guardar"} />
    </div>
  );
};

export default AddBrewery;
