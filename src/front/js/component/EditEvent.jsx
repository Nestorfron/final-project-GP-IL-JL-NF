import React from "react";
import "../../styles/modal.css";
import EventsFrom from "./EventsForm.jsx";

const EditEvent = ({ event }) => {
  console.log(event);
  return (
    <>
      <button
        type="button"
        className="editButton"
        data-bs-toggle="modal"
        data-bs-target={`#edit-event-${event.id}`}
      >
        <i className="fas fa-edit"></i>
      </button>
      <div
        className="modal fade"
        id={`edit-event-${event.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-4" id="exampleModalLabel">
                Editar Evento
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EventsFrom btnEvent={"Guardar"} event={event} id={event.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEvent;
