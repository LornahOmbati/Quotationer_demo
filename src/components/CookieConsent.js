// src/components/CookieConsent.js
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function CookieConsent() {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (!cookies.cookieConsent) {
      setShowConsent(true); // Show consent popup if cookie is not set
    }
  }, [cookies]);

  const handleConsent = () => {
    setCookie('cookieConsent', true, { path: '/', maxAge: 3600 * 24 * 365, secure: true });
    setShowConsent(false);
  };

  

  if (!showConsent) return null;

  return (
    <div style={styles.consentBanner}>
      <p>We use cookies to improve your experience. By using our site, you agree to our use of cookies.</p>
      <button onClick={handleConsent} style={styles.consentButton}>Got it!</button>
    </div>
  );
}

const styles = {
  consentBanner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    zIndex: 1000
  },
  consentButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginLeft: '10px',
    cursor: 'pointer'
  }
};

export default CookieConsent;
