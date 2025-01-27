import React, { useState, useEffect } from 'react';
import './RemedySharing.css';
import { FaStar, FaLeaf, FaCommentDots, FaSave } from 'react-icons/fa';
import { Modal, Button } from '@mui/material';
import {FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const RemedySharing = () => {
  const [remedyName, setRemedyName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparation, setPreparation] = useState('');
  const [benefits, setBenefits] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await fetch('http://localhost:4000/community-api/remedies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Convert the response to JSON
        setRemedies(data); // Set remedies with the fetched data
      } catch (error) {
        console.error("An error occurred while fetching remedies:", error);
      }
    };
  
    fetchRemedies();
  }, []);
  
  const clearForm = () => {
    setRemedyName('');
    setIngredients('');
    setPreparation('');
    setBenefits('');
  };
  
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRemedy = {
      name: remedyName,
      ingredients,
      preparation,
      benefits,
      rating: 4,
    };
    try {
      // Post new remedy to backend
      await fetch('http://localhost:4000/community-api/remedies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRemedy),
      });

      // Re-fetch remedies to get the updated list
      const response = await fetch('http://localhost:4000/community-api/remedies');
      if (!response.ok) {
        throw new Error('Failed to fetch remedies');
      }
      const data = await response.json();
      setRemedies(data); // Update remedies with the latest data from the server

      clearForm(); // Clear the form fields
      handleCloseModal();
      setSuccessMessage('Remedy has been successfully added!'); // Set success message
      setShowSuccess(true); // Show success message

      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("An error occurred while adding a remedy:", error);
    }
  };

  

  return (
    <div className="remedy-sharing">
      <h2 className="board-title">Community Herbal Remedies</h2>
      {/* Hamburger Menu Icon */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={30} />
      </div>

      {/* Navigation Menu */}
      {menuOpen && (
        <div className="navbar-menu">
          <button className="navbar-menu-button" onClick={() => navigate('/healing-journeys')}>
            Healing Journeys
          </button>
          <button className="navbar-menu-button" onClick={() => navigate('/knowledge-hub')}>
            Herbal Knowledge Hub
          </button>
          <button className="navbar-menu-button" onClick={() => navigate('/healing-communities')}>
            Healing Communities
          </button>
        </div>
      )}
       {/* Display success message */}
    {successMessage && (
      <div className="success-message">
        {successMessage}
      </div>
    )}

      {/* Display remedies in plant-themed cards */}
      <div className="remedy-board">
        <div className="remedy-items-container">
          {remedies.length === 0 ? (
            <p className="no-remedy-text">No remedies yet! Be the first to share one.</p>
          ) : (
            remedies.map((item, index) => (
              <div key={index} className="remedy-item">
                <h4 className="remedy-name">
                  <FaLeaf className="leaf-icon"/> {item.name}
                </h4>
                <p><strong>Ingredients:</strong> {item.ingredients}</p>
                <p><strong>Preparation:</strong> {item.preparation}</p>
                <p><strong>Benefits:</strong> {item.benefits}</p>
                <div className="rating-section">
                  <p><strong>Rating: </strong> </p>
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`star ${starIndex < item.rating ? 'filled' : ''}`}
                    />
                  ))}
                </div>
                <div className="interaction-buttons">
                  <FaCommentDots className="icon comment-icon" />
                  <FaSave className="icon save-icon" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button to open modal */}
      <button
        className="floating-btn"
        onClick={handleOpenModal}
      >
        Add Your Remedy
      </button>

      {/* Modal for adding a remedy */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="modal-title">🌿 Add a New Herbal Remedy 🌿</h2>
            <form className="remedy-form" onSubmit={handleSubmit}>
              <label htmlFor="remedyName" className="remedy-label">Remedy Name:</label>
              <input
                id="remedyName"
                className="remedy-input"
                value={remedyName}
                onChange={(e) => setRemedyName(e.target.value)}
                placeholder="E.g., Tulsi Tea for Cold Relief"
                required
              />

              <label htmlFor="ingredients" className="remedy-label">Ingredients:</label>
              <textarea
                id="ingredients"
                className="remedy-textarea"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="List the herbal ingredients..."
                required
              ></textarea>

              <label htmlFor="preparation" className="remedy-label">Preparation:</label>
              <textarea
                id="preparation"
                className="remedy-textarea"
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                placeholder="Describe how to prepare the remedy..."
                required
              ></textarea>

              <label htmlFor="benefits" className="remedy-label">Benefits:</label>
              <textarea
                id="benefits"
                className="remedy-textarea"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Explain the benefits of the remedy..."
                required
              ></textarea>

              {/* Live Preview */}
              <div className="remedy-preview">
                <h4>Live Preview:</h4>
                <p><strong>{remedyName || "Remedy Name"}</strong></p>
                <p><strong>Ingredients:</strong> {ingredients || "Ingredients will appear here..."}</p>
                <p><strong>Preparation:</strong> {preparation || "Preparation steps will appear here..."}</p>
                <p><strong>Benefits:</strong> {benefits || "Benefits will appear here..."}</p>
              </div>

              {/* Submit button */}
              <Button type="submit" variant="contained" color="success" className="submit-btn">
                Share Remedy
              </Button>
            </form>
          </div>
        </div>
      </Modal>

      
    </div>
  );
};

export default RemedySharing;
