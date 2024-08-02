import React from "react";
import "../../styles/register.css";

const Register = () => {
  return (
    <div class="container">
      <div class="row justify-content-center pt-5 mt-5 mr-1">
        <div class="formulario-register col-12 col-sm-10 col-md-8 col-lg-6 col-xl-7">
          <form>
            <div class="card-header">
              <div class="form form-grup">
                <h1 class="registro">Registro</h1>
              </div>
            </div>
            <div class="card-body">
              <div class="form form-grup mx-sm-4 mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Usuario
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form form-grup mx-sm-4 mb-3 mt-1">
                <label for="exampleInputEmail1" class="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  <strong>
                    {" "}
                    Nunca compartiremos su correo electrónico con nadie más.
                  </strong>
                </div>
              </div>
              <div class="form form-grup mx-sm-4 mb-4">
                <label for="exampleInputPassword1" class="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="form form-grup mx-sm-4 mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Pais
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select</option>
                  <option value="1">Uno</option>
                  <option value="2">Dos</option>
                  <option value="3">Tres</option>
                </select>
              </div>
              <button type="submit" class="entrar mx-sm-4 mt-2">
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
