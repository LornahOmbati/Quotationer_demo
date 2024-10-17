// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(); // Opens Netlify Identity modal for login
  };

  if (isAuthenticated) {
    navigate('/'); // If already logged in, redirect to home page
  }

  return (
    <div className="auth-form">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button 
        onClick={handleLogin} 
        style={{ marginBottom: '8px' }}
      >
        Login
      </button>

      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;
