import React, { useState, useEffect } from 'react';
import PlantCard from '../plant-display/PlantCard';
import PlantDetail from '../plant-detail/PlantDetail';
import Chatbot from '../home/Chatbot';
import { FaSearch, FaTimes, FaCamera } from 'react-icons/fa';
import './Learn.css';

function Learn() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanningMessage, setScanningMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch('http://localhost:4000/plant-api/plants');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setPlants(data);
      } catch (err) {
        console.error('Error fetching plants:', err.message);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlants();
  }, []);

  const handleCardClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handleCloseDetail = () => {
    setSelectedPlant(null);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleScanClick = () => {
    setShowModal(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadedImage(URL.createObjectURL(file));
      setScanningMessage('Scanning your upload...');
      setIsScanning(true);
      setShowModal(false);

     
      setTimeout(() => {
        setScanningMessage('Uploaded herb is Aloe Vera');
        setIsScanning(false);
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleScan = () => {
    if (fileName) {
      setScanningMessage('Scanning your upload...');
      setIsScanning(true);

      setTimeout(() => {
        
        setScanningMessage('Uploaded herb is Aloe Vera'); 
        setIsScanning(false);
      }, 3000);
    }
  };

  if (isLoading) {
    return <div className="loading-screen">
    <div className="logo-spinner"></div>
    <p className="loading-text">Welcome to FloraVerse!</p>
  </div>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={selectedPlant ? 'white-background' : ''}>
      {!selectedPlant && (
        <>
          <div className="search-bar-container">
            <div className="search-bar-wrapper">
              <div className="search-icon1"><FaSearch /></div>
              <input
                type="text"
                placeholder="Search for a herb..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
              {searchQuery && (
                <div className="clear-icon" onClick={clearSearch}><FaTimes /></div>
              )}
            </div>
          </div>

          <div className="scan-find-container">
            <button className="scan-find-button" onClick={handleScanClick}>
              <FaCamera className="scan-icon" /> Scan and Find
            </button>
          </div>
        </>
      )}

      {uploadedImage && (
        <div className="uploaded-image-preview">
          <h3>Image Preview</h3>
          <img src={uploadedImage} alt="Uploaded Plant" />
          {scanningMessage && (
            <div className={`scanning-message ${isScanning ? 'scanning' : 'result'}`}>
              {scanningMessage}
              {isScanning && <div className="spinner"></div>}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <h2>Upload a Plant Image</h2>
            <p>Please upload an image of the herb you want to identify.</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-upload-button"
            />
            <div className="file-name">
              {fileName ? fileName : 'No file chosen'}
            </div>
            <button className="scan-button" onClick={handleScan} disabled={isScanning}>
              {isScanning ? 'Scanning...' : 'Scan'}
            </button>
            <button className="close-modal-button" onClick={handleCloseModal}><FaTimes /></button>
          </div>
        </div>
      )}

      {selectedPlant ? (
        <PlantDetail plant={selectedPlant} onClose={handleCloseDetail} />
      ) : (
        <div className="plant-card-container">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant._id} plant={plant} onClick={handleCardClick} />
          ))}
        </div>
      )}
      <Chatbot />
    </div>
  );
}

export default Learn;
