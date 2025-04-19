import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile", { withCredentials: true });
        setUser(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.post("/user/upload-profile-pic", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user); // update profile with new pic
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
  
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
  
          <img
            src={
              user.profilePic
                ? `http://localhost:5000${user.profilePic}`
                : `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
  
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="mb-2"
          />
          <button
            onClick={handleUpload}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
  
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
  
          <button
            onClick={() => navigate("/logout")}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </main>
  
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
  
}

