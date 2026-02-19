import React, { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import PatientRegistration from './PatientRegistration';
import PatientVitals from './PatientVitals';
import OverweightAssessment from './OverweightAssessment';
import GeneralAssessment from './GeneralAssessment';

const PageRenderer = () => {
  const { currentPage, patientData } = useContext(NavigationContext);
  console.log('PageRenderer - Current Page:', currentPage);

  switch (currentPage) {
    case 'PatientRegistration':
      return <PatientRegistration />;
    case 'PatientVitals':
      return <PatientVitals patient={patientData} />;
    case 'OverweightAssessment':
      return <OverweightAssessment patient={patientData} />;
    case 'GeneralAssessment':
      return <GeneralAssessment patient={patientData} />;
    default:
      return <PatientRegistration />;
  }
};

export default PageRenderer;
