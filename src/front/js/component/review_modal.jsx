import React, { useState } from "react";
import fullGlass from "../../img/fullglass.png";
import emptyGlass from "../../img/empty.png";
import "../../styles/reviewModal.css";

export const ReviewModal = ({ show, handleClose, beer_id, submitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await submitReview(beer_id, rating, comment);
      console.log("Submitting review with beer_id:", beer_id);
      console.log(comment);
      console.log(rating);

      if (result) {
        console.log("Review submitted successfully:", result);
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
    handleClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="modal show d-block review-modal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center bg-light ">
            <h5 className=" review-modal-title fw-bold m-0 text-dark ">
              Escribe una review
            </h5>
          </div>
          <div className="modal-body">
            <div className="rating mb-3">
              <label>Rating:</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={star <= rating ? fullGlass : emptyGlass}
                    alt={`${star} stars`}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      marginRight: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="comment mb-3">
              <label>Comment:</label>
              <textarea
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
              />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center ">
            <button
              type="button"
              className="btn review-modal-button"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn review-modal-button"
              onClick={handleSubmit}
            >
              Enviar Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
