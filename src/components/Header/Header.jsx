import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();
  const { showLogin, showSignup, user, logout } = useContext(AuthContext);

  const toggleLanguageMenu = () => setShowLanguageMenu(!showLanguageMenu);
  const changeLanguage = (lang) => {
    setShowLanguageMenu(false);
    // Implement language change logic
    console.log('Language changed to:', lang);
  };

  const handlePostPropertyClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/post-property');
    } else {
      showLogin('/post-property'); // Pass redirect path to login
    }
  };

  return (
    <header>
      <div className="header-container">
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <img 
            src="/images/house-logo.jpeg" 
            alt="Beitik Logo" 
            className="logo-img" 
          /> 
          Beitik
        </a>
        
        <div className="nav-container">
          <ul className="nav-links">
            <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a></li>
            <li><a href="/buy" onClick={(e) => { e.preventDefault(); navigate('/buy'); }}>Buy</a></li>
            <li><a href="/rent" onClick={(e) => { e.preventDefault(); navigate('/rent'); }}>Rent</a></li>
            <li><a href="/short-stay" onClick={(e) => { e.preventDefault(); navigate('/short-stay'); }}>Short Stay</a></li>
            <li><a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a></li>
          </ul>

          <div className="auth-buttons">
            {/* Language Switcher */}
            <div className="language-switcher">
              <button className="btn btn-icon" onClick={toggleLanguageMenu}>🌐</button>
              {showLanguageMenu && (
                <div className="language-menu">
                  <div onClick={() => changeLanguage('en')}>English</div>
                  <div onClick={() => changeLanguage('ar')}>العربية</div>
                  <div onClick={() => changeLanguage('fr')}>Français</div>
                </div>
              )}
            </div>

            {user ? (
              // Show user profile and logout when logged in
              <div className="user-profile">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="user-avatar"
                  onClick={() => navigate('/profile')}
                />
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handlePostPropertyClick}
                >
                  Post Property
                </button>
              </div>
            ) : (
              // Show login/signup buttons when not logged in
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={() => showLogin()}
                >
                  Login
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handlePostPropertyClick}
                >
                  Post Property
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;