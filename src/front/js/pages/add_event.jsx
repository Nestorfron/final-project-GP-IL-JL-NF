import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import "../../styles/addEvent.css";

const Add_Event = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [picture_of_event, setPicture_of_event] = useState(null);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [brewery_id, setBrewery_id] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await uploadFile(picture_of_event);
    if (result) {
      console.log(result);
    }

    const response = await actions.add_event(
      name,
      brewery_id,
      description,
      date,
      result
    );
    console.log(name, brewery_id, description, date, result);
    if (response) {
      alert("Evento creado correctamente");
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
    actions.getUserBreweries();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="add-event-form  w-50">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <div className="form form-grup">
                <h1 className="registro">Agrega tu evento</h1>
              </div>
            </div>
            <div className="card-body">
              <div className="form form-grup mx-sm-4 mb-3 mt-1">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nombre del evento
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Descripción de tu evento
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Fecha de tu evento
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                />
              </div>
              <select
                className="form-select ms-4 "
                aria-label="Default select example"
                onChange={(e) => setBrewery_id(e.target.value)}
              >
                <option value="" selected>
                  Selecciona una cervecería
                </option>
                {store.userBreweries.map((brewery) => {
                  return (
                    <option key={brewery.id} value={brewery.id}>
                      {brewery.name}
                    </option>
                  );
                })}
              </select>
              <div className="mb-3 mx-sm-4 mb-4">
                <label htmlFor="formFile" className="form-label">
                  Sube una imagen de tu evento
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile03"
                  onChange={(e) => setPicture_of_event(e.target.files[0])}
                />
              </div>
              <button type="submit" className="entrar mx-sm-4 mt-2">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Event;
