import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import "../../styles/formAdds.css";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const EventsBarForm = ({ id, btnEvent, event: initialEvent }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [picture_of_event, setPicture_of_event] = useState(null);
  const [event, setEvent] = useState({
    name: "",
    bar_id: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  // Función para manejar el cambio de inputs de texto
  function handleChange(e) {
    setEvent({ ...event, [e.target.name]: e.target.value });
  }

  // Función para manejar el cambio de la fecha
  const handleDateChange = (date) => {
    setEvent({ ...event, date: date });
    console.log(date);
  };

  // Manejo del archivo de imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (file && !validExtensions.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Formato de archivo no válido",
        text: "Por favor, sube un archivo en formato JPG, JPEG o PNG.",
      });
      setPicture_of_event(null);
    } else {
      setPicture_of_event(file);
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!picture_of_event) {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor, sube una imagen válida en formato JPG, JPEG o PNG.",
      });
      return;
    }

    if (id) {
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
        const response = await actions.edit_event_bar(
          id,
          event.name,
          event.bar_id,
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
            text: "Hubo un problema al editar el Evento.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al editar el Evento: ${error.message}`,
        });
      }
    } else {
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
        const response = await actions.add_event_bar(
          event.name,
          event.bar_id,
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
            bar_id: "",
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
        bar_id: initialEvent.bar_id,
      });
    }
    actions.getUserBars();
  }, [initialEvent]);

  return (
    <form className="container mt-5 form-container" onSubmit={handleSubmit}>
      <h2 className="mb-4">{id ? "" : "Añadir Evento (bar)"}</h2>
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="form form-grup mx-sm-4 mb-4">
            <label htmlFor="date" className="form-label">
              Fecha de tu evento
            </label>
            <DatePicker
              selected={event.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="Elige una fecha"
              name="date"
              required
            />
          </div>
          <div className="mb-3 mx-sm-4 mb-4">
            <label htmlFor="formFile" className="form-label">
              Sube una imagen de tu evento (JPG, JPEG, PNG)
            </label>
            <input
              type="file"
              className="form-control"
              id="inputGroupFile03"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>
        <div className="col">
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
              onChange={handleChange}
              required
            />
          </div>
          <select
            className="form-select me-sm-4 mb-4"
            aria-label="Default select example"
            value={event.bar_id}
            name="bar_id"
            onChange={handleChange}
            required
          >
            <option selected>Selecciona un Bar</option>
            {store.userBars.map((bar) => {
              return (
                <option key={bar.id} value={bar.id}>
                  {bar.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="enter mt-2">
            {btnEvent}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventsBarForm;
