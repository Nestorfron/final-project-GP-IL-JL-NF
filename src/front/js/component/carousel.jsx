import React, { useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/carousel.css";
import { Context } from "../store/appContext";
import Slider1 from "../../img/slider1.png";
import Slider2 from "../../img/slider2.png";
import Slider3 from "../../img/slider3.png";
import Slider4 from "../../img/slider4.png";
import Slider5 from "../../img/slider5.png";
import Slider0 from "../../img/welcome.jpg";

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { store } = useContext(Context);
  const { events } = store;

  // Default images if no events or no images in events
  const defaultImages = [Slider0, Slider1, Slider2, Slider3, Slider4, Slider5];

  // Get images from events or use default images
  const imagesFromEvents =
    events.length > 0 && events[0].picture_of_event_url
      ? events.map((event) => event.picture_of_event_url)
      : [];

  // Remove duplicates and fallback to default images if empty
  const images = Array.from(new Set([...imagesFromEvents, ...defaultImages]));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item-wrapper ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <img
              src={image}
              className="carousel-image"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
