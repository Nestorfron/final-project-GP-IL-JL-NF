import React from "react";
import "../../styles/modal.css";
import Form_add_event from "../component/form_add-event.jsx";

const Edit_event = ({ event }) => {
  console.log(event);
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
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
              <Form_add_event btnEvent={"Edit"} event={event} id={event.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_event;
