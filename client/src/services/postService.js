import { API } from './authService';

export const getAllPosts = () => API.get('/posts');
export const createPost = (text) => API.post('/posts', { text });
export const likePost = (postId) => API.put(`/posts/like/${postId}`);