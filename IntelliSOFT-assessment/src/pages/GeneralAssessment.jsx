import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationContext } from '../context/NavigationContext';
import { assessments } from '../services/api';

const GeneralAssessment = ({ patient }) => {
  const { navigateTo } = useContext(NavigationContext);
  const navigate = useNavigate();
  const visitDate = new Date().toISOString().split('T')[0];

  const [generalHealth, setGeneralHealth] = useState('');
  const [drugStatus, setDrugStatus] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const assessmentData = {
        patientId: patient.patientId,
        healthStatus: generalHealth,
        onDrugs: drugStatus,
        onDiet: 'N/A',
        visitDate: visitDate,
      };

      const res= await assessments.create(assessmentData);
      const response = res.data;


      if (response && response._id) {
        alert('Assessment recorded successfully!');
        navigate('/patient-listing');
      } else {
        setError(response?.message || 'Failed to record assessment.');
      }
    } catch (err) {
      setError(
        err.message || 'An unexpected error occurred during assessment recording.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigateTo('PatientVitals');
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-100 p-4 sm:p-6 md:p-10 font-serif">
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:shadow-md sm:rounded-lg p-4 sm:p-6 md:p-10 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-700"> 
          General Assessment
        </h2>
        <p className="text-gray-500 mb-6 sm:mb-10">
          Review patient details and complete assessment
        </p>

        {/* Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg">Patient</label>
            <input
              type="text"
              value={patient ? `${patient.firstName} ${patient.lastName}` : ''}
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
              disabled
              className="border rounded-md px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <p className="text-lg mb-6">Please fill in the patient’s details</p>

        {/* Health and drug status */}
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
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Write comments concerning the patient"
            className="w-full border border-gray-300 rounded-lg px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-gray-400 text-white text-base sm:text-xl px-6 sm:px-14 py-3 sm:py-4 rounded-xl hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-500 text-white text-base sm:text-xl px-6 sm:px-14 py-3 sm:py-4 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralAssessment;