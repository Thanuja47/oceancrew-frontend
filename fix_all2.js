const fs = require("fs");

// ─────────────────────────────────────────────
// 1. ADMIN PANEL – remove demo data + add real API fetch + add mobile nav
// ─────────────────────────────────────────────
let admin = fs.readFileSync("src/AdminPanel.jsx", "utf8");

// Remove all fake seed arrays
admin = admin.replace(/const initSeafarers\s*=\s*\[[\s\S]*?\];\s*\n/, "const initSeafarers = [];\n");
admin = admin.replace(/const initCompanies\s*=\s*\[[\s\S]*?\];\s*\n/, "const initCompanies = [];\n");
admin = admin.replace(/const PENDING\s*=\s*\[[\s\S]*?\];\s*\n/, "const PENDING_INIT = [];\n");
admin = admin.replace(/const PIPELINE_INIT\s*=\s*\[[\s\S]*?\];\s*\n/, "const PIPELINE_INIT = [];\n");
admin = admin.replace(/const INIT_INVOICES\s*=\s*\[[\s\S]*?\];\s*\n/, "const INIT_INVOICES = [];\n");
admin = admin.replace(/const ACTIVITY\s*=\s*\[[\s\S]*?\];\s*\n/, "const ACTIVITY_INIT = [];\n");

// Fix any reference to PENDING → PENDING_INIT
admin = admin.replace(/val:PENDING\.length/g, "val:pendingApprovals.length");

// Replace the main AdminPanel function with real API fetch + mobile nav
const OLD_EXPORT_START = `export default function AdminPanel(){
  const [page,setPage]=useState("dashboard");
  const [sidebar,setSidebar]=useState(true);
  const [theme,setTheme]=useState("dark");
  const [toast,setToast]=useState(null);
  const [seafarers,setSeafarers]=useState(initSeafarers);
  const [companies,setCompanies]=useState(initCompanies);

  const isDark=theme==="dark";
  const T=useT(isDark);
  const showToast=(msg,type="info")=>setToast({msg,type});`;

const NEW_EXPORT_START = `// ── MOBILE BOTTOM NAV FOR ADMIN ──
function AdminMobileNav({page,setPage,isDark}){
  const T=useT(isDark);
  const ac="#38BDF8";
  const items=[
    {id:"dashboard",icon:"dashboard",label:"Home"},
    {id:"seafarers",icon:"anchor",   label:"Seafarers"},
    {id:"companies",icon:"building", label:"Companies"},
    {id:"invoices", icon:"fileText", label:"Finance"},
    {id:"settings", icon:"settings", label:"Settings"},
  ];
  return(
    <div style={{display:"none"}} className="admin-mobile-nav">
      {items.map(item=>{
        const active=page===item.id;
        return(
          <button key={item.id} onClick={()=>setPage(item.id)}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,
              background:"none",border:"none",
              color:active?ac:"rgba(255,255,255,0.5)",
              fontSize:9,fontWeight:600,cursor:"pointer",
              padding:"8px 4px",minWidth:48,transition:"color 0.2s"}}>
            <Icon name={item.icon} size={20} color="currentColor" strokeWidth={active?2.2:1.8}/>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AdminPanel(){
  const [page,setPage]=useState("dashboard");
  const [sidebar,setSidebar]=useState(true);
  const [theme,setTheme]=useState("dark");
  const [toast,setToast]=useState(null);
  const [seafarers,setSeafarers]=useState([]);
  const [companies,setCompanies]=useState([]);
  const [pendingApprovals,setPendingApprovals]=useState([]);
  const [loading,setLoading]=useState(true);

  const isDark=theme==="dark";
  const T=useT(isDark);
  const showToast=(msg,type="info")=>setToast({msg,type});

  // ── Load real data from backend ──
  useEffect(()=>{
    const h=authHeader();
    setLoading(true);
    Promise.all([
      fetch(\`\${API}/api/admin/users\`,{headers:h}).then(r=>r.ok?r.json():[]).catch(()=>[]),
    ]).then(([users])=>{
      if(Array.isArray(users)){
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
        setPendingApprovals(users.filter(u=>!u.verified&&u.status!=="Suspended").map(u=>({
          id:u._id,name:u.name,country:u.country||"",type:u.role==="company"?"Company":"Seafarer",
          submitted:"Pending",contact:u.email,docs:0,logo:(u.name||"??").slice(0,2).toUpperCase()
        })));
      }
    }).catch(()=>showToast("Failed to load data","error"))
    .finally(()=>setLoading(false));
  },[]);`;

