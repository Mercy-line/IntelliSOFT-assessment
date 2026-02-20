import React, { useContext, useState } from "react";
import { NavigationContext } from "../context/NavigationContext";
import { vitals } from "../services/api";

const PatientVitals = ({ patient }) => {
  const { navigateTo, setPatientData } = useContext(NavigationContext);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentVisitDate = new Date().toISOString().split("T")[0];

  const calculateBMI = () => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    return bmiValue.toFixed(1);
  };

  const bmi = calculateBMI();

  const getBMICategory = () => {
    if (!bmi) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    return "Overweight";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!bmi) {
      alert("Please enter valid height and weight to calculate BMI.");
      setLoading(false);
      return;
    }

    try {
      const vitalsData = {
        patientId: patient.patientId,
        height: parseFloat(height),
        weight: parseFloat(weight),
      };

      const res = await vitals.create(vitalsData);
      const response = res.data;


      if (response && response.bmiStatus) {
        alert(`Vitals recorded successfully!`);
        const category = response.bmiStatus;

        setPatientData(patient);

        if (category === "Overweight") {
          navigateTo("OverweightAssessment", patient);
        } else {
          navigateTo("GeneralAssessment", patient);
        }
      } else {
        setError(response?.message || "Failed to record vitals.");
      }
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred during vitals recording.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPatientData(patient);
    navigateTo("PatientRegistration");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10 font-serif">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-10 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-700">
          Patient Vitals
        </h2>
        <p className="text-gray-500 mb-6">
          Please fill in the patient’s details
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Patient</label>
            <input
              type="text"
              value={patient ? `${patient.firstName} ${patient.lastName}` : ""}
              disabled
              className="border rounded-md px-4 py-3 bg-gray-100 text-black cursor-not-allowed"
            />
          </div>

          {/* Visit Date */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Visit Date</label>
            <input
              type="date"
              value={currentVisitDate}
              disabled
              className="border rounded-md px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Height */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded-md px-4 py-3"
              required
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded-md px-4 py-3"
              required
            />
          </div>
        </div>

        {/* BMI Result */}
        {bmi && (
          <div className="mt-16 flex justify-center">
            <div className="bg-blue-500 text-white px-6 sm:px-10 md:px-16 py-6 md:py-8 rounded-xl text-center shadow-lg">
              <p className="text-lg">The BMI of the patient is</p>
              <h3 className="text-4xl font-bold">{bmi}</h3>
              <p className="text-xl">{getBMICategory()}</p>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between mt-10 md:mt-20">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white w-full sm:w-auto px-10 py-4 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white w-full sm:w-auto px-10 py-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Recording Vitals..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientVitals;
