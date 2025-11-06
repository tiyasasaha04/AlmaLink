import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Corrected import path
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const YOUR_ABOUT_US_URL = 'https://your-college-website.edu/about';

  return (
    <header className="main-header glass-effect">
      <Link to="/" className="header-logo">
        ALMALINK
      </Link>
      <div className="header-nav">
        <nav>
          <ul>
            {user && ( // Only show these if logged in
              <>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/mentors">Find Mentors</Link></li>
                <li><Link to="/jobs">Job Board</Link></li>
                
                {/* --- CONDITIONAL ADMIN LINK --- */}
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
      
      {/* --- CORRECTED AUTH SECTION --- */}
      <div className="header-auth">
        {user ? (
          <>
            <Link to="/profile/me">My Profile</Link>
            <span style={{margin: '0 8px'}}>|</span>
            <Link to="/profile/me/edit">Edit Profile</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;