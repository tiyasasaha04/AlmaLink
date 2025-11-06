import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMyConversations } from '../services/chatService';
import { useAuth } from '../hooks/useAuth';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';
import Spinner from '../components/common/Spinner';
import './MessagingPage.css'; // Add styles below

const MessagingPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Get ?conv=... from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const initialConvoId = searchParams.get('conv');

  useEffect(() => {
    // Fetch all user conversations
    const fetchConversations = async () => {
      try {
        const { data } = await getMyConversations();
        setConversations(data);
        
        // Check if URL specifies a conversation to open
        if (initialConvoId) {
          const foundConvo = data.find(c => c._id === initialConvoId);
          if (foundConvo) {
            setActiveConvo(foundConvo);
          }
        }
        
      } catch (err) {
        console.error('Failed to get conversations', err);
      }
      setLoading(false);
    };

    fetchConversations();
  }, [initialConvoId]);

  const handleSelectConvo = (convo) => {
    setActiveConvo(convo);
    // Update URL without refreshing page
    setSearchParams({ conv: convo._id });
  };

  if (loading) return <Spinner />;

  return (
    <div className="messaging-container">
      <aside className="conversation-sidebar">
        <h3>Your Conversations</h3>
        <ConversationList
          conversations={conversations}
          onSelect={handleSelectConvo}
          activeConvoId={activeConvo?._id}
          currentUser={user}
        />
      </aside>
      <main className="chat-main">
        {activeConvo ? (
          <ChatWindow conversation={activeConvo} currentUser={user} />
        ) : (
          <div className="no-chat-selected">
            <h3>Select a conversation to start chatting</h3>
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagingPage;