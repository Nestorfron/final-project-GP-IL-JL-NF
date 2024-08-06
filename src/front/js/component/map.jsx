import React, { useRef, useEffect, useState } from "react";
import "../../styles/index.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export const Maps = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [moveEvent, setMoveEvent] = useState();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmVzdG9yZm9uIiwiYSI6ImNsemhtamVhbDA2MXoyaXE4NTdlMXluZnUifQ.Jq-0fXzh3_Dvhuqq4W6WZw";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    mapRef.current.on("mousemove", (e) => {
      setMoveEvent(e);
    });

    return () => mapRef.current.remove();
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapContainerRef}
        style={{
          position: "relative",
          top: 0,
          bottom: 0,
          height: "600px",
          width: "300px",
        }}
      ></div>
      <pre
        id="info"
        style={{
          display: "table",
          position: "relative",
          margin: "0px auto",
          wordWrap: "anywhere",
          whiteSpace: "pre-wrap",
          padding: "10px",
          border: "none",
          borderRadius: "3",
          fontSize: "12",
          textAlign: "center",
          color: "#222",
          background: "#fff",
        }}
      >
        {moveEvent && <>{JSON.stringify(moveEvent.lngLat.wrap())}</>}
      </pre>
    </>
  );
};
