import React, { useState } from 'react';
import './GuidedTourGarden.css';

function GuidedTourGarden() {
  const [showInfo, setShowInfo] = useState(true);

  const momentoUrl = 'https://momento360.com/e/u/6e4f3507a7e04a6d9661556c292e79b4?utm_campaign=embed&utm_source=other&heading=-239.18&pitch=15.64&field-of-view=88&size=medium&display-plan=true';

  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="guided-tour-garden">
      <iframe
        src={momentoUrl}
        frameBorder="0"
        allowFullScreen
        webkitallowfullscreen
        mozallowfullscreen
        className="momento-tour"
      />
      
      {showInfo && (
        <div className="info-overlay">
          <h1>Welcome to the Garden of Healing</h1>
          <p>Explore the medicinal plants used for healing.</p>
          <button onClick={toggleInfo} className="info-button">Close</button>
        </div>
      )}
      {!showInfo && (
        <button onClick={toggleInfo} className="info-button info-button-small">Info</button>
      )}
    </div>
  );
}

export default GuidedTourGarden;
