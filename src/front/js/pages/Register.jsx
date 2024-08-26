import React from "react";
import "../../styles/register.css";
import UsersForm from "../component/UsersForm.jsx";

const Register = () => {
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
            <UsersForm btnUser={"Guardar"}></UsersForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
