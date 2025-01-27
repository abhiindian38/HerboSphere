import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { PiPlantDuotone } from "react-icons/pi";
import { CiLogin } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa'; 
import { GiPlantRoots } from "react-icons/gi";
import { MdOutlineForum } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTv } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import './Header.css'; // Ensure to import the CSS file

function Header() {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="src/assets/images/vaidyavan-logo.png" alt="Logo Unavailable currently" className='logo-img' />
        </Link>
        <h1 className="brand-name">HerboSphere</h1>
      </div>
      <nav className="navbar">
        <button className="navbar-toggler" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars />
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <AiOutlineHome /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="learn" className="nav-link">
              <PiPlantDuotone /> FloraVerse
            </Link>
          </li>
          <li className="nav-item">
            <Link to="guided-tours" className="nav-link">
              <GiPlantRoots /> Guided Tours
            </Link>
          </li>
          <li className="nav-item">
            <Link to="pet-corner" className="nav-link">
            <MdOutlinePets /> Pets Corner
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="remedies-tv" className="nav-link">
            <FaTv /> Herbal Remedies TV
            </Link>
          </li>
      
          <li className="nav-item">
            <Link to="community-forum" className="nav-link">
            <MdOutlineForum /> Community Forum
            </Link>
          </li>
          <li className="nav-item">
            <Link to="register" className="nav-link">
              <HiMiniPencilSquare /> Register
            </Link>
          </li>
          {userLoginStatus === false ? (
            <li className="nav-item">
              <Link to="login" className="nav-link">
                <CiLogin /> Login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="login" className="nav-link">
                <CiLogin /> Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
