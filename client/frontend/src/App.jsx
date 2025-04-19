import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/Loginsignup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Logout from "./pages/Logout.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

