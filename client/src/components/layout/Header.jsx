import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import useAuth from '../../hooks/useAuth'; 
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); // <-- Add this
  const YOUR_ABOUT_US_URL = 'https://your-college-website.edu/about';

  // Create a new function to handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header glass-effect">
      <Link to="/" className="header-logo">
        ALMALINK
      </Link>
      <div className="header-nav">
        <nav>
          <ul>
            {user && ( 
              <>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/mentors">Find Mentors</Link></li>
                <li><Link to="/jobs">Job Board</Link></li>
                
                {user.isAdmin && (
                  <li><Link to="/admin/dashboard" style={{color: 'red'}}>Admin</Link></li>
                )}
              </>
            )}
            
            <li>
              <a href={YOUR_ABOUT_US_URL} target="_blank" rel="noopener noreferrer">
                About Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="header-auth">
        {user ? (
          <>
            <Link to="/profile/me">My Profile</Link>
            <span style={{margin: '0 8px'}}>|</span>
            <Link to="/profile/me/edit">Edit Profile</Link>
            {/* Call the new handleLogout function */}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;