import { API } from './authService'; // Re-use the axios instance from authService

// In authService.js, make sure to export 'API'
// export const API = axios.create(...)

export const getPendingUsers = () => API.get('/users/pending');
export const approveUser = (id) => API.put(`/users/approve/${id}`);
export const rejectUser = (id) => API.put(`/users/reject/${id}`);