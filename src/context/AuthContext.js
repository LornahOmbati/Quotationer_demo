// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'isAuthenticated']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = cookies.user;
    const storedAuth = cookies.isAuthenticated === 'true';

    if (storedUser && storedAuth) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, [cookies]);

  const signup = (email, password) => {
    // Storing user with email and password
    const newUser = { email, password }; // Store email and password
    setCookie('user', newUser, { path: '/', maxAge: 3600 * 24 * 7 });
    setCookie('isAuthenticated', 'true', { path: '/', maxAge: 3600 * 24 * 7 });
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const login = (email, password) => {
    const storedUser = cookies.user;

    // Verify credentials
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuthenticated(true);
      setCookie('isAuthenticated', 'true', { path: '/', maxAge: 3600 * 24 * 7 });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    removeCookie('user', { path: '/' });
    removeCookie('isAuthenticated', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
