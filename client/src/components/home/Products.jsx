import React, { useState, useEffect } from 'react';
import './About.css';
import { FaLeaf, FaUsers, FaPaw, FaBook, FaComments } from 'react-icons/fa';


const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const videos = [
  
  ];

  const features = [
    { icon: <FaLeaf />, text: 'Explore a vast collection of herbal remedies' },
    { icon: <FaUsers />, text: 'Join a community of herbal enthusiasts' },
    { icon: <FaPaw />, text: 'Get pet care advice for herbal treatments' },
    { icon: <FaBook />, text: 'Access detailed information about herbs' },
    { icon: <FaComments />, text: 'Engage in discussions with experts and peers' },
  ];

  useEffect(() => {
    let interval;
    if (autoSlide) {
      interval = setInterval(() => {
        goToNext();
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoSlide]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="about">
      <div
        className="carousel"
        onMouseEnter={() => setAutoSlide(false)}
        onMouseLeave={() => setAutoSlide(true)}
      >
        <button className="carousel-btn prev" onClick={goToPrev}>&lt;</button>
        <div className="carousel-wrapper">
          <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {videos.map((video, index) => (
              <div key={index} className="video-container">
                <video width="100%" height="auto" controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="caption">{features[index]?.text}</div>
                <div className="icon">{features[index]?.icon}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn next" onClick={goToNext}>&gt;</button>
      </div>

      <div className="thumbnails">
        {videos.map((video, index) => (
          <div key={index} className="thumbnail">
            <video width="50" height="50" controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      <div className="indicators">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default About;
