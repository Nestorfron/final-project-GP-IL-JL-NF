import React, { useState } from "react";

export const ReviewModal = ({ show, handleClose, beerId, submitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    submitReview(beerId, rating, comment);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rating mb-3">
          <label>Rating:</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={
                  star <= rating
                    ? "/path/to/full_glass.png"
                    : "/path/to/empty_glass.png"
                }
                alt={`${star} stars`}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer", width: "30px", marginRight: "5px" }}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
