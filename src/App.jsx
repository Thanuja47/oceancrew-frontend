import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthFlow from "./AuthFlow";
import AdminPanel from "./AdminPanel";
import CompanyDashboard from "./CompanyDashboard";
import SeafarerDashboard from "./SeafarerDashboard";
import LandingPage from "./LandingPage";

import "./mobile.css";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthFlow />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/seafarer" element={<SeafarerDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
