import React from "react";
import Form_add_beer from "../component/form_add-beers.jsx";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";

const Add_Style = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <Form_add_beer btnBeer={"Enviar"}></Form_add_beer>
    </div>
  );
};

export default Add_Style;
