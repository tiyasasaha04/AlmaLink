import { API } from './authService';

export const getAllJobs = () => API.get('/jobs');
export const createJob = (jobData) => API.post('/jobs', jobData);