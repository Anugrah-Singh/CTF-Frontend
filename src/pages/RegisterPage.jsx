// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Although we use register, useAuth provides it
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
     if (password.length < 6) { // Example basic validation
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
    }
    try {
      await register({ username, email, password });
      setSuccess('Registration successful! Please log in.');
      // Optionally redirect to login after a delay or immediately
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
      setLoading(false);
    }
     // No need to setLoading(false) on success if redirecting or showing success message
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Register</h2>
        {error && <p className="bg-red-900 border border-red-700 text-red-100 px-4 py-2 rounded mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-900 border border-green-700 text-green-100 px-4 py-2 rounded mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
         <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="username">Username</label>
            <input
              type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit" disabled={loading || success} // Disable after success too
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${loading || success ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
         <p className="text-center mt-4 text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;