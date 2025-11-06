import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatbotWidget from '../chat/ChatbotWidget'; // <-- Import added

// This component wraps all pages to provide the consistent Header/Footer
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        {children}
      </main>
      <ChatbotWidget /> {/* <-- Widget added here */}
      <Footer />
    </>
  );
};

export default Layout;