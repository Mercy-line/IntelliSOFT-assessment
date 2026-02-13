import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  // 1️⃣ Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // 2️⃣ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3️⃣ Handle Signup Submit
  const handleSignup = async () => {

    try {
      const response = await fetch("https://patientvisitapis.intellisoftkenya.com/api/patients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">

      <div className="flex flex-col items-center mb-6">
        <MdLocalHospital className="text-black text-8xl" />
        <h1 className="text-blue-500 font-semibold text-lg mt-2">
          MOTHER KEVIN HOSPITAL
        </h1>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-xl p-10 w-[900px]">

        <h2 className="text-2xl font-semibold mb-2">Signup</h2>
        <p className="mb-6 text-gray-700">Please fill in the details</p>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSignup}
            className="bg-blue-500 text-white px-10 py-3 rounded-lg hover:bg-blue-600"
          >
            SignUp
          </button>
        </div>

      </div>
    </div>
  );
}
