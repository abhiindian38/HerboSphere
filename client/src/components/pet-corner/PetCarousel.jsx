import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PetCarousel = () => {
  const items = [
    { icon: 'https://previews.123rf.com/images/viperagp/viperagp1308/viperagp130800020/21589237-fresh-herbs-falling-into-a-porcelain-mortar.jpg', label: 'Dog' },
    { icon: 'https://previews.123rf.com/images/viperagp/viperagp1308/viperagp130800020/21589237-fresh-herbs-falling-into-a-porcelain-mortar.jpg', label: 'Cat' },
    { icon: 'https://previews.123rf.com/images/viperagp/viperagp1308/viperagp130800020/21589237-fresh-herbs-falling-into-a-porcelain-mortar.jpg', label: 'Neem' },
    { icon: 'https://previews.123rf.com/images/viperagp/viperagp1308/viperagp130800020/21589237-fresh-herbs-falling-into-a-porcelain-mortar.jpg', label: 'Rosemary' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <img src={item.icon} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PetCarousel;
