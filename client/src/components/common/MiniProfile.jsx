import React from 'react';
import { Link } from 'react-router-dom';
import './MiniProfile.css';

const MiniProfile = ({ user }) => {
  return (
    <div className="mini-profile-card">
      <div className="mini-profile-header">
        <img 
          src={user.profilePicture || '/default_avatar.png'} 
          alt={user.fullName}
        />
      </div>
      <div className="mini-profile-body">
        <h4>{user.fullName}</h4>
        <p>{user.headline || 'ALMALINK Member'}</p>
        <Link to="/profile/me" className="view-profile-link">
          View My Profile
        </Link>
      </div>
    </div>
  );
};

// Add to new file: client/src/components/common/MiniProfile.css
/*
.mini-profile-card {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
  overflow: hidden;
}
.mini-profile-header {
  height: 80px;
  background: var(--color-primary);
  position: relative;
}
.mini-profile-header img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid #fff;
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-50%);
}
.mini-profile-body {
  padding: 60px 1rem 1.5rem;
}
.mini-profile-body h4 {
  margin: 0;
  font-size: 1.2rem;
}
.mini-profile-body p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}
.view-profile-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}
*/

export default MiniProfile;