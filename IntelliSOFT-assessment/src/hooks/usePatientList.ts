import React, { useState, useEffect } from "react"
import { Patient, PatientWithId } from "../interfaces/patient";
import { patients } from "../services/api"; // Import the patients service

export const usePatientList = () =>{
    const [patientsList,setPatientsList] = useState<PatientWithId[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPatients = async ()  => {
        setLoading(true);
        setError(null);
        try{
            const response = await patients.getAll();
            console.log("Fetched patients:", response.data);
            const data = response.data;
            setPatientsList(data);
        }catch (e:any){
            console.error("Failed to fetch patients:", e);
            setError(e.message || "An error occurred while fetching patients.");
        }finally{
            setLoading(false);
        }
    }

    // Optionally, fetch patients on component mount
    useEffect(() => {
        fetchPatients();
    }, []);

    const getBMIstatus = (bmi:number)=>{
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        return "Overweight";
    }

    return  {
        fetchPatients,
        patientsList, // Renamed to patientsList to avoid conflict with the service import
        loading,
        error,
        getBMIstatus
    }
}