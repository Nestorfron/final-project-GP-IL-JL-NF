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

  // Validación de tipo de archivo para el logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setLogo_of_brewery(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Por favor, sube un archivo PNG.",
      });
      e.target.value = ""; // Resetea el input
    }
  };

  // Validación de tipo de archivo para la foto de portada
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && allowedTypes.includes(file.type)) {
      setPicture_of_brewery(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Por favor, sube un archivo JPG, JPEG o PNG.",
      });
      e.target.value = ""; // Resetea el input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Cargando...",
      text: `Por favor, espere mientras se ${
        id ? "edita" : "crea"
      } la cervecería.`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const logoUrl = await uploadFile(logo_of_brewery);
      const pictureUrl = await uploadFile(picture_of_brewery);

      const response = id
        ? await actions.edit_breweries(
            id,
            brewery.name,
            brewery.address,
            brewery.history,
            brewery.facebook_url,
            brewery.instagram_url,
            pictureUrl,
            brewery.x_url,
            logoUrl
          )
        : await actions.add_brewery(
            brewery.name,
            brewery.address,
            brewery.history,
            brewery.facebook_url,
            brewery.instagram_url,
            logoUrl,
            brewery.x_url,
            pictureUrl
          );

      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Cervecería ${id ? "editada" : "creada"} correctamente`,
          showConfirmButton: false,
          timer: 1500,
        });
        actions.getAllBreweries();

        if (!id) {
          setBrewery({
            name: "",
            address: "",
            history: "",
            facebook_url: "",
            instagram_url: "",
            x_url: "",
          });
          setLogo_of_brewery(null);
          setPicture_of_brewery(null);
        }
      } else {
        throw new Error("Hubo un problema al procesar la solicitud.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema: ${error.message}`,
      });
    } finally {
      setLoading(false);
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
      setLogo_of_brewery(initialBrewery.logo_of_brewery || null);
      setPicture_of_brewery(initialBrewery.picture_of_brewery || null);
    }
  }, [initialBrewery]);

  return (
    <>
      <form className="container mt-5 form-container" onSubmit={handleSubmit}>
        <h2 className="mb-4">
          {id ? "Editar Cervecería" : "Añadir Cervecería"}
        </h2>
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="facebook_url" className="form-label fw-bold">
              Link Facebook
            </label>
            <input
              type="text"
              name="facebook_url"
              className="form-control"
              id="facebook_url"
              value={brewery.facebook_url}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="picture_of_brewery" className="form-label fw-bold">
            Foto Portada (JPG, JPEG, PNG) *
          </label>
          <input
            type="file"
            className="form-control"
            id="picture_of_brewery"
            onChange={handlePictureChange}
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
            onChange={handleLogoChange}
            required
          />
        </div>

        <div className="py-5">
          <label htmlFor="map" className="form-label fw-bold">
            Agrega tu ubicación (click en el mapa)
          </label>
          <Map id={id} />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {btnBrewery}
          </button>
        </div>
      </form>
    </>
  );
};

export default Add_Breweries;
