// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, fetchUserProfile } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To handle initial auth check

  // Effect to check token validity on initial load
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          // Optional: Validate token by fetching user profile
          // const profile = await fetchUserProfile();
          // if (profile) {
          //   setUser(profile);
          //   setIsAuthenticated(true);
          // } else {
          //   // Token invalid or expired
          //   localStorage.removeItem('authToken');
          //   setToken(null);
          // }

          // Simpler check (assume token is valid if it exists, backend will verify on API calls)
          // For a better UX, fetchUserProfile is recommended
           setIsAuthenticated(true); // Assume valid for now
           // You might want to fetch minimal user details here still
           console.log("Token found, assuming authenticated (validation recommended).");

        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, []); // Runs only once on mount

  const login = async (credentials) => {
    try {
      const data = await apiLogin(credentials); // API call
      localStorage.setItem('authToken', data.token);
      setToken(data.token);
      setUser(data.user || null); // Store user info if backend provides it
      setIsAuthenticated(true);
      return true; // Indicate success
    } catch (error) {
      console.error("Login failed in context:", error);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      throw error; // Re-throw to be caught in the component
    }
  };

  const register = async (userData) => {
    try {
      await apiRegister(userData); // API call
      // Optionally log in the user automatically after registration
      // await login({ email: userData.email, password: userData.password });
       return true; // Indicate success
    } catch (error) {
      console.error("Registration failed in context:", error);
      throw error; // Re-throw
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // Optional: Call a backend logout endpoint
    console.log("User logged out");
  };

  // useMemo prevents recalculating the value object on every render
  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      logout,
      register,
    }),
    [user, token, isAuthenticated, isLoading] // Dependencies
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}