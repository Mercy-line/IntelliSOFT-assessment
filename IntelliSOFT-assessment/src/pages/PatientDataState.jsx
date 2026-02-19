import { usePatientData } from "../hooks/usePatientData";
import GeneralAssessment from "./GeneralAssessment";
import OverweightAssessment from "./OverweightAssessment";
import PatientRegistration from "./PatientRegistration";
import PatientVitals from "./PatientVitals";

export default function PatientDataState() {
  const patientData = usePatientData();

  const { currentIndex } = patientData;

  return (
    <>
      {currentIndex === 0 && (
        <PatientRegistration patientData={patientData} />
      )}

      {/* {currentIndex === 1 && <PatientVitals patientData={patientData} />} */}

      {currentIndex === 1 && (
    
        <PatientVitals patientData={patientData} setCurrentIndex={patientData.setCurrentIndex} />
      )}

      {currentIndex === 2 && (
        <GeneralAssessment patientData={patientData} />
      )}

      {currentIndex === 3 && (
        <OverweightAssessment patientData={patientData} />
      )}
    </>
  );
}
