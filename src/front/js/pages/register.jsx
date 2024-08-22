import React from "react";
import "../../styles/register.css";
import Form_add_users from "../component/form_add_users.jsx";

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
            <Form_add_users btnUser={"Guardar"}></Form_add_users>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
