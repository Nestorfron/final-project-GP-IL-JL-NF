import React from "react";
import "../../styles/register.css";

const Register = () => {
  return (
    <div className="container">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="formulario-register col-12 col-sm-10 col-md-8 col-lg-6 col-xl-7">
          <form>
            <div className="card-header">
              <div className="form form-grup">
                <h1 className="registro">Registro</h1>
              </div>
            </div>
            <div className="card-body">
              <div className="form form-grup mx-sm-4 mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Usuario
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-3 mt-1">
                <label for="exampleInputEmail1" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  <strong>
                    {" "}
                    Nunca compartiremos su correo electrónico con nadie más.
                  </strong>
                </div>
              </div>
              <div className="form form-grup mx-sm-4 mb-4">
                <label for="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form form-grup mx-sm-4 mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Pais
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
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
