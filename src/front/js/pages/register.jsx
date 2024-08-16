import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { uploadFile } from "../../../firebase/config";
import "../../styles/register.css";
import Swal from "sweetalert2";

const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profile_picture, setProfile_picture] = useState(null);
  const [country, setCountry] = useState("");
  const [is_brewer, setIsBrewere] = useState(false);

  const showLoadingAlert = () => {
    Swal.fire({
      title: "Creando tu cuenta...",
      text: "Por favor, espera mientras se procesa tu registro.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el indicador de carga
      },
      customClass: {
        container: "custom-container",
        title: "custom-title",
        content: "custom-content",
      },
    });
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    showLoadingAlert();
    const result = await uploadFile(profile_picture);
    if (result) {
      console.log(profile_picture.name);
    }
    const response = await actions.register(
      email,
      password,
      username,
      is_brewer,
      country,
      result
    );
    Swal.close();
    if (response) {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Usuario creado correctamente",
        text: "¡Ahora puedes iniciar sesión!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <div className="container home-register">
      <div className="row justify-content-center pt-5">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="formulario-register p-4 shadow-lg rounded">
            <div className="text-center mb-4">
              <h3 className="display-4 title">Registro</h3>
              <p className="lead text-muted">
                Completa el formulario para crear tu cuenta.
              </p>
            </div>
            <form onSubmit={handleSubmitRegister}>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="form-grup">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="form-text mt-2">
                      <strong>
                        No compartiremos su correo electrónico con nadie más.
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grup">
                    <label htmlFor="username" className="form-label">
                      Nombre de Usuario
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grup">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grup">
                    <label htmlFor="country" className="form-label">
                      País
                    </label>
                    <select
                      id="country"
                      className="form-select form-select-lg"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value="">Selecciona tu país</option>
                      {store.countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grup">
                    <label htmlFor="profile_picture" className="form-label">
                      Foto de Perfil
                    </label>
                    <input
                      id="profile_picture"
                      type="file"
                      className="form-control"
                      onChange={(e) => setProfile_picture(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-grup">
                    <label htmlFor="is_brewer" className="form-label">
                      ¿Eres cervecero?
                    </label>
                    <div className="form-check">
                      <input
                        id="is_brewer"
                        type="checkbox"
                        className="form-check-input"
                        checked={is_brewer}
                        onChange={() => setIsBrewere(!is_brewer)}
                      />
                      <label
                        htmlFor="is_brewer"
                        className="form-check-label ms-2"
                      >
                        Sí
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="entrar w-100 mt-4">
                Enviar
              </button>
              <div className="text-center mt-4">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="btn btn-link">
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
