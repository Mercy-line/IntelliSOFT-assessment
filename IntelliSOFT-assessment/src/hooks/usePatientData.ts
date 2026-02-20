import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Patient, PatientNav, Vitals } from "../interfaces/patient";
import { patients, vitals } from "../services/api"; // Import the patients service

export const usePatientData = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [patient, setPatient] = useState<Patient>({
    unique: "",
    firstname: "",
    lastname: "",
    dob: "", // Changed from age and reg_date
    gender: "",
  });
  const [patientNav, setPatientNav] = useState<PatientNav>({
    ...patient,
    bmi: 0,
    category: "",
  });
  const [patientVitals, setPatientVitals] = useState<Vitals[]>([]); // New state for patient vitals

  const handlePatientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchPatientById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await patients.getById(id);
      if (response) {
        setPatient({
          ...response,
          dob: response.dob ? new Date(response.dob).toISOString().split('T')[0] : "", // Format dob for consistency
        });
      } else {
        setError("Patient not found.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch patient data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVitalsByPatientId = async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await vitals.getByPatientId(patientId);
      if (response) {
        setPatientVitals(response);
      } else {
        setError("Vitals not found for this patient.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch vitals data.");
    } finally {
      setLoading(false);
    }
  };

  const updateVitals = async (id: string, updatedData: { height?: number; weight?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await vitals.update(id, updatedData);
      if (response) {
        // Update the specific vitals record in the patientVitals array
        setPatientVitals((prevVitals) =>
          prevVitals.map((v) => (v._id === id ? { ...v, ...response } : v))
        );
        alert("Vitals record updated successfully!");
        return true;
      } else {
        setError("Vitals update failed.");
        return false;
      }
    } catch (err) {
      setError(err.message || "Failed to update vitals record.");
      return false;
    } finally {
      setLoading(false);
    }
  };


  const updatePatient = async (id: string, updatedData: Partial<Patient>) => {
    setLoading(true);
    setError(null);
    try {
      // Map updatedData from Partial<Patient> to the API expected format if necessary
      const patientDataForApi = {
        firstName: updatedData.firstname,
        lastName: updatedData.lastname,
        gender: updatedData.gender,
        dob: updatedData.dob,
      };

      const response = await patients.update(id, patientDataForApi);
      if (response) {
        setPatient({
          ...response,
          dob: response.dob ? new Date(response.dob).toISOString().split('T')[0] : "",
        });
        alert("Patient updated successfully!");
        return true;
      } else {
        setError("Patient update failed.");
        return false;
      }
    } catch (err) {
      setError(err.message || "Failed to update patient data.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await patients.remove(id);
      if (response && response.success) {
        alert("Patient deleted successfully!");
        return true;
      } else {
        setError(response?.message || "Patient deletion failed.");
        return false;
      }
    } catch (err) {
      setError(err.message || "Failed to delete patient data.");
      return false;
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (currentIndex === 0) {
      try {
        const patientDataForApi = {
          firstName: patient.firstname,
          lastName: patient.lastname,
          gender: patient.gender,
          dob: patient.dob, // Directly using patient.dob
        };
        
        const response = await patients.create(patientDataForApi);
        if (response && response._id) {
          alert("Patient registered successfully!");
          // The API response might return the full patient object with _id, created_at etc.
          // Update patient state with the created patient.
          setPatient({
            ...patient, // Keep existing unique if not returned by API or if unique is local
            ...response, // Overwrite with API response for consistent data
            dob: response.dob ? new Date(response.dob).toISOString().split('T')[0] : patient.dob, // Ensure dob is correctly formatted for display if needed
          }); 
          setCurrentIndex(1); // Proceed to the next step
        } else {
          setError(response?.message || "Patient registration failed.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred during registration.");
      } finally {
        setLoading(false);
      }
    } else if (currentIndex > 0) {
      patientNav.bmi < 25 ? setCurrentIndex(2) : setCurrentIndex(3);
    } else {
      navigate("/");
      setCurrentIndex(0);
    }
  };

  const handleCancel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      navigate("/patients");
    }
  };

  return {
    handleCancel,
    handleSubmit,
    fetchPatientById,
    fetchVitalsByPatientId,
    updateVitals, // Return the new function
    updatePatient,
    deletePatient,
    patient,
    setPatient,
    patientNav,
    setPatientNav,
    patientVitals, // Return new state
    currentIndex,
    setCurrentIndex,
    handlePatientChange,
    loading,
    error,
  };
};