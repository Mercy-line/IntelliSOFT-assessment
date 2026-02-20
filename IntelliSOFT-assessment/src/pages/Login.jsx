import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/api"; // Import the auth service
import showToast from "../hooks/showToast";
import Toast from "../components/Toast";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    open: false,
    isSuccess: true,
    message: "",
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
      const response = await auth.login(formData);
      if (response.success && response.token) {
        showToast(true, "Login Successful");
        setToast({
          open: true,
          isSuccess: true,
          message: "Login Successful",
        });
        localStorage.setItem("token", response.token);

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }
        navigate("/patient-listing"); // Navigate to the patient listing page
      } else {
        showToast(false, response.message || "Login failed.");

        setError(response.message || "Login failed.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, 3000);
    }
  };

  return (
    <>
      <Toast
        open={toast.open}
        isSuccess={toast.isSuccess}
        message={toast.message}
      />
      <div className="min-h-screen font-serif bg-grey-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-50">
          <MdLocalHospital className="text-black text-8xl" />
          <h1 className="text-blue-500 font-semibold text-lg mt-2 mb-8">
            MOTHER KEVIN HOSPITAL
          </h1>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-12 w-[900px]">
          <h2 className="text-3xl font-semibold mb-2 text-gray-700">Login</h2>
          <p className="text-gray-700 mb-8">
            Welcome back! Please fill in the details
          </p>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">
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

          <div className="mb-8">
            <label className="block mb-2 text-lg font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none pr-10"
              />

              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-600"
                  title="Hide password"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-600"
                  title="Show password"
                />
              )}
            </div>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-500 text-white px-16 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
