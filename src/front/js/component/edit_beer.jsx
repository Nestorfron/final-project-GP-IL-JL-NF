import React from "react";
import "../../styles/modal.css";
import Form_add_beer from "../component/form_add-beers.jsx";

const Edit_beers = ({ beer }) => {
  console.log(beer);
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#edit-beer-${beer.id}`}
      >
        <i className="fas fa-edit"></i>
      </button>
      <div
        className="modal fade"
        id={`edit-beer-${beer.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-4" id="exampleModalLabel">
                Editar Cerveza
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form_add_beer btnBeer={"Edit"} beer={beer} id={beer.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_beers;
