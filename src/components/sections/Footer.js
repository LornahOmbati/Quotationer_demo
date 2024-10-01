import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Import social media icons

function Footer() {
  return (
    <footer className="App-footer">
      <div className="footer-container">
        {/* Website Name (Quote Generator) on the Left */}
        <div className="footer-section website-name">
          <p>Quotation/Invoice Generator</p>
        </div>

        {/* Header Links Section (Home, About, Contact) in the Center */}
        <div className="footer-section header-links">
          <ul>
            <li><Link to="/help" className="footer-link">Report bug</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/help" className="footer-link">Help</Link></li>
          </ul>
        </div>

        {/* Legal Information Section (Replaces Login and Signup) */}
        <div className="footer-section legal-info">
          <ul>
            <li>
              <a
                href="/docs/Privacypolicy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/docs/Termsandconditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="footer-social-media">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-built-by">
          <p>
            Powered by{" "}
            <a
              href="https://www.linkedin.com/in/lorna-ombati-72619a222/"
              target="_blank"
              rel="noreferrer"
              className="underline hover"
            >
              Lorna Ombati
            </a>
          </p>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Companyxyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
