import { API } from './authService'; // Re-use the axios instance

export const getMyProfile = () => API.get('/profile/me');
export const updateMyProfile = (formData) => API.put('/profile/me', formData);