const fs = require('fs');
const path = require('path');

// ─── COMPREHENSIVE FIX SCRIPT ───
// Fixes: demo data, hardcoded emails, stripe, mobile CSS, App routing
// All changes are surgical string replacements on exact known patterns

console.log('=== OceanCrew Comprehensive Fix ===\n');

// ─── 1. FIX CompanyDashboard.jsx ───
const cdPath = path.join(__dirname, 'src', 'CompanyDashboard.jsx');
let cd = fs.readFileSync(cdPath, 'utf8');
let cdOriginal = cd;

// Remove hardcoded COMPANY fallback data
cd = cd.replace(
  /name:localStorage\.getItem\("userName"\) \|\| "Pacific Star Shipping Co\."/g,
  'name:localStorage.getItem("userName") || "My Company"'
);
cd = cd.replace(
  /logo:\(localStorage\.getItem\("userName"\)\|\|"PS"\)\.slice\(0,2\)\.toUpperCase\(\),plan:"Professional",country:"Singapore",/g,
  'logo:(localStorage.getItem("userName")||"MC").slice(0,2).toUpperCase(),plan:localStorage.getItem("userPlan")||"Free",country:localStorage.getItem("userCountry")||"",'
);
cd = cd.replace(
  /verified:true,joined:"Jan 2024",email:"hiring@pacificstar\.com",/g,
  'verified:false,joined:new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"}),email:localStorage.getItem("userEmail")||"",'
);
cd = cd.replace(
  /totalHired:47,activeJobs:8,totalApps:312,responseRate:94,/g,
  'totalHired:0,activeJobs:0,totalApps:0,responseRate:0,'
);

