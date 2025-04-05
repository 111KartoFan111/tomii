import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">
          <span className="logo-lw">LW</span> LiveWave
        </span>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/" className="active">Главная</a></li>
          <li><a href="/afisha">Афиша</a></li>
          <li><a href="/login">Войти</a></li>
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