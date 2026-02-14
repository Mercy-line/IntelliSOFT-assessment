import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen font-serif bg-gray-100 flex flex-col items-center justify-center">
      
      {/* Logo */}
      <div className="flex flex-col items-center mb-12">
        <MdLocalHospital className="text-black text-8xl" />
        <h1 className="text-blue-500 font-semibold text-lg mt-2">
          MOTHER KEVIN HOSPITAL
        </h1>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-10 w-[900px]">
        <h2 className="text-3xl font-semibold mb-2">Signup</h2>
        <p className="mb-8 text-gray-700">Please fill in the details</p>

        <div className="grid grid-cols-2 gap-6">
          
          {/* First Name – NO eye */}
          <div>
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Last Name – NO eye */}
          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Email – NO eye */}
          <div>
            <label className="block mb-2 text-lg font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Password – eye ONLY here */}
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
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
                  className="absolute right-3 top-4 cursor-pointer text-gray-500"
                  title="Show password"
                />
              )}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-10 py-3 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
