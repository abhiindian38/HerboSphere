import React, { useEffect } from 'react';
import './LoadingScreen.css';
import { useNavigate } from 'react-router-dom';

function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/guided-tour-garden'); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-screen">
      <div className="logo-spinner"></div>
      <p className="loading-text">Taking you to the garden of healing...</p>
      
    </div>
  );
}

export default LoadingScreen;
