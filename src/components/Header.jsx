import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">
          <img src="/images/logo.svg" alt="LiveWave" className="logo-lw" />
          <span className="logo-name">LiveWave</span>
        </span>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/" className="active">Главная</a></li>
          <li><a href="/afisha">Афиша</a></li>
        </ul>
      </nav>
      <div className="search">
        <input type="text" placeholder="Поиск по артистам и концертам" />
        <button aria-label="Search"><i className="search-icon"></i></button>
      </div>
    </header>
  );
}

export default Header;