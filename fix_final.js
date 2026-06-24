const fs = require("fs");

// ── 1. FIX ADMIN PANEL ──
let a = fs.readFileSync("src/AdminPanel.jsx", "utf8");

// Clear all demo data arrays but keep the variable names
a = a.replace(
  /const initSeafarers = \[\n[\s\S]*?\n\];/,
  "const initSeafarers = [];"
);
a = a.replace(
  /const initCompanies = \[\n[\s\S]*?\n\];/,
  "const initCompanies = [];"
);
a = a.replace(
  /const PENDING = \[\n[\s\S]*?\n\];/,
  "const PENDING = [];"
);
a = a.replace(
  /const PIPELINE_INIT = \[\n[\s\S]*?\n\];/,
  "const PIPELINE_INIT = [];"
);
a = a.replace(
  /const INIT_INVOICES = \[\n[\s\S]*?\n\];/,
  "const INIT_INVOICES = [];"
);
a = a.replace(
  /const ACTIVITY = \[\n[\s\S]*?\n\];/,
  "const ACTIVITY = [];"
);

// Replace useState(initSeafarers) and useState(initCompanies) with []
a = a.replace("useState(initSeafarers)", "useState([])");
a = a.replace("useState(initCompanies)", "useState([])");

// Add useEffect for real API fetch right after showToast line
const SHOW_TOAST_LINE = `const showToast=(msg,type="info")=>setToast({msg,type});`;
const FETCH_CODE = `const showToast=(msg,type="info")=>setToast({msg,type});

  // Load real data from backend API
  useEffect(()=>{
    fetch(\`\${API}/api/admin/users\`,{headers:authHeader()})
      .then(r=>r.ok?r.json():[]).then(users=>{
        if(!Array.isArray(users))return;
        setSeafarers(users.filter(u=>u.role==="seafarer").map(u=>({
          id:u._id,name:u.name,rank:u.rank||"Seafarer",country:u.country||"",
          status:u.status||"Active",apps:0,verified:u.verified||false,
          sub:u.plan||"Free",avatar:(u.name||"??").slice(0,2).toUpperCase(),
          matchScore:80,contractEnd:"-",blacklisted:u.blacklisted||false,email:u.email
        })));
        setCompanies(users.filter(u=>u.role==="company").map(u=>({
          id:u._id,name:u.name,country:u.country||"",plan:u.plan||"Free",
          status:u.status||"Active",jobs:0,hired:0,verified:u.verified||false,
          logo:(u.name||"??").slice(0,2).toUpperCase(),revenue:0,renewal:"-",
          blacklisted:u.blacklisted||false,email:u.email
        })));
      }).catch(()=>showToast("Failed to load users","error"));
  },[]);`;

if (a.includes(SHOW_TOAST_LINE) && !a.includes("api/admin/users")) {
  a = a.replace(SHOW_TOAST_LINE, FETCH_CODE);
  console.log("[OK] Admin: Added real API fetch");
} else if (a.includes("api/admin/users")) {
  console.log("[SKIP] Admin: API fetch already present");
} else {
  console.log("[WARN] Admin: Could not find showToast line");
}

// Add AdminMobileNav component before export default
const ADMIN_MOBILE_NAV = `
// Mobile bottom navigation for Admin
function AdminMobileNav({page,setPage,isDark}){
  const items=[
    {id:"dashboard",icon:"dashboard",label:"Home"},
    {id:"seafarers",icon:"anchor",label:"Seafarers"},
    {id:"companies",icon:"building",label:"Companies"},
    {id:"invoices",icon:"fileText",label:"Finance"},
    {id:"settings",icon:"settings",label:"Settings"},
  ];
  return(
    <div className="admin-mobile-nav" style={{display:"none"}}>
      {items.map(item=>{
        const active=page===item.id;
        return(
          <button key={item.id} onClick={()=>setPage(item.id)}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              background:"none",border:"none",
              color:active?"#38BDF8":"rgba(255,255,255,0.45)",
              fontSize:9,fontWeight:600,cursor:"pointer",padding:"8px 4px",minWidth:48}}>
            <Icon name={item.icon} size={20} color="currentColor" strokeWidth={active?2.2:1.8}/>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AdminPanel(){`;

if (!a.includes("AdminMobileNav")) {
  a = a.replace("export default function AdminPanel(){", ADMIN_MOBILE_NAV);
  console.log("[OK] Admin: Added AdminMobileNav component");
}

// Add AdminMobileNav usage before closing </> in render
if (!a.includes("<AdminMobileNav")) {
  a = a.replace(
    /(\s*<\/div>\s*\n\s*<\/>\s*\n\s*\);\s*\n\}\s*$)/,
    `\n      <AdminMobileNav page={page} setPage={setPage} isDark={isDark}/>\n    </>\n  );\n}\n`
  );
  console.log("[OK] Admin: Added AdminMobileNav to render");
}

