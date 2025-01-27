import React, { useState } from 'react';
import { FaBars, FaHeart, FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HealingJourneys.css';

const HealingJourneys = () => {
  const [story, setStory] = useState('');
  const [stories, setStories] = useState([
    {
      content: "I was suffering from chronic stress, and a friend suggested I try Ashwagandha. Within a few weeks of taking it regularly, I noticed a significant reduction in my anxiety levels. Highly recommend it!",
      comments: ["That's so inspiring!", "I've heard good things about Ashwagandha."],
      likes: 12
    },
    {
      content: "Turmeric tea became my go-to remedy after I developed joint pain. It’s amazing how it reduced the inflammation. Now, I drink it daily!",
      comments: ["Turmeric is a miracle spice!", "Thanks for sharing."],
      likes: 8
    },
    {
      content: "After suffering from insomnia for months, I tried Valerian root tea. It worked wonders, and now I sleep peacefully every night.",
      comments: ["I've been looking for a natural sleep aid. Thank you!", "Glad it helped you!"],
      likes: 15
    },
    {
      content: "I used aloe vera to treat my sunburn, and it healed much faster than expected. Nature’s medicine cabinet is truly the best.",
      comments: ["Aloe vera is my go-to for burns too!", "Wow, I should try this."],
      likes: 20
    }
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (story.trim()) {
      setStories([...stories, { content: story, comments: [], likes: 0 }]);
      setStory('');
    }
  };

  const handleLike = (index) => {
    const updatedStories = [...stories];
    updatedStories[index].likes += 1;
    setStories(updatedStories);
  };

  const handleComment = (index, comment) => {
    if (comment.trim()) {
      const updatedStories = [...stories];
      updatedStories[index].comments.push(comment);
      setStories(updatedStories);
    }
  };

  return (
    <div className="healing-journeys">
      <header className="healing-header">
        <h2>🌿 Healing Journeys 🌿</h2>
        <p>Share your personal healing stories and explore others' experiences with herbal remedies.</p>
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={30} />
        </div>

        {menuOpen && (
          <div className="navbar-menu">
            <button className="navbar-menu-button" onClick={() => navigate('/healing-communities')}>
              Healing Communities
            </button>
            <button className="navbar-menu-button" onClick={() => navigate('/knowledge-hub')}>
              Herbal Knowledge Hub
            </button>
            <button className="navbar-menu-button" onClick={() => navigate('/remedy-sharing')}>
              Remedy Sharing
            </button>
          </div>
        )}
      </header>

      <PostStoryForm story={story} setStory={setStory} handleSubmit={handleSubmit} />

      <StoryList stories={stories} handleLike={handleLike} handleComment={handleComment} />
    </div>
  );
};

// Post story form component
const PostStoryForm = ({ story, setStory, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="post-story-form">
    <label htmlFor="story">🌸 Share your healing journey 🌸</label>
    <textarea
      id="story"
      value={story}
      onChange={(e) => setStory(e.target.value)}
      placeholder="Describe your healing journey and the herbal remedies you used..."
    />
    <button type="submit" className="submit-story-button">Post Story 🌱</button>
  </form>
);

// Story list component
const StoryList = ({ stories, handleLike, handleComment }) => (
  <div className="story-list-header">
    <h3>🌼 Healing Stories from the Community 🌼</h3>
    <div className="story-list">
    {stories.map((storyItem, index) => (
      <StoryItem
        key={index}
        storyItem={storyItem}
        index={index}
        handleLike={handleLike}
        handleComment={handleComment}
      />
    ))}
  </div>
  </div>
);

// Story item component
const StoryItem = ({ storyItem, index, handleLike, handleComment }) => (
  <div className="story-item">
    <p className="story-content">{storyItem.content}</p>
    <div className="story-actions">
      <button onClick={() => handleLike(index)} className="like-button">
        <FaHeart className="icon" /> Like ({storyItem.likes})
      </button>
    </div>
    <CommentsSection comments={storyItem.comments} onComment={(comment) => handleComment(index, comment)} />
  </div>
);

// Comments section component
const CommentsSection = ({ comments, onComment }) => (
  <div className="comments-section">
    <h4><FaCommentDots className="icon" /> Comments</h4>
    {comments.length > 0 ? (
      comments.map((comment, i) => <p key={i} className="comment">{comment}</p>)
    ) : (
      <p>No comments yet. Be the first!</p>
    )}
    <CommentForm onComment={onComment} />
  </div>
);

// Comment form component
const CommentForm = ({ onComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onComment(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
      />
      <button type="submit" className="comment-button">Comment 🌿</button>
    </form>
  );
};

export default HealingJourneys;
