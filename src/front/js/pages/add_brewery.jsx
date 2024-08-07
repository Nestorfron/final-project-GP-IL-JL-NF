import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { uploadFile } from "../../../firebase/config";
import "../../styles/addBrewery.css";

const Add_Brewery = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [logo_of_brewery, setLogo_of_brewery] = useState(null);
  const [picture_of_brewery, setPicture_of_brewery] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState("");
  const [facebook_url, setFacebook_url] = useState("");
  const [instagram_url, setinstagram_url] = useState("");
  const [x_url, setX_url] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await uploadFile(logo_of_brewery);
    if (result) {
      console.log(logo_of_brewery.name);
    }
    const result1 = await uploadFile(picture_of_brewery);
    if (result1) {
      console.log(picture_of_brewery.name);
    }

    const response = await actions.add_brewery(
      name,
      address,
      history,
      facebook_url,
      instagram_url,
      result1,
      x_url,
      result
    );
    if (response) {
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
    <div className="container-fluid w-75">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="add-brewery-form col-12 col-sm-10 col-md-8 col-lg-6 col-xl-7">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <div className="form form-grup">
                <h4 className="registro text-center fw-bold">
                  AGREGAR CERVECERÍA
                </h4>
              </div>
            </div>
            <div className="card-body d-flex row">
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
                    CIUDAD
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form form-grup mx-sm-4 mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-bold"
                  >
                    DESCRIPCIÓN
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="9"
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form form-grup mx-sm-4 mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-bold"
                  >
                    LINK FaceBook
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={facebook_url}
                    onChange={(e) => setFacebook_url(e.target.value)}
                  />
                </div>
                <div className="form form-grup mx-sm-4 mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-bold"
                  >
                    LINK Instagram
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={instagram_url}
                    onChange={(e) => setinstagram_url(e.target.value)}
                  />
                </div>
                <div className="form form-grup mx-sm-4 mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-bold"
                  >
                    LINK DE X
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={x_url}
                    onChange={(e) => setX_url(e.target.value)}
                  />
                </div>
                <div className="mb-3 mx-sm-4 mb-4">
                  <label htmlFor="formFile" className="form-label fw-bold">
                    FOTO PORTADA
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={(e) => setPicture_of_brewery(e.target.files[0])}
                  />
                </div>
                <div className="mb-3 mx-sm-4 mb-4">
                  <label htmlFor="formFile" className="form-label fw-bold">
                    LOGO (*.png)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile03"
                    onChange={(e) => setLogo_of_brewery(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
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

export default Add_Brewery;
