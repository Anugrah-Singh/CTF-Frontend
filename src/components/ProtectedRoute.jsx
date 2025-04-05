// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optional: Show a loading spinner or skeleton screen while checking auth
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    // Using replace to avoid adding the redirect action to history.
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child route components
  // Outlet is used by react-router-dom v6 to render nested routes
  return <Outlet />;
}

export default ProtectedRoute;