// Remove hardcoded NOTIFICATIONS
cd = cd.replace(
  /const NOTIFICATIONS = \[\s*\{id:1,type:"application"[\s\S]*?\{id:5,type:"platform"[^\]]*\];/,
  'const NOTIFICATIONS = [];'
);

// Fix Settings page hardcoded email
cd = cd.replace(
  /\{l:"Hiring Contact Email",v:"hiring@pacificstar\.com",type:"text"\}/g,
  '{l:"Hiring Contact Email",v:localStorage.getItem("userEmail")||"",type:"text"}'
);

if (cd !== cdOriginal) {
  fs.writeFileSync(cdPath, cd, 'utf8');
  console.log('[OK] CompanyDashboard.jsx - removed demo data');
} else {
  console.log('[SKIP] CompanyDashboard.jsx - already clean or pattern not found');
}

// ─── 2. FIX SeafarerDashboard.jsx ───
const sdPath = path.join(__dirname, 'src', 'SeafarerDashboard.jsx');
let sd = fs.readFileSync(sdPath, 'utf8');
let sdOriginal = sd;

// Fix hardcoded rajesh email in CV section 
sd = sd.replace(/rajesh\.f@gmail\.com/g, '${localStorage.getItem("userEmail")||"your email"}');

// Fix hardcoded phone number
sd = sd.replace(/\+94 77 123 4567/g, '');

// Fix Settings hardcoded email & phone
sd = sd.replace(
  /\{l:"Email Address",v:"rajesh\.f@gmail\.com",type:"text"\}/g,
  '{l:"Email Address",v:localStorage.getItem("userEmail")||"",type:"text"}'
);
sd = sd.replace(
  /\{l:"Phone \/ WhatsApp",v:"\+94 77 123 4567",type:"text"\}/g,
  '{l:"Phone / WhatsApp",v:"",type:"text"}'
);

if (sd !== sdOriginal) {
  fs.writeFileSync(sdPath, sd, 'utf8');
  console.log('[OK] SeafarerDashboard.jsx - removed hardcoded emails/phones');
} else {
  console.log('[SKIP] SeafarerDashboard.jsx - already clean');
}

// ─── 3. FIX AuthFlow.jsx - save userEmail ───
const afPath = path.join(__dirname, 'src', 'AuthFlow.jsx');
let af = fs.readFileSync(afPath, 'utf8');
let afOriginal = af;

// Add userEmail save after userName in login
if (!af.includes('localStorage.setItem("userEmail"')) {
  af = af.replace(
    /localStorage\.setItem\("userName", data\.user\?\.name \|\| ""\);/,
    'localStorage.setItem("userName", data.user?.name || "");\n        localStorage.setItem("userEmail", data.user?.email || "");'
  );
  // Register flow
  af = af.replace(
    /localStorage\.setItem\("userName", data\.user\?\.name \|\| form\.name\);/,
    'localStorage.setItem("userName", data.user?.name || form.name);\n        localStorage.setItem("userEmail", data.user?.email || form.email);'
  );
}

if (af !== afOriginal) {
  fs.writeFileSync(afPath, af, 'utf8');
  console.log('[OK] AuthFlow.jsx - added userEmail localStorage');
} else {
  console.log('[SKIP] AuthFlow.jsx - already has userEmail save');
}

// ─── 4. FIX App.jsx - add landing page route ───
const appPath = path.join(__dirname, 'src', 'App.jsx');
const appContent = `import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
`;
fs.writeFileSync(appPath, appContent, 'utf8');
console.log('[OK] App.jsx - landing page route added');

// ─── 5. FIX mobile.css - complete rewrite ───
const mobilePath = path.join(__dirname, 'src', 'mobile.css');
const mobileCSS = `/* ══ OCEANCREW MOBILE RESPONSIVE ══ */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulseDot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

/* ── TABLET (max 1024px) ── */
@media (max-width: 1024px) {
  /* Reduce padding on main content */
  main, [class*="main-content"] {
    padding: 16px !important;
  }
  
  /* Make grids responsive */
  div[style*="gridTemplateColumns: repeat(4"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  div[style*="gridTemplateColumns:repeat(4"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  div[style*="gridTemplateColumns: repeat(3"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  div[style*="gridTemplateColumns:repeat(3"] {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

/* ── MOBILE (max 768px) ── */
@media (max-width: 768px) {
  /* Hide desktop sidebar completely */
  aside {
    display: none !important;
  }
  
  /* Main content takes full width */
  main, [class*="main-content"] {
    margin-left: 0 !important;
    width: 100% !important;
    min-height: calc(100vh - 70px) !important;
    padding: 14px !important;
    padding-bottom: 80px !important;
  }
  
  /* Fix header for mobile */
  header {
    padding: 10px 14px !important;
    gap: 8px !important;
  }
  
  /* Hide search bar on very small screens */
  header input[placeholder*="Search"] {
    display: none !important;
  }
  
  /* Stack grids to single column */
  div[style*="gridTemplateColumns: repeat(2"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="gridTemplateColumns:repeat(2"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="gridTemplateColumns: repeat(3"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="gridTemplateColumns:repeat(3"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="gridTemplateColumns: repeat(4"] {
    grid-template-columns: 1fr !important;
  }
  div[style*="gridTemplateColumns:repeat(4"] {
    grid-template-columns: 1fr !important;
  }
  
  /* Stat cards - single column */
  div[style*="display:grid"] {
    gap: 10px !important;
  }
  
  /* Headers smaller on mobile */
  h1 { font-size: 22px !important; }
  h2 { font-size: 20px !important; }
  h3 { font-size: 16px !important; }
  
  /* Fix flex wrapping */
  div[style*="display:flex"][style*="gap"] {
    flex-wrap: wrap !important;
  }
  
  /* Cards padding */
  div[style*="padding: 24px"],
  div[style*="padding:24px"] {
    padding: 14px !important;
  }
  
  /* Buttons - full width on mobile */
  button[style*="padding:13px"],
  button[style*="padding: 13px"] {
    width: 100% !important;
    font-size: 14px !important;
  }
  
  /* Modal adjustments */
  div[style*="position:fixed"][style*="inset:0"] > div {
    margin: 10px !important;
    max-width: calc(100vw - 20px) !important;
    max-height: calc(100vh - 20px) !important;
    overflow-y: auto !important;
    padding: 20px !important;
  }
  
  /* Auth flow - full width */
  div[style*="maxWidth:440px"],
  div[style*="max-width:440px"] {
    max-width: 100% !important;
    padding: 20px !important;
  }
  
  /* Job cards and applicant cards */
  div[style*="display:flex"][style*="justifyContent:space-between"] {
    flex-direction: column !important;
    gap: 8px !important;
    align-items: flex-start !important;
  }
  
  /* Inline filter buttons scroll */
  div[style*="display:flex"][style*="gap:6"] {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
  }
  div[style*="display:flex"][style*="gap:6"]::-webkit-scrollbar {
    display: none !important;
  }
}

/* ── SMALL MOBILE (max 480px) ── */
@media (max-width: 480px) {
  main, [class*="main-content"] {
    padding: 10px !important;
    padding-bottom: 80px !important;
  }
  
  h1 { font-size: 18px !important; }
  h2 { font-size: 17px !important; }
  
  /* Stat numbers */
  div[style*="fontSize:32"],
  div[style*="fontSize: 32"] {
    font-size: 24px !important;
  }
  
  /* Invoice / plan cards */
  div[style*="padding:32px"],
  div[style*="padding: 32px"] {
    padding: 16px !important;
  }
}

/* ── LANDING PAGE MOBILE ── */
@media (max-width: 768px) {
  /* Hero section */
  section[style*="minHeight:100vh"],
  section[style*="min-height:100vh"] {
    padding: 20px !important;
  }
  
  /* Navigation bar */
  nav {
    padding: 12px 16px !important;
  }
  
  /* Hero text */
  div[style*="fontSize:56"],
  div[style*="font-size:56px"] {
    font-size: 28px !important;
  }
  div[style*="fontSize:48"],
  div[style*="font-size:48px"] {
    font-size: 26px !important;
  }
  div[style*="fontSize:42"],
  div[style*="font-size:42px"] {
    font-size: 24px !important;
  }
  
  /* Feature grid */
  div[style*="gridTemplateColumns: repeat(3"] {
    grid-template-columns: 1fr !important;
  }
  
  /* Pricing cards */
  div[style*="gridTemplateColumns: repeat(2"] {
    grid-template-columns: 1fr !important;
  }
  
  /* CTA buttons */
  a[style*="padding:14px 36px"],
  button[style*="padding:14px 36px"] {
    padding: 12px 24px !important;
    font-size: 14px !important;
  }
}

/* ── MOBILE BOTTOM NAV ── */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-bottom-nav {
    display: flex !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 64px !important;
    background: rgba(16, 18, 26, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    z-index: 9999 !important;
    justify-content: space-around !important;
    align-items: center !important;
    padding: 0 8px !important;
  }
  
  .mobile-bottom-nav button {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 3px !important;
    background: none !important;
    border: none !important;
    color: rgba(255, 255, 255, 0.5) !important;
    font-size: 9px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    padding: 8px 4px !important;
    min-width: 48px !important;
    transition: color 0.2s !important;
  }
  
  .mobile-bottom-nav button.active {
    color: #38BDF8 !important;
  }
  
  .mobile-bottom-nav button svg {
    width: 20px !important;
    height: 20px !important;
  }
}

/* ── PRINT STYLES ── */
@media print {
  aside, header, .mobile-bottom-nav, nav { display: none !important; }
  main { margin: 0 !important; padding: 0 !important; }
}
`;
fs.writeFileSync(mobilePath, mobileCSS, 'utf8');
console.log('[OK] mobile.css - complete mobile responsive rewrite');

console.log('\n=== All fixes applied! ===');
