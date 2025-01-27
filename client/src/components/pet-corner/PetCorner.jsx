import React, { useState, useEffect } from "react";
import "./PetCorner.css";
import HeroVideo from "./HeroVideo";

const PetCorner = () => {
  const [petConcernsData, setPetConcernsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  useEffect(() => {
    const fetchPetConcerns = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/pet-api/pet-concerns"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pet concerns data");
        }
        const data = await response.json();
        setPetConcernsData(data);
      } catch (error) {
        console.error("Error fetching pet concerns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetConcerns();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cardsSection = document.querySelector(".pet-cards-section");
      if (cardsSection) {
        const rect = cardsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setIsScrolled(true);
        }
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleQuizButtonClick = () => {
    setIsQuizOpen(true);
  };

  const closeQuizPopup = () => {
    setIsQuizOpen(false);
    handleTypeformSubmit(); 
  };

  const handleTypeformSubmit = () => {
 
    const simulatedResult = {
      petType: "Dog",
      concern: "Allergies",
      symptoms: ["Itchy skin", "Sneezing", "Watery eyes"],
      diagnosis:
        "Your pet is showing symptoms of common allergies caused by environmental factors like pollen.",
      treatment:
        "We recommend visiting a vet to confirm the diagnosis. Meanwhile, consider natural remedies such as chamomile and lavender for soothing the skin.",
      locations: ["Vet Clinic - Pasu Farma", "Vet Clinic - Madhu Vet Medicals"],
    };

    setQuizResult(simulatedResult);
    setIsResultPopupOpen(true);
  };

  const PetConcernCard = ({
    petConcern,
    severity,
    causes,
    preventionTips,
    plantRemedies,
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div
        className={`pet-card ${isExpanded ? "expanded" : ""}`}
        onClick={handleClick}
      >
        <h3 className="mt-5">{petConcern}</h3>
        {isExpanded && (
          <div className="remedy-details">
            <div className="severity">Severity: {severity}</div>
            <div className="causes">
              <h4>Causes</h4>
              <ul>
                {causes.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </div>
            <div className="prevention-tips">
              <h4>Prevention Tips</h4>
              <ul>
                {preventionTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="plants">
              <h4>Plant Remedies</h4>
              {plantRemedies.map((remedy, index) => (
                <div key={index} className="plant-item">
                  <img
                    src={remedy.image}
                    alt={remedy.name}
                    className="plant-image"
                  />
                  <div className="plant-info">
                    <p>
                      <strong>{remedy.name}</strong>
                    </p>
                    <p>{remedy.description}</p>
                    <p>
                      <em>Usage:</em> {remedy.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-corner-container">
      <div className="video-section">
        <HeroVideo />
        <button className="quiz-button" onClick={handleQuizButtonClick}>
          Tell Us About Your Pet
        </button>
      </div>

      {quizResult && isResultPopupOpen && (
        <div className="diagnosis-popup">
          <div className="diagnosis-content">
            <button
              className="close-button2"
              onClick={() => setIsResultPopupOpen(false)}
            >
              X
            </button>
            <h2>Pet Diagnosis Report</h2>
            <p>
              <strong>Pet Type:</strong> {quizResult.petType}
            </p>

            <div className="diagnosis-section">
              <h3>Symptoms</h3>
              <ul>
                {quizResult.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div className="diagnosis-section">
              <h3>Diagnosis</h3>
              <p>{quizResult.diagnosis}</p>
            </div>

            <div className="diagnosis-section">
              <h3>Recommended Treatment</h3>
              <p>{quizResult.treatment}</p>
            </div>

            <div className="diagnosis-section">
              <h3>Suggested Clinics for Help</h3>
              <ul>
                {quizResult.locations.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
              </ul>
            </div>

            <h1 className="fs-2 marquee-text">
              Explore more remedies for your <strong>Dog</strong> below
            </h1>
          </div>
        </div>
      )}

      <div className={`pet-cards-section ${isScrolled ? "scrolled" : ""}`}>
        {petConcernsData.map((item, index) => (
          <PetConcernCard
            key={index}
            petConcern={item.petConcern}
            severity={item.severity}
            causes={item.causes}
            preventionTips={item.preventionTips}
            plantRemedies={item.plantRemedies}
          />
        ))}
      </div>

      {isQuizOpen && (
        <div className="quiz-modal">
          <div className="quiz-content">
            <button
              className="close-button"
              onClick={closeQuizPopup}
              aria-label="Close Quiz"
            >
              X
            </button>
            <iframe
              src="https://1s9dpgh3zut.typeform.com/to/hrr5DVBe"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Quiz"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCorner;
