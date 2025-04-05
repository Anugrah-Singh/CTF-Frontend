// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300">
          CTF Platform
        </Link>
        <div>
          {!isLoading && ( // Don't show buttons until auth state is determined
            isAuthenticated ? (
              <>
                <span className="text-gray-300 mr-4">Welcome, {user?.username || 'User'}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded mr-2 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded transition duration-200"
                >
                  Register
                </Link>
              </>
            )
          )}
           {isLoading && <span className="text-gray-400">Loading...</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;