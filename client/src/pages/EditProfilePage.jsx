import React, { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile } from '../services/profileService';
import useAuth from '../hooks/useAuth'; // <-- FIX: Removed {} braces
import Spinner from '../components/common/Spinner';
import './EditProfile.css'; // Add styles below

// Helper to convert array to comma-separated string for <textarea>
const arrayToString = (arr = []) => arr.join(', ');

const EditProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    currentRole: '',
    currentCompany: '',
    industry: '',
    city: '',
    country: '',
    graduationYear: '',
    degree: '',
    major: '',
    clubs: '',
    hostel: '',
    skills: '',
    isMentor: false,
    mentorshipAreas: '',
    expertise: '',
    linkedinProfile: '',
    githubProfile: '',
    twitterProfile: '',
  });
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // When page loads, fetch the profile
    const loadProfile = async () => {
      if (authLoading) return; // Wait for auth to finish
      
      try {
        const { data } = await getMyProfile();
        // Pre-populate form with existing data
        setFormData({
          fullName: data.fullName || '',
          headline: data.headline || '',
          currentRole: data.currentRole || '',
          currentCompany: data.currentCompany || '',
          industry: data.industry || '',
          city: data.city || '',
          country: data.country || '',
          graduationYear: data.graduationYear || '',
          degree: data.degree || '',
          major: data.major || '',
          clubs: arrayToString(data.clubs),
          hostel: data.hostel || '',
          skills: arrayToString(data.skills),
          isMentor: data.isMentor || false,
          mentorshipAreas: arrayToString(data.mentorshipAreas),
          expertise: arrayToString(data.expertise),
          linkedinProfile: data.linkedinProfile || '',
          githubProfile: data.githubProfile || '',
          twitterProfile: data.twitterProfile || '',
        });
      } catch (err) {
        console.error('Failed to load profile', err);
        setMessage('Error: Could not load profile data.');
      }
      setPageLoading(false);
    };

    loadProfile();
  }, [authLoading]); // Re-run if auth status changes

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateMyProfile(formData);
      setMessage('Profile updated successfully!');
      // Optionally, you can update the user in AuthContext here
    } catch (err) {
      console.error('Failed to update profile', err);
      setMessage('Error: Failed to update profile.');
    }
  };

  if (pageLoading || authLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={onSubmit}>
        <h2>Edit Your Profile</h2>
        {message && <div className={message.includes('Error') ? 'form-message error' : 'form-message success'}>{message}</div>}
        
        <div className="form-section">
          <h3>Personal & Professional</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Headline (e.g., "Software Engineer at Google")</label>
              <input type="text" name="headline" value={formData.headline} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Current Role</label>
              <input type="text" name="currentRole" value={formData.currentRole} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Current Company</label>
              <input type="text" name="currentCompany" value={formData.currentCompany} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <input type="text" name="industry" value={formData.industry} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" name="country" value={formData.country} onChange={onChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Academic Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Graduation Year</label>
              <input type="number" name="graduationYear" value={formData.graduationYear} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Degree (e.g., B.Tech, MBA)</label>
              <input type="text" name="degree" value={formData.degree} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Major (e.g., Computer Science)</label>
              <input type="text" name="major" value={formData.major} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Hostel/Dorm</label>
              <input type="text" name="hostel" value={formData.hostel} onChange={onChange} />
            </div>
            <div className="form-group full-width">
              <label>Clubs & Societies (comma-separated)</label>
              <input type="text" name="clubs" value={formData.clubs} onChange={onChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Skills & Mentorship</h3>
          <div className="form-group">
            <label>Skills (comma-separated, e.g., React, Node.js, Public Speaking)</label>
            <textarea name="skills" value={formData.skills} onChange={onChange}></textarea>
          </div>
          <div className="form-group-checkbox">
            <input type="checkbox" name="isMentor" id="isMentor" checked={formData.isMentor} onChange={onChange} />
            <label htmlFor="isMentor">I am open to mentoring</label>
          </div>
          {formData.isMentor && (
            <>
              <div className="form-group">
                <label>Mentorship Areas (comma-separated, e.g., Career Advice, Resume Reviews)</label>
                <textarea name="mentorshipAreas" value={formData.mentorshipAreas} onChange={onChange}></textarea>
              </div>
              <div className="form-group">
                <label>Specific Expertise (comma-separated, e.g., AI/ML, Product Management)</label>
                <textarea name="expertise" value={formData.expertise} onChange={onChange}></textarea>
              </div>
            </>
          )}
        </div>

        <div className="form-section">
          <h3>Social Links</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>LinkedIn Profile URL</label>
              <input type="text" name="linkedinProfile" value={formData.linkedinProfile} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>GitHub Profile URL</label>
              <input type="text" name="githubProfile" value={formData.githubProfile} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Twitter Profile URL</label>
              <input type="text" name="twitterProfile" value={formData.twitterProfile} onChange={onChange} />
            </div>
          </div>
        </div>
        
        <button type="submit" className="profile-save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;