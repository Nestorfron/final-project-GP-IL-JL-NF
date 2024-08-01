import React from "react";
import "../../styles/login.css";

const Login = () => {
  return (
    <div class="container">
      <div class="row justify-content-center pt-5 mt-5 mr-1">
        <div class="formulario col-md-4  ">
          <img class="avatar" src="img/ceenergy.png" alt="logo empresa" />
          <form action="">
            <div class="form form-grup mt-5 mb-5">
              <div class="card-body">
                <div class="form-grup mx-sm-4 mb-3 mt-1">
                  <h1>Login</h1>
                  <input
                    class="email form-control form-control-lg"
                    placeholder="Email"
                    type="text"
                    aria-label=".form-control-lg example"
                  />
                </div>
                <div class="form-grup mx-sm-4 mb-3 mt-1">
                  <input
                    type="password"
                    class="pass form-control form-control-lg"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>
                <div class="form-grup mx-sm-4 d-flex justify-content-center">
                  <button class="entrar" type="button">
                    <i class="fa-solid fa-right-to-bracket me-2"></i>Ingresar
                  </button>
                </div>
                <div class="registro form-grup mt-4 d-flex justify-content-center">
                  ¿No tienes Cuenta? <a class="registro">Registrate</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
