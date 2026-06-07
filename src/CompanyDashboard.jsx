/* eslint-disable */
import { useState, useEffect, useRef } from "react";

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    dashboard:<><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    users:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    anchor:<><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    building:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    fileText:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    creditCard:<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    trendUp:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    activity:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    send:<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    messageSquare:<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    filter:<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    download:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    target:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    zap:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    chevronDown:<><polyline points="6 9 12 15 18 9"/></>,
    chevronLeft:<><polyline points="15 18 9 12 15 6"/></>,
    chevronRight:<><polyline points="9 18 15 12 9 6"/></>,
    moon:<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    layers:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    award:<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    clock:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    checkCircle:<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    xCircle:<><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    alertCircle:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    phone:<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    mail:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    dollarSign:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    ban:<><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
  };
  const p = icons[name];
  if (!p) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{flexShrink:0,display:"inline-block",verticalAlign:"middle"}}>
      {p}
    </svg>
  );
};

/* â”€â”€ THEME â”€â”€ */
const D = {
  page:"#08090C",card:"#10121A",sub:"rgba(255,255,255,0.03)",
  border:"rgba(255,255,255,0.07)",t1:"#F1F5F9",t2:"#94A3B8",t3:"#475569",
  accent:"#38BDF8",accentBg:"rgba(56,189,248,0.1)",
  green:"#34D399",greenBg:"rgba(52,211,153,0.12)",
  red:"#F87171",redBg:"rgba(248,113,113,0.12)",
  yellow:"#FBBF24",yellowBg:"rgba(251,191,36,0.12)",
  purple:"#A78BFA",purpleBg:"rgba(167,139,250,0.12)",
  shadow:"0 2px 16px rgba(0,0,0,0.3)",
  sidebar:"#08090C",header:"rgba(16,18,26,0.88)",
};
const L = {
  page:"linear-gradient(145deg,#dce8f5 0%,#e8eef7 40%,#edf2f9 100%)",
  card:"#FFFFFF",sub:"rgba(100,116,139,0.05)",
  border:"none",t1:"#1a2332",t2:"#4a5568",t3:"#94A3B8",
  accent:"#1a2332",accentBg:"rgba(26,35,50,0.07)",
  green:"#16A34A",greenBg:"rgba(22,163,74,0.1)",
  red:"#DC2626",redBg:"rgba(220,38,38,0.08)",
  yellow:"#D97706",yellowBg:"rgba(217,119,6,0.1)",
  purple:"#7C3AED",purpleBg:"rgba(124,58,237,0.08)",
  shadow:"0 2px 12px rgba(150,170,200,0.12),0 8px 32px rgba(150,170,200,0.08)",
  sidebar:"#FFFFFF",header:"rgba(255,255,255,0.85)",
};

function useT(isDark){return isDark?D:L;}

const API = "https://oceancrew-backend-production.up.railway.app";
const authHeader = () => ({ "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" });

/* â”€â”€ DATA â”€â”€ */
const COMPANY = {
  name:localStorage.getItem("userName") || "Pacific Star Shipping Co.",
  logo:(localStorage.getItem("userName")||"PS").slice(0,2).toUpperCase(),plan:"Professional",country:"Singapore",
  verified:true,joined:"Jan 2024",email:"hiring@pacificstar.com",
  totalHired:47,activeJobs:8,totalApps:312,responseRate:94,
};

const JOBS = [
  {id:1,title:"Master",vessel:"Container Vessel MV Pacific Star",salary:"$7,500",duration:"12 months",rank:"Master",status:"Active",   apps:28,posted:"May 10",urgent:true,  shortlisted:4},
  {id:2,title:"Chief Officer",vessel:"Container Vessel MV Pacific Star",salary:"$4,800",duration:"9 months", rank:"Chief Officer",status:"Active",apps:19,posted:"May 12",urgent:false,shortlisted:2},
  {id:3,title:"Chief Engineer",vessel:"Bulk Carrier MV Glory Star",salary:"$5,200",duration:"10 months",rank:"Chief Engineer",status:"Active",apps:22,posted:"May 14",urgent:false,shortlisted:3},
  {id:4,title:"2nd Officer",vessel:"Container Vessel MV Pacific Star",salary:"$3,100",duration:"8 months", rank:"2nd Officer",status:"Paused",  apps:11,posted:"May 8", urgent:false,shortlisted:1},
  {id:5,title:"ETO",          vessel:"Bulk Carrier MV Glory Star",      salary:"$3,400",duration:"12 months",rank:"ETO",         status:"Closed",  apps:33,posted:"Apr 28",urgent:false,shortlisted:0},
];

