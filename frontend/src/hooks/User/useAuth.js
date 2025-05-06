import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance'; // Import the axios instance

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function
  const login = async (email, password) => {
    try {
      // Change the URL to match the backend route (remove "/user" part)
      const response = await axiosInstance.put('/login', { email, password });
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axiosInstance.get('/user/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { user, isAuthenticated, login, logout };
};

export default useAuth;



