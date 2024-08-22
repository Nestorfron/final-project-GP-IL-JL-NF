import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import "../../styles/form_adds.css";
import Swal from "sweetalert2";

const Form_add_beer = ({ id, btnBeer, beer: initialBeer }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [picture_of_beer, setPicture_of_beer] = useState(null);
  const [brewery_id, setBrewery_id] = useState("");
  const [beer, setBeer] = useState({
    name: "",
    brewery_id: "",
    bjcp_style: "",
    IBUs: "",
    volALC: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setBeer({ ...beer, [e.target.name]: e.target.value });
    console.log(beer);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      console.log("editando", id);
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se edita la cerveza.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(picture_of_beer);
        if (result) {
          console.log(result);
        }
        const response = await actions.edit_beer(
          id,
          beer.name,
          beer.brewery_id,
          beer.bjcp_style,
          beer.IBUs,
          beer.volALC,
          beer.description,
          result
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cerveza Editada",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al editar la cerveza.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al editar la cerveza: ${error.message}`,
        });
      }
    } else {
      console.log("creando");
      setLoading(true);

      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se crea la cerveza.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(picture_of_beer);
        if (result) {
          console.log(result);
        }
        const response = await actions.add_beer(
          beer.name,
          brewery_id,
          beer.bjcp_style,
          beer.IBUs,
          beer.volALC,
          beer.description,
          result
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cerveza creada correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setBeer({
            name: "",
            brewery_id: "",
            bjcp_style: "",
            IBUs: "",
            volALC: "",
            description: "",
            result: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear la cerveza.",
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
    if (initialBeer) {
      setBeer({
        name: initialBeer.name || "",
        bjcp_style: initialBeer.bjcp_style || "",
        IBUs: initialBeer.IBUs || "",
        volALC: initialBeer.volALC || "",
        description: initialBeer.description || "",
        result: initialBeer.result || "",
        brewery_id: initialBeer.brewery_id,
      });
    }
    actions.getUserBreweries();
  }, [initialBeer]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && allowedTypes.includes(file.type)) {
      setPicture_of_beer(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Formato no permitido",
        text: "Solo se permiten archivos JPG, JPEG o PNG.",
      });
    }
  };

  return (
    <form className="container mt-5 form-container" onSubmit={handleSubmit}>
      <h2 className="mb-4">{id ? "" : "Añadir Cerveza"}</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form form-grup mx-sm-4 mb-3 mt-1">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              NOMBRE
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={beer.name}
              name="name"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form form-grup mx-sm-4 mb-4">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              ESTILO BJCP
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleChange(e)}
              name="bjcp_style"
              value={beer.bjcp_style}
              required
            >
              <option value="" selected>
                Selecciona una estilo
              </option>
              {store.bjcp_styles.map((style, index) => {
                return <option key={style + index}>{style}</option>;
              })}
            </select>
          </div>
          <div className="form form-grup mx-sm-4 mb-4">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              IBU's
            </label>
            <input
              type="text"
              className="form-control"
              value={beer.IBUs}
              name="IBUs"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="form form-grup mx-sm-4 mb-4">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              ABV %
            </label>
            <input
              type="text"
              className="form-control"
              value={beer.volALC}
              name="volALC"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="col">
          <div className="form form-grup  mt-2 mb-4">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              DESCRIPCIÓN
            </label>
            <textarea
              type="text"
              className="form-control"
              rows="6"
              value={beer.description}
              name="description"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setBrewery_id(e.target.value)}
            required
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
          <div className=" mt-3">
            <label htmlFor="formFile" className="form-label">
              IMÁGEN (JPG, JPEG, PNG)
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
        <div className="text-center">
          <button type="submit" className="enter mx-sm-4 mt-2">
            {btnBeer}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form_add_beer;
