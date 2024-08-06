import React from "react";
import "../../styles/carousel.css";

export const Carousel = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://cdn.vectorstock.com/i/500p/03/17/oktoberfest-beer-festival-background-in-flat-vector-52170317.avif"
            className="d-block w-100 carousel-image"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.vectorstock.com/i/500p/03/18/oktoberfest-beer-festival-horizontal-banner-vector-52170318.avif"
            className="d-block w-100 carousel-image"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.vectorstock.com/i/500p/77/10/international-beer-day-background-in-flat-style-vector-51607710.avif"
            className="d-block w-100 carousel-image"
            alt="Third slide"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleSlidesOnly"
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleSlidesOnly"
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};
