import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import "../../styles/addStyle.css";

const Add_Style = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [picture_of_beer, setPicture_of_beer] = useState(null);
  const [name, setName] = useState("");
  const [bjcp_style, setBjcp_style] = useState("");
  const [IBUs, setIBUs] = useState("");
  const [volALC, setVolALC] = useState("");
  const [description, setDescription] = useState("");
  const [brewery_id, setBrewery_id] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      name,
      brewery_id,
      bjcp_style,
      IBUs,
      volALC,
      description,
      result
    );

    const result = await uploadFile(picture_of_beer);
    if (result) {
      console.log(result);
    }

    const response = await actions.add_beer(
      name,
      brewery_id,
      bjcp_style,
      IBUs,
      volALC,
      description,
      result
    );

    if (response) {
      alert("Producto creado correctamente");
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
    <div className="container">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="add-style-form w-75">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <div className="form form-grup">
                <h5 className="registro fw-bolder text-center">
                  AGREGA NUEVO ESTILO{" "}
                </h5>
              </div>
            </div>
            <div className="card-body row">
              <div className="col-6">
                <div className="form form-grup mx-sm-4 mb-3 mt-1">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-bold"
                  >
                    NOMBRE
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
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-bold"
                  >
                    ESTILO BJCP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={bjcp_style}
                    onChange={(e) => setBjcp_style(e.target.value)}
                  />
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
                    value={IBUs}
                    onChange={(e) => setIBUs(e.target.value)}
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
                    value={volALC}
                    onChange={(e) => setVolALC(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form form-grup mx-4 mt-2 mb-4">
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <select
                  value={brewery_id}
                  className="form-select mx-4 "
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
                <div className=" mx-4 mt-3">
                  <label htmlFor="formFile" className="form-label">
                    IMÁGEN
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile03"
                    onChange={(e) => setPicture_of_beer(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="entrar mx-sm-4 mt-2">
                  ENVIAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Style;
