import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ReviewModal } from "../component/review_modal.jsx";
import "../../styles/beerDetails.css";

export const BeerDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const { beerDetails, breweries, reviews } = store;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    actions.getBeerDetails(id);
    actions.getAllBreweries();
    actions.getReviewsByBeer(id);
  }, [id]);

  if (!beerDetails || !breweries) {
    return <p>Loading...</p>;
  }

  const findBreweryLogo = (breweryId, breweries) => {
    const brewery = breweries.find((b) => b.id === breweryId);
    return brewery ? brewery.logo_of_brewery : "path/to/placeholder-image.jpg";
  };

  const handleBreweryClick = (breweryId) => {
    navigate(`/brewery/${breweryId}`);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const submitReview = (beerId, rating, comment) => {
    actions.createReview(beerId, rating, comment);
  };

  return (
    <div className="container-fluid beer-details-whole-body w-100 text-dark bg-white p-5">
      <div className="logo-header d-flex justify-content-center row mb-5">
        <img
          className="brewery-beer-details-picture col-12"
          src={findBreweryLogo(beerDetails.brewery_id, breweries)}
          onClick={() => handleBreweryClick(beerDetails.brewery_id)}
          style={{ cursor: "pointer" }}
          alt="Brewery Logo"
        />
      </div>
      <div className="container-fluid beer-details-body d-flex justify-content-center align-items-center">
        <div className="beer-text">
          <div className="beer-details-header">
            <h2 className="beer-details-name fw-bold ms-2">
              {beerDetails.name}
            </h2>
            <p className="beer-details-description ms-2">
              {beerDetails.description}
            </p>
            <p className="BJCP-style ms-2 mt-4">
              <span>Estilo:</span>
              <span>{beerDetails.bjcp_style}</span>
            </p>
          </div>
          <div className="ms-2 mt-3">
            <p className="beer-details-IBUs">
              <span>IBU's:</span>
              <span>{beerDetails.IBUs}</span>
            </p>
            <p className="beer-details-ABV">
              <span>ABV:</span>
              <span>{beerDetails.volALC}%</span>
            </p>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleModalShow}>
            Write a Review
          </button>
        </div>
        <div className="container container-logo d-flex justify-content-center align-items-center">
          <img
            className="beer-detail-picture m-4"
            src={beerDetails.picture_of_beer_url}
            alt="Beer"
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section mt-5">
        <h3>Reviews</h3>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="review-card d-flex align-items-start mb-4"
            >
              <img
                src={review.user_picture}
                alt="User"
                className="user-picture me-3"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <div className="review-content">
                <p className="user-name fw-bold">{review.username}</p>
                <div className="rating mb-2">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <img
                      key={index}
                      src="/path/to/full_glass.png"
                      alt="Full Glass"
                      style={{ width: "20px", marginRight: "3px" }}
                    />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, index) => (
                    <img
                      key={index}
                      src="/path/to/empty_glass.png"
                      alt="Empty Glass"
                      style={{ width: "20px", marginRight: "3px" }}
                    />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        show={showModal}
        handleClose={handleModalClose}
        beerId={id}
        submitReview={submitReview}
      />
    </div>
  );
};
