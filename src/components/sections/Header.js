import React, { useContext, useState } from 'react';  
import { Link, useLocation } from 'react-router-dom';  
import { AuthContext } from '../../context/AuthContext'; 

export default function Header() {
  const location = useLocation();  
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for controlling hamburger menu
  const [showAlert, setShowAlert] = useState(true);  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // Close the menu when clicking on a link (only applicable to mobile views)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {isAuthenticated && showAlert && (
        <div style={{
          backgroundColor: 'red',
          color: 'white',
          textAlign: 'center',
          padding: '10px 0',
          fontSize: '14px',
          fontWeight: 'bold',
          position: 'relative',
          top: 0,
          width: '105%',
          zIndex: 1000
        }}>
          ⚠️ This website does not support web browser's dark mode.
          <button 
            onClick={closeAlert} 
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              position: 'absolute',
              right: '25px',
              top: '5px',
              cursor: 'pointer'
            }}>
            ✖
          </button>
        </div>
      )}

      <header className="App-header">
        <nav className="nav-container">
          {/* Hamburger Menu Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li className={location.pathname === "/Invoice" ? "active" : ""}>
              <Link to="/Invoice" onClick={handleLinkClick}>Invoice</Link>
            </li>
            <li className={location.pathname === "/About" ? "active" : ""}>
              <Link to="/About" onClick={handleLinkClick}>About</Link>
            </li>
            <li className={location.pathname === "/help" ? "active" : ""}>
              <Link to="/help" onClick={handleLinkClick}>Help</Link>
            </li>
            {isAuthenticated && (
              <li>
                <button className="button-logout" onClick={() => { logout(); handleLinkClick(); }}>Logout</button>
              </li>
            )}
            <li className="support-creator-btn">
              <a href="https://www.paypal.com/donate/?hosted_button_id=P6S5KK4WHNBZS" target="_blank" rel="noopener noreferrer">
                <button className="support-button" onClick={handleLinkClick}>Support the Creator</button>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
