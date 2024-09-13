import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import EventsBarForm from "../component/EventsBarForm.jsx";

const AddEventBar = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <EventsBarForm btnEvent={"Guardar"}></EventsBarForm>
    </div>
  );
};

export default AddEventBar;
