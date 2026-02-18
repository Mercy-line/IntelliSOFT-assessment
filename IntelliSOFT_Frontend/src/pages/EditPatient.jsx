import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { patients } from '../services/api';

const EditPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patientToEdit = location.state?.patient;

  const [patient, setPatient] = useState(patientToEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientToEdit) {
      navigate('/patient-listing');
    }
  }, [patientToEdit, navigate]);

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await patients.update(patient._id, patient);
      alert('Patient updated successfully!');
      navigate('/patient-listing');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during update.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/patient-listing');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="p-6 font-serif">
      <h2 className="text-3xl font-bold mb-2 text-gray-700">Edit Patient</h2>
      <p className="text-gray-500 mb-6">
        Please fill in the details of the patient
      </p>

      <div className="grid grid-cols-2 gap-10">
        <InputField
          label="First Name"
          name="firstName"
          placeholder="Enter patient’s First Name"
          value={patient.firstName}
          onChange={handlePatientChange}
          required
        />

        <InputField
          label="Last Name"
          name="lastName"
          placeholder="Enter Patient’s Last Name"
          value={patient.lastName}
          onChange={handlePatientChange}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="text-lg">Gender</label>
          <select
            name="gender"
            value={patient.gender}
            onChange={handlePatientChange}
            className="border rounded-md px-4 py-3"
            required
          >
            <option value="">Select Gender of patient</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <InputField
          label="Date of Birth"
          type="date"
          name="dob"
          value={new Date(patient.dob).toISOString().split('T')[0]}
          onChange={handlePatientChange}
          max={todayStr}
          required
        />
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <div className="flex justify-between mt-16">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:bg-gray-500 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-10 py-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default EditPatient;
