import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import BEER from "../../img/BEER.jpeg";

const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showLoadingAlert = () => {
    Swal.fire({
      title: "Iniciando sesión...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        container: "custom-container",
        title: "custom-title",
        content: "custom-content",
      },
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    showLoadingAlert();

    setTimeout(async () => {
      const isLoggedIn = await actions.login(email, password);
      Swal.close();

      if (!isLoggedIn) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Autenticación fallida",
          text: "El nombre de usuario o la contraseña que has introducido son incorrectos. Por favor, verifica tus credenciales e intenta de nuevo.",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          timerProgressBar: true,
          customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-content",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      } else {
        navigate("/");
      }
    }, 2000);
  };

  return (
    <div className="container  home-login">
      <div className="row justify-content-center pt-5">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div className="formulario-login p-4">
            <form onSubmit={handleSubmitLogin}>
              <div className="form form-grup">
                <div className="card-body">
                  <h1 className="text-center mb-4">Login</h1>
                  <div className="form-grup mb-3">
                    <input
                      id="email"
                      className="email form-control form-control-lg"
                      placeholder="Email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-grup mb-4">
                    <input
                      type="password"
                      className="pass form-control form-control-lg"
                      id="inputPassword"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-grup d-flex justify-content-center mb-4">
                    <button className="entrar" type="submit">
                      Ingresar
                      <i className="fa-solid fa-right-to-bracket ms-2"></i>
                    </button>
                  </div>
                  <div className="registro text-center">
                    ¿No tienes Cuenta? <Link to={"/register"}>Regístrate</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
