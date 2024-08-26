import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { jwtDecode } from "jwt-decode";
import useTokenExpiration from "../../../hooks/useTokenExpiration.jsx";
import EditBreweries from "../component/EditBreweries.jsx";
import EditBeers from "../component/EditBeer.jsx";
import Swal from "sweetalert2";
import "../../styles/myAccount.css";
import EditEvent from "../component/EditEvent.jsx";
import EditUser from "../component/EditUser.jsx";

const MyAccount = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const user = store.me;

  useTokenExpiration();

  const getTokenInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub.is_brewer;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const breweryDelete = (brewery) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Cervecería?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteBrewery(brewery);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cervecería eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        return;
      }
    });
  };

  const beerDelete = (beer) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Cerveza?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteBeer(beer);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cerveza eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        return;
      }
    });
  };

  const eventDelete = (event) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el evento?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteEvent(event);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Evento eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        return;
      }
    });
  };

  const userDelete = (user) => {
    console.log(user);
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar su usuario?",
      position: "center",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteUser(user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        return;
      }
    });
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
    getTokenInfo();
    if (getTokenInfo()) {
      actions.getUserBreweries();
      actions.getUserBeers();
      actions.getUserEvents();
    }

    actions.getMe();
    return;
  }, []);

  return (
    <div className="container-fluid">
      {/* Sección de Usuario */}
      <div className="text-center">
        <h5 className=" text-light mt-5 mb-3 ">MI USUARIO</h5>
        <div className=" d-flex align-items-center justify-content-center ">
          <div key={user.id}>
            <div className="cardAccount-user">
              <img
                src={user.profile_picture}
                className="card-img-user m-3"
                alt={user.name}
              />
              <div className="card-body body-card d-flex flex-column text-center align-items-center justify-content-center">
                <h5 className="title-card mb-2">{user.username}</h5>
                <p className="text-card mb-2">
                  <i className=" text-card fas fa-envelope "></i>
                  {user.email}
                </p>
                <div className=" d-flex mt-2 justify-content-center">
                  {/* <button
                  className="btn btn-danger"
                  onClick={() => userDelete(user.id)}
                >
                  <i className="fas fa-trash-alt me-1"></i>
                </button> */}
                  <EditUser user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sección de Cervecerías */}
      <h5
        className={`${
          !getTokenInfo() ? "text-center mt-5 mb-3  " : "text-center mt-5 mb-3 "
        } text-light`}
      >
        MIS CERVECERÍAS Y/O BARES
      </h5>
      <div
        className={`${
          !getTokenInfo()
            ? "overflow-auto flex-nowrap d-none d-flex justify-content-center align-items-center"
            : "d-flex  overflow-auto flex-nowrap justify-content-center align-items-center"
        }`}
      >
        {store.userBreweries.length > 0 ? (
          store.userBreweries.map((brewery) => (
            <div className="cards-container" key={brewery.id}>
              <div className="card cardAccount me-4 ">
                <div
                  className="brewery-minitron"
                  style={{
                    backgroundImage: `url(${brewery.picture_of_brewery_url})`,
                    backgroundSize: "cover", // Ensures the background covers the entire div
                    backgroundPosition: "center", // Centers the background image
                  }}
                >
                  <img
                    src={brewery.logo_of_brewery}
                    className="card-img m-4"
                    alt={brewery.name}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title title-card mb-2">{brewery.name}</h5>
                  <p className="card-text text-card mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {brewery.address}
                  </p>
                  <div className="container-fluid d-flex mt-3 justify-content-center ">
                    <button
                      className="deleteButton me-3"
                      onClick={() => breweryDelete(brewery.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i>
                    </button>
                    <EditBreweries brewery={brewery} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="text-center mt-4 text-light">
            Sin Cervecerías, por favor{" "}
            <Link to="/add_brewery">ingresa una</Link>
          </h6>
        )}
      </div>
      <h5
        className={`${
          !getTokenInfo()
            ? "text-center mt-5 mb-3 text-light justify-content-center align-items-center"
            : "text-center mt-5 mb-3 text-light justify-content-center align-items-center"
        }`}
      >
        MIS CERVEZAS
      </h5>
      <div
        className={`${
          !getTokenInfo()
            ? " overflow-auto flex-nowrap d-none d-flex justify-content-center align-items-center "
            : " overflow-auto flex-nowrap d-flex justify-content-center align-items-center "
        }`}
      >
        {store.userBeers.length > 0 ? (
          store.userBeers.map((beer) => (
            <div
              className="cards-container d-flex justify-content-center align-items-center"
              key={beer.id}
            >
              <div className="cardAccount-beers m-4 ">
                <img
                  src={beer.picture_of_beer_url}
                  className=" card-img-beer"
                  alt={beer.name}
                />
                <div className="card-body-beers mb-3">
                  <h5 className="title-card mb-3 text-center">{beer.name}</h5>

                  <div className="text-center ">
                    <button
                      onClick={() => beerDelete(beer.id)}
                      className="deleteButton me-3"
                    >
                      <i className="fas fa-trash-alt "></i>
                    </button>
                    <EditBeers beer={beer}></EditBeers>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="text-center mt-4 text-light">
            Sin Cervezas, por favor <Link to="/add_beer">ingresa una</Link>
          </h6>
        )}
      </div>

      {/* Sección de Eventos */}
      <h5
        className={`${
          !getTokenInfo()
            ? "text-center mt-5 mb-3 d-none text-light"
            : "text-center mt-5 mb-3 text-light"
        }`}
      >
        MIS EVENTOS
      </h5>
      <div
        className={`${
          !getTokenInfo()
            ? "overflow-auto d-flex flex-nowrap d-none text-center justify-content-center"
            : "overflow-auto d-flex flex-nowrap justify-content-center"
        }`}
      >
        {store.userEvents.length > 0 ? (
          store.userEvents.map((event) => (
            <div className="cards-container" key={event.id}>
              <div className="card cardAccount-events border-light shadow-lg mb-4 me-4">
                <img
                  src={event.picture_of_event_url}
                  className="card-img-top card-img"
                  alt={event.picture_of_event_url}
                />
                <div className="card-body body-card d-flex flex-column text-center">
                  <h5 className="card-title title-card mb-3">{event.name}</h5>
                  <h6 className="card-title text-card mb-3">
                    {formatDate(event.date)}
                  </h6>

                  <div className="container-fluid card-body-beers d-flex  justify-content-center ">
                    <button
                      onClick={() => eventDelete(event.id)}
                      className="deleteButton me-3 mt-auto"
                    >
                      <i className="fas fa-trash-alt me-1"></i>
                    </button>
                    <EditEvent event={event}></EditEvent>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h6 className="text-center mt-4 text-light">
            Sin Eventos, por favor <Link to="/add_event">ingresa uno</Link>
          </h6>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
