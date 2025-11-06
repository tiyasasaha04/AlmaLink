import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './AuthForm.css'; // Re-using the same style

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    // Success handling (redirect) is done inside AuthContext
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>Login to ALMALINK</h2>
        
        {error && <div className="auth-message error">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={onChange} required />
          <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        
        <button type="submit" className="auth-button">Login</button>
        
        <p className="auth-switch">
          No account yet? <Link to="/register">Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;