if (admin.includes(OLD_EXPORT_START)) {
  admin = admin.replace(OLD_EXPORT_START, NEW_EXPORT_START);
  console.log("[OK] AdminPanel – replaced export with real fetch + mobile nav");
} else {
  console.log("[SKIP] AdminPanel export replacement – pattern not found exactly, trying partial...");
  // Minimal fix: just clear the useState init values
  admin = admin.replace(
    `const [seafarers,setSeafarers]=useState(initSeafarers);`,
    `const [seafarers,setSeafarers]=useState([]);`
  );
  admin = admin.replace(
    `const [companies,setCompanies]=useState(initCompanies);`,
    `const [companies,setCompanies]=useState([]);`
  );
}

// Add mobile nav to AdminPanel render (before closing <>)
if (!admin.includes("AdminMobileNav") || !admin.includes("admin-mobile-nav")) {
  admin = admin.replace(
    `      </div>\n    </>\n  );\n}\n`,
    `      </div>\n      <AdminMobileNav page={page} setPage={setPage} isDark={isDark}/>\n    </>\n  );\n}\n`
  );
  console.log("[OK] AdminPanel – added AdminMobileNav to render");
}

fs.writeFileSync("src/AdminPanel.jsx", admin);
console.log("[DONE] AdminPanel fixed.\n");

