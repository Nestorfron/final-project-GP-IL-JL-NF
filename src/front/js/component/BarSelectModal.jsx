import React from "react";

const BarSelectModal = ({ bars, onSelectBar, onClose }) => {
  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a Bar</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {bars.map((bar) => (
                <li
                  key={bar.id}
                  className="list-group-item"
                  onClick={() => onSelectBar(bar.id)}
                >
                  {bar.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarSelectModal;