const APPLICANTS = [
  {id:1,jobId:1,name:"Capt. Rajesh Fernand✓,rank:"Master",        country:"Sri Lanka",verified:true, score:96,status:"Shortlisted",avatar:"RF",exp:"18 yrs",applied:"May 11"},
  {id:2,jobId:1,name:"Capt. Ahmed Al Sayed", rank:"Master",        country:"Oman",     verified:true, score:91,status:"Interview",  avatar:"AA",exp:"14 yrs",applied:"May 11"},
  {id:3,jobId:1,name:"Capt. Wang Fang",      rank:"Master",        country:"China",    verified:false,score:84,status:"Applied",    avatar:"WF",exp:"10 yrs",applied:"May 12"},
  {id:4,jobId:2,name:"Shanaka Perera",        rank:"Chief Officer", country:"Sri Lanka",verified:true, score:88,status:"Shortlisted",avatar:"SP",exp:"9 yrs", applied:"May 13"},
  {id:5,jobId:2,name:"James Okafor",          rank:"Chief Officer", country:"Nigeria",  verified:true, score:82,status:"Applied",    avatar:"JO",exp:"7 yrs", applied:"May 13"},
  {id:6,jobId:3,name:"Dilshan Wickrama",      rank:"ETO",           country:"Sri Lanka",verified:true, score:85,status:"Applied",    avatar:"DW",exp:"7 yrs", applied:"May 15"},
  {id:7,jobId:3,name:"Vikram Nair",           rank:"Chief Engineer",country:"India",    verified:true, score:90,status:"Shortlisted",avatar:"VN",exp:"12 yrs",applied:"May 14"},
];

const TALENT_POOL = [
  {id:1,name:"Capt. Rajesh Fernand✓,rank:"Master",        country:"Sri Lanka",verified:true, score:96,avatar:"RF",available:"Jul 2025",notes:"Top pick for Master role"},
  {id:2,name:"Eng. Priya Nair",      rank:"Chief Engineer",country:"India",    verified:true, score:91,avatar:"PN",available:"Jun 2025",notes:"Excellent tanker experience"},
  {id:3,name:"Shanaka Perera",       rank:"Chief Officer", country:"Sri Lanka",verified:true, score:88,avatar:"SP",available:"Aug 2025",notes:"Strong container vessel background"},
];

const INVOICES = [
  {id:"INV-001",plan:"Professional",amount:149,status:"Paid",   date:"May 1", due:"May 15"},
  {id:"INV-002",plan:"Professional",amount:149,status:"Paid",   date:"Apr 1", due:"Apr 15"},
  {id:"INV-003",plan:"Professional",amount:149,status:"Pending",date:"Jun 1", due:"Jun 15"},
];

const NOTIFICATIONS = [
  {id:1,type:"application",msg:"New application: Capt. Rajesh Fernando applied for Master",time:"2h ag✓,  read:false,icon:"anchor"},
  {id:2,type:"match",      msg:"Smart Match: 3 new seafarers match your Chief Engineer posting",time:"5h ag✓,  read:false,icon:"target"},
  {id:3,type:"invoice",    msg:"Invoice INV-003 due on Jun 15 — $149",                          time:"1d ag✓,  read:true, icon:"creditCard"},
  {id:4,type:"expiry",     msg:"Contract expiry alert: Capt. Ahmed Al Sayed available Jul 2025",time:"2d ag✓,  read:true, icon:"clock"},
  {id:5,type:"platform",   msg:"OceanCrew: New feature — Hiring Pipeline now available",        time:"3d ag✓,  read:true, icon:"zap"},
];

const ACTIVITY = [
  {id:1,msg:"Shortlisted Capt. Rajesh Fernando for Master role",     time:"2h ag✓, ok:true},
  {id:2,msg:"Posted new vacancy: Chief Engineer — Bulk Carrier",     time:"5h ag✓, ok:true},
  {id:3,msg:"Interview scheduled with Capt. Ahmed Al Sayed",         time:"1d ag✓, ok:true},
  {id:4,msg:"Invoice INV-002 paid — $149",                           time:"2d ag✓, ok:true},
  {id:5,msg:"Job posting paused: 2nd Officer",                       time:"3d ag✓, ok:false},
];

const NAV = [
  {section:"Main",items:[
    {id:"dashboard",  icon:"dashboard",   label:"Dashboard"},
    {id:"jobs",       icon:"briefcase",   label:"My Job Posts"},
    {id:"applicants", icon:"users",       label:"Applicants"},
    {id:"pipeline",   icon:"filter",      label:"Hiring Pipeline"},
  ]},
  {section:"Talent",items:[
    {id:"search",     icon:"search",      label:"Search Seafarers"},
    {id:"pool",       icon:"star",        label:"Talent Pool"},
  ]},
  {section:"Account",items:[
    {id:"invoices",   icon:"creditCard",  label:"Invoices"},
    {id:"notifications",icon:"bell",     label:"Notifications",badge:2},
    {id:"profile",    icon:"building",   label:"Company Profile"},
    {id:"settings",   icon:"settings",   label:"Settings"},
  ]},
];

/* â”€â”€ PRIMITIVES â”€â”€ */
function Card({children,style={},isDark,onClick}){
  const T=useT(isDark);
  const [h,setH]=useState(false);
  return(
    <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:T.card,borderRadius:20,padding:24,
        boxShadow:h&&onClick?(isDark?"0 8px 40px rgba(0,0,0,0.5)":"0 8px 32px rgba(150,170,200,0.2)"):T.shadow,
        border:isDark?`1px solid ${T.border}`:"none",
        transition:"all 0.22s ease",transform:h&&onClick?"translateY(-2px)":"none",...style}}>
      {children}
    </div>
  );
}

function Bdg({label,color,bg}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",
      borderRadius:999,background:bg||`${color}15`,color,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>
      {label}
    </span>
  );
}

function Btn({children,onClick,variant="primary",isDark,size="md",icon}){
  const T=useT(isDark);
  const bg=variant==="primary"?(isDark?"#38BDF8":"#1a2332"):variant==="success"?(isDark?"linear-gradient(135deg,#34D399,#10B981)":"#16A34A"):variant==="danger"?T.redBg:variant==="ghost"?(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"):"transparent";
  const col=variant==="primary"?"#fff":variant==="success"?"#fff":variant==="danger"?T.red:T.t2;
  const pad=size==="sm"?"6px 12px":size==="lg"?"13px 26px":"9px 18px";
  return(
    <button onClick={onClick} style={{padding:pad,borderRadius:10,border:"none",cursor:"pointer",fontWeight:600,
      fontSize:size==="sm"?11:13,fontFamily:"'Inter',sans-serif",transition:"all 0.18s",
      background:bg,color:col,display:"flex",alignItems:"center",gap:6,
      boxShadow:variant==="primary"?(isDark?"0 4px 14px rgba(56,189,248,0.25)":"0 4px 14px rgba(26,35,50,0.2)"):"none"}}
      onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
      onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
      {icon&&<Icon name={icon} size={size==="sm"?12:14} color="currentColor" strokeWidth={2}/>}
      {children}
    </button>
  );
}

function Av({initials,size=40,online,isDark}){
  const T=useT(isDark);
  return(
    <div style={{position:"relative",flexShrink:0}}>
      <div style={{width:size,height:size,borderRadius:"50%",
        background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.1)",
        display:"flex",alignItems:"center",justifyContent:"center",
        color:T.t2,fontWeight:700,fontSize:size*0.32,fontFamily:"'Sora',sans-serif",
        border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.06)"}}>
        {initials}
      </div>
      {online&&<div style={{position:"absolute",bottom:1,right:1,
        width:size*0.24,height:size*0.24,borderRadius:"50%",
        background:"#22C55E",border:`2px solid ${T.card}`}}/>}
    </div>
  );
}

function Spark({data,color,height=26}){
  const max=Math.max(...data);
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:2,height}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,borderRadius:2,background:color,
          height:`${(v/max)*100}%`,minHeight:2,
          opacity:0.25+(i/data.length)*0.65}}/>
      ))}
    </div>
  );
}

function Toast({msg,type,onClose}){
  const c={success:"#34D399",error:"#F87171",info:"#38BDF8",warning:"#FBBF24"}[type]||"#38BDF8";
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[]);
  return(
    <div style={{position:"fixed",top:80,right:24,zIndex:9999,padding:"12px 20px",
      borderRadius:14,background:"rgba(10,15,25,0.96)",border:`1px solid ${c}40`,
      color:c,fontSize:13,fontWeight:600,backdropFilter:"blur(20px)",
      boxShadow:"0 8px 32px rgba(0,0,0,0.5)",display:"flex",alignItems:"center",gap:8,
      fontFamily:"'Inter',sans-serif",animation:"slideIn 0.3s ease"}}>
      {type==="success"?"✓":type==="error"?"✕":"ℹ"} {msg}
    </div>
  );
}
/* â•â• DASHBOARD PAGE â•â• */
function DashboardPage({setPage,isDark,showToast,jobs,setJobs,notifs}){
  const T=useT(isDark);
  const activeJobs=jobs.filter(j=>j.status==="Active").length;
  const totalApps=jobs.reduce((a,j)=>a+j.apps,0);
  const shortlisted=jobs.reduce((a,j)=>a+j.shortlisted,0);

  const stats=[
    {label:"Active Job Posts",  val:activeJobs,  icon:"briefcase", dc:"#38BDF8",sp:[3,4,5,5,6,7,8,activeJobs],change:"+2 this week",ok:true},
    {label:"Total Applicants",  val:totalApps,   icon:"users",     dc:"#A78BFA",sp:[40,60,80,100,150,200,280,totalApps],change:"+28 today",ok:true},
    {label:"Shortlisted",       val:shortlisted, icon:"star",      dc:"#FBBF24",sp:[1,2,3,4,5,6,8,shortlisted],change:"Ready for interview",ok:true},
    {label:"Total Hired",       val:COMPANY.totalHired,icon:"checkCircle",dc:"#34D399",sp:[10,18,24,30,36,40,44,47],change:"All time",ok:true},
  ];

  return(
    <div>
      {/* Hero */}
      <Card isDark={isDark} style={{marginBottom:20,padding:0,overflow:"hidden"}}>
        <div style={{padding:"32px 36px",
          background:isDark?"linear-gradient(135deg,#0C1627,#0F2444)":"linear-gradient(135deg,#EFF6FF,#EDE9FE)",
          position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:"-5%",top:"-30%",width:360,height:360,
            borderRadius:"50%",background:isDark?"rgba(56,189,248,0.05)":"rgba(139,92,246,0.08)",
            filter:"blur(50px)",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,
                background:isDark?"rgba(52,211,153,0.12)":"rgba(22,163,74,0.1)",
                borderRadius:999,padding:"5px 13px",marginBottom:14}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:T.green,
                  display:"inline-block",animation:"pulseDot 2s infinite"}}/>
                <span style={{fontSize:11,color:T.green,fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"}}>
                  Verified Company · Professional Plan
                </span>
              </div>
              <h1 style={{fontSize:30,fontWeight:700,color:isDark?"#fff":T.t1,
                fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:6}}>
                Welcome back, {COMPANY.name}
              </h1>
              <p style={{fontSize:14,color:isDark?"rgba(255,255,255,0.55)":T.t2}}>
                {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
              </p>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Btn onClick={()=>setPage("jobs")} isDark={isDark} variant="primary" icon="plus">Post New Job</Btn>
              <Btn onClick={()=>setPage("search")} isDark={isDark} variant="ghost" icon="search">Search Seafarers</Btn>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:20}}>
        {stats.map((s,i)=>(
          <Card key={i} isDark={isDark} style={{padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:38,height:38,borderRadius:11,
                background:isDark?`${s.dc}18`:T.sub,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={s.icon} size={17} color={isDark?s.dc:T.t2} strokeWidth={1.8}/>
              </div>
              <Bdg label={s.change} color={s.ok?T.green:T.red} bg={s.ok?T.greenBg:T.redBg}/>
            </div>
            <div style={{fontSize:34,fontWeight:700,color:isDark?s.dc:T.t1,
              letterSpacing:"-0.04em",lineHeight:1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>
              {s.val.toLocaleString?s.val.toLocaleString():s.val}
            </div>
            <div style={{fontSize:12,color:T.t2,marginBottom:12}}>{s.label}</div>
            <Spark data={s.sp} color={isDark?s.dc:"#94A3B8"} height={26}/>
          </Card>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
        {/* Active jobs quick view */}
        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Active Job Posts</h3>
            <Btn onClick={()=>setPage("jobs")} isDark={isDark} variant="ghost" size="sm">View All →</Btn>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {jobs.filter(j=>j.status==="Active").map(job=>(
              <div key={job.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",
                background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderRadius:12,
                border:job.urgent?`1px solid ${T.red}30`:(isDark?"1px solid rgba(255,255,255,0.04)":"none")}}>
                <div style={{width:40,height:40,borderRadius:11,
                  background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)",
                  display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name="briefcase" size={17} color={isDark?"#38BDF8":T.t2} strokeWidth={1.8}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                    <span style={{fontSize:13,fontWeight:600,color:T.t1}}>{job.title}</span>
                    {job.urgent&&<Bdg label="URGENT" color={T.red} bg={T.redBg}/>}
                  </div>
                  <div style={{fontSize:11,color:T.t3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{job.vessel}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:14,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'JetBrains Mono',monospace"}}>{job.salary}</div>
                  <div style={{fontSize:11,color:T.t3,marginTop:2}}>{job.apps} applicants</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card isDark={isDark}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:16,fontFamily:"'Sora',sans-serif"}}>Recent Activity</h3>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {ACTIVITY.map(a=>(
              <div key={a.id} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"9px 0",
                borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.07)"}`}}>
                <div style={{width:7,height:7,borderRadius:"50%",marginTop:5,flexShrink:0,
                  background:a.ok?T.green:T.red}}/>
                <div style={{flex:1}}>
                  <p style={{fontSize:12,color:T.t2,lineHeight:1.5}}>{a.msg}</p>
                  <span style={{fontSize:10,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Talent pool preview + notifications */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Talent Pool</h3>
            <Btn onClick={()=>setPage("pool")} isDark={isDark} variant="ghost" size="sm">View All →</Btn>
          </div>
          {TALENT_POOL.map(s=>(
            <div key={s.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",
              borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}`}}>
              <Av initials={s.avatar} size={38} isDark={isDark}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:13,fontWeight:600,color:T.t1}}>{s.name}</span>
                  {s.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:999}}>✓</span>}
                </div>
                <div style={{fontSize:11,color:T.t3}}>{s.rank} · Available {s.available}</div>
              </div>
              <Bdg label={`${s.score}% match`} color={s.score>90?T.green:T.yellow} bg={s.score>90?T.greenBg:T.yellowBg}/>
            </div>
          ))}
        </Card>

        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Notifications</h3>
            <Bdg label="2 new" color={T.red} bg={T.redBg}/>
          </div>
          {(notifs||NOTIFICATIONS).slice(0,4).map(n=>(
            <div key={n.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 0",
              borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.07)"}`}}>
              <div style={{width:32,height:32,borderRadius:9,flexShrink:0,
                background:n.read?(isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)"):(isDark?"rgba(56,189,248,0.12)":"rgba(26,35,50,0.08)"),
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={n.icon} size={14} color={n.read?T.t3:(isDark?"#38BDF8":T.accent)} strokeWidth={2}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:12,color:n.read?T.t3:T.t1,fontWeight:n.read?400:500,lineHeight:1.4}}>{n.msg}</p>
                <span style={{fontSize:10,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{n.time}</span>
              </div>
              {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:isDark?"#38BDF8":T.accent,flexShrink:0,marginTop:4}}/>}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
/* â•â• JOB POSTS PAGE â•â• */
function JobsPage({isDark,showToast,jobs,setJobs}){
  const T=useT(isDark);
  const [showNew,setShowNew]=useState(false);
  const [form,setForm]=useState({title:"",vessel:"",salary:"",duration:"",rank:"",notes:"",urgent:false});
  const ranks=["Master","Chief Officer","2nd Officer","3rd Officer","Chief Engineer","2nd Engineer","3rd Engineer","ETO","Bosun","AB Seaman","Cook"];

  const postJob=()=>{
    if(!form.title||!form.salary){showToast("Fill required fields","error");return;}
    const nj={id:jobs.length+1,...form,status:"Active",apps:0,shortlisted:0,
      posted:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})};
    setJobs(p=>[nj,...p]);
    setShowNew(false);
    setForm({title:"",vessel:"",salary:"",duration:"",rank:"",notes:"",urgent:false});
    showToast("Job posted successfully!","success");
  };

  const toggleStatus=(id)=>{
    setJobs(p=>p.map(j=>j.id===id?{...j,status:j.status==="Active"?"Paused":"Active"}:j));
    showToast("Job status updated","inf✓);
  };

  const markUrgent=(id)=>{
    setJobs(p=>p.map(j=>j.id===id?{...j,urgent:!j.urgent}:j));
    const job=jobs.find(j=>j.id===id);
    showToast(job.urgent?"Urgent badge removed":"Marked as URGENT — notify sent to matching seafarers","success");
  };

  const statusColor={Active:T.green,Paused:T.yellow,Closed:T.t3};
  const statusBg={Active:T.greenBg,Paused:T.yellowBg,Closed:isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"};

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Job Postings</h2>
          <p style={{fontSize:14,color:T.t3}}>{jobs.filter(j=>j.status==="Active").length} active · {jobs.length} total</p>
        </div>
        <Btn onClick={()=>setShowNew(!showNew)} isDark={isDark} variant="primary" icon="plus">Post New Job</Btn>
      </div>

      {showNew&&(
        <Card isDark={isDark} style={{marginBottom:20,padding:28}}>
          <h3 style={{fontSize:17,fontWeight:600,color:T.t1,marginBottom:20,fontFamily:"'Sora',sans-serif"}}>New Job Posting</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
            {[
              {k:"title",   l:"Job Title *",       ph:"e.g. Chief Engineer"},
              {k:"vessel",  l:"Vessel Name",        ph:"e.g. MV Pacific Star"},
              {k:"salary",  l:"Salary (USD/mo) *",  ph:"e.g. $5,200"},
              {k:"duration",l:"Contract Duration",  ph:"e.g. 9 months"},
            ].map(f=>(
              <div key={f.k}>
                <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{f.l}</div>
                <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph}
                  style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
              </div>
            ))}
            <div>
              <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Rank Required</div>
              <select value={form.rank} onChange={e=>setForm(p=>({...p,rank:e.target.value}))}
                style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"#0f1e36":"#fff",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif"}}>
                <option value="">Select rank</option>
                {ranks.map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Mark as Urgent</div>
              <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",paddingTop:8}}>
                <div onClick={()=>setForm(p=>({...p,urgent:!p.urgent}))} style={{width:44,height:24,borderRadius:12,background:form.urgent?(isDark?"#F87171":"#DC2626"):"rgba(100,116,139,0.2)",position:"relative",cursor:"pointer",transition:"background 0.2s"}}>
                  <div style={{position:"absolute",top:3,left:form.urgent?"calc(100% - 21px)":3,width:16,height:16,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"left 0.2s"}}/>
                </div>
                <span style={{fontSize:13,color:form.urgent?T.red:T.t3,fontWeight:form.urgent?600:400}}>
                  {form.urgent?"URGENT — notify seafarers":"Not urgent"}
                </span>
              </label>
            </div>
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Job Notes / Requirements</div>
            <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Certificate requirements, special skills, etc..." rows={2}
              style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={postJob} isDark={isDark} variant="primary" icon="send">Post Job</Btn>
            <Btn onClick={()=>setShowNew(false)} isDark={isDark} variant="ghost">Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {jobs.map(job=>(
          <Card key={job.id} isDark={isDark} style={{padding:"20px 24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
              <div style={{width:46,height:46,borderRadius:13,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon name="briefcase" size={20} color={isDark?"#38BDF8":T.t2} strokeWidth={1.8}/>
              </div>
              <div style={{flex:1,minWidth:200}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <span style={{fontSize:16,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{job.title}</span>
                  <Bdg label={job.status} color={statusColor[job.status]} bg={statusBg[job.status]}/>
                  {job.urgent&&<Bdg label="URGENT" color={T.red} bg={T.redBg}/>}
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[job.vessel,job.salary+"/m✓,job.duration,`Posted ${job.posted}`].filter(Boolean).map(tag=>(
                    <Bdg key={tag} label={tag} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:16,flexShrink:0}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'Sora',sans-serif"}}>{job.apps}</div>
                  <div style={{fontSize:10,color:T.t3}}>Applicants</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:700,color:T.yellow,fontFamily:"'Sora',sans-serif"}}>{job.shortlisted}</div>
                  <div style={{fontSize:10,color:T.t3}}>Shortlisted</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap"}}>
                <Btn onClick={()=>markUrgent(job.id)} isDark={isDark} variant={job.urgent?"danger":"ghost"} size="sm" icon="zap">
                  {job.urgent?"Remove Urgent":"Mark Urgent"}
                </Btn>
                <Btn onClick={()=>toggleStatus(job.id)} isDark={isDark} variant="ghost" size="sm">
                  {job.status==="Active"?"Pause":"Activate"}
                </Btn>
                <Btn onClick={()=>showToast("Opening applicants...","inf✓)} isDark={isDark} variant="primary" size="sm" icon="users">
                  View Applicants
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* â•â• APPLICANTS PAGE â•â• */
function ApplicantsPage({isDark,showToast,jobs}){
  const T=useT(isDark);
  const [selectedJob,setSelectedJob]=useState("all");
  const [applicants,setApplicants]=useState(APPLICANTS);
  const stageColors={Applied:T.t3,Shortlisted:"#38BDF8",Interview:"#A78BFA",Offer:T.yellow,Hired:T.green,Rejected:T.red};

  const filtered=selectedJob==="all"?applicants:applicants.filter(a=>a.jobId===parseInt(selectedJob));

  const moveStage=async(id,newStage)=>{
    setApplicants(p=>p.map(a=>a.id===id?{...a,status:newStage}:a));
    showToast(`Applicant moved to ${newStage}`,"success");
    try {
      await fetch(`${API}/api/applications/${id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ status: newStage.toLowerCase() })
      });
    } catch(e) {}
  };

  const notify=(name)=>showToast(`Notification sent to ${name}`,"success");

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Applicants</h2>
        <p style={{fontSize:14,color:T.t3}}>{applicants.length} total applicants across all jobs</p>
      </div>

      {/* Filter by job */}
      <Card isDark={isDark} style={{marginBottom:16,padding:14}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:12,color:T.t3,fontWeight:600}}>Filter:</span>
          {[{id:"all",title:"All Jobs"},...jobs].map(j=>(
            <button key={j.id} onClick={()=>setSelectedJob(String(j.id))}
              style={{padding:"6px 14px",borderRadius:10,border:"none",cursor:"pointer",
                fontWeight:600,fontSize:12,fontFamily:"'Inter',sans-serif",transition:"all 0.15s",
                background:selectedJob===String(j.id)?(isDark?"#38BDF8":"#1a2332"):(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"),
                color:selectedJob===String(j.id)?"#fff":T.t3}}>
              {j.title}
            </button>
          ))}
        </div>
      </Card>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.map(app=>{
          const job=jobs.find(j=>j.id===app.jobId);
          const col=stageColors[app.status]||T.t3;
          return(
            <Card key={app.id} isDark={isDark} style={{padding:"18px 22px"}}>
              <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                <Av initials={app.avatar} size={46} isDark={isDark}/>
                <div style={{flex:1,minWidth:180}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <span style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{app.name}</span>
                    {app.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:999}}>✓ VER</span>}
                  </div>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                    <Bdg label={app.rank} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                    <Bdg label={app.country} color={T.t3} bg={isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.05)"}/>
                    <Bdg label={app.exp} color={T.t2} bg={isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.05)"}/>
                    {job&&<Bdg label={`For: ${job.title}`} color={isDark?"#38BDF8":T.accent} bg={isDark?"rgba(56,189,248,0.1)":T.accentBg}/>}
                  </div>
                </div>

                {/* Match score */}
                <div style={{width:72,flexShrink:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:10,color:T.t3}}>Match</span>
                    <span style={{fontSize:11,fontWeight:700,color:app.score>90?T.green:app.score>80?T.yellow:T.t2}}>{app.score}%</span>
                  </div>
                  <div style={{height:4,borderRadius:2,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}}>
                    <div style={{height:"100%",width:`${app.score}%`,borderRadius:2,
                      background:app.score>90?T.green:app.score>80?T.yellow:T.t2}}/>
                  </div>
                </div>

                {/* Stage */}
                <Bdg label={app.status} color={col} bg={`${col}18`}/>

                {/* Actions */}
                <div style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap"}}>
                  <select value={app.status}
                    onChange={e=>moveStage(app.id,e.target.value)}
                    style={{padding:"7px 10px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"#0f1e36":"#fff",color:T.t1,fontSize:11,outline:"none",fontFamily:"'Inter',sans-serif",cursor:"pointer"}}>
                    {["Applied","Shortlisted","Interview","Offer","Hired","Rejected"].map(s=><option key={s}>{s}</option>)}
                  </select>
                  <Btn onClick={()=>notify(app.name)} isDark={isDark} variant="ghost" size="sm" icon="send">Notify</Btn>
                  <Btn onClick={()=>showToast("Opening profile...","inf✓)} isDark={isDark} variant="primary" size="sm" icon="eye">View</Btn>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
/* â•â• PIPELINE PAGE â•â• */
function PipelinePage({isDark,showToast}){
  const T=useT(isDark);
  const [pipeline,setPipeline]=useState(APPLICANTS);
  const stages=["Applied","Shortlisted","Interview","Offer","Hired"];
  const sCols={Applied:T.t3,Shortlisted:"#38BDF8",Interview:"#A78BFA",Offer:T.yellow,Hired:T.green};

  const move=async(id,dir)=>{
    setPipeline(p=>{
      return p.map(a=>{
        if(a.id!==id)return a;
        const idx=stages.indexOf(a.status);
        const next=stages[idx+dir];
        if(next) {
          try {
            fetch(`${API}/api/applications/${id}`, {
              method: "PUT",
              headers: authHeader(),
              body: JSON.stringify({ status: next.toLowerCase() })
            }).catch(()=>{});
          } catch(e) {}
          return {...a,status:next};
        }
        return a;
      });
    });
  };

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Hiring Pipeline</h2>
        <p style={{fontSize:14,color:T.t3}}>Drag candidates through your hiring stages</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
        {stages.map(stage=>{
          const items=pipeline.filter(a=>a.status===stage);
          const col=sCols[stage]||T.t2;
          return(
            <div key={stage}>
              <div style={{padding:"8px 12px",borderRadius:10,background:`${col}18`,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:1}}>{stage}</span>
                <span style={{fontSize:10,fontWeight:700,color:col,background:`${col}20`,padding:"2px 7px",borderRadius:999}}>{items.length}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {items.map(a=>(
                  <Card key={a.id} isDark={isDark} style={{padding:"13px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <Av initials={a.avatar} size={30} isDark={isDark}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,fontWeight:600,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</div>
                        <div style={{fontSize:10,color:T.t3}}>{a.rank}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:4}}>
                        <Icon name="target" size={10} color={col} strokeWidth={2}/>
                        <span style={{fontSize:11,fontWeight:700,color:col}}>{a.score}%</span>
                      </div>
                      {a.verified&&<span style={{fontSize:8,fontWeight:800,color:"#38BDF8",background:"rgba(56,189,248,0.12)",padding:"2px 6px",borderRadius:999}}>✓ VER</span>}
                    </div>
                    <div style={{display:"flex",gap:4}}>
                      {stages.indexOf(a.status)>0&&(
                        <button onClick={()=>move(a.id,-1)} style={{flex:1,padding:"5px 0",borderRadius:7,border:"none",background:isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)",color:T.t3,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>â†</button>
                      )}
                      <button onClick={()=>showToast(`Notification sent to ${a.name}`,"success")} style={{flex:2,padding:"5px 0",borderRadius:7,border:"none",background:`${col}18`,color:col,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                        <Icon name="send" size={10} color="currentColor" strokeWidth={2}/>Notify
                      </button>
                      {stages.indexOf(a.status)<stages.length-1&&(
                        <button onClick={()=>move(a.id,1)} style={{flex:1,padding:"5px 0",borderRadius:7,border:"none",background:`${col}18`,color:col,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>→</button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* â•â• SEARCH SEAFARERS PAGE â•â• */
function SearchPage({isDark,showToast}){
  const T=useT(isDark);
  const [search,setSearch]=useState("");
  const [rankFilter,setRankFilter]=useState("All");
  const [pool,setPool]=useState(TALENT_POOL);

  const allSeafarers=[
    {id:1,name:"Capt. Rajesh Fernand✓,rank:"Master",        country:"Sri Lanka",verified:true, score:96,avatar:"RF",exp:"18 yrs",available:"Jul 2025",sub:"Pr✓},
    {id:2,name:"Eng. Priya Nair",      rank:"Chief Engineer",country:"India",    verified:true, score:91,avatar:"PN",exp:"12 yrs",available:"Jun 2025",sub:"Pr✓},
    {id:3,name:"Shanaka Perera",       rank:"Chief Officer", country:"Sri Lanka",verified:true, score:88,avatar:"SP",exp:"9 yrs", available:"Aug 2025",sub:"Free"},
    {id:4,name:"Mohammed Al Farsi",    rank:"2nd Officer",   country:"Oman",     verified:false,score:74,avatar:"MA",exp:"4 yrs", available:"Now",     sub:"Free"},
    {id:5,name:"Dilshan Wickrama",     rank:"ETO",           country:"Sri Lanka",verified:true, score:82,avatar:"DW",exp:"7 yrs", available:"Sep 2025",sub:"Pr✓},
    {id:6,name:"Vikram Nair",          rank:"Chief Engineer",country:"India",    verified:true, score:90,avatar:"VN",exp:"12 yrs",available:"Jun 2025",sub:"Pr✓},
    {id:7,name:"James Okafor",         rank:"Chief Officer", country:"Nigeria",  verified:true, score:83,avatar:"JO",exp:"8 yrs", available:"Now",     sub:"Pr✓},
    {id:8,name:"Chen Wei Long",        rank:"Chief Officer", country:"China",    verified:false,score:79,avatar:"CW",exp:"6 yrs", available:"Oct 2025",sub:"Free"},
  ];

  const ranks=["All","Master","Chief Officer","Chief Engineer","2nd Officer","ETO"];
  const filtered=allSeafarers.filter(s=>
    (rankFilter==="All"||s.rank===rankFilter)&&
    (s.name.toLowerCase().includes(search.toLowerCase())||s.rank.toLowerCase().includes(search.toLowerCase()))
  );

  const addToPool=(s)=>{
    if(pool.find(p=>p.id===s.id)){showToast("Already in talent pool","warning");return;}
    setPool(p=>[...p,{...s,notes:""}]);
    showToast(`${s.name} added to talent pool`,"success");
  };

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Search Seafarers</h2>
        <p style={{fontSize:14,color:T.t3}}>Browse verified maritime professionals. Your Professional plan includes unlimited views.</p>
      </div>

      <Card isDark={isDark} style={{marginBottom:16,padding:16,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:2,minWidth:200}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={15} color={T.t3} strokeWidth={2}/></span>
          <input placeholder="Search by name, rank, country..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.07)":"none",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)",color:T.t1,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'Inter',sans-serif"}}/>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {ranks.map(r=>(
            <button key={r} onClick={()=>setRankFilter(r)} style={{padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:600,fontSize:11,fontFamily:"'Inter',sans-serif",transition:"all 0.15s",
              background:rankFilter===r?(isDark?"#38BDF8":"#1a2332"):(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"),
              color:rankFilter===r?"#fff":T.t3}}>{r}</button>
          ))}
        </div>
      </Card>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
        {filtered.map(s=>(
          <Card key={s.id} isDark={isDark} style={{padding:"18px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <Av initials={s.avatar} size={46} isDark={isDark}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                  <span style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{s.name}</span>
                  {s.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:999}}>✓ VER</span>}
                </div>
                <div style={{fontSize:11,color:T.t3}}>{s.rank} · {s.country} · {s.exp}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:20,fontWeight:700,color:s.score>90?T.green:s.score>80?T.yellow:T.t2,fontFamily:"'Sora',sans-serif"}}>{s.score}%</div>
                <div style={{fontSize:9,color:T.t3}}>match</div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:6}}>
                <Bdg label={`Available ${s.available}`} color={s.available==="Now"?T.green:T.yellow} bg={s.available==="Now"?T.greenBg:T.yellowBg}/>
                <Bdg label={s.sub==="Pr✓?"Pr✓:"Free"} color={s.sub==="Pr✓?T.yellow:T.t3} bg={s.sub==="Pr✓?T.yellowBg:(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)")}/>
              </div>
              <div style={{display:"flex",gap:6}}>
                <Btn onClick={()=>showToast("Viewing full profile...","inf✓)} isDark={isDark} variant="ghost" size="sm" icon="eye">View</Btn>
                <Btn onClick={()=>addToPool(s)} isDark={isDark} variant="primary" size="sm" icon="star">Save</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* â•â• TALENT POOL PAGE â•â• */
function TalentPoolPage({isDark,showToast}){
  const T=useT(isDark);
  const [pool,setPool]=useState(TALENT_POOL);
  const [notes,setNotes]=useState({});

  const saveNote=(id)=>{
    setPool(p=>p.map(s=>s.id===id?{...s,notes:notes[id]||s.notes}:s));
    showToast("Note saved","success");
  };

  const remove=(id)=>{
    setPool(p=>p.filter(s=>s.id!==id));
    showToast("Removed from talent pool","inf✓);
  };

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Talent Pool</h2>
        <p style={{fontSize:14,color:T.t3}}>{pool.length} saved seafarers — your private shortlist</p>
      </div>

      {pool.length===0?(
        <Card isDark={isDark} style={{textAlign:"center",padding:"60px 24px"}}>
          <Icon name="star" size={44} color={T.t3} strokeWidth={1.5}/>
          <p style={{fontSize:16,fontWeight:600,color:T.t1,marginTop:14,fontFamily:"'Sora',sans-serif"}}>Your talent pool is empty</p>
          <p style={{fontSize:13,color:T.t3,marginTop:6}}>Search for seafarers and save them here for future roles</p>
        </Card>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {pool.map(s=>(
            <Card key={s.id} isDark={isDark} style={{padding:"20px 24px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:14,flexWrap:"wrap"}}>
                <Av initials={s.avatar} size={48} isDark={isDark}/>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <span style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{s.name}</span>
                    {s.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:999}}>✓ VER</span>}
                  </div>
                  <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}>
                    <Bdg label={s.rank} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                    <Bdg label={s.country} color={T.t3} bg={isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.05)"}/>
                    <Bdg label={`Available ${s.available}`} color={T.yellow} bg={T.yellowBg}/>
                    <Bdg label={`${s.score}% match`} color={s.score>90?T.green:T.yellow} bg={s.score>90?T.greenBg:T.yellowBg}/>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input value={notes[s.id]!==undefined?notes[s.id]:s.notes} onChange={e=>setNotes(p=>({...p,[s.id]:e.target.value}))} placeholder="Add private note..."
                      style={{flex:1,padding:"8px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:12,outline:"none",fontFamily:"'Inter',sans-serif"}}/>
                    <Btn onClick={()=>saveNote(s.id)} isDark={isDark} variant="ghost" size="sm">Save Note</Btn>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0,flexDirection:"column"}}>
                  <Btn onClick={()=>showToast(`Contacting ${s.name}...`,"inf✓)} isDark={isDark} variant="primary" size="sm" icon="send">Contact</Btn>
                  <Btn onClick={()=>remove(s.id)} isDark={isDark} variant="danger" size="sm">Remove</Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* â• â•  INVOICES PAGE â• â•  */
function InvoicesPage({isDark,showToast}){
  const T=useT(isDark);
  const [showModal,setShowModal]=useState(false);
  const [selectedPlan,setSelectedPlan]=useState(null);
  const [refNo,setRefNo]=useState("");
  const [submitting,setSubmitting]=useState(false);
  const [payments,setPayments]=useState([]);

  const API="https://oceancrew-backend-production.up.railway.app";
  const token=()=>localStorage.getItem("token");

  useEffect(()=>{
    fetch(`${API}/api/payments/my`,{headers:{Authorization:`Bearer ${token()}`}})
      .then(r=>r.json()).then(d=>{if(Array.isArray(d))setPayments(d);})
      .catch(()=>{});
  },[]);

  const plans=[
    {id:"professional",name:"Professional Plan",price:149,features:["Unlimited job posts","Applicant management","Smart matching","Email support"]},
    {id:"enterprise",name:"Enterprise Plan",price:399,features:["Everything in Pr✓,"Dedicated account manager","API access","Priority support","Custom branding"]},
  ];

  const submitTransfer=async()=>{
    if(!refNo.trim()){showToast("Enter your bank transfer reference number","warning");return;}
    setSubmitting(true);
    try{
      const r=await fetch(`${API}/api/payments/bank-transfer`,{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${token()}`},
        body:JSON.stringify({plan:selectedPlan.name,amount:selectedPlan.price,reference:refNo}),
      });
      if(r.ok){
        showToast("Bank transfer submitted! Admin will verify within 24 hours.","success");
        setShowModal(false);setRefNo("");
        // refresh
        fetch(`${API}/api/payments/my`,{headers:{Authorization:`Bearer ${token()}`}})
          .then(r=>r.json()).then(d=>{if(Array.isArray(d))setPayments(d);});
      }else{
        const d=await r.json();showToast(d.message||"Failed to submit","error");
      }
    }catch{showToast("Network error","error");}
    setSubmitting(false);
  };

  const statusColor={pending:T.yellow,approved:T.green,rejected:T.red};
  const statusBg={pending:T.yellowBg,approved:T.greenBg,rejected:T.redBg};

  return(
    <div>
      {/* Bank Transfer Modal */}
      {showModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:isDark?"#10121A":"#fff",borderRadius:20,padding:"32px 36px",maxWidth:480,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.4)",border:isDark?"1px solid rgba(255,255,255,0.08)":"none"}}>
            <div style={{marginBottom:24}}>
              <div style={{fontSize:11,color:isDark?"#38BDF8":T.accent,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Bank Transfer</div>
              <h3 style={{fontSize:22,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:6}}>{selectedPlan?.name}</h3>
              <div style={{fontSize:32,fontWeight:700,color:T.green,fontFamily:"'Sora',sans-serif"}}>${selectedPlan?.price}<span style={{fontSize:14,color:T.t3,fontWeight:400}}>/month</span></div>
            </div>
            <div style={{background:isDark?"rgba(56,189,248,0.06)":"rgba(26,35,50,0.03)",borderRadius:12,padding:"16px 18px",marginBottom:20,border:isDark?"1px solid rgba(56,189,248,0.15)":"1px solid rgba(26,35,50,0.08)"}}>
              <div style={{fontSize:11,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Transfer To</div>
              {[["Bank","OceanCrew Financial Ltd"],["Account","4521-7890-3456"],["Reference","Your company name"],["Amount",`$${selectedPlan?.price} USD`]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:T.t3}}>{k}</span>
                  <span style={{fontSize:12,fontWeight:600,color:T.t1,fontFamily:k==="Account"||k==="Amount"?"'JetBrains Mono',monospace":"inherit"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Your Bank Reference Number</div>
              <input value={refNo} onChange={e=>setRefNo(e.target.value)} placeholder="e.g. TXN2025060312345"
                style={{width:"100%",padding:"11px 14px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(100,116,139,0.2)",background:isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={submitTransfer} disabled={submitting} style={{flex:1,padding:"13px",borderRadius:11,border:"none",background:isDark?"#38BDF8":"#1a2332",color:"#fff",fontSize:13,fontWeight:700,cursor:submitting?"not-allowed":"pointer",fontFamily:"'Inter',sans-serif",opacity:submitting?0.7:1}}>
                {submitting?"Submitting...":"Submit Transfer"}
              </button>
              <button onClick={()=>{setShowModal(false);setRefNo("");}} style={{padding:"13px 20px",borderRadius:11,border:isDark?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(100,116,139,0.2)",background:"transparent",color:T.t2,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Plans & Billing</h2>
        <p style={{fontSize:14,color:T.t3}}>Choose a plan and pay via bank transfer. Admin verifies within 24h and sends your invoice.</p>
      </div>

      {/* Plans */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
        {plans.map(plan=>(
          <Card key={plan.id} isDark={isDark} style={{border:isDark?"1px solid rgba(255,255,255,0.08)":"none"}}>
            <div style={{fontSize:18,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>{plan.name}</div>
            <div style={{fontSize:30,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'Sora',sans-serif",marginBottom:16}}>${plan.price}<span style={{fontSize:13,color:T.t3,fontWeight:400}}>/mo</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {plan.features.map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:8}}>
                  <Icon name="check" size={13} color={T.green} strokeWidth={2.5}/>
                  <span style={{fontSize:12,color:T.t2}}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>{setSelectedPlan(plan);setShowModal(true);}} style={{width:"100%",padding:"11px",borderRadius:10,border:"none",background:isDark?"#38BDF8":"#1a2332",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
              Pay via Bank Transfer
            </button>
          </Card>
        ))}
      </div>

      {/* Payment History */}
      {payments.length>0&&(
        <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
          <div style={{padding:"14px 22px",borderBottom:isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.08)"}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Payment History</h3>
          </div>
          {payments.map((p,i)=>(
            <div key={p._id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",padding:"14px 22px",borderBottom:i<payments.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none",alignItems:"center"}}>
              <span style={{fontSize:13,fontWeight:600,color:T.t1}}>{p.plan}</span>
              <span style={{fontSize:13,color:T.green,fontWeight:700}}>${p.amount}</span>
              <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{p.reference||"N/A"}</span>
              <Bdg label={p.status} color={statusColor[p.status]||T.t3} bg={statusBg[p.status]||isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"}/>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* â•â• NOTIFICATIONS PAGE â•â• */
function NotificationsPage({isDark,showToast,notifs,setNotifs}){
  const T=useT(isDark);
  const markRead=async(id)=>{
    setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n));
    if(typeof id === "string") {
      try { await fetch(`${API}/api/notifications/${id}/read`, {method:"PUT",headers:authHeader()}); }catch{}
    }
  };
  const markAll=async()=>{
    setNotifs(p=>p.map(n=>({...n,read:true})));
    try { await fetch(`${API}/api/notifications/read-all`, {method:"PUT",headers:authHeader()}); }catch{}
  };
  const unread=notifs.filter(n=>!n.read).length;
  const notifColors={application:isDark?"#38BDF8":T.accent,match:T.green,invoice:T.yellow,expiry:T.purple,platform:T.t3};

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Notifications</h2>
          <p style={{fontSize:14,color:T.t3}}>{unread} unread notifications</p>
        </div>
        {unread>0&&<Btn onClick={markAll} isDark={isDark} variant="ghost" size="sm">Mark All Read</Btn>}
      </div>
      <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
        {notifs.map((n,i)=>{
          const col=notifColors[n.type]||T.t3;
          return(
            <div key={n.id} onClick={()=>markRead(n.id)} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 22px",borderBottom:i<notifs.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none",cursor:"pointer",background:!n.read?(isDark?"rgba(56,189,248,0.03)":"rgba(26,35,50,0.02)"):"transparent",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.03)"}
              onMouseLeave={e=>e.currentTarget.style.background=!n.read?(isDark?"rgba(56,189,248,0.03)":"rgba(26,35,50,0.02)"):"transparent"}>
              <div style={{width:38,height:38,borderRadius:11,background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${col}25`}}>
                <Icon name={n.icon} size={16} color={col} strokeWidth={2}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:13,color:n.read?T.t2:T.t1,fontWeight:n.read?400:500,lineHeight:1.5,marginBottom:4}}>{n.msg}</p>
                <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{n.time}</span>
              </div>
              {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:isDark?"#38BDF8":T.accent,flexShrink:0,marginTop:6}}/>}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* â•â• COMPANY PROFILE PAGE â•â• */
function ProfilePage({isDark,showToast}){
  const T=useT(isDark);
  const [form,setForm]=useState({
    name:COMPANY.name,email:COMPANY.email,country:COMPANY.country,
    website:"www.pacificstarshipping.com",phone:"+65 6123 4567",
    about:"Pacific Star Shipping Co. is a leading container and bulk carrier operator based in Singapore. We operate a fleet of 12 vessels across Asia-Pacific routes.",
    vessels:"Container Vessel, Bulk Carrier",certs:"ISM Code, ISO 9001, MLC 2006",
  });

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Company Profile</h2>
        <p style={{fontSize:14,color:T.t3}}>This is how seafarers see your company on OceanCrew</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
        {/* Profile card preview */}
        <Card isDark={isDark}>
          <div style={{textAlign:"center",paddingBottom:20,borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}`,marginBottom:20}}>
            <div style={{width:72,height:72,borderRadius:20,background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:26,fontWeight:700,color:T.t2,fontFamily:"'Sora',sans-serif",border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(0,0,0,0.06)"}}>PS</div>
            <div style={{fontSize:17,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>{form.name}</div>
            <div style={{fontSize:12,color:T.t3,marginBottom:10}}>{form.country}</div>
            <div style={{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
              <Bdg label="✓ Verified" color="#38BDF8" bg="rgba(56,189,248,0.1)"/>
              <Bdg label={COMPANY.plan} color={T.yellow} bg={T.yellowBg}/>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {icon:"briefcase",val:`${COMPANY.activeJobs} Active Jobs`},
              {icon:"checkCircle",val:`${COMPANY.totalHired} Hired All Time`},
              {icon:"activity",val:`${COMPANY.responseRate}% Response Rate`},
              {icon:"clock",val:`Member since ${COMPANY.joined}`},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                <Icon name={s.icon} size={15} color={isDark?"#38BDF8":T.t2} strokeWidth={1.8}/>
                <span style={{fontSize:13,color:T.t2}}>{s.val}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Edit form */}
        <Card isDark={isDark}>
          <h3 style={{fontSize:16,fontWeight:600,color:T.t1,marginBottom:20,fontFamily:"'Sora',sans-serif"}}>Edit Company Details</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            {[
              {k:"name",l:"Company Name"},
              {k:"email",l:"Hiring Email"},
              {k:"country",l:"Country / HQ"},
              {k:"phone",l:"Phone Number"},
              {k:"website",l:"Website"},
              {k:"vessels",l:"Vessel Types Operated"},
              {k:"certs",l:"Certifications"},
            ].map(f=>(
              <div key={f.k} style={{gridColumn:f.k==="vessels"||f.k==="certs"?"1/-1":"aut✓}}>
                <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{f.l}</div>
                <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                  style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>About Company</div>
            <textarea value={form.about} onChange={e=>setForm(p=>({...p,about:e.target.value}))} rows={3}
              style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <Btn onClick={()=>showToast("Profile saved successfully","success")} isDark={isDark} variant="primary" icon="check">Save Profile</Btn>
        </Card>
      </div>
    </div>
  );
}

/* â•â• SETTINGS PAGE â•â• */
function SettingsPage({isDark,showToast}){
  const T=useT(isDark);
  return(
    <div>
      <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:24}}>Settings</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {[
          {title:"Notifications",icon:"bell",items:[
            {l:"New Application Alerts",v:true,type:"toggle"},
            {l:"Smart Match Alerts",v:true,type:"toggle"},
            {l:"Invoice Reminders",v:true,type:"toggle"},
            {l:"Platform Updates",v:false,type:"toggle"},
          ]},
          {title:"Account",icon:"settings",items:[
            {l:"Hiring Contact Email",v:"hiring@pacificstar.com",type:"text"},
            {l:"Password",v:"••••••••",type:"text"},
            {l:"Two-Factor Authentication",v:false,type:"toggle"},
          ]},
        ].map(sec=>(
          <Card key={sec.title} isDark={isDark}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <div style={{width:36,height:36,borderRadius:10,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.07)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={sec.icon} size={16} color={T.t2} strokeWidth={2}/>
              </div>
              <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{sec.title}</h3>
            </div>
            {sec.items.map((item,i)=>(
              <div key={item.l} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:i<sec.items.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none"}}>
                <span style={{fontSize:13,fontWeight:500,color:T.t2}}>{item.l}</span>
                {item.type==="toggle"?(
                  <div style={{width:44,height:24,borderRadius:12,background:item.v?(isDark?"#38BDF8":"#1a2332"):"rgba(100,116,139,0.15)",position:"relative",cursor:"pointer",transition:"background 0.2s"}}>
                    <div style={{position:"absolute",top:3,left:item.v?"calc(100% - 21px)":3,width:16,height:16,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"left 0.2s"}}/>
                  </div>
                ):(
                  <input defaultValue={item.v} style={{padding:"8px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.07)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",width:220,fontFamily:"'Inter',sans-serif"}}/>
                )}
              </div>
            ))}
          </Card>
        ))}
        <Btn onClick={()=>showToast("Settings saved","success")} isDark={isDark} variant="primary" icon="check">Save Settings</Btn>
      </div>
    </div>
  );
}
/* â•â• ROOT APP â•â• */
export default function CompanyDashboard(){
  const [page,setPage]=useState("dashboard");
  const [sidebar,setSidebar]=useState(true);
  const [theme,setTheme]=useState("dark");
  const [toast,setToast]=useState(null);
  const [jobs,setJobs]=useState(JOBS);
  const [notifs,setNotifs]=useState(NOTIFICATIONS);

  const isDark=theme==="dark";
  const T=useT(isDark);
  const showToast=(msg,type="inf✓)=>setToast({msg,type});

  const loadNotifs=async()=>{
    try{
      const r=await fetch(`${API}/api/notifications`,{headers:authHeader()});
      const d=await r.json();
      if(Array.isArray(d)){
        const mapped=d.map(n=>({id:n._id,type:n.type,msg:n.msg,icon:n.icon||"bell",time:new Date(n.createdAt).toLocaleDateString(),read:n.read}));
        setNotifs([...mapped,...NOTIFICATIONS]);
      }
    }catch{}
  };

  useEffect(()=>{loadNotifs();},[]);

  const renderPage=()=>{
    const p={isDark,showToast,jobs,setJobs,notifs,setNotifs};
    switch(page){
      case "dashboard":    return <DashboardPage setPage={setPage} {...p}/>;
      case "jobs":         return <JobsPage {...p}/>;
      case "applicants":   return <ApplicantsPage {...p}/>;
      case "pipeline":     return <PipelinePage {...p}/>;
      case "search":       return <SearchPage {...p}/>;
      case "pool":         return <TalentPoolPage {...p}/>;
      case "invoices":     return <InvoicesPage {...p}/>;
      case "notifications":return <NotificationsPage {...p}/>;
      case "profile":      return <ProfilePage {...p}/>;
      case "settings":     return <SettingsPage {...p}/>;
      default:             return <DashboardPage setPage={setPage} {...p}/>;
    }
  };

  const unreadNotifs=notifs.filter(n=>!n.read).length;

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body,html{font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.5)}}
        .page-anim{animation:fadeIn .3s ease both;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"};border-radius:3px;}
        input::placeholder,textarea::placeholder{color:${T.t3};}
        input,select,textarea,button{font-family:'Inter',-apple-system,sans-serif;}
        select option{background:${isDark?"#10121A":"#fff"};color:${T.t1};}
      `}</style>

      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}

      <div style={{display:"flex",minHeight:"100vh",background:isDark?D.page:L.page}}>

        {/* SIDEBAR */}
        <aside style={{width:sidebar?252:68,minHeight:"100vh",background:T.sidebar,
          boxShadow:isDark?"1px 0 0 rgba(255,255,255,0.05)":"2px 0 24px rgba(150,170,200,0.1)",
          display:"flex",flexDirection:"column",
          position:"fixed",top:0,left:0,bottom:0,
          zIndex:1000,transition:"width .28s ease",overflow:"hidden"}}>

          {/* Logo */}
          <div style={{padding:sidebar?"20px 18px":"18px 14px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",alignItems:"center",gap:12,whiteSpace:"nowrap"}}>
            <div style={{width:38,height:38,borderRadius:11,background:isDark?"linear-gradient(135deg,#0284C7,#38BDF8)":"#1a2332",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:isDark?"0 4px 16px rgba(2,132,199,0.35)":"0 4px 12px rgba(26,35,50,0.22)"}}>
              <Icon name="anchor" size={18} color="#fff" strokeWidth={2}/>
            </div>
            {sidebar&&(
              <div>
                <div style={{fontWeight:700,fontSize:17,color:T.t1,fontFamily:"'Sora',sans-serif",lineHeight:1.1}}>OceanCrew</div>
                <div style={{fontSize:8,color:isDark?"#38BDF8":"#94A3B8",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginTop:2}}>Company Portal</div>
              </div>
            )}
          </div>

          {/* Company badge */}
          {sidebar&&(
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2,fontWeight:700,fontSize:12,fontFamily:"'Sora',sans-serif",flexShrink:0}}>{COMPANY.logo}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{COMPANY.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                  <span style={{fontSize:9,color:"#38BDF8",fontWeight:700}}>✓ VERIFIED</span>
                  <span style={{fontSize:9,color:T.t3}}>· Professional</span>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav style={{flex:1,padding:"10px 8px",overflowY:"aut✓,display:"flex",flexDirection:"column",gap:0}}>
            {NAV.map(section=>(
              <div key={section.section}>
                {sidebar&&<div style={{fontSize:9,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:"0.12em",padding:"10px 12px 4px",marginTop:6}}>{section.section}</div>}
                {section.items.map(item=>{
                  const active=page===item.id;
                  const ac=isDark?"#38BDF8":"#1a2332";
                  const badge=item.id==="notifications"?unreadNotifs:item.badge;
                  return(
                    <button key={item.id} onClick={()=>setPage(item.id)} title={!sidebar?item.label:""}
                      style={{width:"100%",display:"flex",alignItems:"center",gap:9,
                        padding:sidebar?"8px 12px":"10px",borderRadius:10,border:"none",cursor:"pointer",
                        background:active?(isDark?"rgba(56,189,248,0.1)":"rgba(26,35,50,0.07)"):"transparent",
                        color:active?ac:T.t3,fontSize:13,fontWeight:active?600:400,
                        justifyContent:sidebar?"flex-start":"center",
                        transition:"all .12s",fontFamily:"'Inter',sans-serif",
                        borderLeft:`2px solid ${active?ac:"transparent"}`}}
                      onMouseEnter={e=>{if(!active){e.currentTarget.style.background=isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)";e.currentTarget.style.color=T.t1;}}}
                      onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t3;}}}>
                      <Icon name={item.icon} size={15} color="currentColor" strokeWidth={active?2.2:1.8}/>
                      {sidebar&&<span style={{flex:1,whiteSpace:"nowrap"}}>{item.label}</span>}
                      {sidebar&&badge>0&&(
                        <span style={{background:"#EF4444",color:"#fff",borderRadius:999,minWidth:17,height:17,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,padding:"0 4px"}}>{badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Collapse */}
          <div style={{padding:"10px 8px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`}}>
            <button onClick={()=>setSidebar(s=>!s)}
              style={{width:"100%",padding:"8px",borderRadius:9,
                border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`,
                background:"transparent",color:T.t3,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",
                gap:6,fontSize:11,fontWeight:500,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)";e.currentTarget.style.color=T.t1;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t3;}}>
              <Icon name={sidebar?"chevronLeft":"chevronRight"} size={13} strokeWidth={2.2}/>
              {sidebar&&"Collapse"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{flex:1,marginLeft:sidebar?252:68,transition:"margin-left .28s ease",display:"flex",flexDirection:"column",minWidth:0}}>

          {/* Header */}
          <header style={{background:isDark?D.header:L.header,
            backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
            borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(150,170,200,0.15)"}`,
            padding:"0 28px",height:60,
            display:"flex",alignItems:"center",justifyContent:"space-between",
            position:"sticky",top:0,zIndex:100,gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <h2 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>
                {NAV.flatMap(s=>s.items).find(n=>n.id===page)?.label||"Dashboard"}
              </h2>
              <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>
                {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
              </span>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {/* Search */}
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={13} color={T.t3} strokeWidth={2}/></span>
                <input placeholder="Search..." style={{width:160,padding:"7px 12px 7px 30px",borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",color:T.t1,fontSize:12,outline:"none",fontFamily:"'Inter',sans-serif"}}/>
              </div>

              {/* Post job quick btn */}
              <Btn onClick={()=>setPage("jobs")} isDark={isDark} variant="primary" size="sm" icon="plus">Post Job</Btn>

              {/* Theme */}
              <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")}
                style={{width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2,transition:"all .12s"}}>
                <Icon name={isDark?"sun":"moon"} size={14} strokeWidth={2}/>
              </button>

              {/* Notifications bell */}
              <button onClick={()=>setPage("notifications")}
                style={{width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2,position:"relative"}}>
                <Icon name="bell" size={14} strokeWidth={2}/>
                {unreadNotifs>0&&<div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:"#EF4444",border:`2px solid ${isDark?"#08090C":"#fff"}`}}/>}
              </button>

              {/* Company avatar */}
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px 5px 6px",background:isDark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.95)",borderRadius:999,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,cursor:"pointer"}}
                onClick={()=>setPage("profile")}>
                <div style={{width:26,height:26,borderRadius:8,background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:T.t2,flexShrink:0,fontFamily:"'Sora',sans-serif"}}>{COMPANY.logo}</div>
                <span style={{fontSize:12,fontWeight:600,color:T.t1}}>{COMPANY.name.split(" ")[0]}</span>
              </div>
            </div>
          </header>

          <main style={{flex:1,padding:24,overflowY:"aut✓}}>
            <div className="page-anim">{renderPage()}</div>
          </main>

          <footer style={{padding:"11px 28px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(150,170,200,0.1)"}`,background:isDark?D.header:L.header,backdropFilter:"blur(16px)",textAlign:"center"}}>
            <p style={{fontSize:11,color:T.t3}}>
              2025 <strong style={{color:isDark?"#38BDF8":T.t1,fontWeight:600}}>OceanCrew</strong> Company Portal
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
