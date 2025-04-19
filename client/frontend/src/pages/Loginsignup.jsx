import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup state
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login success:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Login failed. See console.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !signupEmail || !signupPassword || !mobile) {
      alert("All fields are required");
      return;
    }

    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "user/signup",
        {
          name,
          email: signupEmail,
          password: signupPassword,
          mobile,
        },
        { withCredentials: true }
      );
      console.log("Signup success:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message);
      alert(err?.response?.data?.message || "Signup failed. See console.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-blue-600 text-white p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to HomleyCare</h1>
            <p className="text-lg">
              Track your health and donations in one place.
            </p>
          </div>

          <div className="p-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`${
                  showLogin
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                } font-semibold`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`${
                  !showLogin
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                } font-semibold`}
              >
                Signup
              </button>
            </div>

            {showLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



