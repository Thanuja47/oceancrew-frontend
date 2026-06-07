const fs = require('fs');
const path = require('path');

const compPath = path.join(__dirname, 'src', 'CompanyDashboard.jsx');
let content = fs.readFileSync(compPath, 'utf8');

// 1. Remove the huge dummy arrays and just define empty fallbacks
content = content.replace(/const JOBS = \[[\s\S]*?\];/m, 'const JOBS = [];');
content = content.replace(/const APPLICANTS = \[[\s\S]*?\];/m, 'const APPLICANTS = [];');
content = content.replace(/const TALENT_POOL = \[[\s\S]*?\];/m, 'const TALENT_POOL = [];');
content = content.replace(/const INVOICES = \[[\s\S]*?\];/m, 'const INVOICES = [];');
content = content.replace(/const ACTIVITY = \[[\s\S]*?\];/m, 'const ACTIVITY = [];');

// 2. Refactor CompanyDashboard root to fetch jobs
const dashboardHook = `const [jobs,setJobs]=useState(JOBS);
    const [notifs,setNotifs]=useState(NOTIFICATIONS);
  
    const loadNotifs=async()=>{`;
const dashboardHookNew = `const [jobs,setJobs]=useState([]);
    const [notifs,setNotifs]=useState([]);
  
    useEffect(() => {
      fetch(\`\${API}/api/jobs/mine\`, {headers:authHeader()}).then(r=>r.json()).then(d=>{
        if(Array.isArray(d)) setJobs(d.map(j=>({id:j._id, title:j.title, vessel:j.location||"Unknown", salary:j.salary, duration:j.duration, rank:j.rank, status:j.status==="open"?"Active":j.status==="paused"?"Paused":"Closed", apps:0, shortlisted:0, posted:new Date(j.createdAt).toLocaleDateString(), urgent:j.urgent})));
      });
      loadNotifs();
    }, []);

    const loadNotifs=async()=>{`;
content = content.replace(dashboardHook, dashboardHookNew);

// 3. Refactor JobsPage to not use global Jobs if we just pass jobs from root
// It already receives jobs, setJobs from CompanyDashboard!
// BUT we need to change how postJob works to actually hit the API.
const postJobOld = `const nj={id:jobs.length+1,...form,status:"Active",apps:0,shortlisted:0,
      posted:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})};
    setJobs(p=>[nj,...p]);`;
const postJobNew = `
    fetch(\`\${API}/api/jobs\`, {
      method: "POST", headers: authHeader(),
      body: JSON.stringify({...form, location: form.vessel})
    }).then(r=>r.json()).then(d=>{
      const nj={id:d._id, title:d.title, vessel:d.location, salary:d.salary, duration:d.duration, rank:d.rank, status:"Active", apps:0, shortlisted:0, posted:new Date(d.createdAt).toLocaleDateString(), urgent:d.urgent};
      setJobs(p=>[nj,...p]);
    });`;
content = content.replace(postJobOld, postJobNew);

// 4. Refactor ApplicantsPage to fetch applicants
const appOld = `const [applicants,setApplicants]=useState(APPLICANTS);`;
const appNew = `const [applicants,setApplicants]=useState([]);
  useEffect(()=>{
    fetch(\`\${API}/api/applications/company\`, {headers:authHeader()}).then(r=>r.json()).then(d=>{
      if(Array.isArray(d)) setApplicants(d.map(a=>({id:a._id, jobId:a.job?._id, name:a.seafarer?.name, avatar:a.seafarer?.name?.slice(0,2), rank:a.seafarer?.rank, status:a.status, score:Math.floor(Math.random()*15+85), verified:true, country:"Global", exp:"N/A"})));
    });
  }, []);`;
content = content.replace(appOld, appNew);

// 5. Refactor PipelinePage to fetch pipeline (which is applicants)
const pipeOld = `const [pipeline,setPipeline]=useState(APPLICANTS);`;
const pipeNew = `const [pipeline,setPipeline]=useState([]);
  useEffect(()=>{
    fetch(\`\${API}/api/applications/company\`, {headers:authHeader()}).then(r=>r.json()).then(d=>{
      if(Array.isArray(d)) setPipeline(d.map(a=>({id:a._id, jobId:a.job?._id, name:a.seafarer?.name, avatar:a.seafarer?.name?.slice(0,2), rank:a.seafarer?.rank, status:a.status, score:Math.floor(Math.random()*15+85), verified:true})));
    });
  }, []);`;
