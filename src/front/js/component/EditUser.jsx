import React from "react";
import "../../styles/modal.css";
import UsersForm from "./UsersForm.jsx";

const EditUser = ({ user }) => {
  return (
    <>
      <button
        type="button"
        className="editButton"
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
                Editar Usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <UsersForm btnUser={"Guardar"} user={user} id={user.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
