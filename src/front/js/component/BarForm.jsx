import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { uploadFile } from "../../../firebase/config";
import Swal from "sweetalert2";
import "../../styles/formAdds.css";
import Map from "./Map.jsx";

const BarForm = ({ btnBar, id, bar: initialBar }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [logo_of_bar, setLogo_of_bar] = useState(null);
  const [picture_of_bar, setPicture_of_bar] = useState(null);
  const [bar, setBar] = useState({
    name: "",
    address: "",
    history: "",
    facebook_url: "",
    instagram_url: "",
    x_url: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setBar({ ...bar, [e.target.name]: e.target.value });
  }

  // Validación de tipo de archivo para el logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setLogo_of_bar(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Por favor, sube un archivo PNG.",
      });
      e.target.value = "";
      brewery;
    }
  };

  // Validación de tipo de archivo para la foto de portada
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && allowedTypes.includes(file.type)) {
      setPicture_of_bar(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo inválido",
        text: "Por favor, sube un archivo JPG, JPEG o PNG.",
      });
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    Swal.fire({
      title: "Cargando...",
      text: `Por favor, espere mientras se ${id ? "edita" : "crea"} el bar.`,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const logoUrl = await uploadFile(logo_of_bar);
      console.log(logoUrl);
      const pictureUrl = await uploadFile(picture_of_bar);
      console.log(pictureUrl);

      const response = id
        ? await actions.edit_bar(
            id,
            bar.name,
            bar.address,
            bar.history,
            bar.facebook_url,
            bar.instagram_url,
            pictureUrl,
            bar.x_url,
            logoUrl
          )
        : await actions.add_bar(
            bar.name,
            bar.address,
            bar.history,
            bar.facebook_url,
            bar.instagram_url,
            pictureUrl,
            bar.x_url,
            logoUrl
          );
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Bar ${id ? "editado" : "creado"} correctamente`,
          showConfirmButton: false,
          timer: 1500,
        });

        // actions.getAllBars();

        if (!id) {
          setBar({
            name: "",
            address: "",
            history: "",
            facebook_url: "",
            instagram_url: "",
            x_url: "",
          });
          setLogo_of_bar(null);
          setPicture_of_bar(null);
        }
        // actions.getUserBars();
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
    if (initialBar) {
      setBar({
        name: initialBar.name || "",
        address: initialBar.address || "",
        history: initialBar.history || "",
        facebook_url: initialBar.facebook_url || "",
        instagram_url: initialBar.instagram_url || "",
        x_url: initialBar.x_url || "",
      });
      setLogo_of_bar(initialBar.logo_of_bar || null);
      setPicture_of_bar(initialBar.picture_of_bar || null);
    }
  }, [initialBar]);
  return (
    <>
      <form className="container mt-5 form-container" onSubmit={handleSubmit}>
        <h2 className="mb-4">{id ? "Editar Bar" : "Añadir Bar"}</h2>
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
              value={bar.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label fw-bold">
              Dirección *
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="address"
              value={bar.address}
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
              value={bar.facebook_url}
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
              value={bar.instagram_url}
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
              value={bar.x_url}
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
            value={bar.history}
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
          <button type="submit" className="enter" disabled={loading}>
            {btnBar}
          </button>
        </div>
      </form>
    </>
  );
};

export default BarForm;
