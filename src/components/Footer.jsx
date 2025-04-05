import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/logo.svg" alt="LiveWave" className="logo-lw" />
          <span className="logo-name">LiveWave</span>
        </div>
        <div className="footer-info">
          <p>тел: 8123456789</p>
          <p>LiveWave All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;