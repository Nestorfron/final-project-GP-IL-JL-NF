import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Carousel } from "../component/carousel.jsx";
import { BeerCards } from "../component/beerCards.jsx";
import Map from "../component/Map.jsx";
import CountrySelectModal from "../component/CountrySelectModal.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { se } from "date-fns/locale";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    getCurrentLocation();

    actions.getAllUsers();
    actions.getStyles();
    actions.getAverageRatings();
  }, []);

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Handle successful location retrieval
          console.log("Position:", position);
          // You can set the country based on the position here
          // Example: actions.setDetectedCountry(position.coords);
        },
        async (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            try {
              const response = await fetch("https://ipapi.co/json/");
              const data = await response.json();
              console.log("Location data:", data);
              actions.setDetectedCountry(data.country_name);
            } catch (error) {
              console.error("Error fetching location data:", error);
              setShowModal(true);
            }
          }
        }
      );
    } else {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        console.log("Location data:", data);
        actions.setDetectedCountry(data.country_name);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setShowModal(true);
      }
    }
  };

  const handleCountrySelect = () => {
    if (selectedCountry) {
      localStorage.setItem("originalCountry", selectedCountry);
      actions.setDetectedCountry(selectedCountry);
    }

    setShowModal(false);
  };

  return (
    <div className="container-fluid d-flex flex-column">
      <div className="container-fluid m-0 p-0 shadow">
        <Carousel />
      </div>
      <div className="container-fluid d-flex justify-content-center mt-3 shadow">
        <BeerCards />
      </div>
      <div className="container-fluid justify-content-center mt-3 shadow">
        <h6 className="map-title fw-bold my-2 mb-4">CERVECERÍAS CERCA:</h6>

        <Map />
      </div>
      <CountrySelectModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={store.allCountries}
        onSelectCountry={handleCountrySelect}
      />
    </div>
  );
};
