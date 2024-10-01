// src/components/Signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth, provider } from '../firebase'; // Import Firebase auth and provider
import { signInWithPopup } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password);  // Sign up user
    navigate('/'); // Redirect to home page after signup
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // You can handle user info here if needed
      navigate('/'); // Redirect after successful signup
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  return (
    <div className="auth-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
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
        
        <button type="submit" style={{ marginBottom: '8px' }}>Sign Up</button>    
       </form>
        {/* <div style={{ margin: '8px 0', textAlign: 'center' }}>
          <span>or</span>
        </div> */}
        <button 
  onClick={handleGoogleSignup} 
  style={{ color: 'white', backgroundColor: 'black', border: '1px solid black', padding: '10px', cursor: 'pointer' }}
>
  Continue with Google
</button>          <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}

export default Signup;
