import React from 'react';
import './Chat.css';

const ConversationList = ({ conversations, onSelect, activeConvoId, currentUser }) => {
  return (
    <ul className="convo-list">
      {conversations.map((convo) => {
        // The 'recipient' field was added in our controller
        const recipient = convo.recipient; 
        if (!recipient) return null; // Handle potential missing data

        return (
          <li
            key={convo._id}
            className={`convo-item ${convo._id === activeConvoId ? 'active' : ''}`}
            onClick={() => onSelect(convo)}
          >
            <img 
              src={recipient.profilePicture || '/default_avatar.png'} 
              alt={recipient.fullName}
            />
            <div className="convo-details">
              <span className="convo-name">{recipient.fullName}</span>
              <span className="convo-last-msg">
                {convo.lastMessage ? convo.lastMessage.text : '...'}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ConversationList;