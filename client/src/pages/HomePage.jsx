import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // We will create this file next

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to ALMALINK</h1>
        <p>Your exclusive network for connecting with fellow alumni and mentors.</p>
        <div className="home-actions">
          <Link to="/login" className="home-btn primary">Login</Link>
          <Link to="/register" className="home-btn secondary">Register</Link>
        </div>
      </header>
      
      <section className="home-features">
        <div className="feature-card">
          <h3>Find Mentors</h3>
          <p>Connect with experienced alumni in your field who are open to mentoring.</p>
        </div>
        <div className="feature-card">
          <h3>Discover Opportunities</h3>
          <p>Find and post exclusive job opportunities within the alumni network.</p>
        </div>
        <div className="feature-card">
          <h3>Stay Connected</h3>
          <p>Reconnect with classmates and build your professional network.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;