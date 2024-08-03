import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Add_Brewery = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState("");
  const [facebook_url, setFacebook_url] = useState("");
  const [instagram_url, setinstagram_url] = useState("");
  const [x_url, setX_url] = useState("");
  const [picture_of_brewery_url, setPicture_of_brewery_url] = useState("");
  const [logo_of_brewery_url, setXLogo_of_brewery_url] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await actions.add_brewery(
      name,
      address,
      history,
      facebook_url,
      instagram_url,
      picture_of_brewery_url,
      x_url,
      logo_of_brewery_url
    );
    if (response) {
      console.log(response);
      alert("Cervecería creada correctamente");
    }
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
                <h1 className="registro">Agrega tu Cervecería</h1>
              </div>
            </div>
            <div className="card-body">
              <div className="form form-grup mx-sm-4 mb-3 mt-1">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nombre de tu cervecería
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
                  Dirección de tu cervecería
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Breve descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Ingresa tu Facebook
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={facebook_url}
                  onChange={(e) => setFacebook_url(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Ingresa tu Instagram
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={instagram_url}
                  onChange={(e) => setinstagram_url(e.target.value)}
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Ingresa tu dirección de X
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={x_url}
                  onChange={(e) => setX_url(e.target.value)}
                />
              </div>
              <div className="mb-3 mx-sm-4 mb-4">
                <label htmlFor="formFile" className="form-label">
                  Sube tu foto de prtada
                </label>
                <input
                  value={picture_of_brewery_url}
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </div>
              <div className="mb-3 mx-sm-4 mb-4">
                <label htmlFor="formFile" className="form-label">
                  Sube tu logo
                </label>
                <input
                  value={logo_of_brewery_url}
                  className="form-control"
                  type="file"
                  id="formFile"
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

export default Add_Brewery;
