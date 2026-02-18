import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext.jsx";
import Header from "./components/Header";
import PatientListing from "./pages/PatientListing";
import ErrorBoundary from "./components/ErrorBoundary";
import EditPatient from "./pages/EditPatient";
import PageRenderer from "./pages/PageRenderer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
        <Router>
          <NavigationProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-1 p-10">
                <Routes>
                  <Route path="/" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/patient-listing" element={<ErrorBoundary><PatientListing /></ErrorBoundary>} />
                  <Route path="/assessment" element={<PageRenderer />} />
                  <Route path="/edit-patient" element={<EditPatient />} />
                </Routes>
              </main>
            </div>
          </NavigationProvider>
        </Router>
  );
}

export default App;
