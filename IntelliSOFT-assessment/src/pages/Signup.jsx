import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/api"; // Import the auth service

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await auth.register(formData);
      if (response.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(response.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen font-serif bg-gray-100 flex flex-col items-center justify-center px-0 sm:px-4">
    <div>
      <div className="flex flex-col items-center mb-8">
        <MdLocalHospital className="text-black text-6xl md:text-8xl" />
        <h1 className="text-blue-500 font-semibold text-base md:text-lg mt-2 text-center">
          MOTHER KEVIN HOSPITAL
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p:4 sm:p-6 md:p-10 w-full sm:max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-700">Signup</h2>
        <p className="mb-6 md:mb-8 text-gray-700">Please fill in the details</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="Firstname"
              placeholder="Enter Your First Name"
              value={formData.Firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              type="text"
              name="Lastname"
              placeholder="Enter Your Last Name"
              value={formData.Lastname}

              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 outline-none"
              />

              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-500"
                  title="Hide password"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                  title="Show password"
                />
              )}
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto bg-blue-500 text-white px-12 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}