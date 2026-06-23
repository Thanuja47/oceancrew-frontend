/**
 * fix_demo_data.js
 * Removes hardcoded demo data from CompanyDashboard.jsx and SeafarerDashboard.jsx
 * Only replaces string values inside data arrays, NOT any JS operators.
 */
const fs = require('fs');
const path = require('path');

// ── CompanyDashboard.jsx ──────────────────────────────────────────────────────
let cd = fs.readFileSync('src/CompanyDashboard.jsx', 'utf8');

// 1. Clear NOTIFICATIONS array — replace hardcoded demo notifications with empty array
cd = cd.replace(
  /const NOTIFICATIONS = \[[\s\S]*?\];/,
  'const NOTIFICATIONS = [];'
);

// 2. Fix COMPANY fallback name — remove fake "Pacific Star Shipping Co." fallback
cd = cd.replace(
  `name:localStorage.getItem("userName") || "Pacific Star Shipping Co.",`,
  `name:localStorage.getItem("userName") || "Your Company",`
);
cd = cd.replace(
  `logo:(localStorage.getItem("userName")||"PS").slice(0,2).toUpperCase(),plan:"Professional",country:"Singapore",`,
  `logo:(localStorage.getItem("userName")||"YC").slice(0,2).toUpperCase(),plan:"Free",country:"",`
);
cd = cd.replace(
  `verified:true,joined:"Jan 2024",email:"hiring@pacificstar.com",`,
  `verified:false,joined:"",email:"",`
);
cd = cd.replace(
  `totalHired:47,activeJobs:8,totalApps:312,responseRate:94,`,
  `totalHired:0,activeJobs:0,totalApps:0,responseRate:0,`
);

// 3. In root app — don't merge hardcoded NOTIFICATIONS after API load, use only API data
cd = cd.replace(
  `setNotifs([...mapped,...NOTIFICATIONS]);`,
  `setNotifs(mapped);`
);

fs.writeFileSync('src/CompanyDashboard.jsx', cd);
console.log('Fixed CompanyDashboard.jsx');

// ── SeafarerDashboard.jsx ─────────────────────────────────────────────────────
let sd = fs.readFileSync('src/SeafarerDashboard.jsx', 'utf8');

// Look for Settings page email fallback
sd = sd.replace(
  `"rajesh.f@gmail.com"`,
  `localStorage.getItem("userEmail") || ""`
);

fs.writeFileSync('src/SeafarerDashboard.jsx', sd);
console.log('Fixed SeafarerDashboard.jsx');

console.log('All demo data removed!');
