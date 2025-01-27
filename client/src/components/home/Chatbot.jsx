import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import { FaMinus, FaTimes } from 'react-icons/fa'; 
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true); 

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botReply = getBotReply(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
    }, 1000);
  };

  const getBotReply = (input) => {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! I'm Oshidhi.🌱 How can I help you?";
    } else if (input.includes("help")) {
        return "Sure, I'm here to help! What do you need assistance with?";
    } else if (input.includes("herbs") || input.includes("plants")) {
        return "I can provide information on various herbs and plants. Which one would you like to learn about?";
    } else if (input.includes("what") || input.includes("symptoms")) {
        return "If you describe the symptoms you're seeing, I can suggest possible remedies and plants that might help.";
    } else if (input.includes("thank you")) {
        return "You're welcome!";
    } else {
        return "Sorry, I didn't understand that. Can you please rephrase?";
    }
};


  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen ? (
        <div className="chatbot-container">
          <div className="chatbot-header">
            Oshidhi
            <FaMinus className="minimize-icon" onClick={toggleChatbot} />
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          <FaComments size={30} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
