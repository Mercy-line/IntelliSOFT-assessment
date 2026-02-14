
import InputField from "../components/InputField";
import { usePatientData } from "../hooks/usePatientData";

const PatientRegistration = ({ patientData }) => {
  const { handleCancel, handleSubmit, patient, handlePatientChange } =
    patientData;

  // Get today's date in YYYY-MM-DD format
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="p-6 font-serif">
      <h2 className="text-3xl font-bold mb-2">Patient Registration</h2>
      <p className="text-gray-500 mb-6">
        Please fill in the details of the patient
      </p>

      <div className="grid grid-cols-2 gap-10">
        {/* First Name */}
        <InputField
          label="First Name"
          name="firstname"
          placeholder="Enter patient’s First Name"
          value={patient.firstname}
          onChange={handlePatientChange}
        />

        {/* Last Name */}
        <InputField
          label="Last Name"
          name="lastname"
          placeholder="Enter Patient’s Last Name"
          value={patient.lastname}
          onChange={handlePatientChange}
        />

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-lg">Gender</label>
          <select
            name="gender"
            value={patient.gender}
            onChange={handlePatientChange}
            className="border rounded-md px-4 py-3"
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
          value={patient.dob}
          onChange={handlePatientChange}
          max={todayStr} 
        />

        {/* Patient Number */}
        <InputField
          label="Patient Number"
          name="unique"
          placeholder="Enter Patient Number"
          value={patient.unique}
          onChange={handlePatientChange}
        />

        {/* Registration Date */}
        <InputField
          label="Registration Date"
          type="date"
          name="reg_date"
          value={todayStr} 
          onChange={handlePatientChange}
          min={todayStr} 
          max={todayStr} 
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-16">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:bg-blue-600 transition"
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
  );
};

export default PatientRegistration;