// Add className to admin main wrapper
a = a.replace(
  `{/* MAIN */}\r\n        <div className="dashboard-main-wrapper"`,
  `{/* MAIN */}\r\n        <div className="dashboard-main-wrapper"`
);
// If not already has className
if (!a.includes('className="dashboard-main-wrapper"')) {
  a = a.replace(
    /{\/\* MAIN \*\/}\s*\n\s*<div style=\{\{flex:1,marginLeft:sidebar\?256:68/,
    `{/* MAIN */}\n        <div className="dashboard-main-wrapper" style={{flex:1,marginLeft:sidebar?256:68`
  );
  console.log("[OK] Admin: Added className to main wrapper");
}

fs.writeFileSync("src/AdminPanel.jsx", a);
console.log("[DONE] AdminPanel fixed\n");

// ── 2. FIX COMPANY DASHBOARD – remove any remaining demo strings ──
let c = fs.readFileSync("src/CompanyDashboard.jsx", "utf8");
// Fix any hardcoded Pacific Star references
let cCount = 0;
const cBefore = c;
c = c.replace(/"Pacific Star Shipping"/g, () => { cCount++; return '(localStorage.getItem("userName")||"My Company")'; });
c = c.replace(/"Pacific Star"/g, () => { cCount++; return '(localStorage.getItem("userName")||"My Company")'; });
c = c.replace(/email:"[a-z.]+@pacificstar\.com"/g, () => { cCount++; return 'email:localStorage.getItem("userEmail")||""'; });
if (cCount > 0) console.log(`[OK] Company: Replaced ${cCount} demo references`);
else console.log("[SKIP] Company: No demo data found");
fs.writeFileSync("src/CompanyDashboard.jsx", c);

// ── 3. REWRITE MOBILE CSS ──
const mobileCss = `/* OceanCrew Mobile Responsive */
@media (max-width: 768px) {
  /* Hide desktop sidebar on mobile */
  aside { display: none !important; }

  /* Main content: remove sidebar margin, full width */
  .dashboard-main-wrapper {
    margin-left: 0 !important;
    width: 100vw !important;
  }
  .dashboard-main-wrapper > main {
    padding: 12px !important;
    padding-bottom: 80px !important;
    overflow-x: hidden !important;
  }

  /* Header: compact on mobile */
  header {
    padding: 0 12px !important;
    gap: 6px !important;
  }
  header input[placeholder="Search..."] { display: none !important; }

  /* Auth layout */
  .auth-layout { grid-template-columns: 1fr !important; }
  .auth-right { display: none !important; }
  .auth-left { padding: 30px 18px !important; min-height: 100vh !important; }

  /* Grid columns to single column */
  div[style*="gridTemplateColumns:repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
  div[style*="gridTemplateColumns:repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
  div[style*="gridTemplateColumns:repeat(5"] { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns:repeat(2"] { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
  div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }

  /* Table columns compact */
  div[style*="gridTemplateColumns:2fr 1fr 1fr 1fr 1fr"] {
    grid-template-columns: 2fr 1fr !important;
  }
  div[style*="gridTemplateColumns:2fr 1fr 1fr 1fr 1fr"] > span:nth-child(n+3),
  div[style*="gridTemplateColumns:2fr 1fr 1fr 1fr 1fr"] > div:nth-child(n+3) {
    display: none !important;
  }

  /* Font sizes */
  h1 { font-size: 22px !important; }
  h2 { font-size: 18px !important; }

  /* Seafarer/Company mobile bottom nav */
  .mobile-bottom-nav {
    display: flex !important;
    position: fixed !important;
    bottom: 0 !important; left: 0 !important; right: 0 !important;
    height: 64px !important;
    background: rgba(16, 18, 26, 0.97) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-top: 1px solid rgba(255,255,255,0.08) !important;
    z-index: 9999 !important;
    justify-content: space-around !important;
    align-items: center !important;
    padding: 0 8px !important;
  }

  /* Admin mobile bottom nav */
  .admin-mobile-nav {
    display: flex !important;
    position: fixed !important;
    bottom: 0 !important; left: 0 !important; right: 0 !important;
    height: 64px !important;
    background: rgba(8,9,12,0.97) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-top: 1px solid rgba(255,255,255,0.07) !important;
    z-index: 9999 !important;
    justify-content: space-around !important;
    align-items: center !important;
    padding: 0 8px !important;
  }

  /* Footer hide on mobile (bottom nav replaces it) */
  footer { display: none !important; }
}

/* Desktop: hide mobile nav */
@media (min-width: 769px) {
  .mobile-bottom-nav { display: none !important; }
  .admin-mobile-nav { display: none !important; }
}
`;
fs.writeFileSync("src/mobile.css", mobileCss);
console.log("[OK] mobile.css rewritten\n");

console.log("=== ALL FIXES APPLIED ===");
