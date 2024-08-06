import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const isLoggedIn = await actions.login(email, password);
    if (!isLoggedIn) {
      alert("error al iniciar sesión");
    }
    if (isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 home-login">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="formulario-login col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <img
            className="avatar"
            src="https://www.alestilojalisco.com.mx/storage/articulos/salud-llega-la-ruta-de-la-cerveza-20220503171022.jpeg"
            alt="logo empresa"
          />
          <form onSubmit={handleSubmitLogin}>
            <div className="form form-grup mt-5 mb-5">
              <div className="card-body">
                <div className="form-grup mx-sm-4 mb-3 mt-1">
                  <h1>Login</h1>
                  <input
                    className="email form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    type="text"
                    aria-label=".form-control-lg example"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-grup mx-sm-4 mb-3 mt-1">
                  <input
                    type="password"
                    className="pass form-control form-control-lg"
                    id="inputPassword"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-grup mx-sm-4 d-flex justify-content-center">
                  <button className="entrar" type="submit">
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                    Ingresar
                  </button>
                </div>
                <div className="registro form-grup mt-4 d-flex justify-content-center">
                  ¿No tienes Cuenta? <Link to={"/register"}> Registrate </Link>
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
