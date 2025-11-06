import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './AuthForm.css'; // We'll add styles below

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    enrollmentNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { fullName, email, enrollmentNumber, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { data } = await register({ fullName, email, enrollmentNumber, password });
      setError('');
      setMessage(data.msg); // "Registration successful! ..."
      setTimeout(() => navigate('/login'), 3000); // Redirect to login
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>Create Your ALMALINK Account</h2>
        
        {message && <div className="auth-message success">{message}</div>}
        {error && <div className="auth-message error">{error}</div>}

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" value={fullName} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentNumber">Enrollment Number</label>
          <input type="text" name="enrollmentNumber" value={enrollmentNumber} onChange={onChange} required />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={onChange} required minLength="6" />
          <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
        </div>
        
        <button type="submit" className="auth-button">Register</button>
        
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;