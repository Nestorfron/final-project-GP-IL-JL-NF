import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import Swal from "sweetalert2";
import "../../styles/form_adds.css";
import Map from "../component/map.jsx";

const Add_Breweries = ({ btnBrewery, id, brewery: initialBrewery }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [logo_of_brewery, setLogo_of_brewery] = useState(null);
  const [picture_of_brewery, setPicture_of_brewery] = useState(null);
  const [brewery, setBrewery] = useState({
    name: "",
    address: "",
    history: "",
    facebook_url: "",
    instagram_url: "",
    x_url: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setBrewery({ ...brewery, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      console.log("editando", id);
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se edita la cervecería.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(logo_of_brewery);
        if (result) {
          console.log(logo_of_brewery.name);
        }
        const result1 = await uploadFile(picture_of_brewery);
        if (result1) {
          console.log(picture_of_brewery.name);
        }
        const response = await actions.edit_breweries(
          id,
          brewery.name,
          brewery.address,
          brewery.history,
          brewery.facebook_url,
          brewery.instagram_url,
          result1,
          brewery.x_url,
          result
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cervecería Editada",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al editar la cervecería.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al editar la cervecería: ${error.message}`,
        });
      }
    } else {
      console.log("creando");

      setLoading(true);

      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se crea la cervecería.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const result = await uploadFile(logo_of_brewery);
        if (result) {
          console.log(result);
          console.log(logo_of_brewery.name);
        }
        const result1 = await uploadFile(picture_of_brewery);
        if (result1) {
          console.log(picture_of_brewery.name);
        }

        const response = await actions.add_brewery(
          brewery.name,
          brewery.address,
          brewery.history,
          brewery.facebook_url,
          brewery.instagram_url,
          result,
          brewery.x_url,
          result1
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cervecería creada correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setBrewery({
            name: "",
            address: "",
            history: "",
            facebook_url: "",
            instagram_url: "",
            x_url: "",
            result1: null,
            result: null,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear la cervecería.",
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
    if (initialBrewery) {
      setBrewery({
        name: initialBrewery.name || "",
        address: initialBrewery.address || "",
        history: initialBrewery.history || "",
        facebook_url: initialBrewery.facebook_url || "",
        instagram_url: initialBrewery.instagram_url || "",
        x_url: initialBrewery.x_url || "",
      });
      // Optionally set the logo and picture if they are passed
      setLogo_of_brewery(initialBrewery.logo_of_brewery.name || null);
      setPicture_of_brewery(initialBrewery.picture_of_brewery || null);
    }
  }, [initialBrewery]);

  return (
    <>
      <form className="container mt-4 form-container" onSubmit={handleSubmit}>
        <h2 className="mb-4">{id ? "" : "Añadir Cervecería"}</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={brewery.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label fw-bold">
              Ciudad *
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="address"
              value={brewery.address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="facebook_url" className="form-label fw-bold">
              Link FaceBook
            </label>
            <input
              type="text"
              name="facebook_url"
              className="form-control"
              id="facebook_url"
              value={brewery.facebook_url}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="instagram_url" className="form-label fw-bold">
              Link Instagram
            </label>
            <input
              type="text"
              name="instagram_url"
              className="form-control"
              id="instagram_url"
              value={brewery.instagram_url}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="x_url" className="form-label fw-bold">
              Link de X
            </label>
            <input
              type="text"
              name="x_url"
              className="form-control"
              id="x_url"
              value={brewery.x_url}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="history" className="form-label fw-bold">
              Descripción *
            </label>
            <textarea
              name="history"
              className="form-control"
              id="history"
              rows="5"
              value={brewery.history}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="picture_of_brewery" className="form-label fw-bold">
            Foto Portada
          </label>
          <input
            type="file"
            className="form-control"
            id="picture_of_brewery"
            onChange={(e) => setPicture_of_brewery(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="logo_of_brewery" className="form-label fw-bold">
            Logo (*.png) *
          </label>
          <input
            type="file"
            className="form-control"
            id="logo_of_brewery"
            onChange={(e) => setLogo_of_brewery(e.target.files[0])}
            required
          />
        </div>
        <div className="py-5">
          <label htmlFor="map" className="form-label fw-bold">
            Agrega tu ubicación
          </label>
          <Map />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            {btnBrewery}
          </button>
        </div>
      </form>
    </>
  );
};

export default Add_Breweries;
