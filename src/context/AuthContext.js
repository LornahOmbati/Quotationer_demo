// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget'; // Import Netlify Identity

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up event listeners for login, logout, and initialization
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      setIsAuthenticated(true);
      netlifyIdentity.close();
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      setIsAuthenticated(false);
    });

    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
    });

    netlifyIdentity.init({
      APIUrl: 'https://quotationerdemo.netlify.app/.netlify/identity' // Replace with your Netlify site's URL
    });
    

    // Initialize Netlify Identity
    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
      netlifyIdentity.off("init");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const signup = (email, password) => {
    netlifyIdentity.open(); // Netlify Identity handles both login and signup
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
