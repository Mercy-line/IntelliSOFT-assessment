import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PatientVitals = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get patient from navigation state
  const patient = location.state?.patient;

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const visitDate = new Date().toISOString().split('T')[0];


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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bmi) return;

    const category = getBMICategory();

    // Navigate based on BMI
    if (category === "Overweight") {
      navigate("/overweight", {
        state: { patient, bmi, category },
      });
    } else {
      navigate("/general-assessment", {
        state: { patient, bmi, category },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-serif">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-10 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-2">Patient Vitals</h2>
        <p className="text-gray-500 mb-10">
          Please fill in the patient’s details
        </p>

        <div className="grid grid-cols-2 gap-10">
          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Patient</label>
            <input
              type="text"
              value="Lynn Kagwi"
              disabled
              className="border rounded-md px-4 py-3 bg-blue-500 text-white cursor-not-allowed"
            />
          </div>

          {/* Visit Date */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Visit Date</label>
            <input
              type="date"
              onChange={(e) => setVisitDate(e.target.value)}
              value={visitDate}
              min={visitDate}
              max={visitDate}
              className="border rounded-md px-4 py-3"
              required
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
            <div className="bg-blue-500 text-white px-16 py-8 rounded-xl text-center shadow-lg">
              <p className="text-lg">The BMI of the patient is</p>
              <h3 className="text-4xl font-bold">{bmi}</h3>
              <p className="text-xl">{getBMICategory()}</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-20">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-10 py-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientVitals;
