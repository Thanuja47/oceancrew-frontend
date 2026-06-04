import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthFlow from "./AuthFlow";
import AdminPanel from "./AdminPanel";
import CompanyDashboard from "./CompanyDashboard";
import SeafarerDashboard from "./SeafarerDashboard";

// Make sure to import your CSS
import "./mobile.css";
import "./index.css"; // If you have standard vite index.css

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        
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
