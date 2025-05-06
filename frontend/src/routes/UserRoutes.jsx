import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../Components/User/UserLayout';
import UserDashboard from '../Pages/User/UserDashboard';
import UserAppointments from '../Pages/User/BookAppoinment';
import UserNotifications from '../Pages/User/Notifications';
import UserFeedback from '../Pages/User/FeedbackPage';

// Private Route for Users
function UserPrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "user") {
    return <Navigate to="/" />;
  }

  return children;
}

function UserRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<UserPrivateRoute><UserLayout /></UserPrivateRoute>}>
        <Route index element={<UserDashboard />} />
        <Route path="appointments" element={<UserAppointments />} />
        <Route path="notifications" element={<UserNotifications />} />
        <Route path="feedback" element={<UserFeedback />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;

