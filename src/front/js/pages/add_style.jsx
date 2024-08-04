import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";

const Add_Style = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [picture_of_beer, setPicture_of_beer] = useState(null);
  const [name, setName] = useState("");
  const [bjcp_style, setBjcp_style] = useState("");
  const [IBUs, setIBUs] = useState("");
  const [volALC, setVolAlc] = useState("");
  const [description, setDescription] = useState("");
  const [picture_of_beer_url, setPicture_of_beer_url] = useState("");
  const [BreweryId, setIsBreweryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await uploadFile(picture_of_beer);
    if (result) {
      console.log(result);
    }

    const response = await actions.add_beer(
      name,
      BreweryId,
      bjcp_style,
      IBUs,
      volALC,
      description,
      result
    );
    if (response) {
      console.log(response);
      alert("Producto creado correctamente");
    }
    console.log(name, BreweryId, bjcp_style, IBUs, volALC, description, result);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="formulario-register col-12 col-sm-10 col-md-8 col-lg-6 col-xl-7">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <div className="form form-grup">
                <h1 className="registro">Agrega un Cerveza </h1>
              </div>
            </div>
            <div className="card-body">
              <div className="form form-grup mx-sm-4 mb-3 mt-1">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nombre de tu cerveza
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
                  Estilo BJCP
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={bjcp_style}
                  onChange={(e) => setBjcp_style(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  ABV
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={volALC}
                  onChange={(e) => setVolAlc(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Describe tu cerveza
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <select
                className="form-select mx-sm-4 mb-4"
                aria-label="Default select example"
                onChange={(e) => setIsBreweryId(e.target.value)}
              >
                <option selected>Selecciona una cervecería</option>
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
                  Sube una imagen de tu cerveza
                </label>
                <input
                  value={picture_of_beer_url}
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => setPicture_of_beer(e.target.files[0])}
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

export default Add_Style;
