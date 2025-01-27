import React from 'react';
import './GuidelinesPopup.css';

function GuidelinesPopup({ onClose }) {
  return (
    <div className="guidelines-popup">
      <div className="guidelines-popup-content">
        <button className="guidelines-popup-close" onClick={onClose} aria-label="Close guidelines popup">✕</button>
        <h3 className="guidelines-popup-title">Guidelines</h3>
        <p className="guidelines-popup-text">
          Use the 3D model viewer to rotate, zoom, and explore the plant in three dimensions. You can view the plant from all angles to get a better understanding of its structure. Use the buttons provided to translate or close this popup.
        </p>
      </div>
    </div>
  );
}

export default GuidelinesPopup;

