import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";

// Define libraries as a constant to avoid re-creating the array on each render
const LIBRARIES = ["places"];

const Map = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const [center, setCenter] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [myPosition, setMyPosition] = useState(null);
  const [isAdding, setIsAdding] = useState(true);

  // Obtener la ubicación actual del usuario al cargar el componente
  useEffect(() => {
    getCurrentLocation();
    checkAddBreweryPage();
  }, [location.pathname]);

  // Check if the current page is the Add Brewery page
  const checkAddBreweryPage = useCallback(() => {
    setIsAdding(location.pathname === "/add_brewery");
  }, [location.pathname]);

  // Add new markers to the map
  const addMarkers = useCallback(
    (newLocation) => {
      actions.setLatLng(newLocation);
    },
    [actions]
  );

  // Get the current location of the user
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            description: "Ubicación Actual",
          };
          setCenter(location);
          setMyPosition(location);
        },
        (error) => console.log(error)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Handle marker clicks
  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  // Handle clicks on the map to add a marker
  const onMapClick = useCallback(
    (event) => {
      if (isAdding) {
        const location = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setNewMarkerPosition(location);
      }
    },
    [isAdding]
  );

  // Add the new marker
  const addMarker = useCallback(() => {
    if (newMarkerPosition) {
      addMarkers(newMarkerPosition);
      setNewMarkerPosition(null);
    }
  }, [newMarkerPosition, addMarkers]);

  return (
    <LoadScript googleMapsApiKey={process.env.MAP_KEY} libraries={LIBRARIES}>
      {center && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={center}
          zoom={12}
          onClick={onMapClick}
        >
          {store.breweries.map((brewery) => (
            <Marker
              key={brewery.id}
              position={{ lat: brewery.lat, lng: brewery.lng }}
              onClick={() => onMarkerClick(brewery)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h4>
                  {selectedMarker.description
                    ? selectedMarker.description
                    : selectedMarker.name}
                </h4>
                <hr />
                <p>
                  Direcicón:{" "}
                  {selectedMarker.address ? selectedMarker.address : ""}
                </p>
              </div>
            </InfoWindow>
          )}
          {newMarkerPosition && (
            <InfoWindow
              position={newMarkerPosition}
              onCloseClick={() => setNewMarkerPosition(null)}
            >
              <div>
                <button onClick={addMarker}>Agregar</button>
              </div>
            </InfoWindow>
          )}
          {myPosition && (
            <Marker
              position={{ lat: myPosition.lat, lng: myPosition.lng }}
              onClick={() => onMarkerClick(myPosition)}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
