import React from "react";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import Form_add_event from "../component/form_add-event.jsx";

const Add_Event = () => {
  useTokenExpiration();
  return (
    <div className="container">
      <Form_add_event btnEvent={"Guardar"}></Form_add_event>
    </div>
  );
};

export default Add_Event;
