import { API } from './authService';

/**
 * Searches the alumni directory.
 * @param {object} filters - An object of filters, e.g., { industry: 'Tech', isMentor: true }
 */
export const searchAlumni = (filters) => {
  return API.get('/directory', { params: filters });
};

export const getAlumniProfile = (userId) => {
  return API.get(`/directory/${userId}`);
};