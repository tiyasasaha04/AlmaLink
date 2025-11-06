import React, { useState } from 'react';
import { postChatQuery } from '../../services/chatbotService';
import './Chatbot.css'; // Add styles below

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the ALMALINK assistant. Ask me to find mentors or alumni.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to RAG backend
      const { data } = await postChatQuery(input);
      const botMessage = { sender: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: 'bot', text: 'Sorry, I had trouble connecting. Try again.' };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
        <header className="bot-header" onClick={toggleChat}>
          <h4>ALMALINK Assistant</h4>
          <span>{isOpen ? '—' : 'Chat'}</span>
        </header>
        {isOpen && (
          <>
            <main className="bot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`bot-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="bot-message bot loading">
                  <span></span><span></span><span></span>
                </div>
              )}
            </main>
            <form className="bot-input" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Find mentors in tech..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </div>
      <button className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        {/* Chat Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </button>
    </>
  );
};

export default ChatbotWidget;