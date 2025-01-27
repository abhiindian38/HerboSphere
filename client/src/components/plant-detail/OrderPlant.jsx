import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSeedling } from 'react-icons/fa';
import './OrderPlant.css'

function OrderPlant() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);


  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/plant-api/order-plant/${name}`);
        if (!response.ok) {
          throw new Error(`Error fetching plant details: ${response.statusText}`);
        }
        const data = await response.json();
        setPlant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, [name]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderPlaced(true);

  };

  const handleClose = () => {
    navigate('/learn');
  };

  if (loading) {
    return <div className="loading-screen">
    <div className="logo-spinner"></div>
    <p className="loading-text">Loading healing...</p>
  </div>
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="order-plant-container">
      {!orderPlaced ? (
        <div className="order-plant-card">
          <h1 className="order-title">Order this healing goodness!</h1>
          {plant ? (
            <>
              <p className="plant-info">You are ordering the plant: <span className="plant-name">{plant.name}</span></p>
            <img src={plant.image} alt = "image unavailable now"></img>
              <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" placeholder="Your Address" required />
                </div>
                <div className="form-group">
                  <label>Quantity:</label>
                  <div className="quantity-selector">
                    <button type="button" onClick={() => handleQuantityChange(-1)}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
                  </div>
                </div>
                <button type="submit" className="submit-btn1">Submit Order</button>
              </form>
            </>
          ) : (
            <p>Plant not found.</p>
          )}
        </div>
      ) : (
        <div className="order-popup">
          <div className="popup-content">
            <FaSeedling className="plant-icon" />
            <p>Your order has been placed!</p>
            <button className="close-btn" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPlant;
