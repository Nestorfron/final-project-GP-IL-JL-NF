import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import EventsForm from "../component/EventsForm.jsx";

const AddEvent = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <EventsForm btnEvent={"Guardar"}></EventsForm>
    </div>
  );
};

export default AddEvent;
