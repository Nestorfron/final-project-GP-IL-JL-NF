import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import BarForm from "../component/BarForm.jsx";

const AddBar = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <BarForm btnBar={"Guardar"} />
    </div>
  );
};

export default AddBar;
