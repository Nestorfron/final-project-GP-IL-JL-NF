import React, { useEffect } from "react";

const CountrySelectModal = ({
  showModal,
  setShowModal,
  selectedCountry,
  setSelectedCountry,
  countries,
  onSelectCountry,
}) => {
  useEffect(() => {
    const hasShownModal = localStorage.getItem("hasShownCountrySelectModal");

    if (!hasShownModal && showModal) {
      const modal = new window.bootstrap.Modal(
        document.getElementById("countrySelectModal")
      );
      modal.show();
      localStorage.setItem("hasShownCountrySelectModal", "true");
      if (selectedCountry) {
        localStorage.setItem("originalCountry", selectedCountry);
      }
    }
  }, [showModal, selectedCountry, setSelectedCountry]);

  return (
    <div
      className="modal fade"
      id="countrySelectModal"
      tabIndex="-1"
      aria-labelledby="countrySelectModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="countrySelectModalLabel">
              Selecciona tu país
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="countrySelect" className="form-label">
                  Country
                </label>
                <select
                  className="form-select"
                  id="countrySelect"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Select a country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSelectCountry}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelectModal;
