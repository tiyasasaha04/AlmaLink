import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, getMyProfile } from '../services/authService';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await getMyProfile();
      setUser(data);
    } catch (err) {
      console.error('Failed to load user');
      logout(); // Token is invalid or expired
    }
    setLoading(false);
  };
  
  useEffect(() => {
    // We call loadUser directly. 
    // The 'token' in state isn't what matters, the one in localStorage is.
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
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.response?.data?.msg);
      return { success: false, message: error.response?.data?.msg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setAuthToken(null); // Remove token from headers
    navigate('/login');
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