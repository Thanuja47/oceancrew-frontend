import { useState, useEffect } from "react";

const API = "https://oceancrew-backend-production.up.railway.app";
const getToken = () => localStorage.getItem("token");
const authHeader = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` });

const Icon = ({ name, size=18, color="currentColor", strokeWidth=1.8 }) => {
  const icons = {
    dashboard:<><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    building:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    chartBar:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    creditCard:<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    activity:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    checkCircle:<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    xCircle:<><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    alertCircle:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    trendUp:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    zap:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    fileText:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    download:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    anchor:<><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    moon:<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    chevronLeft:<><polyline points="15 18 9 12 15 6"/></>,
    chevronRight:<><polyline points="9 18 15 12 9 6"/></>,
    ban:<><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    layers:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    award:<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    target:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    mail:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    send:<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    dollarSign:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    filter:<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    messageSquare:<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    users:        <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    clock:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
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

const D = {
  page:"#08090C",card:"#10121A",sub:"#181B26",
  border:"rgba(255,255,255,0.07)",t1:"#F1F5F9",t2:"#94A3B8",t3:"#475569",
  accent:"#38BDF8",accentBg:"rgba(56,189,248,0.1)",
  green:"#34D399",greenBg:"rgba(52,211,153,0.12)",
  red:"#F87171",redBg:"rgba(248,113,113,0.12)",
  yellow:"#FBBF24",yellowBg:"rgba(251,191,36,0.12)",
  purple:"#A78BFA",purpleBg:"rgba(167,139,250,0.12)",
  shadow:"0 2px 16px rgba(0,0,0,0.3)",sidebar:"#08090C",header:"rgba(16,18,26,0.88)",
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

const initSeafarers = [
  {id:1,name:"Capt. Rajesh Fernando",rank:"Master",        country:"Sri Lanka",status:"Active",  apps:12,verified:true, sub:"Pro", avatar:"RF",matchScore:96,contractEnd:"Jul 2025",blacklisted:false},
  {id:2,name:"Eng. Priya Nair",      rank:"Chief Engineer",country:"India",    status:"Active",  apps:8, verified:true, sub:"Pro", avatar:"PN",matchScore:91,contractEnd:"Jun 2025",blacklisted:false},
  {id:3,name:"Shanaka Perera",       rank:"Chief Officer", country:"Sri Lanka",status:"Active",  apps:5, verified:true, sub:"Free",avatar:"SP",matchScore:88,contractEnd:"Aug 2025",blacklisted:false},
  {id:4,name:"Mohammed Al Farsi",    rank:"2nd Officer",   country:"Oman",     status:"Inactive",apps:2, verified:false,sub:"Free",avatar:"MA",matchScore:74,contractEnd:"May 2025",blacklisted:false},
  {id:5,name:"Dilshan Wickrama",     rank:"ETO",           country:"Sri Lanka",status:"Active",  apps:7, verified:true, sub:"Pro", avatar:"DW",matchScore:82,contractEnd:"Sep 2025",blacklisted:false},
  {id:6,name:"Chen Wei Long",        rank:"Chief Officer", country:"China",    status:"Active",  apps:1, verified:false,sub:"Free",avatar:"CW",matchScore:79,contractEnd:"Oct 2025",blacklisted:false},
];

const initCompanies = [
  {id:1,name:"Pacific Star Shipping",country:"Singapore", plan:"Professional",status:"Active",   jobs:8, hired:47, verified:true, logo:"PS",revenue:149,renewal:"Jun 15",blacklisted:false},
  {id:2,name:"Emirates Maritime Co.",country:"UAE",        plan:"Enterprise",  status:"Active",   jobs:12,hired:89, verified:true, logo:"EM",revenue:399,renewal:"Jun 5", blacklisted:false},
  {id:3,name:"MSC Global Lines",     country:"Switzerland",plan:"Enterprise",  status:"Active",   jobs:24,hired:132,verified:true, logo:"MS",revenue:399,renewal:"Jun 1", blacklisted:false},
  {id:4,name:"Royal Caribbean Crew", country:"USA",        plan:"Professional",status:"Active",   jobs:6, hired:28, verified:false,logo:"RC",revenue:149,renewal:"Jun 20",blacklisted:false},
  {id:5,name:"Evergreen Marine Corp",country:"Taiwan",     plan:"Starter",     status:"Suspended",jobs:0, hired:5,  verified:false,logo:"EV",revenue:49, renewal:"—",    blacklisted:false},
];

const PENDING = [
  {id:1,name:"Neptune Shipping Ltd.", country:"Greece",      type:"Shipping Co.",  submitted:"May 20",contact:"Andreas P.",docs:3,logo:"NS"},
  {id:2,name:"Golden Ocean Manning",  country:"Philippines", type:"Manning Agency",submitted:"May 19",contact:"Maria S.",  docs:4,logo:"GO"},
  {id:3,name:"Horizon Maritime Group",country:"UAE",         type:"Shipping Co.",  submitted:"May 18",contact:"Ahmed A.",  docs:3,logo:"HM"},
];

const PIPELINE_INIT = [
  {id:1,name:"Capt. Rajesh Fernando",rank:"Master",        job:"Master — Pacific Star",     stage:"Shortlisted",score:96,avatar:"RF"},
  {id:2,name:"Eng. Priya Nair",      rank:"Chief Engineer",job:"Chief Eng — Emirates",      stage:"Interview",  score:91,avatar:"PN"},
  {id:3,name:"Shanaka Perera",       rank:"Chief Officer", job:"Chief Officer — MSC",       stage:"Shortlisted",score:88,avatar:"SP"},
  {id:4,name:"Dilshan Wickrama",     rank:"ETO",           job:"ETO — Pacific Star",        stage:"Offer",      score:82,avatar:"DW"},
  {id:5,name:"Mohammed Al Farsi",    rank:"2nd Officer",   job:"2nd Officer — Royal Carib.",stage:"Review",     score:74,avatar:"MA"},
];

const INIT_INVOICES = [
  {id:"INV-001",to:"Pacific Star Shipping",type:"Company", plan:"Professional",amount:149,status:"Paid",   date:"May 1", due:"May 15",email:"billing@pacificstar.com"},
  {id:"INV-002",to:"Emirates Maritime Co.",type:"Company", plan:"Enterprise",  amount:399,status:"Paid",   date:"May 1", due:"May 15",email:"accounts@emirates.ae"},
  {id:"INV-003",to:"Capt. Rajesh Fernando",type:"Seafarer",plan:"Pro Access",  amount:4,  status:"Paid",   date:"May 1", due:"May 5", email:"rajesh.f@gmail.com"},
  {id:"INV-004",to:"Royal Caribbean Crew", type:"Company", plan:"Professional",amount:149,status:"Pending",date:"May 15",due:"Jun 1", email:"billing@royalcaribbean.com"},
  {id:"INV-005",to:"Evergreen Marine Corp",type:"Company", plan:"Starter",     amount:49, status:"Overdue",date:"Apr 1", due:"Apr 15",email:"accounts@evergreen.tw"},
  {id:"INV-006",to:"Eng. Priya Nair",      type:"Seafarer",plan:"Pro Access",  amount:4,  status:"Pending",date:"May 15",due:"May 20",email:"priya.nair@gmail.com"},
];

const ACTIVITY = [
  {id:1,icon:"checkCircle",msg:"Pacific Star Shipping verified by Admin",           time:"5m ago", ok:true},
  {id:2,icon:"star",       msg:"Capt. Rajesh Fernando — Verification badge granted",time:"12m ago",ok:true},
  {id:3,icon:"send",       msg:"Interview notification sent to Eng. Priya Nair",    time:"1h ago", ok:true},
  {id:4,icon:"dollarSign", msg:"Invoice INV-003 marked as Paid — $4",               time:"2h ago", ok:true},
  {id:5,icon:"ban",        msg:"Evergreen Marine Corp — marked Overdue",             time:"3h ago", ok:false},
  {id:6,icon:"alertCircle",msg:"Contract expiry alert: Mohammed Al Farsi (May 25)", time:"4h ago", ok:false},
];

const NAV = [
  {section:"Overview",items:[
    {id:"dashboard",  icon:"dashboard",  label:"Dashboard"},
    {id:"activity",   icon:"activity",   label:"Activity Feed"},
  ]},
  {section:"Approvals & Trust",items:[
    {id:"approvals",  icon:"zap",        label:"Approvals",badge:3},
    {id:"verify",     icon:"shield",     label:"Verification Badges"},
    {id:"blacklist",  icon:"ban",        label:"Blacklist"},
  ]},
  {section:"Users",items:[
    {id:"companies",  icon:"building",   label:"Companies"},
    {id:"seafarers",  icon:"anchor",     label:"Seafarers"},
    {id:"pipeline",   icon:"filter",     label:"Hiring Pipeline"},
  ]},
  {section:"Finance",items:[
    {id:"invoices",   icon:"fileText",   label:"Invoices",badge:2,badgeColor:"#FBBF24"},
    {id:"revenue",    icon:"dollarSign", label:"Revenue"},
  ]},
  {section:"Platform",items:[
    {id:"notifications",icon:"bell",    label:"Notifications"},
    {id:"settings",   icon:"settings",  label:"Settings"},
  ]},
];

function useT(isDark){return isDark?D:L;}

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
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:999,
      background:bg||`${color}15`,color,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>
      {label}
    </span>
  );
}

function Pill({children,active,isDark,onClick,danger}){
  const T=useT(isDark);
  const ac=danger?(isDark?"#F87171":"#DC2626"):(isDark?"#38BDF8":"#1a2332");
  return(
    <button onClick={onClick} style={{padding:"8px 18px",borderRadius:12,border:"none",cursor:"pointer",
      fontWeight:600,fontSize:12,fontFamily:"'Inter',sans-serif",transition:"all 0.18s",
      background:active?ac:(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"),
      color:active?"#fff":T.t3,
      boxShadow:active?(isDark?"0 4px 14px rgba(56,189,248,0.25)":"0 4px 14px rgba(26,35,50,0.2)"):"none"}}>
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
      {online&&<div style={{position:"absolute",bottom:1,right:1,width:size*0.22,height:size*0.22,
        borderRadius:"50%",background:"#22C55E",border:`2px solid ${T.card}`}}/>}
    </div>
  );
}

function Toast({msg,type,onClose}){
  const c={success:"#34D399",error:"#F87171",info:"#38BDF8",warning:"#FBBF24"}[type]||"#38BDF8";
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[]);
  return(
    <div style={{position:"fixed",top:80,right:24,zIndex:9999,padding:"12px 20px",borderRadius:14,
      background:"rgba(10,15,25,0.95)",border:`1px solid ${c}40`,color:c,fontSize:13,fontWeight:600,
      backdropFilter:"blur(20px)",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
      display:"flex",alignItems:"center",gap:8,fontFamily:"'Inter',sans-serif",
      animation:"slideIn 0.3s ease"}}>
      {type==="success"?"✓":type==="error"?"âœ•":"â„¹"} {msg}
    </div>
  );
}

function Spark({data,color,height=28}){
  const max=Math.max(...data);
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:2,height}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,borderRadius:2,background:color,
          height:`${(v/max)*100}%`,minHeight:2,opacity:0.25+(i/data.length)*0.65}}/>
      ))}
    </div>
  );
}
function Dashboard({setPage,isDark,seafarers,companies}){
  const T=useT(isDark);
  const proSubs=seafarers.filter(s=>s.sub==="Pro").length;
  const compMRR=companies.filter(c=>c.status==="Active").reduce((a,c)=>a+c.revenue,0);
  const totalMRR=compMRR+proSubs*4;
  const stats=[
    {label:"Total Seafarers",   val:seafarers.length,          icon:"anchor",     dc:"#38BDF8",sp:[40,55,45,70,60,85,80,95],change:"+12 today",  ok:true},
    {label:"Companies",         val:companies.length,           icon:"building",   dc:"#A78BFA",sp:[30,40,55,50,65,70,80,85],change:"registered",  ok:true},
    {label:"Verified Seafarers",val:seafarers.filter(s=>s.verified).length,icon:"shield",dc:"#34D399",sp:[20,30,38,50,60,70,75,80],change:"verified",ok:true},
    {label:"Pending Approvals", val:PENDING.length,             icon:"alertCircle",dc:"#F87171",sp:[8,6,10,8,12,10,14,3],   change:"action needed",ok:false},
    {label:"Monthly Revenue",   val:`$${totalMRR.toLocaleString()}`,icon:"dollarSign",dc:"#FBBF24",sp:[60,65,70,75,80,82,88,90],change:"+8% MoM",ok:true},
    {label:"Pro Seafarers",     val:proSubs,                    icon:"star",       dc:"#38BDF8",sp:[2,3,3,4,4,5,5,proSubs],change:"$4/mo each",   ok:true},
  ];
  return(
    <div>
      <Card isDark={isDark} style={{marginBottom:20,padding:0,overflow:"hidden"}}>
        <div style={{padding:"32px 36px",
          background:isDark?"linear-gradient(135deg,#0C1627,#0F2444)":"linear-gradient(135deg,#EFF6FF,#EDE9FE)",
          position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:"-5%",top:"-30%",width:380,height:380,borderRadius:"50%",
            background:isDark?"rgba(56,189,248,0.05)":"rgba(139,92,246,0.08)",filter:"blur(50px)",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,
                background:isDark?"rgba(52,211,153,0.12)":"rgba(22,163,74,0.1)",
                borderRadius:999,padding:"5px 13px",marginBottom:14}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:T.green,display:"inline-block",animation:"pulseDot 2s infinite"}}/>
                <span style={{fontSize:11,color:T.green,fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"}}>Live — All Systems Operational</span>
              </div>
              <h1 style={{fontSize:30,fontWeight:700,color:isDark?"#fff":T.t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:8}}>OceanCrew Admin Center</h1>
              <p style={{fontSize:14,color:isDark?"rgba(255,255,255,0.55)":T.t2}}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={()=>setPage("approvals")} style={{padding:"10px 18px",borderRadius:12,cursor:"pointer",fontWeight:600,fontSize:13,background:T.redBg,color:T.red,border:"none",display:"flex",alignItems:"center",gap:7,fontFamily:"'Inter',sans-serif"}}>
                <Icon name="zap" size={14} color="currentColor" strokeWidth={2.5}/>{PENDING.length} Approvals
              </button>
              <button onClick={()=>setPage("invoices")} style={{padding:"10px 18px",borderRadius:12,cursor:"pointer",fontWeight:600,fontSize:13,background:T.yellowBg,color:T.yellow,border:"none",display:"flex",alignItems:"center",gap:7,fontFamily:"'Inter',sans-serif"}}>
                <Icon name="fileText" size={14} color="currentColor" strokeWidth={2}/>2 Overdue
              </button>
              <button onClick={()=>setPage("pipeline")} style={{padding:"10px 18px",borderRadius:12,cursor:"pointer",fontWeight:600,fontSize:13,background:isDark?"rgba(255,255,255,0.1)":"#1a2332",color:"#fff",border:"none",display:"flex",alignItems:"center",gap:7,fontFamily:"'Inter',sans-serif"}}>
                <Icon name="filter" size={14} color="#fff" strokeWidth={2}/>Pipeline
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:20}}>
        {stats.map((s,i)=>(
          <Card key={i} isDark={isDark} style={{padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:38,height:38,borderRadius:11,background:isDark?`${s.dc}18`:T.sub,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={s.icon} size={17} color={isDark?s.dc:T.t2} strokeWidth={1.8}/>
              </div>
              <Bdg label={s.change} color={s.ok?T.green:T.red} bg={s.ok?T.greenBg:T.redBg}/>
            </div>
            <div style={{fontSize:34,fontWeight:700,color:isDark?s.dc:T.t1,letterSpacing:"-0.04em",lineHeight:1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>
              {s.val.toLocaleString?s.val.toLocaleString():s.val}
            </div>
            <div style={{fontSize:12,color:T.t2,marginBottom:12}}>{s.label}</div>
            <Spark data={s.sp} color={isDark?s.dc:"#94A3B8"} height={26}/>
          </Card>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16,marginBottom:16}}>
        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Contract Expiries</h3>
            <Bdg label="This month" color={T.yellow} bg={T.yellowBg}/>
          </div>
          {seafarers.map(s=>(
            <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}`}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:T.t1}}>{s.name.split(" ").slice(0,2).join(" ")}</div>
                <div style={{fontSize:11,color:T.t3}}>{s.rank}</div>
              </div>
              <Bdg label={s.contractEnd} color={T.yellow} bg={T.yellowBg}/>
            </div>
          ))}
          <button onClick={()=>setPage("notifications")} style={{width:"100%",marginTop:12,padding:"9px",borderRadius:10,border:"none",background:T.yellowBg,color:T.yellow,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
            Send Expiry Alerts →
          </button>
        </Card>

        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Live Activity</h3>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:T.green,animation:"pulseDot 1.5s infinite",display:"inline-block"}}/>
              <span style={{fontSize:11,color:T.green,fontWeight:600}}>Live</span>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {ACTIVITY.map(log=>(
              <div key={log.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderRadius:11}}>
                <div style={{width:32,height:32,borderRadius:9,background:log.ok?T.greenBg:T.redBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon name={log.icon} size={14} color={log.ok?T.green:T.red} strokeWidth={2}/>
                </div>
                <p style={{flex:1,fontSize:12,color:T.t2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{log.msg}</p>
                <span style={{fontSize:10,color:T.t3,fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{log.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card isDark={isDark} style={{padding:"20px 24px"}}>
        <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:16,fontFamily:"'Sora',sans-serif"}}>Quick Actions</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
          {[
            {label:"New Invoice",      icon:"fileText",   page:"invoices",      color:isDark?"#38BDF8":"#1a2332"},
            {label:"Send Notification",icon:"send",       page:"notifications", color:T.purple},
            {label:"Grant Badge",      icon:"shield",     page:"verify",        color:T.green},
            {label:"View Pipeline",    icon:"filter",     page:"pipeline",      color:T.yellow},
            {label:"Blacklist User",   icon:"ban",        page:"blacklist",     color:T.red},
          ].map(a=>(
            <button key={a.label} onClick={()=>setPage(a.page)} style={{padding:"16px 12px",borderRadius:14,border:"none",background:isDark?"rgba(255,255,255,0.03)":"rgba(100,116,139,0.05)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"all 0.18s",fontFamily:"'Inter',sans-serif"}}
              onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.07)":"rgba(100,116,139,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.03)":"rgba(100,116,139,0.05)"}>
              <div style={{width:40,height:40,borderRadius:12,background:`${a.color}18`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={a.icon} size={18} color={a.color} strokeWidth={1.8}/>
              </div>
              <span style={{fontSize:11,fontWeight:600,color:T.t2,textAlign:"center",lineHeight:1.3}}>{a.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
function VerifyPage({isDark,seafarers,setSeafarers,companies,setCompanies,showToast}){
  const T=useT(isDark);
  const [tab,setTab]=useState("seafarers");
  const toggle=(type,id)=>{
    if(type==="seafarer"){
      const s=seafarers.find(x=>x.id===id);
      setSeafarers(p=>p.map(x=>x.id===id?{...x,verified:!x.verified}:x));
      showToast(s.verified?"Badge revoked":"Verified badge granted!",s.verified?"error":"success");
    } else {
      const c=companies.find(x=>x.id===id);
      setCompanies(p=>p.map(x=>x.id===id?{...x,verified:!x.verified}:x));
      showToast(c.verified?"Badge revoked":"Verified badge granted!",c.verified?"error":"success");
    }
  };
  const list=tab==="seafarers"?seafarers:companies;
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Verification Badges</h2>
        <p style={{fontSize:14,color:T.t3}}>Manually grant or revoke the verified badge</p>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <Pill active={tab==="seafarers"} isDark={isDark} onClick={()=>setTab("seafarers")}>Seafarers</Pill>
        <Pill active={tab==="companies"} isDark={isDark} onClick={()=>setTab("companies")}>Companies</Pill>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {list.map(item=>(
          <Card key={item.id} isDark={isDark} style={{padding:"18px 22px"}}>
            <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
              <Av initials={item.logo||item.avatar} size={46} isDark={isDark}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <span style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{item.name}</span>
                  {item.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:999}}>✓ VERIFIED</span>}
                </div>
                <div style={{display:"flex",gap:7}}>
                  <Bdg label={item.rank||item.plan} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                  <Bdg label={item.country} color={T.t3} bg={isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.05)"}/>
                  <Bdg label={item.status} color={item.status==="Active"?T.green:T.red} bg={item.status==="Active"?T.greenBg:T.redBg}/>
                </div>
              </div>
              {item.verified?(
                <button onClick={()=>toggle(tab==="seafarers"?"seafarer":"company",item.id)} style={{padding:"9px 18px",borderRadius:10,border:"none",background:T.redBg,color:T.red,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:6}}>
                  <Icon name="xCircle" size={14} color="currentColor" strokeWidth={2}/>Revoke Badge
                </button>
              ):(
                <button onClick={()=>toggle(tab==="seafarers"?"seafarer":"company",item.id)} style={{padding:"9px 18px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:6,boxShadow:"0 4px 14px rgba(56,189,248,0.3)"}}>
                  <Icon name="shield" size={14} color="#fff" strokeWidth={2}/>Grant Verified Badge
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BlacklistPage({isDark,seafarers,setSeafarers,companies,setCompanies,showToast}){
  const T=useT(isDark);
  const [tab,setTab]=useState("seafarers");
  const [reason,setReason]=useState({});
  const toggle=(type,id)=>{
    const r=reason[id]||"";
    if(type==="seafarer"){
      const s=seafarers.find(x=>x.id===id);
      if(!s.blacklisted&&!r.trim()){showToast("Enter a reason first","error");return;}
      setSeafarers(p=>p.map(x=>x.id===id?{...x,blacklisted:!x.blacklisted}:x));
      showToast(s.blacklisted?"Removed from blacklist":"User blacklisted",s.blacklisted?"success":"error");
    } else {
      const c=companies.find(x=>x.id===id);
      if(!c.blacklisted&&!r.trim()){showToast("Enter a reason first","error");return;}
      setCompanies(p=>p.map(x=>x.id===id?{...x,blacklisted:!x.blacklisted}:x));
      showToast(c.blacklisted?"Removed from blacklist":"Company blacklisted",c.blacklisted?"success":"error");
    }
  };
  const list=tab==="seafarers"?seafarers:companies;
  const bCount=seafarers.filter(s=>s.blacklisted).length+companies.filter(c=>c.blacklisted).length;
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Blacklist Management</h2>
        <p style={{fontSize:14,color:T.t3}}>Blacklisted users cannot re-register or access the platform</p>
      </div>
      <div style={{display:"inline-flex",padding:"14px 20px",borderRadius:14,background:T.redBg,marginBottom:20}}>
        <div><div style={{fontSize:24,fontWeight:700,color:T.red,fontFamily:"'Sora',sans-serif"}}>{bCount}</div>
        <div style={{fontSize:12,color:T.red,marginTop:2}}>Total Blacklisted</div></div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <Pill active={tab==="seafarers"} isDark={isDark} onClick={()=>setTab("seafarers")}>Seafarers</Pill>
        <Pill active={tab==="companies"} isDark={isDark} onClick={()=>setTab("companies")}>Companies</Pill>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {list.map(item=>(
          <Card key={item.id} isDark={isDark} style={{padding:"16px 20px",border:item.blacklisted?`1px solid ${T.red}40`:(isDark?"1px solid rgba(255,255,255,0.07)":"none")}}>
            <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
              <Av initials={item.logo||item.avatar} size={42} isDark={isDark}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{item.name}</span>
                  {item.blacklisted&&<Bdg label="BLACKLISTED" color={T.red} bg={T.redBg}/>}
                </div>
                <div style={{fontSize:11,color:T.t3}}>{item.rank||item.plan} Â· {item.country}</div>
              </div>
              {!item.blacklisted&&(
                <input value={reason[item.id]||""} onChange={e=>setReason(p=>({...p,[item.id]:e.target.value}))}
                  placeholder="Reason for blacklisting..."
                  style={{width:220,padding:"8px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:12,outline:"none",fontFamily:"'Inter',sans-serif"}}/>
              )}
              <button onClick={()=>toggle(tab==="seafarers"?"seafarer":"company",item.id)} style={{padding:"8px 16px",borderRadius:10,border:"none",background:item.blacklisted?T.greenBg:T.redBg,color:item.blacklisted?T.green:T.red,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:6}}>
                <Icon name={item.blacklisted?"checkCircle":"ban"} size={13} color="currentColor" strokeWidth={2}/>
                {item.blacklisted?"Remove":"Blacklist"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ApprovalsPage({isDark,showToast}){
  const T=useT(isDark);
  const [pending,setPending]=useState(PENDING);
  const act=(id,action)=>{
    const item=pending.find(p=>p.id===id);
    setPending(p=>p.filter(x=>x.id!==id));
    showToast(action==="approve"?`${item.name} approved`:`${item.name} rejected`,action==="approve"?"success":"error");
  };
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Company Approvals</h2>
        <p style={{fontSize:14,color:T.t3}}>{pending.length} companies awaiting review</p>
      </div>
      {pending.length===0?(
        <Card isDark={isDark} style={{textAlign:"center",padding:"60px 24px"}}>
          <Icon name="checkCircle" size={48} color={T.green} strokeWidth={1.5}/>
          <p style={{fontSize:17,fontWeight:600,color:T.t1,marginTop:14,fontFamily:"'Sora',sans-serif"}}>All companies reviewed!</p>
        </Card>
      ):pending.map(co=>(
        <Card key={co.id} isDark={isDark} style={{marginBottom:12,padding:"20px 24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <Av initials={co.logo} size={48} isDark={isDark}/>
            <div style={{flex:1,minWidth:180}}>
              <div style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:7,fontFamily:"'Sora',sans-serif"}}>{co.name}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[co.type,co.country,`Submitted ${co.submitted}`,`${co.docs} docs`].map(tag=>(
                  <Bdg key={tag} label={tag} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                ))}
              </div>
            </div>
            <div style={{fontSize:12,color:T.t3}}>Contact: <strong style={{color:T.t1}}>{co.contact}</strong></div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>act(co.id,"reject")} style={{padding:"9px 18px",borderRadius:10,border:"none",background:T.redBg,color:T.red,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
                <Icon name="x" size={13} color="currentColor" strokeWidth={2.5}/>Reject
              </button>
              <button onClick={()=>act(co.id,"approve")} style={{padding:"9px 18px",borderRadius:10,border:"none",background:isDark?"#34D399":"#1a2332",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
                <Icon name="check" size={13} color="#fff" strokeWidth={2.5}/>Approve
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
function PipelinePage({isDark,showToast}){
  const T=useT(isDark);
  const [pipeline,setPipeline]=useState(PIPELINE_INIT);
  const stages=["Review","Shortlisted","Interview","Offer","Hired"];
  const sCols={Review:T.t3,Shortlisted:"#38BDF8",Interview:"#A78BFA",Offer:T.yellow,Hired:T.green};
  const move=(id,dir)=>{
    setPipeline(prev=>prev.map(p=>{
      if(p.id!==id)return p;
      const idx=stages.indexOf(p.stage);
      const next=stages[idx+dir];
      if(!next)return p;
      return {...p,stage:next};
    }));
  };
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Hiring Pipeline</h2>
        <p style={{fontSize:14,color:T.t3}}>Manage seafarer applications — shortlist, interview, send offers</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        {stages.map(stage=>{
          const items=pipeline.filter(p=>p.stage===stage);
          const col=sCols[stage]||T.t2;
          return(
            <div key={stage}>
              <div style={{padding:"8px 12px",borderRadius:10,background:`${col}18`,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:1}}>{stage}</span>
                <span style={{fontSize:10,fontWeight:700,color:col,background:`${col}20`,padding:"2px 7px",borderRadius:999}}>{items.length}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {items.map(item=>(
                  <Card key={item.id} isDark={isDark} style={{padding:"14px 16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                      <Av initials={item.avatar} size={30} isDark={isDark}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:11,fontWeight:600,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                        <div style={{fontSize:10,color:T.t3,marginTop:1}}>{item.rank}</div>
                      </div>
                    </div>
                    <div style={{fontSize:10,color:T.t3,marginBottom:8,lineHeight:1.4}}>{item.job}</div>
                    <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:8}}>
                      <Icon name="target" size={10} color={col} strokeWidth={2}/>
                      <span style={{fontSize:11,fontWeight:700,color:col}}>{item.score}% match</span>
                    </div>
                    <div style={{display:"flex",gap:4}}>
                      {stages.indexOf(item.stage)>0&&(
                        <button onClick={()=>move(item.id,-1)} style={{flex:1,padding:"5px 0",borderRadius:7,border:"none",background:isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)",color:T.t3,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>â†</button>
                      )}
                      <button onClick={()=>showToast(`Notification sent to ${item.name}`,"success")} style={{flex:2,padding:"5px 0",borderRadius:7,border:"none",background:`${col}18`,color:col,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                        <Icon name="send" size={10} color="currentColor" strokeWidth={2}/>Notify
                      </button>
                      {stages.indexOf(item.stage)<stages.length-1&&(
                        <button onClick={()=>move(item.id,1)} style={{flex:1,padding:"5px 0",borderRadius:7,border:"none",background:`${col}18`,color:col,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>→</button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Card isDark={isDark}>
        <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:4,fontFamily:"'Sora',sans-serif"}}>Smart Match Score</h3>
        <p style={{fontSize:12,color:T.t3,marginBottom:16}}>Ranked by compatibility. Click Notify to send interview/offer messages.</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[...pipeline].sort((a,b)=>b.score-a.score).map(item=>{
            const col=sCols[item.stage]||T.t2;
            return(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderRadius:12}}>
                <Av initials={item.avatar} size={36} isDark={isDark}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:T.t1}}>{item.name} <span style={{color:T.t3,fontWeight:400}}>Â· {item.rank}</span></div>
                  <div style={{fontSize:11,color:T.t3}}>{item.job}</div>
                </div>
                <div style={{width:80}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:10,color:T.t3}}>Match</span>
                    <span style={{fontSize:11,fontWeight:700,color:item.score>90?T.green:item.score>80?T.yellow:T.t2}}>{item.score}%</span>
                  </div>
                  <div style={{height:4,borderRadius:2,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}}>
                    <div style={{height:"100%",width:`${item.score}%`,background:item.score>90?T.green:item.score>80?T.yellow:T.t2,borderRadius:2}}/>
                  </div>
                </div>
                <Bdg label={item.stage} color={col} bg={`${col}18`}/>
                <button onClick={()=>showToast(`Notification sent to ${item.name}`,"success")} style={{padding:"7px 14px",borderRadius:9,border:"none",background:isDark?"rgba(56,189,248,0.12)":T.accentBg,color:isDark?"#38BDF8":T.accent,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
                  <Icon name="send" size={12} color="currentColor" strokeWidth={2}/>Notify
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function CompaniesPage({isDark,companies}){
  const T=useT(isDark);
  const [search,setSearch]=useState("");
  const filtered=companies.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>All Companies</h2>
        <p style={{fontSize:14,color:T.t3}}>{companies.length} registered companies</p>
      </div>
      <Card isDark={isDark} style={{marginBottom:16,padding:14}}>
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={15} color={T.t3} strokeWidth={2}/></span>
          <input placeholder="Search companies..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.07)":"none",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)",color:T.t1,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'Inter',sans-serif"}}/>
        </div>
      </Card>
      <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"12px 22px",background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderBottom:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(100,116,139,0.08)"}}>
          {["Company","Plan","Revenue/mo","Status","Verified"].map(h=>(
            <span key={h} style={{fontSize:10,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</span>
          ))}
        </div>
        {filtered.map((co,i)=>(
          <div key={co.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",padding:"14px 22px",borderBottom:i<filtered.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none",alignItems:"center",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.03)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <Av initials={co.logo} size={36} isDark={isDark}/>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:T.t1}}>{co.name}</div>
                <div style={{fontSize:11,color:T.t3}}>{co.country}</div>
              </div>
            </div>
            <Bdg label={co.plan} color={isDark?"#38BDF8":"#334155"} bg={isDark?"rgba(56,189,248,0.1)":"rgba(100,116,139,0.08)"}/>
            <span style={{fontSize:14,fontWeight:700,color:T.green,fontFamily:"'JetBrains Mono',monospace"}}>${co.revenue}</span>
            <Bdg label={co.status} color={co.status==="Active"?T.green:T.red} bg={co.status==="Active"?T.greenBg:T.redBg}/>
            {co.verified
              ?<Bdg label="✓ Verified" color="#38BDF8" bg="rgba(56,189,248,0.1)"/>
              :<Bdg label="Unverified" color={T.t3} bg={isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}/>}
          </div>
        ))}
      </Card>
    </div>
  );
}

function SeafarersPage({isDark,seafarers}){
  const T=useT(isDark);
  const [search,setSearch]=useState("");
  const [sub,setSub]=useState("All");
  const filtered=seafarers.filter(s=>(sub==="All"||(sub==="Pro"&&s.sub==="Pro")||(sub==="Free"&&s.sub==="Free"))&&(s.name.toLowerCase().includes(search.toLowerCase())||s.rank.toLowerCase().includes(search.toLowerCase())));
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>All Seafarers</h2>
        <p style={{fontSize:14,color:T.t3}}>{seafarers.length} registered Â· {seafarers.filter(s=>s.sub==="Pro").length} Pro Â· {seafarers.filter(s=>s.verified).length} Verified</p>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <Card isDark={isDark} style={{flex:1,padding:12}}>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={15} color={T.t3} strokeWidth={2}/></span>
            <input placeholder="Search by name or rank..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:"100%",padding:"9px 14px 9px 36px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.07)":"none",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)",color:T.t1,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'Inter',sans-serif"}}/>
          </div>
        </Card>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {["All","Pro","Free"].map(f=><Pill key={f} active={sub===f} isDark={isDark} onClick={()=>setSub(f)}>{f}</Pill>)}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
        {filtered.map(s=>(
          <Card key={s.id} isDark={isDark} style={{padding:"18px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <Av initials={s.avatar} size={44} online={s.status==="Active"} isDark={isDark}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                  <span style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{s.name}</span>
                  {s.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:999}}>✓</span>}
                </div>
                <div style={{fontSize:11,color:T.t3}}>{s.rank} Â· {s.country}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                <Bdg label={s.sub==="Pro"?"Pro":"Free"} color={s.sub==="Pro"?T.yellow:T.t3} bg={s.sub==="Pro"?T.yellowBg:isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"}/>
                <Bdg label={s.status} color={s.status==="Active"?T.green:T.red} bg={s.status==="Active"?T.greenBg:T.redBg}/>
              </div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <Bdg label={`${s.apps} apps`} color={T.t3} bg={isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"}/>
              <Bdg label={`Match: ${s.matchScore}%`} color={s.matchScore>90?T.green:s.matchScore>80?T.yellow:T.t2} bg={s.matchScore>90?T.greenBg:s.matchScore>80?T.yellowBg:isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"}/>
              <Bdg label={`Ends ${s.contractEnd}`} color={T.yellow} bg={T.yellowBg}/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
function InvoicePage({isDark,showToast}){
  const T=useT(isDark);
  const [invoices,setInvoices]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filter,setFilter]=useState("All");
  const statusColor={Paid:T.green,Pending:T.yellow,Overdue:T.red};
  const statusBg={Paid:T.greenBg,Pending:T.yellowBg,Overdue:T.redBg};

  const loadInvoices=()=>{
    setLoading(true);
    fetch(`${API}/api/payments/all`,{headers:authHeader()})
      .then(r=>r.json())
      .then(data=>{
        if(Array.isArray(data)){
          setInvoices(data.map(p=>({
            id:`INV-${p._id.slice(-6).toUpperCase()}`,
            rawId:p._id,
            to:p.userId?.name||"Unknown",
            type:p.userId?.role==="company"?"Company":"Seafarer",
            email:p.userId?.email||"",
            plan:p.plan,
            amount:p.amount,
            status:p.status==="approved"?"Paid":p.status==="pending"?"Pending":"Overdue",
            due:new Date(p.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})
          })));
        }
      })
      .catch(()=>showToast("Failed to load payments","error"))
      .finally(()=>setLoading(false));
  };

  useEffect(()=>{loadInvoices();},[]);

  const markStatus=async(id,rawId,status)=>{
    const apiStatus = status === "Paid" ? "approved" : "rejected";
    try {
      const r = await fetch(`${API}/api/payments/${rawId}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ status: apiStatus })
      });
      if(r.ok) {
        setInvoices(p=>p.map(inv=>inv.id===id?{...inv,status}:inv));
        showToast(`Payment marked as ${status}. Invoice emailed!`,"success");
      } else {
        const d = await r.json();
        showToast(d.message || "Failed to update payment","error");
      }
    } catch {
      showToast("Network error","error");
    }
  };

  const filtered=filter==="All"?invoices:invoices.filter(i=>i.status===filter);
  const collected=invoices.filter(i=>i.status==="Paid").reduce((a,i)=>a+i.amount,0);
  const pending=invoices.filter(i=>i.status==="Pending").reduce((a,i)=>a+i.amount,0);
  const overdue=invoices.filter(i=>i.status==="Overdue").reduce((a,i)=>a+i.amount,0);

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Payments & Invoicing</h2>
          <p style={{fontSize:14,color:T.t3}}>Approve bank transfers and auto-email invoices</p>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {[
          {label:"Collected",val:`$${collected}`,color:T.green,bg:T.greenBg},
          {label:"Pending",  val:`$${pending}`, color:T.yellow,bg:T.yellowBg},
          {label:"Overdue",  val:`$${overdue}`, color:T.red,   bg:T.redBg},
          {label:"Total",    val:invoices.length,color:isDark?"#38BDF8":T.t1,bg:isDark?"rgba(56,189,248,0.1)":T.sub},
        ].map((s,i)=>(
          <Card key={i} isDark={isDark} style={{padding:"18px 20px"}}>
            <div style={{fontSize:28,fontWeight:700,color:s.color,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:4}}>{s.val}</div>
            <div style={{fontSize:12,color:T.t2}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {["All","Paid","Pending","Overdue"].map(f=>(
          <Pill key={f} active={filter===f} isDark={isDark} danger={f==="Overdue"} onClick={()=>setFilter(f)}>{f}</Pill>
        ))}
      </div>

      <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"0.7fr 1.5fr 0.8fr 1fr 0.7fr 0.7fr 1.2fr",padding:"12px 22px",background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderBottom:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(100,116,139,0.08)"}}>
          {["ID","To","Type","Plan","Amount","Due","Status"].map(h=>(
            <span key={h} style={{fontSize:10,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</span>
          ))}
        </div>
        {loading ? <div style={{padding:40,textAlign:"center",color:T.t3}}>Loading payments...</div> : filtered.length===0 ? <div style={{padding:40,textAlign:"center",color:T.t3}}>No payments found.</div> : filtered.map((inv,i)=>(
          <div key={inv.id} style={{display:"grid",gridTemplateColumns:"0.7fr 1.5fr 0.8fr 1fr 0.7fr 0.7fr 1.2fr",padding:"13px 22px",borderBottom:i<filtered.length-1?(isDark?"1px solid rgba(255,255,255,0.04)":"1px solid rgba(100,116,139,0.07)"):"none",alignItems:"center",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.03)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:600,color:isDark?"#38BDF8":T.accent}}>{inv.id}</span>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:T.t1}}>{inv.to}</div>
              <div style={{fontSize:10,color:T.t3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.email}</div>
            </div>
            <Bdg label={inv.type} color={inv.type==="Company"?T.purple:T.yellow} bg={inv.type==="Company"?T.purpleBg:T.yellowBg}/>
            <span style={{fontSize:11,color:T.t2}}>{inv.plan}</span>
            <span style={{fontSize:15,fontWeight:700,color:T.green,fontFamily:"'JetBrains Mono',monospace"}}>${inv.amount}</span>
            <span style={{fontSize:11,color:T.t2,fontFamily:"'JetBrains Mono',monospace"}}>{inv.due}</span>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
              <Bdg label={inv.status} color={statusColor[inv.status]} bg={statusBg[inv.status]}/>
              {inv.status!=="Paid"&&<button onClick={()=>markStatus(inv.id,inv.rawId,"Paid")} style={{padding:"2px 7px",borderRadius:6,border:"none",background:T.greenBg,color:T.green,fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Approve</button>}
              {inv.status==="Pending"&&<button onClick={()=>markStatus(inv.id,inv.rawId,"Overdue")} style={{padding:"2px 7px",borderRadius:6,border:"none",background:T.redBg,color:T.red,fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Reject</button>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function NotificationsPage({isDark,seafarers,companies,showToast}){
  const T=useT(isDark);
  const [target,setTarget]=useState("all_seafarers");
  const [msgType,setMsgType]=useState("contract_expiry");
  const [custom,setCustom]=useState("");
  const [sent,setSent]=useState([]);
  const tLabels={
    all_seafarers:`All Seafarers (${seafarers.length})`,
    unverified:`Unverified (${seafarers.filter(s=>!s.verified).length})`,
    free_users:`Free Users (${seafarers.filter(s=>s.sub==="Free").length})`,
    all_companies:`All Companies (${companies.length})`,
  };
  const templates={
    contract_expiry:"Your contract is expiring soon. Log in to OceanCrew to browse new opportunities.",
    new_jobs:"New job postings matching your profile are now live. Browse and apply today!",
    verify_prompt:"Complete your profile verification to get the Verified Badge and boost visibility by 3x.",
    upgrade_prompt:"Upgrade to OceanCrew Pro for just $4/month — apply to unlimited jobs.",
    payment_reminder:"Your OceanCrew subscription invoice is due. Please complete payment to maintain access.",
    custom:custom,
  };
  const send=()=>{
    if(msgType==="custom"&&!custom.trim()){showToast("Write a message first","error");return;}
    setSent(p=>[{id:p.length+1,target:tLabels[target],type:msgType,time:"Just now"},...p]);
    showToast(`Notification sent to ${tLabels[target]}`,"success");
  };
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Notification Center</h2>
        <p style={{fontSize:14,color:T.t3}}>Send targeted notifications to seafarers and companies</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <Card isDark={isDark}>
          <h3 style={{fontSize:16,fontWeight:600,color:T.t1,marginBottom:20,fontFamily:"'Sora',sans-serif"}}>Compose</h3>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Send To</div>
            {Object.entries(tLabels).map(([key,label])=>(
              <label key={key} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,background:target===key?(isDark?"rgba(56,189,248,0.1)":T.accentBg):"transparent",cursor:"pointer",marginBottom:4}}>
                <input type="radio" checked={target===key} onChange={()=>setTarget(key)} style={{accentColor:isDark?"#38BDF8":T.accent}}/>
                <span style={{fontSize:13,color:target===key?(isDark?"#38BDF8":T.accent):T.t2,fontWeight:target===key?600:400}}>{label}</span>
              </label>
            ))}
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Template</div>
            <select value={msgType} onChange={e=>setMsgType(e.target.value)}
              style={{width:"100%",padding:"10px 14px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"#0f1e36":"#fff",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",marginBottom:10}}>
              <option value="contract_expiry">Contract Expiry Alert</option>
              <option value="new_jobs">New Jobs Available</option>
              <option value="verify_prompt">Get Verified Badge</option>
              <option value="upgrade_prompt">Upgrade to Pro ($4/mo)</option>
              <option value="payment_reminder">Payment Reminder</option>
              <option value="custom">Custom Message</option>
            </select>
            {msgType==="custom"?(
              <textarea value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Write custom message..." rows={3}
                style={{width:"100%",padding:"10px 14px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",boxSizing:"border-box"}}/>
            ):(
              <div style={{padding:"12px 14px",borderRadius:10,background:isDark?"rgba(255,255,255,0.03)":"rgba(100,116,139,0.05)",fontSize:13,color:T.t2,lineHeight:1.6}}>{templates[msgType]}</div>
            )}
          </div>
          <button onClick={send} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <Icon name="send" size={15} color="#fff" strokeWidth={2}/>Send Notification Blast
          </button>
        </Card>
        <Card isDark={isDark}>
          <h3 style={{fontSize:16,fontWeight:600,color:T.t1,marginBottom:20,fontFamily:"'Sora',sans-serif"}}>Sent History</h3>
          {sent.length===0?(
            <div style={{textAlign:"center",padding:"40px 0",color:T.t3,fontSize:13}}>No notifications sent yet</div>
          ):sent.map(s=>(
            <div key={s.id} style={{padding:"11px 0",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}`}}>
              <div style={{fontSize:13,fontWeight:600,color:T.t1,marginBottom:3}}>{s.target}</div>
              <div style={{fontSize:11,color:T.t3}}>{s.type.replace(/_/g," ")} Â· {s.time}</div>
            </div>
          ))}
          <div style={{marginTop:20}}>
            <div style={{fontSize:12,fontWeight:700,color:T.t2,marginBottom:12}}>Individual Send</div>
            {seafarers.slice(0,4).map(s=>(
              <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.07)"}`}}>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:T.t1}}>{s.name}</div>
                  <div style={{fontSize:10,color:T.t3}}>{s.rank}</div>
                </div>
                <button onClick={()=>showToast(`Sent to ${s.name}`,"success")} style={{padding:"5px 12px",borderRadius:8,border:"none",background:T.accentBg,color:isDark?"#38BDF8":T.accent,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:4}}>
                  <Icon name="send" size={11} color="currentColor" strokeWidth={2}/>Send
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function RevenuePage({isDark,seafarers,companies}){
  const T=useT(isDark);
  const proSubs=seafarers.filter(s=>s.sub==="Pro").length;
  const compMRR=companies.filter(c=>c.status==="Active").reduce((a,c)=>a+c.revenue,0);
  const seafMRR=proSubs*4;
  const totalMRR=compMRR+seafMRR;
  return(
    <div>
      <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:24}}>Revenue Dashboard</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        {[
          {label:"Total MRR",        val:`$${totalMRR.toLocaleString()}`, color:T.green},
          {label:"Company Revenue",  val:`$${compMRR.toLocaleString()}`,  color:isDark?"#38BDF8":T.t1},
          {label:"Seafarer Revenue", val:`$${seafMRR}`,                   color:T.yellow},
          {label:"ARR (Projected)",  val:`$${(totalMRR*12).toLocaleString()}`,color:T.purple},
        ].map((s,i)=>(
          <Card key={i} isDark={isDark} style={{padding:"20px 22px"}}>
            <div style={{fontSize:28,fontWeight:700,color:s.color,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:6}}>{s.val}</div>
            <div style={{fontSize:12,color:T.t2}}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card isDark={isDark}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:16,fontFamily:"'Sora',sans-serif"}}>Revenue by Plan</h3>
          {[
            {plan:"Enterprise ($399)",  count:companies.filter(c=>c.plan==="Enterprise").length,   rev:companies.filter(c=>c.plan==="Enterprise").length*399,   color:T.purple},
            {plan:"Professional ($149)",count:companies.filter(c=>c.plan==="Professional").length, rev:companies.filter(c=>c.plan==="Professional").length*149, color:isDark?"#38BDF8":T.t1},
            {plan:"Starter ($49)",      count:companies.filter(c=>c.plan==="Starter").length,      rev:companies.filter(c=>c.plan==="Starter").length*49,       color:T.green},
            {plan:"Seafarer Pro ($4)",  count:proSubs,                                             rev:proSubs*4,                                               color:T.yellow},
          ].map(p=>(
            <div key={p.plan} style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:13,fontWeight:500,color:T.t1}}>{p.plan} <span style={{color:T.t3,fontSize:11}}>x{p.count}</span></span>
                <span style={{fontSize:13,fontWeight:700,color:p.color,fontFamily:"'JetBrains Mono',monospace"}}>${p.rev}/mo</span>
              </div>
              <div style={{height:6,borderRadius:3,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}}>
                <div style={{height:"100%",width:totalMRR>0?`${Math.min((p.rev/totalMRR)*100,100)}%`:"0%",background:p.color,borderRadius:3,transition:"width 1.2s ease",opacity:isDark?1:0.75}}/>
              </div>
            </div>
          ))}
        </Card>
        <Card isDark={isDark}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:16,fontFamily:"'Sora',sans-serif"}}>Upcoming Renewals</h3>
          {companies.filter(c=>c.status==="Active").map(c=>(
            <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}`}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:T.t1}}>{c.name}</div>
                <div style={{fontSize:11,color:T.t3}}>{c.plan}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:14,fontWeight:700,color:T.green,fontFamily:"'JetBrains Mono',monospace"}}>${c.revenue}</div>
                <div style={{fontSize:10,color:T.t3}}>Renews {c.renewal}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function SettingsPage({isDark}){
  const T=useT(isDark);
  return(
    <div>
      <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:24}}>System Settings</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {[
          {title:"Platform",icon:"settings",items:[
            {label:"Platform Name",val:"OceanCrew",type:"text"},
            {label:"Support Email",val:"support@oceancrew.io",type:"text"},
            {label:"Seafarer Pro Price",val:"$4/month",type:"text"},
            {label:"Maintenance Mode",val:false,type:"toggle"},
          ]},
          {title:"Pricing",icon:"dollarSign",items:[
            {label:"Starter Plan",val:"$49/month",type:"text"},
            {label:"Professional Plan",val:"$149/month",type:"text"},
            {label:"Enterprise Plan",val:"$399/month",type:"text"},
            {label:"Auto Renewal Emails",val:true,type:"toggle"},
          ]},
          {title:"Security",icon:"shield",items:[
            {label:"Require 2FA for Admin",val:true,type:"toggle"},
            {label:"IP Rate Limiting",val:true,type:"toggle"},
            {label:"Max Login Attempts",val:"5",type:"text"},
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
              <div key={item.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:i<sec.items.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none"}}>
                <span style={{fontSize:13,fontWeight:500,color:T.t2}}>{item.label}</span>
                {item.type==="toggle"?(
                  <div style={{width:44,height:24,borderRadius:12,background:item.val?(isDark?"#38BDF8":"#1a2332"):"rgba(100,116,139,0.15)",position:"relative",cursor:"pointer",transition:"background 0.2s"}}>
                    <div style={{position:"absolute",top:3,left:item.val?"calc(100% - 21px)":3,width:16,height:16,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"left 0.2s"}}/>
                  </div>
                ):(
                  <input defaultValue={item.val} style={{padding:"8px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.07)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",width:200,fontFamily:"'Inter',sans-serif"}}/>
                )}
              </div>
            ))}
          </Card>
        ))}
        <button style={{padding:"12px 24px",borderRadius:12,border:"none",background:isDark?"#38BDF8":"#1a2332",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",alignSelf:"flex-start",display:"flex",alignItems:"center",gap:7,fontFamily:"'Inter',sans-serif",boxShadow:isDark?"0 4px 14px rgba(56,189,248,0.25)":"0 4px 14px rgba(26,35,50,0.2)"}}>
          <Icon name="check" size={15} color="#fff" strokeWidth={2.5}/>Save Changes
        </button>
      </div>
    </div>
  );
}

/* â•â• CV MANAGER PAGE â•â• */
function CVManagerPage({isDark,showToast}){
  const T=useT(isDark);
  const [requests,setRequests]=useState([]);
  const [loadingCVs,setLoadingCVs]=useState(true);
  const [selected,setSelected]=useState(null);
  const [editing,setEditing]=useState(false);
  const [editData,setEditData]=useState(null);
  const [preview,setPreview]=useState(false);
  const [sending,setSending]=useState(false);

  const loadCVs=()=>{
    setLoadingCVs(true);
    fetch(`${API}/api/cv/all`,{headers:authHeader()})
      .then(r=>r.json())
      .then(data=>{
        if(Array.isArray(data)){
          setRequests(data.map(cv=>({
            id:cv._id,
            name:cv.seafarerId?.name||"Unknown",
            rank:cv.seafarerId?.rank||"",
            email:cv.seafarerId?.email||"",
            avatar:(cv.seafarerId?.name||"?").slice(0,2).toUpperCase(),
            status:cv.status==="ready"?"Sent":cv.status==="processing"?"Processing":"Pending",
            amount:4.99,
            date:new Date(cv.uploadedAt).toLocaleDateString("en-GB",{day:"numeric",month:"short"}),
            fileName:cv.fileName,
            paid:true,
            cv:{fullName:cv.seafarerId?.name||"",rank:cv.seafarerId?.rank||"",email:cv.seafarerId?.email||"",vessels:[],certs:[],summary:""},
          })));
        }
      })
      .catch(()=>showToast("Failed to load CV requests","error"))
      .finally(()=>setLoadingCVs(false));
  };
  useEffect(()=>{loadCVs();},[]);

  const openCV=(req)=>{
    setSelected(req);
    setEditData({...req.cv});
    setEditing(false);
    setPreview(false);
  };

  const saveCV=()=>{
    setRequests(p=>p.map(r=>r.id===selected.id?{...r,cv:{...editData}}:r));
    setSelected(s=>({...s,cv:{...editData}}));
    setEditing(false);
    showToast("CV notes saved","success");
  };

  const sendCV=async(id)=>{
    setSending(true);
    try{
      const r=await fetch(`${API}/api/cv/${id}/send-email`,{
        method:"POST",headers:authHeader(),body:JSON.stringify({}),
      });
      if(r.ok){
        setRequests(p=>p.map(r=>r.id===id?{...r,status:"Sent"}:r));
        if(selected&&selected.id===id) setSelected(s=>({...s,status:"Sent"}));
        showToast("CV email sent to seafarer!","success");
      }else{
        const d=await r.json();showToast(d.message||"Failed to send","error");
      }
    }catch{showToast("Network error","error");}
    setSending(false);
  };

  const downloadCV=async(id)=>{
    try{
      const r=await fetch(`${API}/api/cv/${id}/download`,{headers:authHeader()});
      const blob=await r.blob();
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");a.href=url;a.download="cv.pdf";a.click();
      URL.revokeObjectURL(url);
    }catch{showToast("Download failed","error");}
  };

  const statusColor={Pending:T.yellow,Processing:T.purple,Sent:T.green};
  const statusBg={Pending:T.yellowBg,Processing:T.purpleBg,Sent:T.greenBg};

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>CV Generator Manager</h2>
        <p style={{fontSize:14,color:T.t3}}>Seafarers who paid $4.99 for CV generation. Edit, preview and send.</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:selected?"1fr 1.6fr":"1fr",gap:16}}>
        {/* Request list */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:6}}>
            {[
              {label:"Total Requests",val:requests.length,color:isDark?"#38BDF8":T.t1},
              {label:"Pending",val:requests.filter(r=>r.status==="Pending").length,color:T.yellow},
              {label:"Sent",val:requests.filter(r=>r.status==="Sent").length,color:T.green},
            ].map((s,i)=>(
              <Card key={i} isDark={isDark} style={{padding:"14px 16px"}}>
                <div style={{fontSize:24,fontWeight:700,color:s.color,fontFamily:"'Sora',sans-serif"}}>{s.val}</div>
                <div style={{fontSize:11,color:T.t3,marginTop:2}}>{s.label}</div>
              </Card>
            ))}
          </div>
          {loadingCVs?(
            <div style={{textAlign:"center",padding:40,color:T.t3}}>Loading CV requests...</div>
          ):requests.length===0?(
            <div style={{textAlign:"center",padding:40,color:T.t3}}>No CV requests yet. Seafarers who pay $4.99 will appear here.</div>
          ):requests.map(req=>(
            <Card key={req.id} isDark={isDark} style={{padding:"16px 18px",cursor:"pointer",border:selected&&selected.id===req.id?(isDark?"1px solid #38BDF8":"1px solid #1a2332"):(isDark?"1px solid rgba(255,255,255,0.07)":"none")}} onClick={()=>openCV(req)}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <Av initials={req.avatar} size={42} isDark={isDark}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:3}}>{req.name}</div>
                  <div style={{fontSize:11,color:T.t3,marginBottom:6}}>{req.rank} Â· {req.date}{req.fileName?` Â· ${req.fileName}`:""}</div>
                  <div style={{display:"flex",gap:6}}>
                    <Bdg label={`$${req.amount} Paid`} color={T.green} bg={T.greenBg}/>
                    <Bdg label={req.status} color={statusColor[req.status]} bg={statusBg[req.status]}/>
                  </div>
                </div>
                {req.status==="Pending"&&(
                  <div style={{width:8,height:8,borderRadius:"50%",background:T.yellow,animation:"pulseDot 2s infinite",flexShrink:0}}/>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* CV Editor / Preview */}
        {selected&&(
          <div>
            <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
              {/* Toolbar */}
              <div style={{padding:"14px 20px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <div style={{display:"flex",gap:8}}>
                  <Pill active={!preview} isDark={isDark} onClick={()=>setPreview(false)}>Edit CV</Pill>
                  <Pill active={preview} isDark={isDark} onClick={()=>setPreview(true)}>Preview</Pill>
                </div>
                <div style={{display:"flex",gap:8}}>
                  {!editing?(
                    <button onClick={()=>setEditing(true)} style={{padding:"8px 16px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(100,116,139,0.15)",background:"transparent",color:T.t2,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
                      âœï¸ Edit
                    </button>
                  ):(
                    <button onClick={saveCV} style={{padding:"8px 16px",borderRadius:10,border:"none",background:isDark?"#38BDF8":"#1a2332",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
                      <Icon name="check" size={13} color="#fff" strokeWidth={2.5}/>Save
                    </button>
                  )}
                  <button onClick={()=>downloadCV(selected.id)} style={{padding:"8px 16px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(100,116,139,0.15)",background:"transparent",color:T.t2,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
                    <Icon name="download" size={13} color="currentColor" strokeWidth={2}/>Download
                  </button>
                  <button onClick={()=>sendCV(selected.id)} disabled={sending} style={{padding:"8px 16px",borderRadius:10,border:"none",background:selected.status==="Sent"?T.greenBg:"linear-gradient(135deg,#34D399,#10B981)",color:selected.status==="Sent"?T.green:"#fff",fontSize:12,fontWeight:600,cursor:sending?"not-allowed":"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5,opacity:sending?0.7:1}}>
                    <Icon name="send" size={13} color="currentColor" strokeWidth={2}/>
                    {sending?"Sending...":selected.status==="Sent"?"Resend CV":"Send CV"}
                  </button>
                </div>
              </div>

              {/* Preview mode */}
              {preview?(
                <div style={{padding:28,background:isDark?"rgba(255,255,255,0.01)":"#f8f9fa"}}>
                  {/* CV Preview Card */}
                  <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 32px rgba(0,0,0,0.12)",maxWidth:600,margin:"0 auto"}}>
                    {/* CV Header */}
                    <div style={{background:"linear-gradient(135deg,#0A1628,#1C2F52)",padding:"28px 32px",color:"#fff"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div>
                          <div style={{fontSize:11,color:"#C9A96E",letterSpacing:3,textTransform:"uppercase",fontWeight:600,marginBottom:8,fontFamily:"'Montserrat',sans-serif"}}>Maritime Professional</div>
                          <div style={{fontSize:26,fontWeight:700,color:"#fff",letterSpacing:-0.5,fontFamily:"Georgia,serif",marginBottom:6}}>{editData.fullName}</div>
                          <div style={{fontSize:14,color:"rgba(255,255,255,0.7)",fontFamily:"'Inter',sans-serif"}}>{editData.rank}</div>
                        </div>
                        <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(201,169,110,0.2)",border:"2px solid #C9A96E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#C9A96E",fontFamily:"Georgia,serif"}}>
                          {editData.fullName.split(" ").map(n=>n[0]).slice(0,2).join("")}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:20,marginTop:16,flexWrap:"wrap"}}>
                        {[{icon:"ðŸ“§",val:editData.email},{icon:"ðŸ“±",val:editData.phone},{icon:"ðŸ“",val:editData.homePort},{icon:"ðŸŒ",val:editData.nationality}].map((i,idx)=>(
                          <span key={idx} style={{fontSize:11,color:"rgba(255,255,255,0.65)",display:"flex",alignItems:"center",gap:5,fontFamily:"'Inter',sans-serif"}}>{i.icon} {i.val}</span>
                        ))}
                      </div>
                    </div>
                    {/* CV Body */}
                    <div style={{padding:"24px 32px"}}>
                      <div style={{marginBottom:20}}>
                        <div style={{fontSize:10,fontWeight:700,color:"#0A1628",letterSpacing:2,textTransform:"uppercase",marginBottom:8,fontFamily:"'Inter',sans-serif",borderBottom:"2px solid #C9A96E",paddingBottom:4}}>Professional Summary</div>
                        <p style={{fontSize:13,color:"#475569",lineHeight:1.7,fontFamily:"'Inter',sans-serif"}}>{editData.summary}</p>
                      </div>
                      <div style={{marginBottom:20}}>
                        <div style={{fontSize:10,fontWeight:700,color:"#0A1628",letterSpacing:2,textTransform:"uppercase",marginBottom:12,fontFamily:"'Inter',sans-serif",borderBottom:"2px solid #C9A96E",paddingBottom:4}}>Sea Service</div>
                        {editData.vessels.map((v,i)=>(
                          <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:10,padding:"10px 14px",background:"#f8f9fa",borderRadius:8,borderLeft:"3px solid #C9A96E"}}>
                            <div>
                              <div style={{fontSize:13,fontWeight:600,color:"#1a2332",fontFamily:"'Inter',sans-serif"}}>{v.name}</div>
                              <div style={{fontSize:11,color:"#64748b",fontFamily:"'Inter',sans-serif"}}>{v.type} Â· Flag: {v.flag}</div>
                            </div>
                            <div style={{fontSize:11,color:"#64748b",fontFamily:"'JetBrains Mono',monospace",textAlign:"right"}}>{v.from} â€“ {v.to||"Present"}</div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{fontSize:10,fontWeight:700,color:"#0A1628",letterSpacing:2,textTransform:"uppercase",marginBottom:10,fontFamily:"'Inter',sans-serif",borderBottom:"2px solid #C9A96E",paddingBottom:4}}>Certificates</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                          {editData.certs.map((c,i)=>(
                            <span key={i} style={{padding:"4px 12px",borderRadius:999,background:"rgba(10,22,40,0.07)",color:"#1a2332",fontSize:11,fontWeight:600,fontFamily:"'Inter',sans-serif"}}>✓ {c}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{marginTop:20,padding:"12px 16px",background:"rgba(10,22,40,0.04)",borderRadius:8,display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:11,color:"#64748b",fontFamily:"'Inter',sans-serif"}}>Experience: {editData.yearsExp} years</span>
                        <span style={{fontSize:11,color:"#64748b",fontFamily:"'Inter',sans-serif"}}>DOB: {editData.dob}</span>
                        <span style={{fontSize:11,color:"#C9A96E",fontWeight:700,fontFamily:"'Inter',sans-serif"}}>Generated by OceanCrew</span>
                      </div>
                    </div>
                  </div>
                </div>
              ):(
                /* Edit mode */
                <div style={{padding:22,display:"flex",flexDirection:"column",gap:14}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    {[
                      {key:"fullName",label:"Full Name"},
                      {key:"rank",label:"Rank"},
                      {key:"email",label:"Email"},
                      {key:"phone",label:"Phone"},
                      {key:"nationality",label:"Nationality"},
                      {key:"homePort",label:"Home Port"},
                      {key:"yearsExp",label:"Years Experience"},
                      {key:"dob",label:"Date of Birth"},
                    ].map(f=>(
                      <div key={f.key}>
                        <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>{f.label}</div>
                        <input value={editData[f.key]||""} onChange={e=>setEditData(p=>({...p,[f.key]:e.target.value}))} disabled={!editing}
                          style={{width:"100%",padding:"9px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:editing?(isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)"):(isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.02)"),color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box",opacity:editing?1:0.75}}/>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Professional Summary</div>
                    <textarea value={editData.summary||""} onChange={e=>setEditData(p=>({...p,summary:e.target.value}))} disabled={!editing} rows={3}
                      style={{width:"100%",padding:"9px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:editing?(isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)"):(isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.02)"),color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",boxSizing:"border-box",opacity:editing?1:0.75}}/>
                  </div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Sea Service</div>
                    {editData.vessels.map((v,i)=>(
                      <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:8,padding:"10px 12px",background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderRadius:10}}>
                        {[{k:"name",pl:"Vessel Name"},{k:"type",pl:"Type"},{k:"flag",pl:"Flag State"},{k:"from",pl:"From (YYYY-MM)"}].map(f=>(
                          <input key={f.k} value={v[f.k]||""} placeholder={f.pl} disabled={!editing}
                            onChange={e=>{const nv=[...editData.vessels];nv[i]={...nv[i],[f.k]:e.target.value};setEditData(p=>({...p,vessels:nv}));}}
                            style={{padding:"7px 10px",borderRadius:7,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"#fff",color:T.t1,fontSize:11,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Certificates (comma separated)</div>
                    <input value={editData.certs?.join(", ")||""} disabled={!editing}
                      onChange={e=>setEditData(p=>({...p,certs:e.target.value.split(",").map(c=>c.trim())}))}
                      style={{width:"100%",padding:"9px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:editing?(isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)"):(isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.02)"),color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

/* â•â• USER MANAGEMENT PAGE â•â• */
function UserManagementPage({isDark,seafarers,setSeafarers,companies,setCompanies,showToast}){
  const T=useT(isDark);
  const [tab,setTab]=useState("seafarers");
  const [selected,setSelected]=useState(null);
  const [editForm,setEditForm]=useState(null);

  const openEdit=(item)=>{setSelected(item);setEditForm({...item});};

  const saveEdit=()=>{
    if(tab==="seafarers") setSeafarers(p=>p.map(s=>s.id===selected.id?{...editForm}:s));
    else setCompanies(p=>p.map(c=>c.id===selected.id?{...editForm}:c));
    setSelected({...editForm});
    showToast("Profile updated successfully","success");
  };

  const resetPassword=(name)=>showToast(`Password reset email sent to ${name}`,"info");
  const forceLogout=(name)=>showToast(`${name} has been logged out`,"warning");
  const changePlan=(id,plan)=>{
    if(tab==="seafarers") setSeafarers(p=>p.map(s=>s.id===id?{...s,sub:plan}:s));
    else setCompanies(p=>p.map(c=>c.id===id?{...c,plan}:c));
    showToast(`Plan changed to ${plan}`,"success");
  };

  const list=tab==="seafarers"?seafarers:companies;

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>User Management</h2>
        <p style={{fontSize:14,color:T.t3}}>Full control — edit profiles, reset passwords, change plans, force logout</p>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <Pill active={tab==="seafarers"} isDark={isDark} onClick={()=>{setTab("seafarers");setSelected(null);}}>Seafarers ({seafarers.length})</Pill>
        <Pill active={tab==="companies"} isDark={isDark} onClick={()=>{setTab("companies");setSelected(null);}}>Companies ({companies.length})</Pill>
      </div>

      <div style={{display:"grid",gridTemplateColumns:selected?"1fr 1fr":"1fr",gap:16}}>
        <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"12px 20px",background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderBottom:isDark?"1px solid rgba(255,255,255,0.06)":"1px solid rgba(100,116,139,0.08)"}}>
            {["User","Plan/Sub","Status","Actions"].map(h=>(
              <span key={h} style={{fontSize:10,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{h}</span>
            ))}
          </div>
          {list.map((item,i)=>(
            <div key={item.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",padding:"13px 20px",borderBottom:i<list.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none",alignItems:"center",background:selected&&selected.id===item.id?(isDark?"rgba(56,189,248,0.05)":"rgba(26,35,50,0.04)"):"transparent",transition:"background 0.15s"}}
              onMouseEnter={e=>{if(!selected||selected.id!==item.id)e.currentTarget.style.background=isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.03)";}}
              onMouseLeave={e=>{if(!selected||selected.id!==item.id)e.currentTarget.style.background="transparent";}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Av initials={item.logo||item.avatar} size={34} isDark={isDark}/>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:T.t1}}>{item.name}</div>
                  <div style={{fontSize:10,color:T.t3}}>{item.rank||item.country}</div>
                </div>
              </div>
              <Bdg label={item.sub||item.plan} color={isDark?"#38BDF8":"#334155"} bg={isDark?"rgba(56,189,248,0.1)":"rgba(100,116,139,0.08)"}/>
              <Bdg label={item.status} color={item.status==="Active"?T.green:T.red} bg={item.status==="Active"?T.greenBg:T.redBg}/>
              <div style={{display:"flex",gap:5}}>
                <button onClick={()=>openEdit(item)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:isDark?"rgba(56,189,248,0.12)":T.accentBg,color:isDark?"#38BDF8":T.accent,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Edit</button>
                <button onClick={()=>resetPassword(item.name)} style={{padding:"5px 10px",borderRadius:7,border:"none",background:isDark?"rgba(251,191,36,0.12)":T.yellowBg,color:T.yellow,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Reset PW</button>
              </div>
            </div>
          ))}
        </Card>

        {selected&&editForm&&(
          <Card isDark={isDark} style={{padding:22}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h3 style={{fontSize:16,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Edit Profile</h3>
              <button onClick={()=>setSelected(null)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)",color:T.t3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name="x" size={13} color="currentColor" strokeWidth={2.5}/>
              </button>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
              {[
                {key:"name",label:"Full Name"},
                {key:"email",label:"Email",placeholder:"email@example.com"},
                {key:"rank",label:tab==="seafarers"?"Rank":"Country"},
                {key:"country",label:"Country"},
              ].filter(f=>editForm[f.key]!==undefined).map(f=>(
                <div key={f.key}>
                  <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>{f.label}</div>
                  <input value={editForm[f.key]||""} onChange={e=>setEditForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder||""}
                    style={{width:"100%",padding:"9px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
                </div>
              ))}

              <div>
                <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Status</div>
                <select value={editForm.status} onChange={e=>setEditForm(p=>({...p,status:e.target.value}))}
                  style={{width:"100%",padding:"9px 12px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"#0f1e36":"#fff",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif"}}>
                  <option>Active</option><option>Inactive</option><option>Suspended</option>
                </select>
              </div>

              <div>
                <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>
                  {tab==="seafarers"?"Subscription":"Plan"} — Force Change
                </div>
                <div style={{display:"flex",gap:6}}>
                  {(tab==="seafarers"?["Free","Pro"]:["Starter","Professional","Enterprise"]).map(plan=>(
                    <button key={plan} onClick={()=>changePlan(editForm.id,plan)} style={{flex:1,padding:"8px 0",borderRadius:9,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",
                      background:(editForm.sub===plan||editForm.plan===plan)?(isDark?"#38BDF8":"#1a2332"):(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"),
                      color:(editForm.sub===plan||editForm.plan===plan)?"#fff":T.t3}}>
                      {plan}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{display:"flex",gap:8,paddingTop:14,borderTop:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}`}}>
              <button onClick={saveEdit} style={{flex:2,padding:"10px",borderRadius:10,border:"none",background:isDark?"#38BDF8":"#1a2332",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <Icon name="check" size={13} color="#fff" strokeWidth={2.5}/>Save Changes
              </button>
              <button onClick={()=>resetPassword(selected.name)} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:T.yellowBg,color:T.yellow,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
                Reset PW
              </button>
              <button onClick={()=>forceLogout(selected.name)} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:T.redBg,color:T.red,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
                Logout
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* â•â• PLATFORM CONTROL PAGE â•â• */
function PlatformControlPage({isDark,showToast}){
  const T=useT(isDark);
  const [announcement,setAnnouncement]=useState("");
  const [announcements,setAnnouncements]=useState([
    {id:1,msg:"Platform maintenance scheduled for June 1st, 2:00â€“4:00 AM UTC.",date:"May 20",active:true},
    {id:2,msg:"New feature launched: Hiring Pipeline now available for all companies.",date:"May 15",active:false},
  ]);
  const [featured,setFeatured]=useState([
    {id:1,name:"Pacific Star Shipping",type:"Company",until:"Jun 30",logo:"PS"},
    {id:2,name:"Capt. Rajesh Fernando",type:"Seafarer",until:"Jun 15",logo:"RF"},
  ]);
  const [auditLog]=useState([
    {id:1,admin:"Super Admin",action:"Granted verified badge",target:"Pacific Star Shipping",time:"May 22 Â· 10:42",ip:"192.168.1.1"},
    {id:2,admin:"Super Admin",action:"Generated invoice INV-004",target:"Royal Caribbean Crew",time:"May 21 Â· 15:30",ip:"192.168.1.1"},
    {id:3,admin:"Super Admin",action:"Blacklisted user",target:"Chen Wei Long",time:"May 20 Â· 09:15",ip:"192.168.1.1"},
    {id:4,admin:"Super Admin",action:"Force plan change to Pro",target:"Shanaka Perera",time:"May 19 Â· 14:22",ip:"192.168.1.1"},
    {id:5,admin:"Super Admin",action:"Sent notification blast",target:"All Seafarers (12847)",time:"May 18 Â· 11:05",ip:"192.168.1.1"},
    {id:6,admin:"Super Admin",action:"Approved company",target:"Neptune Shipping Ltd.",time:"May 17 Â· 16:48",ip:"192.168.1.1"},
  ]);

  const postAnnouncement=()=>{
    if(!announcement.trim()){showToast("Write an announcement first","error");return;}
    setAnnouncements(p=>[{id:p.length+1,msg:announcement,date:"Today",active:true},...p]);
    setAnnouncement("");
    showToast("Announcement posted to all users","success");
  };

  const toggleAnnouncement=(id)=>{
    setAnnouncements(p=>p.map(a=>a.id===id?{...a,active:!a.active}:a));
    showToast("Announcement status updated","info");
  };

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Platform Control</h2>
        <p style={{fontSize:14,color:T.t3}}>Announcements, featured listings and full audit trail</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {/* Announcements */}
        <Card isDark={isDark}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:16,fontFamily:"'Sora',sans-serif"}}>Platform Announcements</h3>
          <textarea value={announcement} onChange={e=>setAnnouncement(e.target.value)} placeholder="Write a platform-wide announcement..." rows={3}
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.15)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"none",boxSizing:"border-box",marginBottom:10}}/>
          <button onClick={postAnnouncement} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:isDark?"#38BDF8":"#1a2332",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <Icon name="send" size={14} color="#fff" strokeWidth={2}/>Post Announcement
          </button>
          {announcements.map(a=>(
            <div key={a.id} style={{padding:"12px 14px",borderRadius:11,border:`1px solid ${a.active?(isDark?"rgba(56,189,248,0.2)":"rgba(26,35,50,0.15)"):(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)")}`,marginBottom:8,background:a.active?(isDark?"rgba(56,189,248,0.05)":"rgba(26,35,50,0.03)"):"transparent"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                <p style={{fontSize:12,color:a.active?T.t1:T.t3,lineHeight:1.5,flex:1}}>{a.msg}</p>
                <button onClick={()=>toggleAnnouncement(a.id)} style={{padding:"4px 10px",borderRadius:7,border:"none",background:a.active?T.redBg:T.greenBg,color:a.active?T.red:T.green,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",flexShrink:0}}>
                  {a.active?"Deactivate":"Activate"}
                </button>
              </div>
              <div style={{fontSize:10,color:T.t3,marginTop:6,display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:a.active?T.green:T.t3,display:"inline-block"}}/>
                {a.active?"Active":"Inactive"} Â· {a.date}
              </div>
            </div>
          ))}
        </Card>

        {/* Featured listings */}
        <Card isDark={isDark}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,marginBottom:16,fontFamily:"'Sora',sans-serif"}}>Featured Listings</h3>
          <p style={{fontSize:12,color:T.t3,marginBottom:14}}>Pin companies or seafarers to the top of search results</p>
          {featured.map(f=>(
            <div key={f.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:11,background:isDark?"rgba(251,191,36,0.05)":"rgba(217,119,6,0.04)",border:`1px solid ${T.yellow}30`,marginBottom:8}}>
              <Av initials={f.logo} size={36} isDark={isDark}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:T.t1}}>{f.name}</div>
                <div style={{fontSize:11,color:T.t3}}>{f.type} Â· Featured until {f.until}</div>
              </div>
              <Bdg label="Featured" color={T.yellow} bg={T.yellowBg}/>
              <button onClick={()=>{setFeatured(p=>p.filter(x=>x.id!==f.id));showToast("Removed from featured","info");}} style={{padding:"5px 10px",borderRadius:7,border:"none",background:T.redBg,color:T.red,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Remove</button>
            </div>
          ))}
          <button onClick={()=>showToast("Feature: select from Companies or Seafarers page","info")} style={{width:"100%",padding:"10px",borderRadius:10,border:`1px dashed ${isDark?"rgba(255,255,255,0.1)":"rgba(100,116,139,0.2)"}`,background:"transparent",color:T.t3,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",marginTop:8,display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <Icon name="plus" size={14} color="currentColor" strokeWidth={2}/>Add Featured Listing
          </button>
        </Card>
      </div>

      {/* Audit log */}
      <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 22px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Admin Audit Trail</h3>
          <button style={{padding:"7px 14px",borderRadius:9,border:isDark?"1px solid rgba(255,255,255,0.08)":"none",background:isDark?"transparent":"rgba(100,116,139,0.07)",color:T.t2,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5}}>
            <Icon name="download" size={13} color="currentColor" strokeWidth={2}/>Export Log
          </button>
        </div>
        {auditLog.map((log,i)=>(
          <div key={log.id} style={{display:"grid",gridTemplateColumns:"1.5fr 2fr 1fr 1fr",padding:"13px 22px",borderBottom:i<auditLog.length-1?(isDark?"1px solid rgba(255,255,255,0.04)":"1px solid rgba(100,116,139,0.07)"):"none",alignItems:"center",transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.03)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <Bdg label={log.action} color={isDark?"#38BDF8":"#334155"} bg={isDark?"rgba(56,189,248,0.08)":"rgba(100,116,139,0.08)"}/>
            <span style={{fontSize:12,color:T.t2}}>{log.target}</span>
            <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{log.time}</span>
            <span style={{fontSize:10,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{log.ip}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
const NAV_FULL = [
  {section:"Overview",items:[
    {id:"dashboard",   icon:"dashboard",  label:"Dashboard"},
    {id:"activity",    icon:"activity",   label:"Activity Feed"},
  ]},
  {section:"Approvals & Trust",items:[
    {id:"approvals",   icon:"zap",        label:"Approvals",badge:3},
    {id:"verify",      icon:"shield",     label:"Verification Badges"},
    {id:"blacklist",   icon:"ban",        label:"Blacklist"},
  ]},
  {section:"Users",items:[
    {id:"usermgmt",    icon:"users",      label:"User Management"},
    {id:"companies",   icon:"building",   label:"Companies"},
    {id:"seafarers",   icon:"anchor",     label:"Seafarers"},
    {id:"pipeline",    icon:"filter",     label:"Hiring Pipeline"},
  ]},
  {section:"Finance",items:[
    {id:"invoices",    icon:"fileText",   label:"Invoices",badge:2,badgeColor:"#FBBF24"},
    {id:"revenue",     icon:"dollarSign", label:"Revenue"},
  ]},
  {section:"Platform",items:[
    {id:"cvmanager",   icon:"award",      label:"CV Manager",badge:2,badgeColor:"#34D399"},
    {id:"platform",    icon:"layers",     label:"Platform Control"},
    {id:"notifications",icon:"bell",      label:"Notifications"},
    {id:"settings",    icon:"settings",   label:"Settings"},
  ]},
];

export default function AdminPanel(){
  const [page,setPage]=useState("dashboard");
  const [sidebar,setSidebar]=useState(true);
  const [theme,setTheme]=useState("dark");
  const [toast,setToast]=useState(null);
  const [seafarers,setSeafarers]=useState(initSeafarers);
  const [companies,setCompanies]=useState(initCompanies);

  const isDark=theme==="dark";
  const T=useT(isDark);
  const showToast=(msg,type="info")=>setToast({msg,type});

  const renderPage=()=>{
    const p={isDark,showToast,seafarers,setSeafarers,companies,setCompanies};
    switch(page){
      case "dashboard":    return <Dashboard setPage={setPage} {...p}/>;
      case "approvals":    return <ApprovalsPage {...p}/>;
      case "verify":       return <VerifyPage {...p}/>;
      case "blacklist":    return <BlacklistPage {...p}/>;
      case "usermgmt":     return <UserManagementPage {...p}/>;
      case "companies":    return <CompaniesPage {...p}/>;
      case "seafarers":    return <SeafarersPage {...p}/>;
      case "pipeline":     return <PipelinePage {...p}/>;
      case "invoices":     return <InvoicePage {...p}/>;
      case "revenue":      return <RevenuePage {...p}/>;
      case "cvmanager":    return <CVManagerPage {...p}/>;
      case "platform":     return <PlatformControlPage {...p}/>;
      case "notifications":return <NotificationsPage {...p}/>;
      case "settings":     return <SettingsPage {...p}/>;
      default:             return <Dashboard setPage={setPage} {...p}/>;
    }
  };

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Montserrat:wght@400;500;600;700&display=swap');
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
        <aside style={{width:sidebar?256:68,minHeight:"100vh",background:T.sidebar,
          boxShadow:isDark?"1px 0 0 rgba(255,255,255,0.05)":"2px 0 24px rgba(150,170,200,0.1)",
          display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0,
          zIndex:1000,transition:"width .28s ease",overflow:"hidden"}}>
          <div style={{padding:sidebar?"20px 18px":"18px 14px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",alignItems:"center",gap:12,whiteSpace:"nowrap"}}>
            <div style={{width:38,height:38,borderRadius:11,background:isDark?"linear-gradient(135deg,#0284C7,#38BDF8)":"#1a2332",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:isDark?"0 4px 16px rgba(2,132,199,0.35)":"0 4px 12px rgba(26,35,50,0.22)"}}>
              <Icon name="anchor" size={18} color="#fff" strokeWidth={2}/>
            </div>
            {sidebar&&(
              <div>
                <div style={{fontWeight:700,fontSize:17,color:T.t1,fontFamily:"'Sora',sans-serif",lineHeight:1.1}}>OceanCrew</div>
                <div style={{fontSize:8,color:isDark?"#38BDF8":"#94A3B8",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginTop:2}}>Admin Center</div>
              </div>
            )}
          </div>
          {sidebar&&(
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{position:"relative",flexShrink:0}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:isDark?"rgba(248,113,113,0.12)":"rgba(100,116,139,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2,fontWeight:700,fontSize:11,fontFamily:"'Sora',sans-serif"}}>SA</div>
                <div style={{position:"absolute",bottom:0,right:0,width:8,height:8,borderRadius:"50%",background:"#22C55E",border:`2px solid ${T.sidebar}`}}/>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:T.t1}}>Super Admin</div>
                <div style={{fontSize:9,color:T.red,fontWeight:600}}>God Mode</div>
              </div>
            </div>
          )}
          <nav style={{flex:1,padding:"10px 8px",overflowY:"auto",display:"flex",flexDirection:"column",gap:0}}>
            {NAV_FULL.map(section=>(
              <div key={section.section}>
                {sidebar&&<div style={{fontSize:9,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:"0.12em",padding:"10px 12px 4px",marginTop:6}}>{section.section}</div>}
                {section.items.map(item=>{
                  const active=page===item.id;
                  const ac=isDark?"#38BDF8":"#1a2332";
                  return(
                    <button key={item.id} onClick={()=>setPage(item.id)} title={!sidebar?item.label:""}
                      style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:sidebar?"8px 12px":"10px",borderRadius:10,border:"none",cursor:"pointer",
                        background:active?(isDark?"rgba(56,189,248,0.1)":"rgba(26,35,50,0.07)"):"transparent",
                        color:active?ac:T.t3,fontSize:13,fontWeight:active?600:400,
                        justifyContent:sidebar?"flex-start":"center",transition:"all .12s",fontFamily:"'Inter',sans-serif",
                        borderLeft:`2px solid ${active?ac:"transparent"}`}}
                      onMouseEnter={e=>{if(!active){e.currentTarget.style.background=isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)";e.currentTarget.style.color=T.t1;}}}
                      onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t3;}}}>
                      <Icon name={item.icon} size={15} color="currentColor" strokeWidth={active?2.2:1.8}/>
                      {sidebar&&<span style={{flex:1,whiteSpace:"nowrap"}}>{item.label}</span>}
                      {sidebar&&item.badge&&(
                        <span style={{background:item.badgeColor||"#EF4444",color:"#fff",borderRadius:999,minWidth:17,height:17,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,padding:"0 4px"}}>{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
          <div style={{padding:"10px 8px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`}}>
            <button onClick={()=>setSidebar(s=>!s)} style={{width:"100%",padding:"8px",borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`,background:"transparent",color:T.t3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontSize:11,fontWeight:500,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)";e.currentTarget.style.color=T.t1;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t3;}}>
              <Icon name={sidebar?"chevronLeft":"chevronRight"} size={13} strokeWidth={2.2}/>
              {sidebar&&"Collapse"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="dashboard-main-wrapper" style={{flex:1,marginLeft:sidebar?256:68,transition:"margin-left .28s ease",display:"flex",flexDirection:"column",minWidth:0}}>
          <header style={{background:isDark?D.header:L.header,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
            borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(150,170,200,0.15)"}`,
            padding:"0 28px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",
            position:"sticky",top:0,zIndex:100,gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <h2 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>
                {NAV_FULL.flatMap(s=>s.items).find(n=>n.id===page)?.label||"Dashboard"}
              </h2>
              <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>
                {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
              </span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={13} color={T.t3} strokeWidth={2}/></span>
                <input placeholder="Search..." style={{width:160,padding:"7px 12px 7px 30px",borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",color:T.t1,fontSize:12,outline:"none",fontFamily:"'Inter',sans-serif"}}/>
              </div>
              <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2,transition:"all .12s"}}>
                <Icon name={isDark?"sun":"moon"} size={14} strokeWidth={2}/>
              </button>
              <button style={{width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2}}>
                <Icon name="bell" size={14} strokeWidth={2}/>
              </button>
              <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 12px 5px 5px",background:isDark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.95)",borderRadius:999,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,cursor:"pointer"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"#1a2332",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",position:"relative",flexShrink:0}}>
                  SA
                  <div style={{position:"absolute",bottom:0,right:0,width:6,height:6,borderRadius:"50%",background:"#22C55E",border:`2px solid ${isDark?"#08090C":"#fff"}`}}/>
                </div>
                <span style={{fontSize:12,fontWeight:600,color:T.t1}}>Admin</span>
              </div>
            </div>
          </header>

          <main style={{flex:1,padding:24,overflowY:"auto"}}>
            <div className="page-anim">{renderPage()}</div>
          </main>

          <footer style={{padding:"11px 28px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(150,170,200,0.1)"}`,background:isDark?D.header:L.header,backdropFilter:"blur(16px)",textAlign:"center"}}>
            <p style={{fontSize:11,color:T.t3}}>
              2025 <strong style={{color:isDark?"#38BDF8":T.t1,fontWeight:600}}>OceanCrew</strong> Admin
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
