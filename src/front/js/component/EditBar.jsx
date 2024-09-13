import React from "react";
import BarForm from "./BarForm.jsx";

const EditBar = ({ bar }) => {
  return (
    <>
      <button
        type="button"
        className="editButton"
        data-bs-toggle="modal"
        data-bs-target={`#edit-bar-${bar.id}`}
      >
        <i className="fas fa-edit"></i>
      </button>
      <div
        className="modal fade"
        id={`edit-bar-${bar.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-4" id="exampleModalLabel">
                Editar Bar
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <BarForm btnBar={"Guardar"} bar={bar} id={bar.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBar;
