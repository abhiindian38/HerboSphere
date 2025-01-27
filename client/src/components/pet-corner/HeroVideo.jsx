import React, { useEffect, useState } from 'react';
import './HeroVideo.css';
import myVideo from '../../assets/videoo.mp4'; 

const HeroVideo = () => {
  const [videoHeight, setVideoHeight] = useState('100vh');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const newHeight = Math.max(viewportHeight - scrollPosition, 0);
    setVideoHeight(`${newHeight}px`);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="hero-container" style={{ height: videoHeight }}>
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={myVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
      <div className="hero-content">
        <h1>Welcome to Pets Corner</h1>
        <p>Discover natural remedies for common pet concerns and get personalized recommendations.</p>
        <button className="explore-button">Explore Remedies</button>
      </div>
    </div>
  );
};

export default HeroVideo;
