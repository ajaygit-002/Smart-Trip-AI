import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiCheckCircle } from "react-icons/fi";
import { api } from "../utils/api";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    userId: "",
  });

  const [preferences, setPreferences] = useState([]);

  const preferenceOptions = [
    "museums",
    "beaches",
    "parks",
    "restaurants",
    "shopping",
    "nightlife",
    "historic",
    "adventure",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePreferenceToggle = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          preferences,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ ...formData, userId: data.userId });
        setSuccess("OTP sent to your email!");
        setShowOTP(true);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Connection error. Please make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        window.location.reload();
      } else {
        if (data.needsVerification) {
          setFormData({ ...formData, userId: data.userId });
          setError(data.error);
          setShowOTP(true);
        } else {
          setError(data.error || "Login failed");
        }
      }
    } catch (err) {
      setError("Connection error. Please make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: formData.userId,
            otp: formData.otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess("Email verified! Redirecting...");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      } else {
        setError(data.error || "OTP verification failed");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: formData.userId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("New OTP sent to your email!");
      } else {
        setError(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showOTP) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Verify Email</h2>
            <p className="text-gray-600 mt-2">
              Enter the OTP sent to your email
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <FiCheckCircle className="mr-2" />
              {success}
            </div>
          )}

          <form onSubmit={handleVerifyOTP}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                OTP Code
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-2xl tracking-widest"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>

          <button
            onClick={() => {
              setShowOTP(false);
              setFormData({ ...formData, otp: "" });
              setError("");
              setSuccess("");
            }}
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            🌍 Smart Trip AI
          </h1>
          <p className="text-gray-600">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                <FiUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required={!isLogin}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              <FiMail className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              <FiLock className="inline mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              required
              minLength="6"
            />
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Travel Preferences (Optional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {preferenceOptions.map((pref) => (
                  <label
                    key={pref}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={preferences.includes(pref)}
                      onChange={() => handlePreferenceToggle(pref)}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{pref}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
              setFormData({
                name: "",
                email: "",
                password: "",
                otp: "",
                userId: "",
              });
              setPreferences([]);
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
