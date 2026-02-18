import React, { createContext, useState } from 'react';

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('PatientRegistration');
  const [patientData, setPatientData] = useState({});

  const navigateTo = (page, data) => {
    setCurrentPage(page);
    if (data) {
      setPatientData(data);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, patientData, setPatientData, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
