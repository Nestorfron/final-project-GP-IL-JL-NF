import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { uploadFile } from "../../../firebase/config";
import "../../styles/register.css";
import Swal from "sweetalert2";

const Form_add_users = ({ id, btnUser, user: initialUser }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [profile_picture, setProfile_picture] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
    is_brewer: false,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (id) {
      console.log("editando", id);
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se actualiza su usuario.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(profile_picture);
        if (result) {
          console.log(result);
        }
        const response = await actions.edit_user(
          id,
          user.email,
          user.username,
          user.password,
          user.country,
          result,
          user.is_brewer
        );
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Actualizado",
            showConfirmButton: false,
            timer: 1500,
          });
          actions.getAllUsers();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al editar al usuario.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al editar al usuario: ${error.message}`,
        });
      }
    } else {
      console.log("creando");
      setLoading(true);
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se crea la cerveza.",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const result = await uploadFile(profile_picture);
        if (result) {
          console.log(result);
        }
        const response = await actions.register(
          user.email,
          user.password,
          user.username,
          user.is_brewer,
          user.country,
          result
        );
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
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear al usuario.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (initialUser) {
      setUser({
        email: initialUser.email || "",
        password: initialUser.password || "",
        username: initialUser.username || "",
        is_brewer: initialUser.is_brewer || "",
        country: initialUser.country || "",
      });

      setProfile_picture({
        profile_picture: initialUser.profile_picture || "",
      });
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
                checked={user.is_brewer}
                name="is_brewer"
                onChange={() => handleChange(e)}
              />
              <label htmlFor="is_brewer" className="form-check-label ms-2">
                Sí
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="entrar w-100 mt-4">
        {btnUser}
      </button>
      <div className="text-center mt-4">
        {id ? (
          ""
        ) : (
          <span className="registro text-center">
            ¿Ya tienes una cuenta?
            <Link to="/login"> Inicia sesión</Link>
          </span>
        )}
      </div>
    </form>
  );
};

export default Form_add_users;
