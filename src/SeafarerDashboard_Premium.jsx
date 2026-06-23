/* eslint-disable */
import { useState, useEffect } from "react";

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    home:        <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    briefcase:   <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    send:        <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    folder:      <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
    bell:        <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    user:        <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    bookmark:    <><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></>,
    search:      <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    check:       <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    x:           <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    xCircle:     <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    upload:      <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    download:    <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    fileText:    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    anchor:      <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    star:        <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    trendUp:     <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    activity:    <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    award:       <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    shield:      <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    mail:        <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    mic:         <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    edit:        <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    globe:       <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    moon:        <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:         <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    chevronLeft: <><polyline points="15 18 9 12 15 6"/></>,
    chevronRight:<><polyline points="9 18 15 12 9 6"/></>,
    chevronDown: <><polyline points="6 9 12 15 18 9"/></>,
    plus:        <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    zap:         <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    alertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    sparkles:    <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>,
    ship:        <><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></>,
    menu:        <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    logOut:      <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    layers:      <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  };
  const p = icons[name];
  if (!p) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink:0, display:"inline-block", verticalAlign:"middle" }}>
      {p}
    </svg>
  );
};

const SEAFARER = { name:"Capt. Rajesh Fernando", rank:"Master Mariner", nationality:"Sri Lankan", experience:"18 Years", avatar:"RF", profileComplete:78, verified:true };

const STATS = [
  { label:"Applications", value:12, icon:"send",     color:"#38BDF8", bg:"rgba(56,189,248,0.1)",  change:"+3 this week", trend:"up",    sparkline:[3,5,4,7,6,9,8,10,9,12] },
  { label:"Under Review", value:4,  icon:"eye",      color:"#FBBF24", bg:"rgba(251,191,36,0.1)",  change:"2 updated",    trend:"stable",sparkline:[2,3,2,4,3,5,4,5,4,4]  },
  { label:"Shortlisted",  value:3,  icon:"star",     color:"#A78BFA", bg:"rgba(167,139,250,0.1)", change:"+1 new",       trend:"up",    sparkline:[1,1,2,1,2,2,3,2,3,3]  },
  { label:"Jobs Saved",   value:7,  icon:"bookmark", color:"#34D399", bg:"rgba(52,211,153,0.1)",  change:"2 expiring",   trend:"stable",sparkline:[2,3,4,4,5,5,6,6,7,7]  },
];

const APPLICATIONS = [
  { id:1, title:"Chief Officer",  company:"Pacific Star Shipping", vessel:"Container",   salary:"$4,200", status:"Shortlisted",  date:"May 15", logo:"PS", color:"#A78BFA" },
  { id:2, title:"Master",         company:"Emirates Maritime",     vessel:"Bulk Carrier", salary:"$6,800", status:"Under Review", date:"May 12", logo:"EM", color:"#FBBF24" },
  { id:3, title:"Chief Officer",  company:"MSC Global Lines",      vessel:"Oil Tanker",   salary:"$5,100", status:"Interview",    date:"May 10", logo:"MS", color:"#38BDF8" },
  { id:4, title:"Staff Captain",  company:"Royal Caribbean",       vessel:"Cruise Ship",  salary:"$7,200", status:"Applied",      date:"May 8",  logo:"RC", color:"#34D399" },
  { id:5, title:"Master",         company:"Evergreen Marine",      vessel:"Container",    salary:"$6,500", status:"Rejected",     date:"May 5",  logo:"EV", color:"#F87171" },
];

const JOBS = [
  { id:1, title:"Master",         company:"Maersk Line",      vessel:"Container",   salary:"$7,500", location:"Singapore", contract:"12 mo", urgent:true,  match:97, logo:"ML", color:"#38BDF8" },
  { id:2, title:"Chief Engineer", company:"Pacific Star",     vessel:"Bulk Carrier", salary:"$5,800", location:"Hong Kong",  contract:"9 mo",  urgent:false, match:91, logo:"PS", color:"#A78BFA" },
  { id:3, title:"Master",         company:"MSC Global",       vessel:"Container",   salary:"$6,800", location:"Rotterdam",  contract:"8 mo",  urgent:true,  match:94, logo:"MS", color:"#34D399" },
  { id:4, title:"Staff Captain",  company:"Carnival Corp",    vessel:"Cruise Ship", salary:"$7,200", location:"Miami",      contract:"6 mo",  urgent:false, match:88, logo:"CC", color:"#FBBF24" },
  { id:5, title:"Chief Officer",  company:"Yang Ming Marine", vessel:"Container",   salary:"$4,800", location:"Taiwan",     contract:"10 mo", urgent:false, match:85, logo:"YM", color:"#F97316" },
  { id:6, title:"2nd Officer",    company:"COSCO Shipping",   vessel:"Bulk Carrier", salary:"$3,400", location:"Shanghai",   contract:"6 mo",  urgent:false, match:82, logo:"CO", color:"#0EA5E9" },
];

const DOCUMENTS = [
  { name:"CDC (Continuous Discharge Certificate)", status:"Verified", expires:"Jan 2027", icon:"fileText",    color:"#34D399" },
  { name:"STCW Basic Safety Training",             status:"Verified", expires:"Mar 2026", icon:"shield",      color:"#34D399" },
  { name:"Passport",                               status:"Verified", expires:"Nov 2028", icon:"globe",       color:"#34D399" },
  { name:"Medical Certificate (ENG1)",             status:"Expiring", expires:"Jul 2025", icon:"alertCircle", color:"#FBBF24" },
  { name:"CV / Resume",                            status:"Uploaded", expires:"N/A",      icon:"fileText",    color:"#38BDF8" },
  { name:"OOW Certificate",                        status:"Missing",  expires:"—",        icon:"layers",      color:"#F87171" },
];

