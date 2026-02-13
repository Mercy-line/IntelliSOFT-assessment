import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import PatientRegistration from "./pages/PatientRegistration";
import PatientVitals from "./pages/PatientVitals";
import OverweightAssessment from "./pages/OverweightAssessment";
import GeneralAssessment from "./pages/GeneralAssessment";
import PatientListing from "./pages/PatientListing";
import PatientDataState from "./pages/PatientDataState";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Signup />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/patient-listing" element={<PatientListing />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/patient-registration" element={<PatientDataState />} />
            <Route path="/patient-vitals" element={<PatientVitals />} />
            <Route path="/overweight" element={<OverweightAssessment />} />
            <Route path="/general-assessment" element={<GeneralAssessment />} /> 
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
