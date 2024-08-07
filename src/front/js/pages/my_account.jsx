import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/addEvent.css";

const MyAccount = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
      return;
    }
    actions.getUserBreweries();
    actions.getUserBeers();
    actions.getUserEvents();
  }, []);

  return (
    <div className="container-fluid">
      <div className="justify-content-center p-5 m-5">
        <div className="add-event-form mx-auto text-center">
          <h1 className="text-black m-3">Mis cervecerías</h1>
          {store.userBreweries.length > 0 ? (
            store.userBreweries.map((brewery) => {
              return (
                <div
                  key={brewery.id}
                  className="p-2 m-1 text-black border rounded-2 bg-white text center"
                >
                  <h4> Nombre: {brewery.name}</h4>
                  <div />
                  <hr />
                  <h4> Dirección: {brewery.address}</h4>
                  <hr />
                  <h4> Historia: {brewery.history}</h4>
                  <hr />
                  <h4> Link Facebook: {brewery.facebook_url}</h4>
                  <hr />
                  <h4> Link Instagram: {brewery.instagram_url}</h4>
                  <hr />
                  <h4> Link X: {brewery.x_url}</h4>
                </div>
              );
            })
          ) : (
            <h6 className="text-center">
              Sin Cervecerías, por favor{" "}
              <Link to="/add_brewery">ingresa una </Link>
            </h6>
          )}
        </div>
        <div className="add-event-form mx-auto text-center">
          <h1 className="text-black m-3">Mis cervezas</h1>
          {store.userBeers.length > 0 ? (
            store.userBeers.map((beer) => {
              return (
                <div
                  key={beer.id}
                  className="p-2 m-1 text-black border rounded-2 bg-white text center"
                >
                  <h4> Nombre: {beer.name}</h4>
                  <hr />
                  <h4> Estilo BJCP: {beer.bjcp_style}</h4>
                  <hr />
                  <h4> IBU's: {beer.IBUs}</h4>
                  <hr />
                  <h4> VolALC: {beer.volALC}</h4>
                  <hr />
                  <h4> Description: {beer.description}</h4>
                </div>
              );
            })
          ) : (
            <h6 className="text-center">
              Sin Cervezas, por favor <Link to="/add_beer">ingresa una </Link>
            </h6>
          )}
        </div>
        <div className="add-event-form mx-auto text-center">
          <h1 className="text-black m-3">Mis Eventos</h1>
          {store.breweryEvents.length > 0 ? (
            store.breweryEvents.map((event) => {
              return (
                <div
                  key={event.id}
                  className="p-2 m-1 text-black border rounded-2 bg-white text center"
                >
                  <h4> Nombre: {event.name}</h4>
                  <div />
                </div>
              );
            })
          ) : (
            <h6 className="text-center">
              Sin Eventos, por favor <Link to="/add_event">ingresa uno </Link>
            </h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