const NOTIFICATIONS = [
  { id:1, icon:"star",        title:"You've been shortlisted!", msg:"Pacific Star Shipping shortlisted you for Chief Officer.", time:"2h ago",  read:false, color:"#A78BFA" },
  { id:2, icon:"mic",         title:"Interview Scheduled",      msg:"MSC Global Lines invited you for an interview on May 25.",  time:"5h ago",  read:false, color:"#38BDF8" },
  { id:3, icon:"eye",         title:"Profile Viewed",           msg:"Emirates Maritime Co. viewed your profile.",                time:"1d ago",  read:true,  color:"#0EA5E9" },
  { id:4, icon:"sparkles",    title:"3 New Job Matches",        msg:"New jobs matching your profile — Master on Container.",     time:"2d ago",  read:true,  color:"#34D399" },
  { id:5, icon:"alertCircle", title:"Document Expiring",        msg:"Your Medical Certificate expires in 45 days.",              time:"3d ago",  read:true,  color:"#FBBF24" },
];

const STATUS_MAP = {
  "Applied":      { color:"#38BDF8", bg:"rgba(56,189,248,0.12)",  border:"rgba(56,189,248,0.25)",  icon:"send",        step:1 },
  "Under Review": { color:"#FBBF24", bg:"rgba(251,191,36,0.12)",  border:"rgba(251,191,36,0.25)",  icon:"eye",         step:2 },
  "Shortlisted":  { color:"#A78BFA", bg:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.25)", icon:"star",        step:3 },
  "Interview":    { color:"#0EA5E9", bg:"rgba(14,165,233,0.12)",  border:"rgba(14,165,233,0.25)",  icon:"mic",         step:4 },
  "Selected":     { color:"#34D399", bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.25)",  icon:"checkCircle", step:5 },
  "Rejected":     { color:"#F87171", bg:"rgba(248,113,113,0.12)", border:"rgba(248,113,113,0.25)", icon:"xCircle",     step:0 },
};

const NAV_ITEMS = [
  { id:"dashboard",    icon:"home",      label:"Dashboard"    },
  { id:"jobs",         icon:"briefcase", label:"Browse Jobs"  },
  { id:"applications", icon:"send",      label:"Applications",badge:3 },
  { id:"saved",        icon:"bookmark",  label:"Saved Jobs",  badge:7, badgeColor:"#34D399" },
  { id:"documents",    icon:"folder",    label:"Documents"    },
  { id:"notifications",icon:"bell",      label:"Notifications",badge:2 },
  { id:"profile",      icon:"user",      label:"My Profile"   },
];

// ── Chip ──
function Chip({ children, color="#38BDF8" }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:999, background:`${color}18`, border:`1px solid ${color}30`, color, fontSize:11, fontWeight:500, letterSpacing:"-0.01em", whiteSpace:"nowrap" }}>
      {children}
    </span>
  );
}

// ── Status Badge ──
function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP["Applied"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 11px", borderRadius:999, background:s.bg, border:`1px solid ${s.border}`, color:s.color, fontSize:11, fontWeight:500, whiteSpace:"nowrap" }}>
      <Icon name={s.icon} size={11} color={s.color} strokeWidth={2.2} />{status}
    </span>
  );
}

// ── Avatar ──
function Av({ initials, size=42, gradient="linear-gradient(135deg,#0284C7,#38BDF8)", online=false }) {
  return (
    <div style={{ position:"relative", flexShrink:0 }}>
      <div style={{ width:size, height:size, borderRadius:"50%", background:gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:size*0.34, fontFamily:"'Sora',sans-serif", boxShadow:"0 4px 12px rgba(0,0,0,0.2)" }}>{initials}</div>
      {online && <div style={{ position:"absolute", bottom:1, right:1, width:size*0.25, height:size*0.25, borderRadius:"50%", background:"#34D399", border:"2px solid var(--bg-card)" }} />}
    </div>
  );
}

