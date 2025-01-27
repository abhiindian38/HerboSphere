import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./CommunityForum.css";

const CommunityForum = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    navigate(`/${section}`);
  };

  const toggleGuidelines = () => {
    setShowGuidelines(!showGuidelines);
    setShowBadges(false); // Hide badges when guidelines are shown
  };

  const toggleBadges = () => {
    setShowBadges(!showBadges);
    setShowGuidelines(false); // Hide guidelines when badges are shown
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div className="community-forum-intro">
      <div className="intro-content">
        <h1>Welcome to the HerboSphere Community Forum!</h1>
        <p>
          Explore, share, and learn about herbal remedies and healing journeys. Connect with like-minded individuals passionate about holistic wellness.
        </p>

        <div className="info-sections">
          <div className="info-card">
            <h2>Herbal Knowledge Hub</h2>
            <p>
              Discover a wealth of information on herbal remedies and their benefits.
            </p>
            <button className="info-button" onClick={() => handleNavigation("knowledge-hub")}>
              Explore Knowledge Hub
            </button>
          </div>
          <div className="info-card">
            <h2>Remedy Sharing</h2>
            <p>
              Share your favorite herbal remedies with the community.
            </p>
            <button className="info-button" onClick={() => handleNavigation("remedy-sharing")}>
              Share Your Remedies
            </button>
          </div>
          <div className="info-card">
            <h2>Healing Communities</h2>
            <p>
              Join groups focused on various aspects of healing.
            </p>
            <button className="info-button" onClick={() => handleNavigation("healing-communities")}>
              Join Communities
            </button>
          </div>
          <div className="info-card">
            <h2>Healing Journeys</h2>
            <p>
              Read inspiring stories of personal healing and recovery.
            </p>
            <button className="info-button" onClick={() => handleNavigation("healing-journeys")}>
              Read Journeys
            </button>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Dive In?</h2>
          <p>Click below to start exploring the community forum!</p>
          <div className="cta-section">
          <button className="cta-button" onClick={scrollToTop}>Explore</button>
        </div>
        </div>

        {/* Guidelines and Badges Buttons */}
        <div className="popup-buttons">
          <button className="popup-button" onClick={toggleGuidelines}>Community Guidelines</button>
          <button className="popup-button" onClick={toggleBadges}>Explore our Badges</button>
        </div>

        {/* Guidelines Popup */}
        {showGuidelines && (
          <div className="popup">
            <h2>Community Guidelines</h2>
            <ul>
              <li>Be respectful and considerate towards others.</li>
              <li>Share knowledge and experiences constructively.</li>
              <li>Do not post spam or irrelevant content.</li>
              <li>Follow community group rules.</li>
            </ul>
            <button className="close-popup" onClick={toggleGuidelines}>Close</button>
          </div>
        )}

        {/* Badges Content */}
        {showBadges && (
  <div className="popup badges-content">
    <h2 className="badges-header">Achievements & Badges</h2>
    <div className="badges-grid">
      <div className="badge-item">
        <img src="src/assets/badges/badge0.jpg" alt="Wellness Warrior Badge" />
        <p>Wellness Warrior</p>
      </div>
      <div className="badge-item">
        <img src="src/assets/badges/badge2.jpg" alt="Ayurveda Expert Badge" />
        <p>Ayurveda Expert</p>
      </div>
      <div className="badge-item">
        <img src="src/assets/badges/badge3.jpg" alt="Community Builder Badge" />
        <p>Community Builder</p>
      </div>
      <div className="badge-item">
        <img src="src/assets/badges/badge6.jpg" alt="Knowledge Sharer Badge" />
        <p>Knowledge Sharer</p>
      </div>
      <div className="badge-item">
        <img src="src/assets/badges/badge5.jpg" alt="Milestone Achiever Badge" />
        <p>Milestone Achiever</p>
      </div>
      <div className="badge-item">
        <img src="src/assets/badges/badge4.jpg" alt="VaidyaVan Veteran Badge" />
        <p>HerboSphere Veteran</p>
      </div>
    </div>
    <button className="close-popup" onClick={toggleBadges}>
      Close
    </button>
  </div>
)}
</div>
    </div>
  );
};

export default CommunityForum;