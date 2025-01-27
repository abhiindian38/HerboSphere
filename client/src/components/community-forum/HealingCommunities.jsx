import React, { useState } from 'react';
import { FaUserFriends, FaBars } from 'react-icons/fa';
import { GiStomach, GiJoint, GiBrain } from 'react-icons/gi'; 
import { FaSpa, FaHeartbeat, FaEye } from 'react-icons/fa';  // Skin health, heart health, eye health icons
import { useNavigate } from 'react-router-dom';
import './HealingCommunities.css';


const HealingCommunities = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const allCommunities = [
    {
      name: 'Digestive Health',
      description: 'Discuss remedies and support for digestive issues.',
      icon: <GiStomach size={80} />,
      members: 2345,
      ageGroup: '18-35',
      gender: 'All',
    },
    {
      name: 'Skin Health',
      description: 'Share tips and remedies for glowing skin.',
      icon: <FaSpa size={80} />,
      members: 1500,
      ageGroup: '36-50',
      gender: 'Female',
    },
    {
      name: 'Joint Pain Relief',
      description: 'Explore herbal solutions for joint pain.',
      icon: <GiJoint size={80} />,
      members: 980,
      ageGroup: '50+',
      gender: 'Male',
    },
    {
      name: 'Heart Health',
      description: 'Discuss tips for maintaining a healthy heart.',
      icon: <FaHeartbeat size={80} />,
      members: 2000,
      ageGroup: '36-50',
      gender: 'All',
    },
    {
      name: 'Mental Wellness',
      description: 'Share practices for improving mental well-being.',
      icon: <GiBrain size={80} />,
      members: 3000,
      ageGroup: '18-35',
      gender: 'All',
    },
    {
      name: 'Eye Health',
      description: 'Explore tips for improving eye health and vision.',
      icon: <FaEye size={80} />,
      members: 1200,
      ageGroup: '50+',
      gender: 'All',
    },
  ];

  const [filter, setFilter] = useState({ ageGroup: 'All', gender: 'All' });

  const filteredCommunities = allCommunities.filter((community) => {
    return (
      (filter.ageGroup === 'All' || community.ageGroup === filter.ageGroup) &&
      (filter.gender === 'All' || community.gender === filter.gender)
    );
  });

  return (
    <div className="healing-communities">
      <h2 className="title">Healing Communities</h2>
      {/* Hamburger Menu Icon */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={30} />
      </div>

      {/* Navigation Menu */}
      {menuOpen && (
        <div className="navbar-menu">
          <button className="navbar-menu-button" onClick={() => navigate('/healing-journeys')}>
            Healing Journeys
          </button>
          <button className="navbar-menu-button" onClick={() => navigate('/knowledge-hub')}>
            Herbal Knowledge Hub
          </button>
          <button className="navbar-menu-button" onClick={() => navigate('/remedy-sharing')}>
            Remedy Sharing
          </button>
        </div>
      )}

      {/* Age and Gender Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Age Group:</label>
          <select
            value={filter.ageGroup}
            onChange={(e) => setFilter({ ...filter, ageGroup: e.target.value })}
          >
            <option value="All">All Ages</option>
            <option value="18-35">18-35</option>
            <option value="36-50">36-50</option>
            <option value="50+">50+</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Gender:</label>
          <select
            value={filter.gender}
            onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Community Cards */}
      <div className="community-list">
        {filteredCommunities.map((community, index) => (
          <div key={index} className="community-card">
            <div className="community-details">
              <h3 className="community-title">{community.name}</h3>
              <div className="community-icon">{community.icon}</div>
              <p className="community-description">{community.description}</p>
              <div className="members-count">
                <FaUserFriends className="people-icon" /> {community.members}
              </div>
              <button className="join-button">Join Community</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealingCommunities;
