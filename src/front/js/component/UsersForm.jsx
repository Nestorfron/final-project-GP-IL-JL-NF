import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { uploadFile } from "../../../firebase/config";
import "../../styles/register.css";
import Swal from "sweetalert2";

const UsersForm = ({ id, btnUser, user: initialUser }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [profile_picture, setProfile_picture] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    country: "",
    is_brewer: false,
  });
  const [loading, setLoading] = useState(false);

  function IsBrewer() {
    setUser({ ...user, is_brewer: !user.is_brewer });
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    Swal.fire({
      title: "Cargando...",
      text: id
        ? "Por favor, espere mientras se actualiza su usuario."
        : "Por favor, espere mientras se crea el usuario.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let result;
      if (profile_picture) {
        result = await uploadFile(profile_picture);
      }

      if (id) {
        const response = await actions.edit_user(
          id,
          user.email,
          user.username,
          user.password,
          user.country,
          result || user.profile_picture,
          user.is_brewer
        );

        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Actualizado",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al editar al usuario.",
          });
        }
      } else {
        const response = await actions.register(
          user.email,
          user.password,
          user.username,
          user.is_brewer,
          user.country,
          result
        );

        if (response) {
          Swal.fire({
            icon: "success",
            title: "Usuario creado correctamente",
            text: "¡Ahora puedes iniciar sesión!",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear al usuario.",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema al procesar la solicitud: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUser) {
      setUser({
        email: initialUser.email || "",
        password: initialUser.password || "",
        confirmPassword: initialUser.password || "",
        username: initialUser.username || "",
        is_brewer: initialUser.is_brewer || false,
        country: initialUser.country || "",
      });
      setProfile_picture(initialUser.profile_picture || "");
    }
  }, [initialUser]);

  return (
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
              value={user.email}
              name="email"
              onChange={(e) => handleChange(e)}
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
              value={user.username}
              name="username"
              onChange={(e) => handleChange(e)}
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
              value={user.password}
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grup">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control form-control-lg"
              placeholder="Confirmar Password"
              value={user.confirmPassword}
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
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
              value={user.country}
              name="country"
              onChange={(e) => handleChange(e)}
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
              required
            />
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className="form-grup">
            <label htmlFor="is_brewer" className="form-label">
              ¿Eres cervecero?
            </label>
            <div className="form-check m-auto">
              <input
                id="is_brewer"
                type="checkbox"
                className="m-2"
                name="is_brewer"
                checked={user.is_brewer}
                onClick={() => IsBrewer()}
              />
              <label htmlFor="is_brewer" className="form-check-label">
                Sí
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="enter  mt-4" disabled={loading}>
          {btnUser}
        </button>
      </div>
      <div className="text-center mt-4">
        {!id && (
          <span className="registro text-center">
            ¿Ya tienes una cuenta?
            <Link to="/login"> Inicia sesión</Link>
          </span>
        )}
      </div>
    </form>
  );
};

export default UsersForm;
