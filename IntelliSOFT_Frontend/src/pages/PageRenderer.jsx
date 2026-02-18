import React, { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import PatientRegistration from './PatientRegistration';
import PatientVitals from './PatientVitals';
import OverweightAssessment from './OverweightAssessment';
import GeneralAssessment from './GeneralAssessment';

const PageRenderer = () => {
  const { currentPage, patientData } = useContext(NavigationContext);

  switch (currentPage) {
    case 'PatientRegistration':
      return <PatientRegistration />;
    case 'PatientVitals':
      return <PatientVitals patient={patientData} />;
    case 'OverweightAssessment':
      return <OverweightAssessment />;
    case 'GeneralAssessment':
      return <GeneralAssessment />;
    default:
      return <PatientRegistration />;
  }
};

export default PageRenderer;
