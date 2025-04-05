// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Import Navbar
import './index.css';

function App() {
  return (
    <AuthProvider> {/* Provide Auth context to the entire app */}
      <Router>       {/* Set up the router */}
        <Navbar />   {/* Add Navbar to all pages */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            {/* Add other protected routes here, e.g.: */}
            {/* <Route path="/profile" element={<UserProfilePage />} /> */}
            {/* <Route path="/challenges" element={<ChallengesListPage />} /> */}
          </Route>

          {/* Optional: Catch-all 404 route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;