import React from 'react';
import useNotification from '../../hooks/User/useNotification';

const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <p>{new Date(notification.createdAt).toLocaleString()}</p>
            <p>Status: {notification.isRead ? 'Read' : 'Unread'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

