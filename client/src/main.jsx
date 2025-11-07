import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext'; // Import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider> {/* <-- Add this wrapper */}
        <App />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);