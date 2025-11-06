import { API } from './authService';

// Start or get a chat with a user
export const startConversation = (recipientId) =>
  API.post(`/conversations/${recipientId}`);

// Get all of the logged-in user's chats
export const getMyConversations = () => API.get('/conversations/me');

// Get all messages for a specific chat
export const getMessages = (conversationId) =>
  API.get(`/messages/${conversationId}`);

// Send a new message (via REST)
export const sendMessage = (conversationId, text) =>
  API.post(`/messages/${conversationId}`, { text });