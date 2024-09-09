import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('null');
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const loginUser = (userData) => {
    setUser(userData);
    console.log(user)
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('authToken'); // Also remove the token from local
    window.location.assign('/'); // Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
