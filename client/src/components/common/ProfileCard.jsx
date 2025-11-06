import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css'; // Add styles below

const ProfileCard = ({ user }) => {
  const {
    _id,
    fullName,
    profilePicture,
    headline,
    graduationYear,
    isMentor,
    skills,
    city,
    country
  } = user;

  const location = [city, country].filter(Boolean).join(', ');

  return (
    <div className="profile-card fade-in-section">
      {isMentor && <span className="mentor-badge">MENTOR</span>}
      <div className="card-header">
        <img 
          src={profilePicture || '/default_avatar.png'} // Use default if no pic
          alt={`${fullName}'s profile`} 
          className="card-avatar"
        />
        <div className="card-identity">
          <h3 className="card-name">{fullName}</h3>
          <p className="card-year">Class of {graduationYear || 'N/A'}</p>
        </div>
      </div>
      <div className="card-body">
        <p className="card-headline">{headline || 'Alumnus'}</p>
        {location && <p className="card-location">{location}</p>}
        
        <div className="card-skills">
          {skills?.slice(0, 4).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
          {skills?.length > 4 && (
            <span className="skill-tag">+{skills.length - 4} more</span>
          )}
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/profile/${_id}`} className="card-profile-link">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;