
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OverweightAssessment = () => {
  const navigate = useNavigate();

  // Form state for validation
  const [generalHealth, setGeneralHealth] = useState("");
  const [diet, setDiet] = useState("");
  const [comments, setComments] = useState("");

  const visitDate = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!generalHealth) {
      alert("Please select General Health status!");
      return;
    }

    if (!diet) {
      alert("Please select if the patient is on a diet!");
      return;
    }

    if (!comments.trim()) {
      alert("Please fill in Comments!");
      return;
    }

    // If all fields are valid, navigate to the next page
    navigate("/");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/patient-vitals");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 font-serif">
        <h2 className="text-3xl font-bold mb-2">Overweight Assessment</h2>
        <p className="text-gray-500 mb-6">
          Review patient details and complete assessment
        </p>

        <div className="grid grid-cols-2 gap-10">
          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Patient</label>
            <input
              type="text"
              value="Lynn Kagwi"
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

          {/* General Health */}
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

          {/* Diet */}
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

        {/* Buttons */}
        <div className="flex justify-between mt-20">
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-10 py-4 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-10 py-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default OverweightAssessment;
