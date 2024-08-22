import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import Form_add_beer from "../component/form_add-beers.jsx";

const Add_Style = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <Form_add_beer btnBeer={"Guardar"}></Form_add_beer>
    </div>
  );
};

export default Add_Style;
