import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthFlow from "./AuthFlow";
import AdminPanel from "./AdminPanel";
import CompanyDashboard from "./CompanyDashboard";
import SeafarerDashboard from "./SeafarerDashboard";
import LandingPage from "./LandingPage";

// Make sure to import your CSS
import "./mobile.css";
import "./index.css"; // If you have standard vite index.css

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication Routes (Login, Register, Forgot Password) */}
        <Route path="/auth" element={<AuthFlow />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/seafarer" element={<SeafarerDashboard />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}
