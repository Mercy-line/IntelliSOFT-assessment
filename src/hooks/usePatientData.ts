import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Patient, PatientNav } from "../interfaces/patient";

 export const usePatientData =()=>{
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [patient,setPatient] = useState<Patient>(
        {
            unique:"",
            firstname:"",
            lastname:"",
            dob:"",
            gender:"",
            reg_date:"",
        }
    );
    const [patientNav, setPatientNav] = useState<PatientNav>(
        {
            ...patient,
            bmi:0,
            category:""
        }
    );

    const handlePatientChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setPatient((prev) => ({
    ...prev,
    [name]: value,
  }));
};



const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log(currentIndex);

  if (currentIndex > 0) {
    patientNav.bmi < 25
      ? setCurrentIndex(2)
      : setCurrentIndex(3);;

    
  }else if(currentIndex === 0){
    setCurrentIndex(1);
  } else {
    navigate("/");
    setCurrentIndex(0);
  }
};


    const handleCancel = () =>{
        if(currentIndex > 0){
            setCurrentIndex(currentIndex -1);
        }else{
            navigate("/")
        }
        
    }

return {
  handleCancel,
  handleSubmit,
  patient,
  setPatient,
  patientNav,
  setPatientNav,
  currentIndex,
  handlePatientChange,
};


 
}