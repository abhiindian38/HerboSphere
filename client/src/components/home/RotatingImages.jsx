import React from 'react';
import './RotatingImages.css';


import image1 from '../../assets/images/virtual garden.jpg';
import image2 from '../../assets/images/chatbot.jpg';
import image3 from '../../assets/images/search.jpg';
import image4 from '../../assets/images/community.jpg';
import image5 from '../../assets/images/study.jpg';
import image6 from '../../assets/images/visual guide.jpg';
import image7 from '../../assets/images/pet.jpg';


const descriptions = [
  'Explore our virtual garden and discover various herbs.',
  'Get help from our chatbot for all your herbal queries.',
  'Search through our extensive herbal database.',
  'Join our community to connect with other herbal enthusiasts.',
  'Study detailed guides about different herbs.',
  'Visual guides to help you understand herbal remedies.',
  'Get advice on pet care related to herbal treatments.',
];

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
];

const RotatingImages = () => {
  return (
    <section id="rotating-images">
      <h2>Our Features</h2>
      <div className="rotating-images-container">
        <div className="rotating-images-track">
          {images.map((image, index) => (
            <div className="image-container" key={index}>
              <img src={image} alt={`Feature ${index + 1}`} />
              <div className="overlay">
                <p>{descriptions[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RotatingImages;
