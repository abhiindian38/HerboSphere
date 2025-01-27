import React, { useState } from "react";
import "./HerbalKnowledgeHub.css";
import {FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import badge0 from '../../assets/badges/badge0.jpg'
import badge2 from '../../assets/badges/badge2.jpg'
import badge3 from '../../assets/badges/badge3.jpg'
import badge4 from '../../assets/badges/badge4.jpg'
import badge5 from '../../assets/badges/badge5.jpg'
import badge6 from '../../assets/badges/badge6.jpg'


const HerbalKnowledgeHub = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [threads, setThreads] = useState([

      {
        id: 1,
        title: "Aloe Vera",
        description: "Discover the benefits of Aloe Vera, including its healing properties and various uses.",
        imageUrl: "https://s1.r29static.com/bin/entry/1a8/x,80/2165956/image.jpg",
        owner: {
          name: "John Doe",
          badges: ["Wellness Warrior", "Ayurveda Expert"],
          badgeIcons: [badge0, badge2
          ],
          profilePicture: "https://media.istockphoto.com/id/1218868302/vector/young-male-character-portrait-profile-view-millennial-lifestyle-flat-vector-graphics.jpg?s=612x612&w=0&k=20&c=T3KmZH2v3OogP0F2wFJR4HB39eBw4DGHeGzk0WPvxPE="
        },
        comments: [
          { user: "Jane Smith", text: "Great for skin hydration!" },
          { user: "Alice Johnson", text: "I use it in my smoothies." }
        ]
      },
      {
        id: 2,
        title: "Neem",
        description: "Explore Neem's extensive benefits for skin health and immune system support.",
        imageUrl: "https://m.media-amazon.com/images/I/71W98AkafXL._AC_UF1000,1000_QL80_.jpg",
        owner: {
          name: "Emily Davis",
          badges: ["Community Builder", "Knowledge Sharer", "Ayurveda Expert"],
          badgeIcons: [
            badge3, badge6, badge2
          ],
          profilePicture: "https://static.vecteezy.com/system/resources/previews/025/869/593/non_2x/profile-image-of-woman-avatar-for-social-networks-with-half-circle-fashion-bright-illustration-in-trendy-style-free-vector.jpg"
        },
        comments: [
          { user: "Michael Brown", text: "Fantastic for acne treatment." },
          { user: "Sarah Lee", text: "Neem tea is amazing!" }
        ]
      },
      {
        id: 3,
        title: "Lavender",
        description: "Learn about Lavender's calming effects and its uses in aromatherapy.",
        imageUrl: "https://i.pinimg.com/736x/1b/bd/eb/1bbdebea433a826e9c734523a6831da9.jpg",
        owner: {
          name: "Sophia Johnson",
          badges: ["Milestone Achiever", "Wellness Warrior", "Plant Enthusiast"],
          badgeIcons: [
            badge0, badge4, badge5
          ],
          profilePicture: "https://i.pinimg.com/736x/6c/12/a8/6c12a8359754acb9f176c9155637c912.jpg"
        },
        comments: [
          { user: "Emma Watson", text: "Lavender oil helps me sleep better." },
          { user: "James Smith", text: "I use Lavender in my homemade candles." },
          { user: "Olivia Green", text: "Lavender is great for relaxation." },
          { user: "Liam Brown", text: "I love the fragrance of Lavender in my home." }
        ]
      },
      {
        id: 4,
        title: "Ginger",
        description: "Discover the many benefits of Ginger, from digestive support to anti-inflammatory properties.",
        imageUrl: "https://www.shutterstock.com/image-photo/overhead-shot-fresh-ginger-on-260nw-2434581687.jpg",
        owner: {
          name: "Liam Brown",
          badges: ["VaidyaVan Veteran", "Ginger Guru", "Natural Remedies Expert"],
          badgeIcons: [
            "src/assets/badge1.jpg", 
            "src/assets/badge1.jpg", 
            "src/assets/badge1.jpg", 
            "src/assets/badge1.jpg"  
          ],
          profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_HJqS3msr6V8MlaJs60cIIpj1uKr2lMWH-w&s"
        },
        comments: [
          { user: "Olivia Green", text: "Ginger tea is great for digestion." },
          { user: "Noah Davis", text: "I use Ginger in my cooking for extra flavor." }
        ]
      }
    ])
    

  const [newThread, setNewThread] = useState({ title: "", description: "", imageUrl: "" });
  const [selectedThread, setSelectedThread] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showBadgePopup, setShowBadgePopup] = useState({ visible: false, badgeSrc: "" });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleAddThread = () => {
    if (newThread.title && newThread.description) {
      setThreads([
        ...threads,
        { ...newThread, id: threads.length + 1, comments: [], owner: { name: "New User", badges: [], profilePicture: "" } }
      ]);
      setNewThread({ title: "", description: "", imageUrl: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = (threadId) => {
    if (newComment.trim()) {
      setThreads(threads.map(thread =>
        thread.id === threadId
          ? { ...thread, comments: [...thread.comments, { user: "Current User", text: newComment.trim() }] }
          : thread
      ));
      setNewComment("");
    }
  };

  const handleThreadClick = (threadId) => {
    setSelectedThread(threadId === selectedThread ? null : threadId);
  };
  const handleBadgeClick = (badgeSrc) => {
    setShowBadgePopup({ visible: true, badgeSrc });
  };

  const handlePopupClose = () => {
    setShowBadgePopup({ visible: false, badgeSrc: "" });
  };

  return (
    <section className="herbal-knowledge-hub">
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
          <button className="navbar-menu-button" onClick={() => navigate('/remedy-sharing')}>
            Remedy Sharing
          </button>
          <button className="navbar-menu-button" onClick={() => navigate('/healing-communities')}>
            Healing Communities
          </button>
        </div>
      )}
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? "Go back to viewing threads" : "Want to contribute?"}
      </button>
      <header className="hub-header">
        <h2>Herbal Knowledge Hub</h2>
        <p>Explore threads on medicinal plants, share your knowledge, and connect with the community.</p>
      </header>
      {isVisible && (
        <div className="new-thread-container">
          <h3 className="new-thread-heading">Add a New Thread</h3>
          <div className="new-thread-form">
            <input
              type="text"
              name="title"
              placeholder="Thread Title"
              value={newThread.title}
              onChange={handleInputChange}
              className="input-field"
            />
            <textarea
              name="description"
              placeholder="Thread Description"
              value={newThread.description}
              onChange={handleInputChange}
              className="textarea-field"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={newThread.imageUrl}
              onChange={handleInputChange}
              className="input-field"
            />
            <button onClick={handleAddThread} className="submit-button">Add Thread</button>
          </div>
        </div>
      )}
      <div className="thread-list">
        {threads.map(thread => (
          <div key={thread.id} className="thread-card">
            <div className="thread-image-wrapper">
              <img src={thread.imageUrl} alt={thread.title} className="thread-image" />
            </div>
            <div className="thread-content">
              <div className="thread-owner">
                <img src={thread.owner.profilePicture} alt={thread.owner.name} className="owner-picture" />
                <div className="owner-info">
                  <p className="owner-name text-start">{thread.owner.name}</p>
                  <div className="owner-badges">
                    {thread.owner.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="badge"
                        onClick={() => handleBadgeClick(thread.owner.badgeIcons[idx])}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="thread-title" onClick={() => handleThreadClick(thread.id)}>
                {thread.title}
              </h3>
              <p className="thread-description">{thread.description}</p>
              {selectedThread === thread.id && (
                <div className="thread-comments">
                  {thread.comments.length > 0 ? (
                    thread.comments.map((comment, idx) => (
                      <div key={idx} className="comment">
                        <span className="comment-user">{comment.user}:</span> {comment.text}
                      </div>
                    ))
                  ) : (
                    <p className="no-comments">No comments yet.</p>
                  )}
                  <textarea
                    className="comment-input"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                  />
                  <button className="comment-button" onClick={() => handleAddComment(thread.id)}>
                    Post Comment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showBadgePopup.visible && (
        <div className="badge-popup" onClick={handlePopupClose}>
          <img src={showBadgePopup.badgeSrc} alt="Badge" className="badge-popup-image" />
        </div>
      )}
    </section>
  );
};

export default HerbalKnowledgeHub;