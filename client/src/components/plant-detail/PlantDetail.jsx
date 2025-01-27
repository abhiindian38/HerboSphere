import React, { useState, useEffect, useRef } from 'react';
import './PlantDetail.css';
import ModelViewer from '../model/ModelViewer';
import GuidelinesPopup from './GuidelinesPopup';
import { FaGlobe } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 

function PlantDetail({ plant, onClose }) {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate(); 

  const audioRef = useRef(null);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setIsBookmarked(bookmarks.some(bookmark => bookmark.id === plant.id));
  }, [plant.id]);

  const handleShowGuidelines = () => setShowGuidelines(true);
  const handleCloseGuidelines = () => setShowGuidelines(false);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== plant.id);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      bookmarks.push({ id: plant.id, name: plant.name });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handleNotesToggle = () => setShowNotes(!showNotes);
  const handleNotesChange = (e) => setNotes(e.target.value);

  const getTranslatedText = (plant, language) => {
    const translations = {
      en: `Scientific Name: ${plant.scientificName}, Important Part: ${plant.importantPart}, Side Effects: ${plant.sideEffects}, How to Use: ${plant.howToUse.join(', ')}, Diseases: ${plant.diseases.join(', ')}`,
      hi: `वैज्ञानिक नाम: ${plant.scientificName}, महत्वपूर्ण भाग: ${plant.importantPart}, दुष्प्रभाव: ${plant.sideEffects}, उपयोग कैसे करें: ${plant.howToUse.join(', ')}, रोग: ${plant.diseases.join(', ')}`,
      
    };
    return translations[language] || translations.en;
  };

  const getLanguageCode = (language) => {
    const languageCodes = {
      en: 'en-US',
      hi: 'hi-IN',
      tel : 'tel-IN',
    };
    return languageCodes[language] || 'en-US';
  };

  const handleTranslate = () => {
    const translatedText = getTranslatedText(plant, selectedLanguage);
    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = getLanguageCode(selectedLanguage);
    window.speechSynthesis.speak(speech);
  };

  const handleBuyNow = () => {
    navigate(`/order-plant/${plant.name}`); 
  };
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setDropdownVisible(false);
    handleTranslate(); 
  };

  return (
    <div className="plant-detail">
      <button className="plant-detail-close" onClick={onClose} aria-label="Close details view">✕</button>

      <button className="plant-detail-guidelines" onClick={handleShowGuidelines} aria-label="Show guidelines">?</button>

      {showGuidelines && (
        <GuidelinesPopup onClose={handleCloseGuidelines} className="guidelines-popup" />
      )}

      <h2 className="plant-detail-title text-center">{plant.name}</h2>

      <div className="plant-detail-tags text-center">
        {plant.ageGroups.map((group, index) => (
          <span key={index} className="plant-detail-tag">{group}</span>
        ))}
      </div>

      <p className="plant-detail-info text-center"><strong>Medicinal Uses:</strong> {plant.medicinalValues.join(', ')}</p>

      <div className="model-container">
        <ModelViewer modelUrl="/Turmeric_Roots.glb" />
      </div>

      <div className="container text-center">
        <p className="plant-detail-info"><strong>Scientific Name:</strong> {plant.scientificName}</p>
        <p className="plant-detail-info"><strong>Important Part:</strong> {plant.importantPart}</p>
        <p className="plant-detail-info"><strong>Side Effects:</strong> {plant.sideEffects}</p>
        <p className="plant-detail-info"><strong>How to Use:</strong> {plant.howToUse.join(', ')}</p>
        <p className="plant-detail-info"><strong>Diseases:</strong> {plant.diseases.join(', ')}</p>

        <div className="translate-container">
          <button 
            className="plant-detail-translate"
            onClick={toggleDropdown}
          >
            <FaGlobe /> Translate
          </button>
          <div 
            className={`language-dropdown ${dropdownVisible ? 'show' : ''}`}
          >
            <button onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('hi')}>Hindi</button>
            <button onClick={() => handleLanguageChange('hi')}>Telugu</button>
            <button onClick={() => handleLanguageChange('hi')}>Tamil</button>
            <button onClick={() => handleLanguageChange('hi')}>Malyalam</button>
            <button onClick={() => handleLanguageChange('hi')}>Bengali</button>
            <button onClick={() => handleLanguageChange('hi')}>Kannada</button>
          </div>
        </div>
        
        <button 
          className={`plant-detail-bookmark ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={toggleBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <i className={`fa${isBookmarked ? 's' : 'r'} fa-bookmark`}></i>
        </button>
        
        <button 
          className="plant-detail-notes"
          onClick={handleNotesToggle}
          aria-label="Add or edit notes"
        >
          <i className="fa-regular fa-note-sticky"></i>
        </button>

        {showNotes && (
          <textarea
            className="plant-detail-notes-input"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add your notes here..."
          ></textarea>
        )}

        <button className="plant-detail-buy-now" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default PlantDetail;
