import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationContext } from '../context/NavigationContext';
import { assessments } from '../services/api';

const OverweightAssessment = () => {
  const { navigateTo } = useContext(NavigationContext);
  const navigate = useNavigate();
  const visitDate = new Date().toISOString().split('T')[0];

  const [generalHealth, setGeneralHealth] = useState('');
  const [diet, setDiet] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const assessmentData = {
        healthStatus: generalHealth,
        onDiet: diet,
        onDrugs: 'N/A',
        visitDate: visitDate,
      };

      const response = await assessments.create(assessmentData);

      if (response && response._id) {
        alert('Assessment recorded successfully!');
        navigate('/patients');
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
    <form onSubmit={handleSubmit}>
      <div className="mb-2 font-serif">
        <h2 className="text-3xl font-bold mb-2 text-gray-700">
          Overweight Assessment
        </h2>
        <p className="text-gray-500 mb-6">
          Review patient details and complete assessment
        </p>

        <div className="grid grid-cols-2 gap-10">
          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Patient</label>
            <input
              type="text"
              value=""
              disabled
              className="border rounded-md px-4 py-3 bg-gray-100 text-black cursor-not-allowed"
            />
          </div>

          {/* Visit Date */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Visit Date</label>
            <input
              type="date"
              value={visitDate}
              min={visitDate}
              max={visitDate}
              disabled
              className="border rounded-md px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* General Health  status*/}
          <div className="flex flex-col gap-2">
            <label className="text-lg">General Health</label>
            <select
              className="border rounded-md px-4 py-3"
              value={generalHealth}
              onChange={(e) => setGeneralHealth(e.target.value)}
            >
              <option value="">Select health status of patient</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Diet status*/}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Is the patient on a diet?</label>
            <select
              className="border rounded-md px-4 py-3"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Comments */}
          <div className="col-span-2 flex flex-col gap-2">
            <label className="text-lg">Comments</label>
            <textarea
              rows="4"
              placeholder="Write observations about the patient"
              className="border rounded-md px-4 py-3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {/* Buttons */}
        <div className="flex justify-between mt-20">
          <button
            onClick={handleCancel}
            type="button"
            className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-10 py-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OverweightAssessment;