import React, { useState } from 'react';
import './Remedies.css'; 
import { BsSearch } from "react-icons/bs";


const videos = [

  { id: 'kP7UFUgrnnk', title: 'Herbal Remedy 1', tags: ['herbal', 'remedy'], language: 'English' },
  { id: 'lxZbdh7LEy4', title: 'Herbal Remedy 2', tags: ['remedy'], language: 'English' },
  { id: 'p72difif-Yg', title: 'Natural Healing', tags: ['natural', 'healing'], language: 'English' },
  { id: 'eI4JKV0qZjQ', title: 'DIY Remedy 1', tags: ['DIY'], language: 'English' },
  { id: 'xaBC6elOrOw', title: 'DIY Remedy 2', tags: ['DIY', 'herbal'], language: 'English' },
  { id: 'nVdDm0a6TPY', title: 'Home Remedies', tags: ['home', 'remedies'], language: 'English' },
  { id: '8O3znvuZcRk', title: 'No Human 1', tags: ['tips'], language: 'English' },
  { id: 'VvG4jr0HskE', title: 'No Human 2', tags: ['tips'], language: 'English' },
  { id: 'kROctUzxaZs', title: 'No Human 3', tags: ['tips'], language: 'English' },
  { id: '2JOV5psevYk', title: 'No Human 4', tags: ['tips'], language: 'English' },
  { id: '544Pt3n1S1E', title: 'Homemade Remedy A', tags: ['homemade'], language: 'Hindi' },
  { id: 'SPyqvcDISPA', title: 'Homemade Remedy B', tags: ['homemade'], language: 'Hindi' },
  { id: 'CTHRBbjAiFc', title: 'Homemade Remedy C', tags: ['homemade'], language: 'Hindi' },
  { id: 'RMacmAK0iWU', title: 'Ayurvedic Cure A', tags: ['ayurvedic'], language: 'Tamil' },
  { id: 'UPWnFYXqFBA', title: 'Ayurvedic Cure B', tags: ['ayurvedic'], language: 'Tamil' },
  { id: 'wSrkRxqSHmY', title: 'Ayurvedic Cure C', tags: ['ayurvedic'], language: 'Tamil' },
  { id: '_xDT5_aftDo', title: 'Traditional Remedy A', tags: ['traditional'], language: 'Telugu' },
  { id: 'zbuGsQxb3VU', title: 'Traditional Remedy B', tags: ['traditional'], language: 'Telugu' },
  { id: 'NvUzt4uk7lA', title: 'Traditional Remedy C', tags: ['traditional'], language: 'Telugu' },
  { id: 'iO7RXk34e4M', title: 'Herbal Solution A', tags: ['herbal'], language: 'Kannada' },
  { id: 'PINBTcILWgU', title: 'Herbal Solution B', tags: ['herbal'], language: 'Kannada' },
  { id: 'vBEs7jnlJ6U', title: 'Herbal Solution C', tags: ['herbal'], language: 'Kannada' },
  { id: 'cF5Skfm9_a4', title: 'Home Care A', tags: ['home'], language: 'Malayalam' },
  { id: '-n9TUEjrIHQ', title: 'Home Care B', tags: ['home'], language: 'Malayalam' },
  { id: 'aNRVCF_pbhU', title: 'Home Care C', tags: ['home'], language: 'Malayalam' },
  { id: 'Se7SGuJhqyE', title: 'Ayurvedic Remedies A', tags: ['ayurvedic'], language: 'English' },
  { id: 'caq0SjhpatQ', title: 'Ayurvedic Remedies B', tags: ['ayurvedic'], language: 'English' },
  { id: 'NdLOg_XUw-E', title: 'Ayurvedic Remedies C', tags: ['ayurvedic'], language: 'English' },
  { id: 'CcuIDmwDRzs', title: 'Natural Remedies A', tags: ['natural'], language: 'English' },
  { id: '5L8xdr2sLk8', title: 'Natural Remedies B', tags: ['natural'], language: 'English' },
  { id: 'hfOHg640RAU', title: 'Natural Remedies C', tags: ['natural'], language: 'English' },
  { id: 'xG-_Bpk9p_c', title: 'Herbal Therapy A', tags: ['herbal'], language: 'English' },
  { id: 'K4kQRfK1i3w', title: 'Herbal Therapy B', tags: ['herbal'], language: 'English' },
  { id: 'sIaN0TIPBvA', title: 'Herbal Therapy C', tags: ['herbal'], language: 'English' },
  { id: 'kVuOeQyaUOM', title: 'Holistic Healing A', tags: ['holistic'], language: 'English' },
  { id: 'KPekBxHcnZc', title: 'Holistic Healing B', tags: ['holistic'], language: 'English' },
  { id: 'FnUBkF3kd9I', title: 'Holistic Healing C', tags: ['holistic'], language: 'English' },
  { id: 'dqpBMzTz8GA', title: 'Traditional Cure A', tags: ['traditional'], language: 'English' },
  { id: 'dFJJMO_jRkU', title: 'Traditional Cure B', tags: ['traditional'], language: 'English' },
  { id: 'SpDNB1m_85g', title: 'Traditional Cure C', tags: ['traditional'], language: 'English' },
  { id: 'GQO1iHzJmLY', title: 'Remedy Tips A', tags: ['tips'], language: 'English' },
];

const YouTubeVideoGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm);
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => video.tags.includes(tag));
    const matchesLanguage = selectedLanguage === 'All' || video.language === selectedLanguage;
    return matchesSearch && matchesTags && matchesLanguage;
  });

  const uniqueTags = [...new Set(videos.flatMap((video) => video.tags))];
  const uniqueLanguages = ['All Languages', ...new Set(videos.map((video) => video.language))];

  return (
    <div className="youtube-video-gallery modern-container">
      {/* Search and Filter Section */}
      <div className="inof">
      <h1>Unlock the Secrets of Herbal Healing!</h1>
      <h2>Dive into our video library and enhance your wellness journey.</h2>
      </div>
      
      <div className="search-filter modern-search-filter">
  <div className="search-icon">
    <BsSearch />
  </div>
  <input 
    type="text"
    placeholder="Search remedies..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="modern-search-input"
  />
  <select onChange={handleLanguageChange} value={selectedLanguage} className="modern-select">
    {uniqueLanguages.map((language) => (
      <option key={language} value={language}>
        {language}
      </option>
    ))}
  </select>
  <div className="tags modern-tags">
    {uniqueTags.map((tag) => (
      <button
        key={tag}
        className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
        onClick={() => handleTagChange(tag)}
      >
        {tag}
      </button>
    ))}
  </div>
  {selectedTags.length > 0 && (
    <div className="selected-filters">
      {selectedTags.map((tag) => (
        <span key={tag} className="selected-tag">
          {tag} <button onClick={() => handleTagChange(tag)}>✕</button>
        </span>
      ))}
    </div>
  )}
</div>


      {/* Video Gallery Section */}
      <div className="video-gallery modern-video-gallery">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="video-item modern-video-card">
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="modern-iframe"
              ></iframe>
              <h3 className="modern-video-title">Click to Know More</h3>
            </div>
          ))
        ) : (
          <p className="no-results">No videos found matching your filters</p>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoGallery;
