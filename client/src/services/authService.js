import axios from 'axios';

// Set up a default base URL for our server
export const API = axios.create({ // <-- Added 'export'
  baseURL: 'http://localhost:5000/api', // Your server's URL
});

// We can also intercept requests to add the token
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// --- API Functions ---
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);

// --- NEW FUNCTION ---
export const getMyProfile = () => API.get('/auth/me');

// We'll add more here later...
// export const getUserProfile = (userId) => API.get(`/users/${userId}`);