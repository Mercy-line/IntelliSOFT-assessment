import React from "react";
import { FaEye, FaLock } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

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
            <div className="relative">
              <input type="text" placeholder="Enter Your First Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 outline-none"/>
              <FaEye className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <div className="relative">
              <input type="text" placeholder="Enter Your last Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 outline-none"/>
              <FaEye className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <div className="relative">
              <input type="email" placeholder="Enter your Email Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 outline-none"/>
              <FaEye className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative">
              <input type="password" placeholder="********"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 outline-none"/>
              <FaLock className="absolute right-3 top-4 text-gray-500" />
            </div>
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-10 py-3 rounded-lg hover:bg-blue-600"
          >
            SignUp
          </button>
        </div>

      </div>

    </div>
  );
}
 