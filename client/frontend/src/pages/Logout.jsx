
// src/pages/Logout.jsx
import { useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get("user/logout", { withCredentials: true });
        navigate("/"); // redirect to login
      } catch (err) {
        console.error("Logout failed:", err);
        alert("Error logging out");
      }
    };

    logout();
  }, []);

  return <div className="text-center mt-10 text-lg">Logging out...</div>;
}
