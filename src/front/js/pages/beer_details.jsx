import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ReviewModal } from "../component/review_modal.jsx";
import "../../styles/beerDetails.css";
import fullGlass from "../../img/fullglass.png";
import emptyGlass from "../../img/empty.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEllipsis, faEdit } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

export const BeerDetails = () => {
  const jwt = localStorage.getItem("token");
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const { beerDetails, breweries, reviews, users } = store;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalReview, setModalReview] = useState(null);

  useEffect(() => {
    actions.getBeerDetails(id);
    actions.getAllBreweries();
    actions.getBeerReviews(id);
    actions.getAllUsers();
  }, [id]);

  let currentUserId = null;
  if (jwt && typeof jwt === "string") {
    try {
      const decodedToken = jwtDecode(jwt);
      currentUserId = decodedToken.sub.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 5;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviews);

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

  const handleModalClose = () => {
    setShowModal(false);
    setModalReview(null); // Reset review data when closing
  };

  const handleModalShow = (review = null) => {
    setModalReview(review);
    setShowModal(true);
  };

  const submitReview = async (beer_id, rating, comment, review_id) => {
    try {
      if (review_id) {
        await actions.edit_review(review_id, rating, comment);
      } else {
        await actions.addReview(beer_id, rating, comment);
      }
      actions.getBeerReviews(beer_id);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const sortedReviews = reviews.slice().sort((a, b) => b.id - a.id);

  const handleDeleteReview = async (review_id) => {
    try {
      await actions.deleteReview(review_id);
      actions.getBeerReviews(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReview = (review) => {
    handleModalShow(review);
  };

  return (
    <div className="container my-5">
      <div className="card p-4">
        <div className="card-header text-center">
          <img
            className="brewery-beer-details-picture col-12"
            src={findBreweryLogo(beerDetails.brewery_id, breweries)}
            onClick={() => handleBreweryClick(beerDetails.brewery_id)}
            style={{ cursor: "pointer" }}
            alt="Brewery Logo"
          />
        </div>
        <div className="container card-body d-flex align-items-center justify-content-center row">
          <div className="beer-text col-6">
            <h2 className="beer-details-name fw-bold ">{beerDetails.name}</h2>
            <p className="beer-details-description ">
              {beerDetails.description}
            </p>
            <div>
              <p className="beer-details-BJCP-style d-flex justify-content-between">
                <span>Estilo:</span>
                <span>{beerDetails.bjcp_style}</span>
              </p>
              <p className="beer-details-IBUs d-flex justify-content-between">
                <span>IBU's:</span>
                <span>{beerDetails.IBUs}</span>
              </p>
              <p className="beer-details-ABV d-flex justify-content-between">
                <span>ABV:</span>
                <span>{beerDetails.volALC}%</span>
              </p>
              <p className="beer-details-rating  d-flex justify-content-between">
                <span>Rating:</span>
                <span>{averageRating} / 5</span>
              </p>
            </div>
          </div>
          <div className="container-fluid container-logo d-flex justify-content-center align-items-center  col-6">
            <img
              className="beer-detail-picture m-4"
              src={beerDetails.picture_of_beer_url}
              alt="Beer"
            />
          </div>
        </div>
        <div className="card-footer d-flex justify-content-center align-items-center">
          <button
            className={`${
              !jwt ? "btn btn-primary m-2 d-none" : "btn btn-primary m-2"
            }`}
            onClick={handleModalShow}
          >
            Escribe una review
          </button>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section mt-5">
          <h3>Reviews</h3>
          {sortedReviews && sortedReviews.length > 0 ? (
            sortedReviews.map((review) => {
              const user = users.find((user) => user.id === review.user_id);
              return (
                <div key={review.id} className="review-card d-flex row m-2">
                  <div className="container d-flex align-items-center justify-content-center col-2 ">
                    {user && (
                      <img
                        src={user.profile_picture}
                        alt={user.username}
                        className="beer-details-user-picture "
                      />
                    )}
                  </div>
                  <div className=" containter review-content col-10 bg-light my-2">
                    <div className=" container d-flex justify-content-between ">
                      <p className="username fw-bold">
                        <span>{user ? user.username : "Loading..."}</span>
                      </p>
                      {jwt && (
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="rating mb-2">
                            {Array.from({ length: review.rating }).map(
                              (_, index) => (
                                <img
                                  key={index}
                                  src={fullGlass}
                                  alt="Full Glass"
                                  style={{ width: "20px", marginRight: "3px" }}
                                />
                              )
                            )}
                            {Array.from({ length: 5 - review.rating }).map(
                              (_, index) => (
                                <img
                                  key={index}
                                  src={emptyGlass}
                                  alt="Empty Glass"
                                  style={{ width: "20px", marginRight: "3px" }}
                                />
                              )
                            )}
                          </div>

                          <div className="dropdown">
                            <button
                              className="options-review-button btn btn-secondary dropdown-toggle ms-3"
                              type="button"
                              id={`dropdownMenuButton-${review.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`dropdownMenuButton-${review.id}`}
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleDeleteReview(review.id)}
                                  disabled={currentUserId !== review.user_id}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="me-2"
                                  />
                                  Delete
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleEditReview(review)}
                                  disabled={currentUserId !== review.user_id}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="me-2"
                                  />
                                  Edit
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="container ">{review.comment}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Nada por acá.</p>
          )}
        </div>

        {/* Review Modal */}
        <ReviewModal
          show={showModal}
          handleClose={handleModalClose}
          beer_id={id}
          submitReview={submitReview}
          initialRating={modalReview?.rating || 0} // Pass existing rating for editing
          initialComment={modalReview?.comment || ""} // Pass existing comment for editing
          review_id={modalReview?.id} // Pass review_id for editing
        />
      </div>
    </div>
  );
};