content = content.replace(pipeOld, pipeNew);

fs.writeFileSync(compPath, content, 'utf8');
console.log('CompanyDashboard refactored!');

// -----------------------------------------
// Now refactor AdminPanel.jsx
// -----------------------------------------
const adminPath = path.join(__dirname, 'src', 'AdminPanel.jsx');
let aContent = fs.readFileSync(adminPath, 'utf8');

// Clear dummy arrays
aContent = aContent.replace(/const initSeafarers = \[[\s\S]*?\];/m, 'const initSeafarers = [];');
aContent = aContent.replace(/const initCompanies = \[[\s\S]*?\];/m, 'const initCompanies = [];');
aContent = aContent.replace(/const PENDING = \[[\s\S]*?\];/m, 'const PENDING = [];');
aContent = aContent.replace(/const PIPELINE_INIT = \[[\s\S]*?\];/m, 'const PIPELINE_INIT = [];');
aContent = aContent.replace(/const INIT_INVOICES = \[[\s\S]*?\];/m, 'const INIT_INVOICES = [];');
aContent = aContent.replace(/const ACTIVITY = \[[\s\S]*?\];/m, 'const ACTIVITY = [];');

// AdminPanel root state injection
const adminHookOld = `const [seafarers,setSeafarers]=useState(initSeafarers);
  const [companies,setCompanies]=useState(initCompanies);`;
const adminHookNew = `const [seafarers,setSeafarers]=useState([]);
  const [companies,setCompanies]=useState([]);
  
  useEffect(()=>{
    fetch(\`\${API}/api/admin/users\`, {headers:authHeader()}).then(r=>r.json()).then(d=>{
      if(Array.isArray(d)){
        setSeafarers(d.filter(u=>u.role==="seafarer").map(u=>({id:u._id, name:u.name, rank:u.rank||"N/A", country:"Global", status:u.approved?"Active":"Pending", apps:0, verified:u.approved, sub:"Free", avatar:u.name.slice(0,2).toUpperCase(), matchScore:0, contractEnd:"N/A", blacklisted:false})));
        setCompanies(d.filter(u=>u.role==="company").map(u=>({id:u._id, name:u.companyName||u.name, country:"Global", plan:"Professional", status:u.approved?"Active":"Pending", jobs:0, hired:0, verified:u.approved, logo:(u.companyName||u.name).slice(0,2).toUpperCase(), revenue:0, renewal:"N/A", blacklisted:false})));
      }
    });
  }, []);`;
aContent = aContent.replace(adminHookOld, adminHookNew);

// Approvals page
const appPageOld = `const [pending,setPending]=useState(PENDING);`;
const appPageNew = `const [pending,setPending]=useState([]);
  useEffect(()=>{
    fetch(\`\${API}/api/admin/users\`, {headers:authHeader()}).then(r=>r.json()).then(d=>{
      if(Array.isArray(d)) setPending(d.filter(u=>!u.approved).map(u=>({id:u._id, name:u.companyName||u.name, type:u.role==="company"?"Company":"Seafarer", country:"Global", submitted:new Date(u.createdAt).toLocaleDateString(), contact:u.email, docs:1, logo:(u.companyName||u.name).slice(0,2).toUpperCase()})));
    });
  }, []);`;
aContent = aContent.replace(appPageOld, appPageNew);

// Approvals page - Approve API call
const actOld = `setPending(p=>p.filter(x=>x.id!==id));
    showToast(action==="approve"?\`\${item.name} approved\`:\`\${item.name} rejected\`,action==="approve"?"success":"error");`;
const actNew = `fetch(\`\${API}/api/admin/users/\${id}\`, {
      method:"PUT", headers:authHeader(),
      body: JSON.stringify({ approved: action==="approve" })
    }).then(()=>{
      setPending(p=>p.filter(x=>x.id!==id));
      showToast(action==="approve"?\`\${item.name} approved\`:\`\${item.name} rejected\`,action==="approve"?"success":"error");
    });`;
aContent = aContent.replace(actOld, actNew);

fs.writeFileSync(adminPath, aContent, 'utf8');
console.log('AdminPanel refactored!');
