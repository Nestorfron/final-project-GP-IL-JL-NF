import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import "../../styles/form_adds.css";
import Swal from "sweetalert2";

const Form_add_event = ({ id, btnEvent, event: initialEvent }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [picture_of_event, setPicture_of_event] = useState(null);
  //   const [name, setName] = useState("");
  //   const [description, setdescription] = useState("");
  //   const [date, setdate] = useState("");
  //   const [brewery_id, setBrewery_id] = useState("");
  const [event, setEvent] = useState({
    name: "",
    brewery_id: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setEvent({ ...event, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      console.log("editando", id);
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se edita el Evento.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(picture_of_event);
        if (result) {
          console.log(result);
        }
        const response = await actions.edit_event(
          id,
          event.name,
          event.brewery_id,
          event.date,
          event.description,
          result
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Evento Editado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al editar el Evento. No se pudo",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al editar el Evento.: ${error.message}`,
        });
      }
    } else {
      console.log("creando");
      setLoading(true);

      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se crea el Evento.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(picture_of_event);
        if (result) {
          console.log(result);
        }
        const response = await actions.add_event(
          event.name,
          event.brewery_id,
          event.description,
          event.date,
          result
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Evento creado correctamente.",
            showConfirmButton: false,
            timer: 1500,
          });
          setEvent({
            name: "",
            brewery_id: "",
            date: "",
            description: "",
            result: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear el evento.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
    if (initialEvent) {
      setEvent({
        name: initialEvent.name || "",
        date: initialEvent.date || "",
        description: initialEvent.description || "",
        result: initialEvent.result || "",
        brewery_id: initialEvent.brewery_id,
      });
    }
  }, [initialEvent]);

  return (
    <form className="container mt-4 form-container" onSubmit={handleSubmit}>
      <h2 className="mb-4">{id ? "" : "Añadir Evento"}</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form form-grup mx-sm-4 mb-3 mt-1">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre del evento
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={event.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form form-grup mx-sm-4 mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Fecha de tu evento
            </label>
            <input
              type="text"
              className="form-control"
              value={event.date}
              name="date"
              onChange={(e) => handleChange(e)}
            />
          </div>
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
        </div>
        <div className="col-6">
          <div className="form form-grup mx-sm-4 mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Descripción de tu evento
            </label>
            <textarea
              type="text"
              className="form-control"
              rows="6"
              value={event.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <select
            className="form-select ms-4 "
            aria-label="Default select example"
            value={event.brewery_id}
            name="brewery_id"
            onChange={(e) => handleChange(e)}
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
        </div>
        <div className="text-center">
          <button type="submit" className="entrar mx-sm-4 mt-2">
            {btnEvent}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form_add_event;
