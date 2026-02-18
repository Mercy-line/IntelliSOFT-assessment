import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { NavigationContext } from '../context/NavigationContext';
import { patients } from '../services/api';

const PatientRegistration = () => {
  const { navigateTo, patientData, setPatientData } = useContext(NavigationContext);
  const navigate = useNavigate();
  const [patient, setPatient] = useState(patientData || {
    firstname: '',
    lastname: '',
    gender: '',
    dob: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const patientDataForApi = {
        firstName: patientData.firstname,
        lastName: patientData.lastname,
        gender: patientData.gender,
        dob: patientData.dob,
      };

      const response = await patients.create(patientDataForApi);
      if (response && response.data) {
        alert('Patient registered successfully!');
        navigateTo('PatientVitals', response.data);
      } else {
        setError(response?.message || 'Patient registration failed.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during registration.');
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
      <h2 className="text-3xl font-bold mb-2 text-gray-700">Patient Registration</h2>
      <p className="text-gray-500 mb-6">
        Please fill in the details of the patient
      </p>

      <div className="grid grid-cols-2 gap-10">
        {/* First Name */}
        <InputField
          label="First Name"
          name="firstname"
          placeholder="Enter patient’s First Name"
          value={patientData.firstname}
          onChange={handlePatientChange}
          required
        />

        {/* Last Name */}
        <InputField
          label="Last Name"
          name="lastname"
          placeholder="Enter Patient’s Last Name"
          value={patientData.lastname}
          onChange={handlePatientChange}
          required
        />

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-lg">Gender</label>
          <select
            name="gender"
            value={patientData.gender}
            onChange={handlePatientChange}
            className="border rounded-md px-4 py-3"
            required
          >
            <option value="">Select Gender of patient</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <InputField
          label="Date of Birth"
          type="date"
          name="dob"
          value={patientData.dob}
          onChange={handlePatientChange}
          max={todayStr}
          required
        />
        <InputField
          label="Registration Date"
          type="date"
          name="reg_date"
          value={todayStr}
          readOnly
        />
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {/* Buttons */}
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
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default PatientRegistration;