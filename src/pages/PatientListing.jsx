import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientList } from "../hooks/usePatientList";

const PatientListing = () => {
  const navigate = useNavigate();



  const {patients,fetchPatients,loading} = usePatientList();

  useEffect(()=>{
    fetchPatients();
  },[]);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  
  const formatDate = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const filteredPatients = (patients || []).filter((patient) => {
    const matchesSearch = patient.firstname
      .toLowerCase()
      .includes(search.toLowerCase() ) || patient.lastname
      .toLowerCase()
      .includes(search.toLowerCase())  || patient.unique
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDate = filterDate
      ? formatDate(patient.updated_at) === filterDate
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-serif">
      <div className="w-full px-8 py-10">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Patients List
        </h2>

       
        <div className="flex gap-4 mb-6 items-end">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Search by Name</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-4 py-2 w-64"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Filter by Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border rounded-md px-4 py-2"
            />
          </div>

          {/* Register Patient Button */}
          <button
            onClick={() => navigate("/patient-registration")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md h-10 hover:bg-green-600"
          >
            Register Patient
          </button>
        </div>

        {/* Patient Table */}
        <div className="bg-white shadow-md rounded-md p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600 text-lg font-semibold">
                <th className="py-4">Patient Name</th>
                <th>Date of Birth</th>
                <th>BMI Status</th>
                <th>Last Visit Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className="border-b text-gray-700 hover:bg-gray-50 transition"
                  >
                    <td className="py-6">{patient.firstname + " " + patient.lastname}</td>
                    <td>{patient.dob}</td>
                    <td>{"Normal"}</td>
                    <td>{patient.updated_at ?? ""}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate("/patient-vitals", { state: { patient } })
                        }
                        className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 shadow"
                      >
                        + Add Vital
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-6 text-center" colSpan={5}>
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
