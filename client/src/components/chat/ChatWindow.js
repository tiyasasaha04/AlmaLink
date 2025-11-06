import React, { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage } from '../../services/chatService';
import { useSocket } from '../../context/SocketContext';
import './Chat.css';

const ChatWindow = ({ conversation, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const chatEndRef = useRef(null); // To auto-scroll

  // 1. Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversation) return;
      setLoading(true);
      try {
        const { data } = await getMessages(conversation._id);
        setMessages(data);
      } catch (err) {
        console.error('Failed to get messages', err);
      }
      setLoading(false);
    };
    fetchMessages();
  }, [conversation]); // Re-fetch if conversation changes

  // 2. Setup Socket.IO listeners
  useEffect(() => {
    if (!socket || !conversation) return;

    // Join the "room" for this conversation
    socket.emit('joinRoom', conversation._id);

    // Listen for new messages
    const handleNewMessage = (message) => {
      // Add the incoming message to our state
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    
    socket.on('newMessage', handleNewMessage);

    // Clean up listeners
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, conversation]);
  
  // 3. Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // 4. Handle sending a message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // 1. Send message to DB via REST API
      const { data: savedMessage } = await sendMessage(
        conversation._id,
        newMessage
      );
      
      // 2. Emit message via Socket.IO
      socket.emit('sendMessage', {
        conversationId: conversation._id,
        sender: savedMessage.sender,
        text: savedMessage.text
      });

      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  if (loading) return <div>Loading messages...</div>;
  
  const recipient = conversation.recipient; // Get recipient info

  return (
    <div className="chat-window">
      <header className="chat-header">
        <img src={recipient.profilePicture || '/default_avatar.png'} alt={recipient.fullName} />
        <h4>{recipient.fullName}</h4>
      </header>
      
      <main className="message-list">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message-bubble ${msg.sender._id === currentUser._id ? 'mine' : 'theirs'}`}
          >
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Auto-scroll target */}
      </main>

      <form className="message-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;