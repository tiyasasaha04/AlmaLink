import React from 'react';
import './Footer.css'; // We will create this file next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} ALMALINK. All rights reserved.</p>
        <div className="footer-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;