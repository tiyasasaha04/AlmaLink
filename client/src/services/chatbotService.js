import { API } from './authService';

// Send a query to the RAG chatbot
export const postChatQuery = (query) => {
  return API.post('/chatbot/query', { query });
};