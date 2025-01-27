import React from 'react';
import './PlantCard.css';

function PlantCard({ plant, onClick }) {
  return (
    <div className="plant-card" onClick={() => onClick(plant)}>
      <img src={plant.image} alt={plant.name} className="plant-card-image" />
      <h3 className="plant-card-title">{plant.name}</h3>
      <button className="plant-card-button" onClick={(e) => { e.stopPropagation(); onClick(plant); }}>
        Know More
      </button>
    </div>
  );
}

export default PlantCard;
