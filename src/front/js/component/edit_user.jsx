import React from "react";
import "../../styles/modal.css";
import Form_add_users from "./form_add_users.jsx";

const Edit_user = ({ user }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#edit-user-${user.id}`}
      >
        <i className="fas fa-edit"></i>
      </button>
      <div
        className="modal fade"
        id={`edit-user-${user.id}`}
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
              <Form_add_users btnUser={"Edit"} user={user} id={user.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_user;
