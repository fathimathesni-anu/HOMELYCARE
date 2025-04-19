import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("user/profile", { withCredentials: true });
        setUserName(res.data.data.name);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/login"); // Redirect if not authenticated
      }
    };
    fetchProfile();
  }, [navigate]); // Correct dependency

  return (
    <div className="min-h-screen flex flex-col">
{/*       <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">HomleyCare</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header> */}

    <Header/>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow p-4">
          <ul className="space-y-3">
            <li><Link to="/dashboard" className="block p-2 rounded hover:bg-blue-100">Dashboard</Link></li>
            <li><Link to="/profile" className="block p-2 rounded hover:bg-blue-100">Profile</Link></li>
            <li><Link to="#" className="block p-2 rounded hover:bg-blue-100">Appointments</Link></li>
            <li><Link to="#" className="block p-2 rounded hover:bg-blue-100">Donations</Link></li>
            <li><Link to="/logout" className="block p-2 text-red-500 hover:bg-red-100">Logout</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome{userName ? `, ${userName}` : ""}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-blue-700 font-bold mb-2">Appointments</h3>
              <p>No appointments scheduled.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-blue-700 font-bold mb-2">Donation Status</h3>
              <p>Last donated: 3 months ago.</p>
            </div>
          </div>
        </main>
      </div>
{/*       <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © 2025 <span className="font-semibold">homelycareonline.</span> All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-300" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
}









