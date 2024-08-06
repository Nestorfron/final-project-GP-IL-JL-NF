import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const UserBreweries = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      {store.UserBreweries.map((brewery, index) => {
        return (
          <>
            <option>{brewery.address}</option>
          </>
        );
      })}
    </>
  );
};
