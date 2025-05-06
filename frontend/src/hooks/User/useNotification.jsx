import { useState, useEffect } from 'react';
import axiosinstance from '../../api/axiosInstance';

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosinstance.get('/create/notification');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  return {
    notifications,
    setNotifications,
  };
};

export default useNotification;

