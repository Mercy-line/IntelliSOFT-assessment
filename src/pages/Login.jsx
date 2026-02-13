import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // later you can add validation here

    // navigate to patient listing page
    navigate("/patient-listing");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">

      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <MdLocalHospital className="text-black text-8xl" />
        <h1 className="text-blue-500 font-semibold text-lg mt-2">
          MOTHER KEVIN HOSPITAL
        </h1>
      </div>

      {/* Card */}
      <div className="bg-gray-100 shadow-lg rounded-xl p-12 w-[900px]">

        <h2 className="text-3xl font-semibold mb-2">Login</h2>

        <p className="text-gray-700 mb-8">
          Welcome back! Please fill in the details
        </p>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-8">

          <label className="block mb-2 text-lg font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />

            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="absolute right-3 top-4 cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="absolute right-3 top-4 cursor-pointer"
              />
            )}

          </div>

        </div>

        {/* Login Button */}
        <div className="flex justify-center">

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-16 py-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}
