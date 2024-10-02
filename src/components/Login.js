// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth, provider } from '../firebase'; // Import Firebase auth and provider
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const { login, signup } = useContext(AuthContext); // `signup` for Google account
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle email and password login
  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password); // Calls the AuthContext login function
    if (!success) {
      setError('Invalid credentials. Please try again.');
    } else {
      // Store first-time login flag in localStorage
      if (!localStorage.getItem('hasAgreedToTerms')) {
        localStorage.setItem('firstLogin', 'true');
      }
      navigate('/'); // Redirect to home page after successful login
    }
  };

  // Handle Google login via Firebase
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Assuming you want to store the Firebase Google user in cookies as well
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      // Call signup to store Google user in cookies
      signup(userData.email, 'google-oauth'); // Using 'google-oauth' as a dummy password

      // Store first-time login flag in localStorage
      if (!localStorage.getItem('hasAgreedToTerms')) {
        localStorage.setItem('firstLogin', 'true');
      }
      
      navigate('/'); // Redirect after successful login
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError("Error signing in with Google. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    // Placeholder functionality for password reset
    alert('Password reset link has been sent to your email.');
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" style={{ marginBottom: '8px' }}>Login</button>
      </form>
      
      {/* Google Sign-in */}
      <button 
        onClick={handleGoogleSignup} 
        style={{ color: 'white', backgroundColor: 'black', border: '1px solid black', padding: '10px', cursor: 'pointer' }}
      >
        Continue with Google
      </button>

      {/* Message below the Google button */}
      <p style={{ color: 'red', marginTop: '8px' }}>
        Please use Google to sign up and log in for security purposes(2FA).
      </p>

      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}

export default Login;
