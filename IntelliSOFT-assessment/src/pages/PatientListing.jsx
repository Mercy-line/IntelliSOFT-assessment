import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientList } from "../hooks/usePatientList";
import { patients } from "../services/api";
import { NavigationContext } from "../context/NavigationContext";

const PatientListing = () => {
  const navigate = useNavigate();
  const { patientsList: patientData, fetchPatients, loading } = usePatientList();
  const { setPatientData, navigateTo } = useContext(NavigationContext);

  useEffect(() => {
    fetchPatients();
  }, []);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDelete = async (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await patients.remove(patientId);
        fetchPatients();
      } catch (error) {
        console.error("Failed to delete patient:", error);
      }
    }
  };

  const handleEdit = (patient) => {
    navigate("/edit-patient", { state: { patient } });
  };

  const handleAddVitals = (patient) => {
    setPatientData(patient);
    navigateTo("PatientVitals");
    navigate("/assessment");
  };

  const filteredPatients = (patientData || []).filter((patient) => {
    if (!patient) {
      return false;
    }
    const matchesSearch =
      (patient.firstName &&
        patient.firstName.toLowerCase().includes(search.toLowerCase())) ||
      (patient.lastName &&
        patient.lastName.toLowerCase().includes(search.toLowerCase())) ||
      (patient.patientId && patient.patientId.includes(search));

    const matchesDate = filterDate
      ? formatDate(patient.updatedAt) === filterDate
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-serif">
      <div className="px-4 sm:px-8 sm:py-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          Patients List
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Search (Name / Patient Number)
            </label>
            <input
              type="text"
              placeholder="Enter name or patient number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-4 py-2 w-full sm:w-64"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Filter by Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border rounded-md px-4 py-2"
            />
          </div>

          <button
            onClick={() => navigate("/assessment")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Register Patient
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-md p-4 overflow-x-auto">
          <table className="w-full min-w[900px]">
            <thead>
              <tr className="border-b text-left text-gray-600 text-lg">
                <th className="py-4">Patient Number</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>BMI Status</th>
                <th>Last Visit</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient._id} className="border-b hover:bg-gray-50">
                    <td className="py-6 text-black">{patient.patientId}</td>

                    <td>
                      {patient.firstName} {patient.lastName}
                    </td>

                    <td>{calculateAge(patient.dob)}</td>

                    <td>Normal</td>

                    <td>{formatDate(patient.updatedAt)}</td>

                    <td className="text-center flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleAddVitals(patient)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        + Add Vitals
                      </button>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientListing;