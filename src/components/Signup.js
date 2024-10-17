// src/components/Signup.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const { signup, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(); // Opens Netlify Identity modal for signup
  };

  if (isAuthenticated) {
    navigate('/'); // If already logged in, redirect to home page
  }

  return (
    <div className="auth-form">
      <h1>Sign Up</h1>
      <button 
        onClick={handleSignup} 
        style={{ marginBottom: '8px' }}
      >
        Sign Up
      </button>

      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}

export default Signup;