// ─────────────────────────────────────────────
// 2. MOBILE CSS – complete rewrite for proper targeting
// ─────────────────────────────────────────────
const mobileCss = `/* ══ OCEANCREW MOBILE RESPONSIVE ══ */
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulseDot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

/* ── TABLET (max 1024px) ── */
@media (max-width: 1024px) {
  .dashboard-main-wrapper > main {
    padding: 16px !important;
  }
}

/* ── MOBILE (max 768px) ── */
@media (max-width: 768px) {
  /* Hide desktop sidebar */
  aside {
    display: none !important;
  }

  /* Dashboard main: no left margin, full width */
  .dashboard-main-wrapper {
    margin-left: 0 !important;
    width: 100vw !important;
  }

  .dashboard-main-wrapper > main {
    padding: 12px !important;
    padding-bottom: 80px !important;
    overflow-x: hidden !important;
  }

  /* Auth: single column, hide right panel */
  .auth-layout {
    grid-template-columns: 1fr !important;
  }
  .auth-right {
    display: none !important;
  }
  .auth-left {
    padding: 30px 18px !important;
    min-height: 100vh !important;
  }

  /* Header adjustments */
  header {
    padding: 0 12px !important;
    gap: 6px !important;
  }
  header input {
    display: none !important;
  }

  /* Stack all grids to 1 column */
  div[style*="gridTemplateColumns: repeat(4"] { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns:repeat(4"]  { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns:repeat(3"]  { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns: repeat(2"] { grid-template-columns: 1fr !important; }
  div[style*="gridTemplateColumns:repeat(2"]  { grid-template-columns: 1fr !important; }

  /* Cards */
  div[style*="padding: 24px"] { padding: 14px !important; }
  div[style*="padding:24px"]  { padding: 14px !important; }
  div[style*="padding: 32px"] { padding: 16px !important; }
  div[style*="padding:32px"]  { padding: 16px !important; }

  /* Landing page hero text */
  div[style*="fontSize:56"], div[style*="font-size:56px"] { font-size: 28px !important; }
  div[style*="fontSize:48"], div[style*="font-size:48px"] { font-size: 26px !important; }
  div[style*="fontSize:42"], div[style*="font-size:42px"] { font-size: 24px !important; }

  /* Modal adjustments */
  div[style*="position:fixed"][style*="inset:0"] > div {
    margin: 8px !important;
    max-width: calc(100vw - 16px) !important;
    max-height: calc(100vh - 16px) !important;
    overflow-y: auto !important;
  }

  /* Inline filter tabs scroll */
  div[style*="display:flex"][style*="gap:6"] {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
  }
  div[style*="display:flex"][style*="gap:6"]::-webkit-scrollbar { display: none !important; }

  h1 { font-size: 22px !important; }
  h2 { font-size: 18px !important; }
  h3 { font-size: 15px !important; }
}

/* ── SMALL MOBILE (max 480px) ── */
@media (max-width: 480px) {
  .dashboard-main-wrapper > main {
    padding: 10px !important;
    padding-bottom: 80px !important;
  }

  div[style*="fontSize:32"], div[style*="fontSize: 32"] { font-size: 24px !important; }

  h1 { font-size: 18px !important; }
  h2 { font-size: 16px !important; }
}

/* ── MOBILE BOTTOM NAV (Seafarer / Company shared component) ── */
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
    background: rgba(16, 18, 26, 0.97) !important;
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
    color: rgba(255, 255, 255, 0.45) !important;
    font-size: 9px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    padding: 8px 4px !important;
    min-width: 48px !important;
    transition: color 0.2s !important;
    letter-spacing: 0.03em !important;
  }

  .mobile-bottom-nav button.active {
    color: #38BDF8 !important;
  }

  .mobile-bottom-nav button svg {
    width: 20px !important;
    height: 20px !important;
  }

  /* ── ADMIN MOBILE NAV ── */
  .admin-mobile-nav {
    display: flex !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 64px !important;
    background: rgba(8, 9, 12, 0.97) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.07) !important;
    z-index: 9999 !important;
    justify-content: space-around !important;
    align-items: center !important;
    padding: 0 8px !important;
  }

  .admin-mobile-nav button {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 3px !important;
    background: none !important;
    border: none !important;
    color: rgba(255,255,255,0.45) !important;
    font-size: 9px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    padding: 8px 4px !important;
    min-width: 48px !important;
    transition: color 0.2s !important;
    letter-spacing: 0.03em !important;
  }
}

/* ── PRINT STYLES ── */
@media print {
  aside, header, .mobile-bottom-nav, .admin-mobile-nav, nav { display: none !important; }
  .dashboard-main-wrapper { margin: 0 !important; }
}
`;

fs.writeFileSync("src/mobile.css", mobileCss);
console.log("[OK] mobile.css – complete rewrite with proper class targeting\n");

// ─────────────────────────────────────────────
// 3. COMPANY DASHBOARD – ensure no demo data
// ─────────────────────────────────────────────
let company = fs.readFileSync("src/CompanyDashboard.jsx", "utf8");
const demoCompanyPatterns = [
  [/email:\s*"[a-z.]+@pacificstar\.com"/g, 'email:localStorage.getItem("userEmail")||""'],
  [/email:\s*"[a-z.]+@example\.com"/g,     'email:localStorage.getItem("userEmail")||""'],
  [/"Pacific Star Shipping"/g,             'localStorage.getItem("userName")||"My Company"'],
  [/"Pacific Star"/g,                      'localStorage.getItem("userName")||"My Company"'],
];
demoCompanyPatterns.forEach(([pattern, replacement]) => {
  company = company.replace(pattern, replacement);
});
fs.writeFileSync("src/CompanyDashboard.jsx", company);
console.log("[OK] CompanyDashboard – demo data cleaned\n");

console.log("=== All fixes applied! ===");
console.log("Run: npx react-scripts build && git add . && git commit -m 'Fix all: demo data, admin mobile nav, responsive layout' && git push");
