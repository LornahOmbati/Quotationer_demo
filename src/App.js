// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Invoice from './components/Invoice';
import About from './components/About';
import Help from './components/Help';
import Login from './components/Login';
import Signup from './components/Signup';
import CookieConsent from './components/CookieConsent';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import { AuthContext } from './context/AuthContext';  // Import authentication context
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
      <Header /> {/* Full-width header */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />  {/* Protect Home */}
          <Route path="/Invoice" element={<PrivateRoute><Invoice /></PrivateRoute>} />  {/* Protect Home */}
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
      <CookieConsent /> {/* This will show the cookie consent banner */}
      <Footer /> {/* Full-width footer */}
    </Router>
  );
}

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// // Footer component
// const Footer = () => (
//   <footer className="App-footer">
//     <p>&copy; 2024 Invoice Generator. All rights reserved.</p>
//   </footer>
;

export default App;
