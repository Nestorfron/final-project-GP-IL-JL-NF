import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/register.css";

const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [is_brewer, setIsBrewere] = useState(false);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const response = await actions.register(
      email,
      password,
      is_brewer,
      country
    );
    if (response) {
      console.log(response);
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="formulario-register col-12 col-sm-10 col-md-8 col-lg-6 col-xl-7">
          <form onSubmit={handleSubmitRegister}>
            <div className="card-header">
              <div className="form form-grup">
                <h1 className="registro">Registro</h1>
              </div>
            </div>
            <div className="card-body">
              <div className="form form-grup mx-sm-4 mb-3 mt-1">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  <strong>
                    {" "}
                    Nunca compartiremos su correo electrónico con nadie más.
                  </strong>
                </div>
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mx-sm-4 mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Are you Brewer?
                </label>
                <input
                  className="form-check-input ms-2"
                  type="checkbox"
                  id="checkboxNoLabel"
                  onChange={() => setIsBrewere(true)}
                  aria-label="isBrewer"
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Pais
                </label>
                <select
                  className="form-select"
                  aria-label="Default select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option selected>Select</option>
                  <option value="1">Uno</option>
                  <option value="2">Dos</option>
                  <option value="3">Tres</option>
                </select>
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

export default Register;
