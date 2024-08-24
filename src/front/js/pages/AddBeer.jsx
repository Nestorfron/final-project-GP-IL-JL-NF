import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import BeersForm from "../component/BeersForm.jsx";

const Add_Style = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <BeersForm btnBeer={"Guardar"}></BeersForm>
    </div>
  );
};

export default Add_Style;
