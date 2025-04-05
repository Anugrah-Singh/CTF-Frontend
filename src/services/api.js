// src/services/api.js
import axios from 'axios';

// Replace with your actual backend API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Example using env var

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Axios Interceptor for adding Auth Token ---
// This automatically adds the token to requests if it exists.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or get from cookies/state management
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Authentication API Calls ---
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    // Assuming the backend returns { token: '...', user: {...} }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || new Error('Login failed');
  }
};

export const registerUser = async (userData) => {
   try {
    const response = await apiClient.post('/auth/register', userData);
     // Assuming backend returns a success message or user data
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || new Error('Registration failed');
  }
};

// --- Challenge API Calls (Example) ---
export const submitFlag = async (challengeId, flag) => {
    try {
        // Note: The interceptor adds the token automatically
        const response = await apiClient.post(`/challenges/${challengeId}/submit`, { flag });
        // Assuming backend returns { success: true/false, message: '...' }
        return response.data;
    } catch (error) {
        console.error("Flag submission error:", error.response?.data || error.message);
        throw error.response?.data || new Error('Flag submission failed');
    }
};

// Optional: Function to fetch user data if token exists (e.g., on app load)
export const fetchUserProfile = async () => {
    try {
        const response = await apiClient.get('/users/me');
        return response.data; // Assuming backend returns user object
    } catch (error) {
        console.error("Fetch profile error:", error.response?.data || error.message);
        // Don't throw here necessarily, might just mean no valid token
        return null;
    }
};


export default apiClient; // Export the configured instance if needed elsewhere