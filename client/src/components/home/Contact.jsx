

import React from 'react';
import './Contact.css';
import './Footer';
import Footer from './Footer';

function Contact() {
  return (
   

    <div className="contact-section d-flex justify-content-center">
  
      <div className="contact-details">
        
        <div className="contact-info">
          <h3>Email Us</h3>
          <p><a href="mailto:info@vaidyaVan.com">info@vaidyaVan.com</a></p>
        </div>
        <div className="contact-info">
          <h3>Call Us</h3>
          <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
        </div>
        <div className="contact-info">
          <h3>Visit Us</h3>
          <p>Pharmacy MLRITM besides SR Block,<br />Backside Open garden, Pin 500043</p>
        </div>
        <div className="contact-info">
          <h3>Follow Us</h3>
          <p>
            <a href="https://twitter.com/bharatw" target="_blank" rel="noopener noreferrer">Twitter</a> | 
            <a href="https://facebook.com/fathima" target="_blank" rel="noopener noreferrer"> Facebook</a> | 
            <a href="https://linkedin.com/company/Abhishekg" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
          </p>
        </div>
      </div>
      
      <form className="contact-form">
        <input type="text" placeholder="Your Name" className="contact-input" />
        <input type="email" placeholder="Your Email" className="contact-input" />
        <textarea placeholder="Your Message" className="contact-textarea"></textarea>
        <button type="submit" className="contact-button">Send Message</button>
      </form>

    </div>
    

  );
}

export default Contact;