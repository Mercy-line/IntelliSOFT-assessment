import React, { useState } from "react"

import { dummyPatients } from "../data/dummy_patients";
import { PatientWithId } from "../interfaces/patient";

export const usePatientList = () =>{

const baseUrl = import.meta.env.VITE_PUBLIC_API_URL;
    const isDev = import.meta.env.VITE_PUBLIC_DEV_MODE;
    const token = "uguwgcygge";
    const[patients,setPatients] = useState<PatientWithId[]>();
    const[ loading, setLoading] = useState<boolean>(false);


    const fetchPatients = async ()  =>{
        if(isDev){
            setPatients(dummyPatients);
            return
        }
        try{
            setLoading(true);
    const resp =  await fetch(`${baseUrl}/patients/view`,{
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      })
      if(resp.ok){
        const data = await resp.json();

        setPatients(data['data'])
      }

        }catch (e){
            console.log("An error occurred");

        }finally{
            setLoading(false);
        }
    }
    const  getBMIstatus = (bmi:number)=>{
        if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    return "Overweight";
    }

  return  {
        fetchPatients,
        patients,
        loading,
        getBMIstatus
    }
}