// ── Stat Card ──
function StatCard({ stat, delay=0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  const max = Math.max(...stat.sparkline);
  return (
    <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:16, padding:20, overflow:"hidden", position:"relative", opacity:show?1:0, transform:show?"none":"translateY(16px)", transition:"opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${stat.color}40`; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 10px 30px rgba(0,0,0,0.2)`; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
    >
      <div style={{ position:"absolute", top:-24, right:-24, width:100, height:100, borderRadius:"50%", background:`radial-gradient(circle,${stat.color}15 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ width:40, height:40, borderRadius:11, background:stat.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name={stat.icon} size={19} color={stat.color} strokeWidth={1.8} />
        </div>
        <Chip color={stat.trend==="up"?"#34D399":"#FBBF24"}>
          <Icon name={stat.trend==="up"?"trendUp":"activity"} size={10} strokeWidth={2.3} />{stat.change}
        </Chip>
      </div>
      <div style={{ fontSize:34, fontWeight:700, color:stat.color, letterSpacing:"-0.04em", lineHeight:1, fontFamily:"'Sora',sans-serif" }}>{stat.value}</div>
      <div style={{ fontSize:12, color:"var(--text-2)", marginTop:5, fontWeight:500 }}>{stat.label}</div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:3, marginTop:14, height:26 }}>
        {stat.sparkline.map((v,i) => (
          <div key={i} style={{ flex:1, borderRadius:3, background:stat.color, height:`${(v/max)*100}%`, minHeight:3, opacity:0.2+(i/stat.sparkline.length)*0.8 }} />
        ))}
      </div>
    </div>
  );
}

// ── Profile Ring ──
function ProfileRing({ pct }) {
  const r=34, circ=2*Math.PI*r;
  const [dash, setDash] = useState(0);
  useEffect(() => { setTimeout(() => setDash((pct/100)*circ), 300); }, [pct,circ]);
  return (
    <div style={{ position:"relative", width:84, height:84, flexShrink:0 }}>
      <svg width={84} height={84} viewBox="0 0 84 84">
        <circle cx={42} cy={42} r={r} fill="none" stroke="var(--bg-tertiary)" strokeWidth={7} />
        <circle cx={42} cy={42} r={r} fill="none" stroke="#38BDF8" strokeWidth={7}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 42 42)"
          style={{ transition:"stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:16, fontWeight:700, color:"#38BDF8", fontFamily:"'Sora',sans-serif" }}>{pct}%</span>
      </div>
    </div>
  );
}

// ── Glass Card ──
function GCard({ children, style={} }) {
  return (
    <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:16, padding:22, boxShadow:"0 2px 14px rgba(0,0,0,0.12)", ...style }}>
      {children}
    </div>
  );
}

// ── Job Card ──
function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:hov?"var(--bg-tertiary)":"var(--bg-card)", borderRadius:14, padding:18, border:hov?`1.5px solid ${job.color}40`:"1px solid var(--border)", transition:"all 0.22s", cursor:"pointer", transform:hov?"translateY(-2px)":"none", boxShadow:hov?"0 8px 24px rgba(0,0,0,0.18)":"none" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{ width:40, height:40, borderRadius:11, background:`linear-gradient(135deg,${job.color},${job.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12, fontFamily:"'Sora',sans-serif" }}>{job.logo}</div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {job.urgent && <Chip color="#F87171"><Icon name="zap" size={10} color="#F87171" strokeWidth={2.5} />Urgent</Chip>}
          <button onClick={e=>{e.stopPropagation();setSaved(s=>!s);}} style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
            <Icon name="bookmark" size={16} color={saved?"#FBBF24":"var(--text-3)"} strokeWidth={saved?2.5:1.8} />
          </button>
        </div>
      </div>
      <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:`${job.color}15`, border:`1px solid ${job.color}30`, borderRadius:999, padding:"3px 9px", marginBottom:8 }}>
        <Icon name="sparkles" size={10} color={job.color} strokeWidth={2.2} />
        <span style={{ fontSize:10, color:job.color, fontWeight:600, fontFamily:"'JetBrains Mono',monospace" }}>{job.match}% Match</span>
      </div>
      <div style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.02em", marginBottom:2, fontFamily:"'Sora',sans-serif" }}>{job.title}</div>
      <div style={{ fontSize:12, color:"var(--text-3)", marginBottom:12 }}>{job.company}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
        {[job.vessel, job.location, job.contract].map(tag => <Chip key={tag} color="#38BDF8">{tag}</Chip>)}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <span style={{ fontSize:17, fontWeight:700, color:job.color, fontFamily:"'JetBrains Mono',monospace" }}>{job.salary}</span>
          <span style={{ fontSize:10, color:"var(--text-3)", marginLeft:2 }}>/mo</span>
        </div>
        <button style={{ padding:"7px 16px", borderRadius:9, border:"none", background:`linear-gradient(135deg,${job.color},${job.color}cc)`, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>Apply →</button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// PAGES
// ────────────────────────────────────────────
function DashboardHome({ setPage }) {
  const hour = new Date().getHours();
  const greeting = hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background:"linear-gradient(135deg,#0C1627,#0F2444,#0284C7)", borderRadius:18, padding:"clamp(20px,4vw,36px)", marginBottom:22, position:"relative", overflow:"hidden", border:"1px solid rgba(56,189,248,0.15)" }}>
        <div style={{ position:"absolute", right:-60, top:-60, width:280, height:280, borderRadius:"50%", background:"rgba(56,189,248,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(52,211,153,0.15)", border:"1px solid rgba(52,211,153,0.25)", borderRadius:999, padding:"4px 12px", marginBottom:14 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#34D399", display:"inline-block", animation:"pulseDot 2s infinite" }} />
            <span style={{ fontSize:11, color:"#34D399", fontWeight:600 }}>Open to Work · Profile Active</span>
          </div>
          <h1 style={{ fontSize:"clamp(20px,4vw,32px)", fontWeight:700, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.15, marginBottom:8, fontFamily:"'Sora',sans-serif" }}>{greeting}, Rajesh 👋</h1>
          <p style={{ fontSize:"clamp(12px,2vw,14px)", color:"rgba(255,255,255,0.6)", marginBottom:18 }}>{SEAFARER.rank} · {SEAFARER.experience} at Sea</p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button onClick={()=>setPage("jobs")} style={{ padding:"10px 20px", borderRadius:10, border:"none", cursor:"pointer", background:"#fff", color:"#0284C7", fontWeight:700, fontSize:13, display:"flex", alignItems:"center", gap:7, fontFamily:"'Inter',sans-serif" }}>
              <Icon name="search" size={15} color="#0284C7" strokeWidth={2.2} /> Find Jobs
            </button>
            <button onClick={()=>setPage("profile")} style={{ padding:"10px 20px", borderRadius:10, border:"1px solid rgba(255,255,255,0.25)", cursor:"pointer", background:"rgba(255,255,255,0.1)", color:"#fff", fontWeight:600, fontSize:13, display:"flex", alignItems:"center", gap:7, fontFamily:"'Inter',sans-serif", backdropFilter:"blur(10px)" }}>
              <Icon name="user" size={15} color="#fff" strokeWidth={2} /> My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats — 2 col on mobile, 4 col on desktop */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14, marginBottom:22 }}>
        {STATS.map((s,i) => <StatCard key={i} stat={s} delay={i*70} />)}
      </div>

      {/* Profile Completion */}
      <GCard style={{ marginBottom:18 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", marginBottom:18, fontFamily:"'Sora',sans-serif" }}>Profile Completion</h3>
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:20 }}>
          <ProfileRing pct={SEAFARER.profileComplete} />
          <div>
            <p style={{ fontSize:14, fontWeight:700, color:"var(--text-1)", marginBottom:4 }}>{SEAFARER.profileComplete}% Complete</p>
            <p style={{ fontSize:12, color:"var(--text-3)", lineHeight:1.5 }}>Complete your profile for better job matches</p>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:10 }}>
          {[
            {label:"Basic Information",done:true},{label:"Sea Experience",done:true},
            {label:"Certificates",done:true},{label:"Profile Photo",done:false},
            {label:"CV Uploaded",done:true},{label:"All Documents",done:false},
          ].map((item,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:20, height:20, borderRadius:"50%", background:item.done?"#38BDF8":"var(--bg-tertiary)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${item.done?"#38BDF8":"var(--border)"}` }}>
                {item.done && <Icon name="check" size={10} color="#fff" strokeWidth={2.8} />}
              </div>
              <span style={{ fontSize:12, color:item.done?"var(--text-1)":"var(--text-3)", fontWeight:item.done?500:400 }}>{item.label}</span>
              {!item.done && <span style={{ marginLeft:"auto", fontSize:10, color:"#38BDF8", fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>Add →</span>}
            </div>
          ))}
        </div>
      </GCard>

      {/* Recent Applications */}
      <GCard style={{ marginBottom:18 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif" }}>Recent Applications</h3>
          <button onClick={()=>setPage("applications")} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:4, fontFamily:"'Inter',sans-serif" }}>
            View All <Icon name="chevronRight" size={13} color="#38BDF8" strokeWidth={2.5} />
          </button>
        </div>
        {APPLICATIONS.slice(0,4).map(app=>(
          <div key={app.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
            <div style={{ width:40, height:40, borderRadius:11, background:`linear-gradient(135deg,${app.color},${app.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12, flexShrink:0, fontFamily:"'Sora',sans-serif" }}>{app.logo}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.015em", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{app.title}</div>
              <div style={{ fontSize:11, color:"var(--text-3)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{app.company}</div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <StatusBadge status={app.status} />
              <div style={{ fontSize:10, color:"var(--text-3)", marginTop:4, fontFamily:"'JetBrains Mono',monospace" }}>{app.date}</div>
            </div>
          </div>
        ))}
      </GCard>

      {/* Recommended Jobs */}
      <GCard>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", display:"flex", alignItems:"center", gap:8 }}>
            <Icon name="sparkles" size={16} color="#A78BFA" strokeWidth={2} /> AI Recommended
          </h3>
          <button onClick={()=>setPage("jobs")} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:4, fontFamily:"'Inter',sans-serif" }}>
            Browse All <Icon name="chevronRight" size={13} color="#38BDF8" strokeWidth={2.5} />
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14 }}>
          {JOBS.slice(0,3).map(job=><JobCard key={job.id} job={job} />)}
        </div>
      </GCard>
    </div>
  );
}

function BrowseJobs() {
  const [search, setSearch] = useState("");
  const [rankF, setRankF] = useState("All");
  const [vesselF, setVesselF] = useState("All");
  const ranks=["All","Master","Chief Officer","Chief Engineer","2nd Officer","ETO","Bosun"];
  const vessels=["All","Container Vessel","Bulk Carrier","Oil Tanker","Cruise Ship","LNG Carrier"];
  const filtered=JOBS.filter(j=>(rankF==="All"||j.title===rankF)&&(vesselF==="All"||j.vessel===vesselF)&&(j.title.toLowerCase().includes(search.toLowerCase())||j.company.toLowerCase().includes(search.toLowerCase())));
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:4 }}>Browse Jobs</h2>
        <p style={{ fontSize:13, color:"var(--text-3)" }}>{JOBS.length} verified positions worldwide</p>
      </div>
      <GCard style={{ marginBottom:18, padding:16 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}><Icon name="search" size={15} color="var(--text-3)" strokeWidth={2} /></span>
            <input placeholder="Search by title or company…" value={search} onChange={e=>setSearch(e.target.value)} style={{ width:"100%", padding:"10px 14px 10px 36px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <select value={rankF} onChange={e=>setRankF(e.target.value)} style={{ padding:"10px 12px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:13, outline:"none", fontFamily:"'Inter',sans-serif" }}>
              {ranks.map(r=><option key={r}>{r}</option>)}
            </select>
            <select value={vesselF} onChange={e=>setVesselF(e.target.value)} style={{ padding:"10px 12px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:13, outline:"none", fontFamily:"'Inter',sans-serif" }}>
              {vessels.map(v=><option key={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </GCard>
      {filtered.length===0?(
        <GCard style={{ textAlign:"center", padding:"50px 20px" }}>
          <Icon name="search" size={42} color="var(--text-3)" strokeWidth={1.5} />
          <p style={{ fontSize:15, fontWeight:600, color:"var(--text-2)", marginTop:14, fontFamily:"'Sora',sans-serif" }}>No jobs match your filters</p>
          <p style={{ fontSize:13, color:"var(--text-3)", marginTop:6 }}>Try adjusting your search</p>
        </GCard>
      ):(
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
          {filtered.map(job=><JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}

function Applications() {
  const [selected, setSelected] = useState(null);
  const STEPS=["Applied","Under Review","Shortlisted","Interview","Selected"];
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:4 }}>My Applications</h2>
        <p style={{ fontSize:13, color:"var(--text-3)" }}>{APPLICATIONS.length} total applications</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom: selected?18:0 }}>
        {APPLICATIONS.map(app=>{
          const active=selected?.id===app.id;
          return (
            <div key={app.id} onClick={()=>setSelected(active?null:app)} style={{ background:"var(--bg-card)", borderRadius:16, padding:18, cursor:"pointer", border:active?`1.5px solid ${app.color}50`:"1px solid var(--border)", boxShadow:active?"0 6px 24px rgba(0,0,0,0.18)":"none", transition:"all 0.22s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${app.color},${app.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13, flexShrink:0, fontFamily:"'Sora',sans-serif" }}>{app.logo}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{app.title}</div>
                  <div style={{ fontSize:12, color:"var(--text-3)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{app.company} · {app.vessel}</div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <StatusBadge status={app.status} />
                  <div style={{ fontSize:10, color:"var(--text-3)", marginTop:4, fontFamily:"'JetBrains Mono',monospace" }}>{app.date}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selected && (
        <GCard style={{ border:`1.5px solid ${selected.color}35` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif" }}>Application Journey</h3>
            <button onClick={()=>setSelected(null)} style={{ background:"var(--bg-tertiary)", border:"1px solid var(--border)", cursor:"pointer", width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-2)" }}>
              <Icon name="x" size={14} strokeWidth={2.2} />
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, padding:14, background:"var(--bg-tertiary)", borderRadius:12, marginBottom:22 }}>
            <div style={{ width:46, height:46, borderRadius:12, background:`linear-gradient(135deg,${selected.color},${selected.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:14, fontFamily:"'Sora',sans-serif", flexShrink:0 }}>{selected.logo}</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif" }}>{selected.title}</div>
              <div style={{ fontSize:12, color:"var(--text-3)", marginTop:2 }}>{selected.company}</div>
              <div style={{ fontSize:14, fontWeight:700, color:selected.color, marginTop:3, fontFamily:"'JetBrains Mono',monospace" }}>{selected.salary}/mo</div>
            </div>
          </div>
          {/* Timeline */}
          {STEPS.map((step,i)=>{
            const s=STATUS_MAP[step];
            const appStep=STATUS_MAP[selected.status]?.step||0;
            const isRejected=selected.status==="Rejected";
            const isDone=!isRejected&&appStep>=s.step;
            const isCurrent=!isRejected&&appStep===s.step;
            return (
              <div key={step} style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background:isDone?s.color:"var(--bg-tertiary)", border:`1.5px solid ${isDone?s.color:"var(--border)"}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:isCurrent?`0 0 0 4px ${s.color}25`:"none", transition:"all 0.3s", zIndex:1 }}>
                    {isDone?<Icon name="check" size={12} color="#fff" strokeWidth={2.8} />:<span style={{ fontSize:10, color:"var(--text-3)", fontWeight:600 }}>{i+1}</span>}
                  </div>
                  {i<STEPS.length-1&&<div style={{ width:2, height:22, background:isDone&&appStep>s.step?s.color:"var(--bg-tertiary)", transition:"background 0.3s" }} />}
                </div>
                <div style={{ paddingBottom:14, paddingTop:3 }}>
                  <div style={{ fontSize:13, fontWeight:isCurrent?700:500, color:isDone?"var(--text-1)":"var(--text-3)" }}>{step}</div>
                  {isCurrent&&<Chip color={s.color}>Current Status</Chip>}
                </div>
              </div>
            );
          })}
          {selected.status==="Rejected"&&(
            <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:8 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:"#F87171", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name="x" size={13} color="#fff" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize:13, fontWeight:700, color:"#F87171" }}>Application Rejected</span>
            </div>
          )}
        </GCard>
      )}
    </div>
  );
}

function DocumentVault() {
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:4 }}>Document Vault</h2>
          <p style={{ fontSize:13, color:"var(--text-3)" }}>Secure storage for all maritime certificates</p>
        </div>
        <button style={{ padding:"10px 20px", borderRadius:10, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:700, fontSize:13, boxShadow:"0 4px 14px rgba(2,132,199,0.35)", display:"flex", alignItems:"center", gap:7, fontFamily:"'Inter',sans-serif", whiteSpace:"nowrap" }}>
          <Icon name="upload" size={15} color="#fff" strokeWidth={2.2} /> Upload Doc
        </button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginBottom:18 }}>
        {DOCUMENTS.map((doc,i)=>(
          <GCard key={i} style={{ padding:18 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ width:42, height:42, borderRadius:11, background:`${doc.color}15`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name={doc.icon} size={21} color={doc.color} strokeWidth={1.8} />
              </div>
              <Chip color={doc.color}>
                <Icon name={doc.status==="Verified"?"checkCircle":doc.status==="Expiring"?"alertCircle":doc.status==="Missing"?"xCircle":"fileText"} size={10} strokeWidth={2.2} />
                {doc.status}
              </Chip>
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:"var(--text-1)", marginBottom:5, lineHeight:1.4 }}>{doc.name}</div>
            <div style={{ fontSize:11, color:"var(--text-3)", marginBottom:14, fontFamily:"'JetBrains Mono',monospace" }}>Expires: {doc.expires}</div>
            <div style={{ display:"flex", gap:8 }}>
              {doc.status!=="Missing"?(
                <>
                  <button style={{ flex:1, padding:"8px", borderRadius:9, border:"1px solid var(--border)", background:"transparent", color:"#38BDF8", fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"'Inter',sans-serif" }}>
                    <Icon name="eye" size={12} color="#38BDF8" strokeWidth={2} /> View
                  </button>
                  <button style={{ flex:1, padding:"8px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"'Inter',sans-serif" }}>
                    <Icon name="download" size={12} color="#fff" strokeWidth={2} /> Save
                  </button>
                </>
              ):(
                <button style={{ flex:1, padding:"8px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#F87171,#FCA5A5)", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="upload" size={12} color="#fff" strokeWidth={2} /> Upload Now
                </button>
              )}
            </div>
          </GCard>
        ))}
      </div>
      <div style={{ borderRadius:14, padding:"36px 20px", textAlign:"center", border:"2px dashed var(--border)", background:"var(--bg-tertiary)", cursor:"pointer", transition:"all 0.2s" }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#38BDF8";e.currentTarget.style.background="rgba(56,189,248,0.06)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--bg-tertiary)";}}
      >
        <div style={{ width:48, height:48, borderRadius:12, background:"rgba(56,189,248,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
          <Icon name="upload" size={22} color="#38BDF8" strokeWidth={1.8} />
        </div>
        <p style={{ fontSize:14, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:5 }}>Drag & drop documents here</p>
        <p style={{ fontSize:12, color:"var(--text-3)" }}>PDF, JPG, PNG · Max 10MB</p>
      </div>
    </div>
  );
}

function Notifications() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
        <div>
          <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:4 }}>Notifications</h2>
          <p style={{ fontSize:13, color:"var(--text-3)" }}>{notifs.filter(n=>!n.read).length} unread</p>
        </div>
        <button onClick={()=>setNotifs(n=>n.map(x=>({...x,read:true})))} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:13, fontWeight:700, fontFamily:"'Inter',sans-serif" }}>Mark all read</button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {notifs.map(n=>(
          <div key={n.id} onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))}
            style={{ background:"var(--bg-card)", borderRadius:14, padding:18, cursor:"pointer", border:n.read?"1px solid var(--border)":`1.5px solid ${n.color}35`, display:"flex", gap:14, transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--bg-tertiary)"}
            onMouseLeave={e=>e.currentTarget.style.background="var(--bg-card)"}
          >
            <div style={{ width:40, height:40, borderRadius:11, background:`${n.color}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name={n.icon} size={19} color={n.color} strokeWidth={2} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, gap:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.015em" }}>{n.title}</span>
                <span style={{ fontSize:10, color:"var(--text-3)", fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{n.time}</span>
              </div>
              <p style={{ fontSize:12, color:"var(--text-2)", lineHeight:1.55 }}>{n.msg}</p>
            </div>
            {!n.read&&<div style={{ width:8, height:8, borderRadius:"50%", background:n.color, flexShrink:0, marginTop:6 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  const sections=[
    { title:"Personal Information", data:[
      {label:"Full Name",val:"Capt. Rajesh Fernando"},{label:"Nationality",val:"Sri Lankan"},
      {label:"Date of Birth",val:"15 March 1986"},{label:"Phone",val:"+94 77 123 4567"},
      {label:"Email",val:"rajesh@email.com"},{label:"WhatsApp",val:"+94 77 123 4567"},
    ]},
    { title:"Sea Experience", data:[
      {label:"Current Rank",val:"Master Mariner"},{label:"Total Sea Service",val:"18 Years"},
      {label:"Vessel Types",val:"Container, Bulk Carrier"},{label:"Expected Salary",val:"USD 6,500–7,500/mo"},
      {label:"Available From",val:"June 1, 2025"},{label:"Preferred Location",val:"Singapore, UAE"},
    ]},
  ];
  return (
    <div>
      <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:22 }}>My Maritime Profile</h2>

      {/* Profile card */}
      <GCard style={{ textAlign:"center", padding:28, marginBottom:18 }}>
        <div style={{ position:"relative", display:"inline-block", marginBottom:16 }}>
          <Av initials={SEAFARER.avatar} size={80} gradient="linear-gradient(135deg,#0284C7,#38BDF8)" online />
          <button style={{ position:"absolute", bottom:0, right:0, width:26, height:26, borderRadius:"50%", background:"#0284C7", border:"2px solid var(--bg-card)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="edit" size={12} color="#fff" strokeWidth={2.2} />
          </button>
        </div>
        <h3 style={{ fontSize:18, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:4 }}>{SEAFARER.name}</h3>
        <p style={{ fontSize:13, color:"#38BDF8", fontWeight:700, marginBottom:4 }}>{SEAFARER.rank}</p>
        <p style={{ fontSize:12, color:"var(--text-3)", marginBottom:18 }}>{SEAFARER.nationality} · {SEAFARER.experience}</p>
        <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginBottom:20 }}>
          <Chip color="#34D399"><Icon name="shield" size={10} strokeWidth={2.5} /> Verified</Chip>
          <Chip color="#38BDF8"><Icon name="globe" size={10} strokeWidth={2} /> Open to Work</Chip>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
          {[{val:"12",label:"Applications"},{val:"3",label:"Shortlisted"}].map(s=>(
            <div key={s.label} style={{ background:"var(--bg-tertiary)", borderRadius:10, padding:"14px 10px", textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:700, color:"#38BDF8", fontFamily:"'Sora',sans-serif" }}>{s.val}</div>
              <div style={{ fontSize:10, color:"var(--text-3)", marginTop:3, textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Inter',sans-serif", boxShadow:"0 4px 14px rgba(2,132,199,0.35)" }}>
          <Icon name="edit" size={14} color="#fff" strokeWidth={2} /> Edit Profile
        </button>
      </GCard>

      {sections.map(section=>(
        <GCard key={section.title} style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <h4 style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif" }}>{section.title}</h4>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:5, fontFamily:"'Inter',sans-serif" }}>
              <Icon name="edit" size={13} color="#38BDF8" strokeWidth={2} /> Edit
            </button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"12px 24px" }}>
            {section.data.map(f=>(
              <div key={f.label}>
                <div style={{ fontSize:10, color:"var(--text-3)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{f.label}</div>
                <div style={{ fontSize:13, color:"var(--text-1)", fontWeight:600 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </GCard>
      ))}
    </div>
  );
}

function SavedJobs() {
  return (
    <div>
      <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>Saved Jobs</h2>
      <p style={{ fontSize:13, color:"var(--text-3)", marginBottom:22 }}>{JOBS.length} jobs saved</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
        {JOBS.map(job=><JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// MAIN LAYOUT
// ────────────────────────────────────────────
export default function SeafarerDashboard() {
  const [page, setPage] = useState("dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [theme, setTheme] = useState("dark");
  const isDark = theme==="dark";
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  // Close mobile nav on page change
  const goPage = (p) => { setPage(p); setMobileNav(false); };

  const renderPage = () => {
    switch(page) {
      case "dashboard":     return <DashboardHome setPage={goPage} />;
      case "jobs":          return <BrowseJobs />;
      case "applications":  return <Applications />;
      case "saved":         return <SavedJobs />;
      case "documents":     return <DocumentVault />;
      case "notifications": return <Notifications />;
      case "profile":       return <Profile />;
      default:              return <DashboardHome setPage={goPage} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --bg-primary:  ${isDark?"#08090C":"#F7F8FA"};
          --bg-card:     ${isDark?"#10121A":"#FFFFFF"};
          --bg-tertiary: ${isDark?"#181B26":"#F0F2F5"};
          --border:      ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"};
          --text-1:      ${isDark?"#F1F5F9":"#0F172A"};
          --text-2:      ${isDark?"#94A3B8":"#475569"};
          --text-3:      ${isDark?"#475569":"#94A3B8"};
        }
        body,html{ font-family:'Inter',-apple-system,sans-serif; -webkit-font-smoothing:antialiased; background:var(--bg-primary); color:var(--text-1); }
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.4)}}
        .page-in{animation:fadeIn .35s cubic-bezier(.4,0,.2,1);}
        input::placeholder{color:var(--text-3);}
        input,select,button,textarea{font-family:'Inter',-apple-system,sans-serif;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,.25);border-radius:3px;}

        /* Mobile overlay */
        .mob-overlay{display:none;}
        @media(max-width:768px){
          .desktop-sidebar{display:none!important;}
          .mob-overlay{display:block;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999;backdrop-filter:blur(4px);}
          .mob-sidebar{position:fixed;top:0;left:0;bottom:0;width:260px;z-index:1000;transition:transform .3s ease;}
          .main-content{margin-left:0!important;}
        }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg-primary)" }}>

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="desktop-sidebar" style={{ width:sidebar?252:72, minHeight:"100vh", background:isDark?"#09090C":"#fff", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, bottom:0, zIndex:1000, transition:"width .3s cubic-bezier(.4,0,.2,1)", overflow:"hidden" }}>
          <div style={{ padding:sidebar?"20px 18px":"18px 14px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:11, whiteSpace:"nowrap" }}>
            <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 5px 16px rgba(2,132,199,0.4)" }}>
              <Icon name="ship" size={19} color="#fff" strokeWidth={2} />
            </div>
            {sidebar&&<div><div style={{ fontWeight:700, fontSize:17, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", lineHeight:1.1 }}>OceanCrew</div><div style={{ fontSize:8, color:"#38BDF8", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, marginTop:2 }}>SKYbird Systems</div></div>}
          </div>
          {sidebar&&(
            <div style={{ padding:"12px 18px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10 }}>
              <Av initials={SEAFARER.avatar} size={36} gradient="linear-gradient(135deg,#0284C7,#38BDF8)" online />
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--text-1)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{SEAFARER.name}</div>
                <div style={{ fontSize:10, color:"#38BDF8", fontWeight:600, marginTop:2, display:"flex", alignItems:"center", gap:4 }}>
                  <Icon name="anchor" size={9} color="#38BDF8" strokeWidth={2.5} />{SEAFARER.rank}
                </div>
              </div>
            </div>
          )}
          <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
            {NAV_ITEMS.map(item=>{
              const active=page===item.id;
              return (
                <button key={item.id} onClick={()=>goPage(item.id)} title={!sidebar?item.label:""} style={{ width:"100%", display:"flex", alignItems:"center", gap:11, padding:sidebar?"10px 14px":"11px", borderRadius:10, border:"none", cursor:"pointer", marginBottom:3, background:active?"rgba(56,189,248,0.1)":"transparent", color:active?"#38BDF8":"var(--text-3)", fontSize:13, fontWeight:active?700:500, justifyContent:sidebar?"flex-start":"center", transition:"all .15s", borderLeft:active?"2px solid #38BDF8":"2px solid transparent", fontFamily:"'Inter',sans-serif" }}
                  onMouseEnter={e=>{ if(!active){e.currentTarget.style.background="var(--bg-tertiary)";e.currentTarget.style.color="var(--text-1)";}}}
                  onMouseLeave={e=>{ if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--text-3)";}}}
                >
                  <Icon name={item.icon} size={16} color={active?"#38BDF8":"currentColor"} strokeWidth={active?2.2:1.8} />
                  {sidebar&&<span style={{ whiteSpace:"nowrap" }}>{item.label}</span>}
                  {sidebar&&item.badge&&<span style={{ marginLeft:"auto", background:item.badgeColor||"#EF4444", color:"#fff", borderRadius:999, minWidth:18, height:17, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, padding:"0 5px" }}>{item.badge}</span>}
                </button>
              );
            })}
          </nav>
          <div style={{ padding:"10px 10px 14px", borderTop:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:7 }}>
            <button onClick={()=>setSidebar(s=>!s)} style={{ width:"100%", padding:"9px", borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-3)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, fontSize:12, fontWeight:500, fontFamily:"'Inter',sans-serif" }}>
              <Icon name={sidebar?"chevronLeft":"chevronRight"} size={14} strokeWidth={2.2} />{sidebar&&"Collapse"}
            </button>
          </div>
        </aside>

        {/* ── MOBILE SIDEBAR OVERLAY ── */}
        {mobileNav && <div className="mob-overlay" onClick={()=>setMobileNav(false)} />}
        <aside className="mob-sidebar" style={{ transform:mobileNav?"translateX(0)":"translateX(-100%)", background:isDark?"#09090C":"#fff", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"18px 18px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name="ship" size={18} color="#fff" strokeWidth={2} />
              </div>
              <div style={{ fontWeight:700, fontSize:16, color:"var(--text-1)", fontFamily:"'Sora',sans-serif" }}>OceanCrew</div>
            </div>
            <button onClick={()=>setMobileNav(false)} style={{ background:"var(--bg-tertiary)", border:"1px solid var(--border)", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--text-2)" }}>
              <Icon name="x" size={16} strokeWidth={2} />
            </button>
          </div>
          <div style={{ padding:"12px 16px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10 }}>
            <Av initials={SEAFARER.avatar} size={36} gradient="linear-gradient(135deg,#0284C7,#38BDF8)" online />
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--text-1)" }}>{SEAFARER.name}</div>
              <div style={{ fontSize:10, color:"#38BDF8", fontWeight:600 }}>{SEAFARER.rank}</div>
            </div>
          </div>
          <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
            {NAV_ITEMS.map(item=>{
              const active=page===item.id;
              return (
                <button key={item.id} onClick={()=>goPage(item.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, border:"none", cursor:"pointer", marginBottom:3, background:active?"rgba(56,189,248,0.1)":"transparent", color:active?"#38BDF8":"var(--text-2)", fontSize:14, fontWeight:active?700:500, transition:"all .15s", borderLeft:active?"2px solid #38BDF8":"2px solid transparent", fontFamily:"'Inter',sans-serif" }}>
                  <Icon name={item.icon} size={17} color={active?"#38BDF8":"currentColor"} strokeWidth={active?2.2:1.8} />
                  <span>{item.label}</span>
                  {item.badge&&<span style={{ marginLeft:"auto", background:item.badgeColor||"#EF4444", color:"#fff", borderRadius:999, minWidth:18, height:17, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, padding:"0 5px" }}>{item.badge}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <div className="main-content" style={{ flex:1, marginLeft:sidebar?252:72, display:"flex", flexDirection:"column", minWidth:0, transition:"margin-left .3s ease" }}>

          {/* Header */}
          <header style={{ background:isDark?"rgba(16,18,26,0.75)":"rgba(255,255,255,0.75)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)", padding:"0 clamp(16px,3vw,28px)", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {/* Mobile menu button */}
              <button onClick={()=>setMobileNav(true)} style={{ display:"none", width:36, height:36, borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-card)", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"var(--text-2)", flexShrink:0 }}
                className="mobile-menu-btn">
                <Icon name="menu" size={17} strokeWidth={2} />
              </button>
              <h2 style={{ fontSize:"clamp(14px,2.5vw,17px)", fontWeight:700, color:"var(--text-1)", fontFamily:"'Sora',sans-serif", whiteSpace:"nowrap" }}>
                {page==="dashboard"?"Welcome back 👋":NAV_ITEMS.find(n=>n.id===page)?.label}
              </h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button onClick={()=>setPage("notifications")} style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-card)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", color:"var(--text-2)" }}>
                <Icon name="bell" size={16} strokeWidth={2} />
                {unread>0&&<span style={{ position:"absolute", top:7, right:7, width:7, height:7, borderRadius:"50%", background:"#EF4444", border:"2px solid var(--bg-card)", animation:"pulseDot 2s infinite" }} />}
              </button>
              <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-card)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-2)" }}>
                <Icon name={isDark?"sun":"moon"} size={15} strokeWidth={2} />
              </button>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 10px 5px 5px", background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:10, cursor:"pointer" }}>
                <Av initials={SEAFARER.avatar} size={26} gradient="linear-gradient(135deg,#0284C7,#38BDF8)" />
                <span style={{ fontSize:12, fontWeight:700, color:"var(--text-1)", display:"none" }} className="desktop-name">Rajesh</span>
              </div>
            </div>
          </header>

          <style>{`
            @media(max-width:768px){
              .mobile-menu-btn{display:flex!important;}
              .desktop-name{display:none!important;}
            }
          `}</style>

          {/* Content */}
          <main style={{ flex:1, padding:"clamp(16px,3vw,28px)", overflowY:"auto" }}>
            <div className="page-in">{renderPage()}</div>
          </main>

          <footer style={{ padding:"12px clamp(16px,3vw,28px)", borderTop:"1px solid var(--border)", textAlign:"center" }}>
            <p style={{ fontSize:11, color:"var(--text-3)" }}>
              © 2025 <strong style={{ color:"#38BDF8" }}>OceanCrew</strong> · Powered by <strong style={{ color:"#38BDF8" }}>SKYbird Systems</strong>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
