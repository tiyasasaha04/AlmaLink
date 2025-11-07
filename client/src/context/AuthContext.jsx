import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // <-- REMOVE THIS
import { login as loginService, getMyProfile } from '../services/authService';
import { API } from '../services/authService'; // Import API

const AuthContext = createContext();

// Set token in axios headers
const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // <-- REMOVE THIS

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await getMyProfile();
      setUser(data);
    } catch (err) {
      console.error('Failed to load user');
      // Call logout() but without navigate
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      setAuthToken(null); // Remove token from headers
    }
    setLoading(false);
  };
  
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load user on initial app load

  const login = async (email, password) => {
    try {
      const { data } = await loginService({ email, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setAuthToken(data.token); // Set token in headers
      await loadUser(); // Fetch user data after login
      // navigate('/dashboard'); // <-- REMOVE THIS
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.response?.data?.msg);
      return { success: false, message: error.response?.data?.msg || 'Invalid credentials' }; // Ensure message is returned
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setAuthToken(null); // Remove token from headers
    // navigate('/login'); // <-- REMOVE THIS
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Update useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;