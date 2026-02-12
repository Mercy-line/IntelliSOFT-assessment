
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GeneralAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get patient from navigation state
  const patient = location.state?.patient || { name: "Lynn Kagwi" };
  const visitDate = new Date().toISOString().split('T')[0];

  const [generalHealth, setGeneralHealth] = useState("");
  const [drugStatus, setDrugStatus] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const assessmentData = {
      patient,
      visitDate,
      generalHealth,
      drugStatus,
      comments,
    };

    

    navigate("/"); 
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-serif">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-10 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-2">General Assessment</h2>
        <p className="text-gray-500 mb-10">
          Review patient details and complete assessment
        </p>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-10 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg">Patient</label>
            <input
              type="text"
              value={patient.name}
              disabled
              className="border rounded-md px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Visit Date</label>
            <input
              type="date"
              value={visitDate}
              min={visitDate}
              max={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="border rounded-md px-4 py-3"
              required
            />
          </div>
        </div>

        <p className="text-lg mb-6">Please fill in the patient’s details</p>

        {/* Assessment Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg">General Health</label>
            <select
              value={generalHealth}
              onChange={(e) => setGeneralHealth(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select the patient’s General Health</option>
              <option>Good</option>
              <option>Bad</option>
              
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">Drug Status</label>
            <select
              value={drugStatus}
              onChange={(e) => setDrugStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Is the Patient on drugs?</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-12">
          <label className="text-lg mb-2 block">Comments</label>
          <textarea
            rows="6"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Write comments concerning the patient"
            className="w-full border border-gray-300 rounded-lg px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white text-xl px-14 py-4 rounded-xl hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white text-xl px-16 py-4 rounded-xl hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralAssessment;
