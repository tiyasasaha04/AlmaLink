import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import useAuth from '../hooks/useAuth; // Corrected useAuth path
import { getAlumniProfile } from '../services/directoryService';
import { getMyProfile } from '../services/profileService';
import { startConversation } from '../services/chatService'; // Import chat service
import Spinner from '../components/common/Spinner';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams(); // Gets 'me' or '60b8...' from URL
  const { user: loggedInUser } = useAuth(); // Gets the currently logged-in user
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        let data;
        if (userId === 'me') {
          // Fetch our own profile
          const res = await getMyProfile();
          data = res.data;
        } else {
          // Fetch another user's profile
          const res = await getAlumniProfile(userId);
          data = res.data;
        }
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId]); // Re-run this effect if the userId in the URL changes

  // Determine if the viewed profile is the logged-in user's
  const isOwnProfile = userId === 'me' || profile?._id === loggedInUser?._id;

  // --- NEW FUNCTION ---
  const handleStartMessage = async () => {
    try {
      // profile._id is the recipient's ID
      const { data } = await startConversation(profile._id);
      // data._id is the new chat ID
      // Redirect to the messaging page, pre-loading this chat
      navigate(`/messaging?conv=${data._id}`);
    } catch (err) {
      console.error('Failed to start conversation', err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!profile) {
    return <div className="profile-container"><h2>Profile not found.</h2></div>;
  }
  
  const {
    fullName,
    headline,
    profilePicture,
    city,
    country,
    graduationYear,
    degree,
    major,
    isMentor,
    mentorshipAreas,
    expertise,
    skills,
    careerJourney
  } = profile;

  return (
    <div className="profile-container">
      {/* --- Profile Header --- */}
      <header className="profile-header">
        <div className="profile-cover"></div> {/* Placeholder for cover photo */}
        <div className="header-content">
          <img 
            src={profilePicture || '/default_avatar.png'} 
            alt={fullName} 
            className="profile-avatar"
          />
          <div className="header-info">
            <h2>{fullName}</h2>
            <p className="header-headline">{headline || 'Alumnus'}</p>
            <p className="header-location">{[city, country].filter(Boolean).join(', ')}</p>
          </div>
          <div className="header-actions">
            {isOwnProfile ? (
              <Link to="/profile/me/edit" className="profile-btn primary">
                Edit Profile
              </Link>
            ) : (
              <button 
                className="profile-btn primary"
                onClick={handleStartMessage} // <-- ADDED THIS
              >
                Message
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- Main Profile Body --- */}
      <div className="profile-body-grid">
        {/* --- Left Column --- */}
        <div className="profile-main">
          
          {isMentor && (
            <div className="profile-card">
              <h3>Mentorship</h3>
              <p><strong>I am open to mentoring!</strong></p>
              <p><strong>Areas of Expertise:</strong></p>
              <div className="tag-list">
                {expertise?.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
              </div>
              <p><strong>How I can help:</strong></p>
              <div className="tag-list">
                {mentorshipAreas?.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
              </div>
            </div>
          )}
          
          <div className="profile-card">
            <h3>Career Journey</h3>
            <ul className="experience-list">
              {careerJourney?.length > 0 ? (
                careerJourney.map((exp, i) => (
                  <li key={i} className="experience-item">
                    <h4>{exp.role}</h4>
                    <p>{exp.company}</p>
                    {/* Add dates later if needed */}
                  </li>
                ))
              ) : (
                <p>{isOwnProfile ? 'You have not added any experience yet.' : 'No experience listed.'}</p>
              )}
            </ul>
          </div>
        </div>

        {/* --- Right Column --- */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <h3>At a Glance</h3>
            <ul className="glance-list">
              <li><strong>Degree:</strong> {degree || 'N/A'}</li>
              <li><strong>Major:</strong> {major || 'N/A'}</li>
              <li><strong>Graduated:</strong> {graduationYear || 'N/A'}</li>
            </ul>
          </div>

          <div className="profile-card">
            <h3>Skills</h3>
            <div className="tag-list">
              {skills?.length > 0 ? (
                skills.map((skill, i) => <span key={i} className="tag">{skill}</span>)
              ) : (
                 <p>{isOwnProfile ? 'Add your skills to your profile!' : 'No skills listed.'}</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;