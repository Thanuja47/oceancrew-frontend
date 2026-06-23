/* eslint-disable */
import { useState, useEffect } from "react";

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    creditCard: <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    moon: <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    anchor: <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    trendUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    xCircle: <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    play: <><polygon points="5 3 19 12 5 21 5 3"/></>,
    chevronLeft: <><polyline points="15 18 9 12 15 6"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    barChart: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    fileText: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    mic: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    alertCircle: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    sparkles: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/></>,
    waves: <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></>,
    flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    pipeline: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  };
  const path = icons[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}>
      {path}
    </svg>
  );
};

const COMPANY = { name:"Pacific Star Shipping Co.", type:"Manning Agency", country:"Singapore", verified:true, memberSince:"March 2024", logo:"PS", plan:"Professional", contactPerson:"Mr. David Chen", email:"hr@pacificstar.com", phone:"→65 6123 4567", activeJobs:8, totalHired:47 };

const STATS = [
  { label:"Active Job Posts", value:8,   icon:"briefcase",  color:"#38BDF8", bg:"rgba(2,132,199,0.12)",   change:"→2 this week", changeColor:"#10B981", changeBg:"rgba(16,185,129,0.12)", sparkline:[60,80,40,90,70,100,50], trend:"up" },
  { label:"Total Applicants", value:134, icon:"users",       color:"#A78BFA", bg:"rgba(139,92,246,0.12)",  change:"→18 today",    changeColor:"#10B981", changeBg:"rgba(16,185,129,0.12)", sparkline:[30,50,70,60,90,100,80], trend:"up" },
  { label:"Shortlisted",      value:23,  icon:"star",        color:"#FBBF24", bg:"rgba(245,158,11,0.12)",  change:"5 pending",    changeColor:"#FBBF24", changeBg:"rgba(245,158,11,0.12)", sparkline:[40,60,50,80,70,100,90], trend:"stable" },
  { label:"Total Hired",      value:47,  icon:"checkCircle", color:"#34D399", bg:"rgba(16,185,129,0.12)",  change:"All time",     changeColor:"#34D399", changeBg:"rgba(16,185,129,0.12)", sparkline:[20,40,60,50,80,100,90], trend:"up" },
];

const JOBS = [
  { id:1, title:"Master",         vessel:"Container Vessel", applicants:28, shortlisted:6, status:"Active", posted:"May 10", salary:"$7,500", urgent:true,  expires:"Jun 10" },
  { id:2, title:"Chief Officer",  vessel:"Bulk Carrier",     applicants:19, shortlisted:4, status:"Active", posted:"May 12", salary:"$4,800", urgent:false, expires:"Jun 12" },
  { id:3, title:"Chief Engineer", vessel:"Oil Tanker",       applicants:31, shortlisted:7, status:"Active", posted:"May 8",  salary:"$5,800", urgent:true,  expires:"Jun 8"  },
  { id:4, title:"Second Officer", vessel:"Container Vessel", applicants:22, shortlisted:3, status:"Active", posted:"May 15", salary:"$3,200", urgent:false, expires:"Jun 15" },
  { id:5, title:"ETO",            vessel:"Cruise Ship",      applicants:14, shortlisted:2, status:"Paused", posted:"May 5",  salary:"$3,900", urgent:false, expires:"Jun 5"  },
  { id:6, title:"Bosun",          vessel:"Bulk Carrier",     applicants:9,  shortlisted:1, status:"Closed", posted:"Apr 28", salary:"$2,100", urgent:false, expires:"May 28" },
];

const APPLICANTS = [
  { id:1, name:"Capt. Rajesh Fernand✓, rank:"Master",         exp:"18 yrs", nationality:"Sri Lankan", status:"Shortlisted",  score:95, cdc:true,  stcw:true,  avatar:"RF", color:"#0EA5E9" },
  { id:2, name:"Eng. Priya Nair",       rank:"Chief Engineer", exp:"14 yrs", nationality:"Indian",     status:"Under Review", score:88, cdc:true,  stcw:true,  avatar:"PN", color:"#A78BFA" },
  { id:3, name:"Shanaka Perera",        rank:"Chief Officer",  exp:"11 yrs", nationality:"Sri Lankan", status:"Shortlisted",  score:91, cdc:true,  stcw:true,  avatar:"SP", color:"#34D399" },
  { id:4, name:"Mohammed Al Farsi",     rank:"Second Officer", exp:"7 yrs",  nationality:"Omani",      status:"Applied",      score:76, cdc:true,  stcw:false, avatar:"MA", color:"#FBBF24" },
  { id:5, name:"Dilshan Wickrama",      rank:"ETO",            exp:"9 yrs",  nationality:"Sri Lankan", status:"Interview",    score:83, cdc:true,  stcw:true,  avatar:"DW", color:"#0EA5E9" },
  { id:6, name:"Chen Wei Long",         rank:"Chief Officer",  exp:"13 yrs", nationality:"Chinese",    status:"Rejected",     score:72, cdc:false, stcw:true,  avatar:"CW", color:"#F87171" },
  { id:7, name:"Nuwan Jayasuriya",      rank:"Master",         exp:"16 yrs", nationality:"Sri Lankan", status:"Under Review", score:89, cdc:true,  stcw:true,  avatar:"NJ", color:"#FB923C" },
  { id:8, name:"Ravi Krishnamurthy",    rank:"Chief Engineer", exp:"20 yrs", nationality:"Indian",     status:"Selected",     score:97, cdc:true,  stcw:true,  avatar:"RK", color:"#34D399" },
];

const NOTIFICATIONS = [
  { id:1, icon:"users",       title:"New Application",       msg:"Capt. Rajesh Fernando applied for Master.",                time:"30m ag✓, read:false, color:"#38BDF8" },
  { id:2, icon:"checkCircle", title:"Job Post Approved",     msg:"Your posting for Chief Engineer has been approved.",       time:"2h ag✓,  read:false, color:"#34D399" },
  { id:3, icon:"sparkles",    title:"7 New Shortlist Matches",msg:"AI found 3 new candidates for Chief Officer.",           time:"5h ag✓,  read:true,  color:"#A78BFA" },
  { id:4, icon:"creditCard",  title:"Subscription Renewal",  msg:"Your Professional plan renews in 7 days.",                time:"1d ag✓,  read:true,  color:"#FBBF24" },
  { id:5, icon:"award",       title:"Candidate Selected",    msg:"Ravi Krishnamurthy accepted your offer.",                 time:"2d ag✓,  read:true,  color:"#34D399" },
];

const PIPELINE = [
  { stage:"Applied",      count:134, color:"#38BDF8", icon:"mail"        },
  { stage:"Under Review", count:48,  color:"#FBBF24", icon:"eye"         },
  { stage:"Shortlisted",  count:23,  color:"#A78BFA", icon:"star"        },
  { stage:"Interview",    count:11,  color:"#0EA5E9", icon:"mic"         },
  { stage:"Selected",     count:8,   color:"#34D399", icon:"award"       },
];

const AI_INSIGHTS = [
  { icon:"trendUp",     iconColor:"#34D399", bgColor:"rgba(16,185,129,0.12)", text:<>Applications up <strong style={{color:"#34D399"}}>23%</strong> this month. Chief Engineer roles seeing highest demand.</> },
  { icon:"alertCircle", iconColor:"#FBBF24", bgColor:"rgba(245,158,11,0.12)", text:<>Master position expires in <strong style={{color:"#F87171"}}>3 days</strong>. Only 2 shortlisted candidates available.</> },
  { icon:"target",      iconColor:"#A78BFA", bgColor:"rgba(139,92,246,0.12)", text:<>Top match: Capt. Rajesh Fernando scores <strong style={{color:"#38BDF8"}}>95%</strong> for Master role.</> },
];

const STATUS_MAP = {
  "Applied":      { color:"#38BDF8", bg:"rgba(56,189,248,0.12)",  border:"rgba(56,189,248,0.25)",  icon:"mail"        },
  "Under Review": { color:"#FBBF24", bg:"rgba(245,158,11,0.12)",  border:"rgba(245,158,11,0.25)",  icon:"eye"         },
  "Shortlisted":  { color:"#A78BFA", bg:"rgba(139,92,246,0.12)",  border:"rgba(139,92,246,0.25)",  icon:"star"        },
  "Interview":    { color:"#0EA5E9", bg:"rgba(14,165,233,0.12)",  border:"rgba(14,165,233,0.25)",  icon:"mic"         },
  "Selected":     { color:"#34D399", bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.25)",  icon:"checkCircle" },
  "Rejected":     { color:"#F87171", bg:"rgba(239,68,68,0.12)",   border:"rgba(239,68,68,0.25)",   icon:"xCircle"     },
};

const NAV_ITEMS = [
  { id:"dashboard",    icon:"dashboard",  label:"Dashboard",      section:"main"   },
  { id:"jobs",         icon:"briefcase",  label:"Job Management", section:"main"   },
  { id:"candidates",   icon:"users",      label:"Candidates",     section:"main",  badge:134 },
  { id:"pipeline",     icon:"pipeline",   label:"Pipeline",       section:"main"   },
  { id:"ai-insights",  icon:"sparkles",   label:"AI Insights",    section:"ai",    badge:"NEW", badgeColor:"#A78BFA" },
  { id:"notifications",icon:"bell",       label:"Notifications",  section:"manage",badge:2 },
  { id:"subscription", icon:"creditCard", label:"Subscription",   section:"manage" },
  { id:"profile",      icon:"building",   label:"Company Profile",section:"manage" },
];

function GlassCard({ children, style, hover=true }) {
  return (
    <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-card)", borderRadius:16, padding:28, boxShadow:"0 4px 24px rgba(0,0,0,0.25)", transition:"all 0.25s cubic-bezier(0.4,0,0.2,1)", ...style }}
      onMouseEnter={e=>{ if(hover){ e.currentTarget.style.borderColor="rgba(56,189,248,0.3)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.4)"; }}}
      onMouseLeave={e=>{ if(hover){ e.currentTarget.style.borderColor="var(--border-card)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(0,0,0,0.25)"; }}}
    >{children}</div>
  );
}

function Avatar({ initials, size=44, gradient="linear-gradient(135deg,#0284C7,#38BDF8)", fontSize }) {
  const fs = fontSize || Math.round(size*0.36);
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:600, fontSize:fs, flexShrink:0, boxShadow:"0 4px 14px rgba(0,0,0,0.25)", fontFamily:"'Inter',sans-serif", letterSpacing:"-0.02em", position:"relative" }}>
      {initials}
      <div style={{ position:"absolute", bottom:0, right:0, width:size*0.26, height:size*0.26, borderRadius:"50%", background:"#34D399", border:"2px solid var(--bg-card)" }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP["Applied"];
  return (
    <span style={{ background:s.bg, color:s.color, padding:"5px 12px", borderRadius:999, fontSize:12, fontWeight:500, whiteSpace:"nowrap", border:`1px solid ${s.border}`, display:"inline-flex", alignItems:"center", gap:6, letterSpacing:"-0.01em" }}>
      <Icon name={s.icon} size={13} color={s.color} strokeWidth={2.2} />
      {status}
    </span>
  );
}

function UrgentBadge() {
  return (
    <span style={{ background:"rgba(239,68,68,0.12)", color:"#F87171", padding:"5px 12px", borderRadius:999, fontSize:11, fontWeight:600, border:"1px solid rgba(239,68,68,0.25)", display:"inline-flex", alignItems:"center", gap:6, letterSpacing:"0.02em", textTransform:"uppercase", animation:"pulseUrgent 2s infinite" }}>
      <Icon name="flame" size={12} color="#F87171" strokeWidth={2.2} /> Urgent
    </span>
  );
}

function StatCard({ stat, delay=0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setVisible(true),delay); return()=>clearTimeout(t); },[delay]);
  return (
    <div style={{ background:"var(--bg-card)", border:"1px solid var(--border-card)", borderRadius:16, padding:26, transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)", position:"relative", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.25)", opacity:visible┈┈┈┈┈┈┈┈1:0, transform:visible—translateY(0)":"translateY(20px)" }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="rgba(56,189,248,0.3)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.4)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="var(--border-card)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(0,0,0,0.25)"; }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div style={{ width:48, height:48, borderRadius:12, background:stat.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name={stat.icon} size={24} color={stat.color} strokeWidth={2} />
        </div>
        <span style={{ fontSize:12, fontWeight:500, padding:"4px 10px", borderRadius:999, background:stat.changeBg, color:stat.changeColor, display:"inline-flex", alignItems:"center", gap:4, letterSpacing:"-0.01em" }}>
          <Icon name={stat.trend==="up"—trendUp":"activity"} size={12} color={stat.changeColor} strokeWidth={2.5} />
          {stat.change}
        </span>
      </div>
      <div style={{ fontSize:44, fontWeight:700, color:stat.color, letterSpacing:"-0.04em", lineHeight:1, fontFeatureSettings:'"tnum"' }}>{stat.value}</div>
      <div style={{ fontSize:14, color:"var(--text-secondary)", marginTop:10, fontWeight:500, letterSpacing:"-0.01em" }}>{stat.label}</div>
      <div style={{ marginTop:18, height:36, display:"flex", alignItems:"flex-end", gap:4 }}>
        {stat.sparkline.map((h,i)=>(
          <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:2, background:stat.color, opacity:0.4→(i/stat.sparkline.length)*0.6 }} />
        ))}
      </div>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d=>d.value));
  const [animated, setAnimated] = useState(false);
  useEffect(()=>{ setTimeout(()=>setAnimated(true),200); },[]);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:10, height:140, paddingTop:20 }}>
      {data.map((d,i)=>(
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:10, maxWidth:48 }}>
          <span style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.04em" }}>{d.value}</span>
          <div style={{ width:"100%", borderRadius:"6px 6px 0 0", background:`linear-gradient(180deg,${d.color},${d.color}99)`, height:animated┈┈┈┈┈┈┈┈`${(d.value/max)*90}px`:"6px", transition:`height 0.8s cubic-bezier(0.4,0,0.2,1) ${i*60}ms`, minHeight:6 }} />
          <span style={{ fontSize:11, fontWeight:500, color:"var(--text-tertiary)", letterSpacing:"0.03em", textTransform:"uppercase" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function PipelineBar({ stage, maxCount=134 }) {
  const [width, setWidth] = useState(0);
  useEffect(()=>{ setTimeout(()=>setWidth((stage.count/maxCount)*100),200); },[stage.count,maxCount]);
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ fontSize:14, fontWeight:500, color:"var(--text-secondary)", display:"flex", alignItems:"center", gap:10, letterSpacing:"-0.01em" }}>
          <Icon name={stage.icon} size={15} color={stage.color} strokeWidth={2.2} />{stage.stage}
        </span>
        <span style={{ fontSize:17, fontWeight:700, color:stage.color, letterSpacing:"-0.02em", fontFeatureSettings:'"tnum"' }}>{stage.count}</span>
      </div>
      <div style={{ height:8, borderRadius:4, background:"var(--bg-tertiary)", overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${width}%`, background:`linear-gradient(90deg,${stage.color},${stage.color}88)`, borderRadius:4, transition:"width 1.5s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

function PostJobModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title:"", vessel:"", salary:"", duration:"", location:"", description:"" });
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const inputStyle={ width:"100%", padding:"12px 14px", borderRadius:10, border:"1px solid var(--border-card)", fontSize:14, color:"var(--text-primary)", background:"var(--bg-tertiary)", outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" };
  const labelStyle={ display:"block", fontSize:12, fontWeight:600, color:"var(--text-secondary)", marginBottom:8, letterSpacing:"0.02em", textTransform:"uppercase" };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(12px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"var(--bg-card)", borderRadius:20, padding:36, width:"100%", maxWidth:580, boxShadow:"0 30px 80px rgba(0,0,0,0.5)", border:"1px solid var(--border-card)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
          <div>
            <h3 style={{ fontSize:24, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.025em" }}>Post New Vacancy</h3>
            <p style={{ fontSize:14, color:"var(--text-secondary)", marginTop:6 }}>Step {step} of 2 — {step===1—Job Details":"Requirements"}</p>
          </div>
          <button onClick={onClose} style={{ background:"var(--bg-tertiary)", border:"1px solid var(--border-card)", cursor:"pointer", width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-secondary)" }}>
            <Icon name="x" size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:30 }}>
          {[1,2].map(s=><div key={s} style={{ flex:1, height:4, borderRadius:4, background:s<=step—linear-gradient(90deg,#0284C7,#38BDF8)":"var(--bg-tertiary)", transition:"all 0.4s" }} />)}
        </div>
        {step===1┈┈┈┈┈┈┈┈(
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
            {[
              { k:"title",    label:"Job Title / Rank",     placeholder:"e.g. Master",      full:false },
              { k:"vessel",   label:"Vessel Type",          placeholder:"e.g. Container",   full:false },
              { k:"salary",   label:"Salary (USD)",         placeholder:"e.g. $5,500",      full:false },
              { k:"duration", label:"Contract Duration",    placeholder:"e.g. 9 Months",    full:false },
              { k:"location", label:"Port of Departure",    placeholder:"e.g. Singapore",   full:true  },
            ].map(f=>(
              <div key={f.k} style={{ gridColumn:f.full—1/-1":"aut✓, marginBottom:18 }}>
                <label style={labelStyle}>{f.label}</label>
                <input value={form[f.k]} onChange={e=>set(f.k,e.target.value)} placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}
          </div>
        ):(
          <div>
            <div style={{ marginBottom:18 }}>
              <label style={labelStyle}>Required Certificates</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["STCW Basic","GMDSS","Advanced Fire Fighting","Medical First Aid","Survival Craft"].map(cert=>(
                  <label key={cert} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(2,132,199,0.1)", border:"1px solid rgba(56,189,248,0.25)", borderRadius:8, padding:"8px 14px", cursor:"pointer", fontSize:13, color:"#38BDF8", fontWeight:500 }}>
                    <input type="checkbox" style={{ accentColor:"#0284C7" }} /> {cert}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginBottom:18 }}>
              <label style={labelStyle}>Job Description</label>
              <textarea value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Describe the role, responsibilities, vessel details…" rows={4} style={{ ...inputStyle, resize:"vertical" }} />
            </div>
          </div>
        )}
        <div style={{ display:"flex", gap:10, marginTop:28 }}>
          {step>1&&<button onClick={()=>setStep(1)} style={{ flex:1, padding:"13px", borderRadius:10, border:"1px solid var(--border-card)", background:"transparent", color:"var(--text-secondary)", fontWeight:500, fontSize:14, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>Back</button>}
          <button onClick={()=>{ if(step===1)setStep(2); else onClose(); }} style={{ flex:2, padding:"13px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:14, cursor:"pointer", boxShadow:"0 6px 20px rgba(2,132,199,0.35)", fontFamily:"'Inter',sans-serif" }}>
            {step===1—Continue":"Submit for Approval"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ setPage, setShowModal }) {
  const weeklyApps=[{label:"Mon",value:12,color:"#38BDF8"},{label:"Tue",value:19,color:"#38BDF8"},{label:"Wed",value:8,color:"#38BDF8"},{label:"Thu",value:24,color:"#0EA5E9"},{label:"Fri",value:31,color:"#0284C7"},{label:"Sat",value:14,color:"#38BDF8"},{label:"Sun",value:6,color:"#7DD3FC"}];
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#0F172· 0%,#1E293B 30%,#0284C7 100%)", borderRadius:20, padding:"40px 44px", marginBottom:28, position:"relative", overflow:"hidden", boxShadow:"0 20px 60px rgba(2,132,199,0.25)" }}>
        <div style={{ position:"absolute", right:-120, top:-120, width:400, height:400, borderRadius:"50%", background:"rgba(56,189,248,0.08)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:999, padding:"6px 16px", marginBottom:18 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#34D399", animation:"pulseDot 2s infinite", display:"inline-block" }} />
              <span style={{ fontSize:13, color:"#fff", fontWeight:500, letterSpacing:"-0.01em" }}>Live · 8 Active Vacancies</span>
            </div>
            <h1 style={{ fontSize:36, fontWeight:700, color:"#fff", letterSpacing:"-0.035em", marginBottom:10, lineHeight:1.1 }}>{COMPANY.name}</h1>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", letterSpacing:"-0.01em" }}>{COMPANY.type} · {COMPANY.country} · {COMPANY.plan} Plan</p>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={()=>setShowModal(true)} style={{ padding:"14px 26px", borderRadius:12, border:"none", cursor:"pointer", background:"#fff", color:"#0F172A", fontWeight:600, fontSize:15, boxShadow:"0 8px 28px rgba(0,0,0,0.25)", display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
              <Icon name="plus" size={18} color="#0F172A" strokeWidth={2.5} /> Post Vacancy
            </button>
          </div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginBottom:28 }}>
        {STATS.map((s,i)=><StatCard key={i} stat={s} delay={i*80} />)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:28 }}>
        <div style={{ background:"rgba(139,92,246,0.08)", border:"1px solid rgba(139,92,246,0.18)", borderRadius:16, padding:28 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"linear-gradient(135deg,#A78BFA,#C4B5FD)", color:"#fff", padding:"6px 14px", borderRadius:999, fontSize:11, fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:20 }}>
            <Icon name="sparkles" size={13} color="#fff" strokeWidth={2.5} /> AI Insights
          </div>
          <h3 style={{ fontSize:20, fontWeight:600, color:"var(--text-primary)", marginBottom:22, letterSpacing:"-0.025em" }}>Smart Recruitment Analysis</h3>
          {AI_INSIGHTS.map((insight,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 0", borderBottom:i<AI_INSIGHTS.length-1—1px solid rgba(139,92,246,0.1)":"none" }}>
              <div style={{ width:36, height:36, borderRadius:10, background:insight.bgColor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={insight.icon} size={18} color={insight.iconColor} strokeWidth={2} />
              </div>
              <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.55, margin:0, fontWeight:400, letterSpacing:"-0.01em" }}>{insight.text}</p>
            </div>
          ))}
        </div>
        <GlassCard>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
            <h3 style={{ fontSize:18, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.025em" }}>Applications This Week</h3>
            <span style={{ background:"rgba(2,132,199,0.12)", color:"#38BDF8", padding:"5px 12px", borderRadius:999, fontSize:12, fontWeight:600, border:"1px solid rgba(2,132,199,0.25)", letterSpacing:"-0.01em" }}>114 total</span>
          </div>
          <BarChart data={weeklyApps} />
        </GlassCard>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:20 }}>
        <GlassCard>
          <h3 style={{ fontSize:18, fontWeight:600, color:"var(--text-primary)", marginBottom:24, letterSpacing:"-0.025em" }}>Recruitment Pipeline</h3>
          {PIPELINE.map((p,i)=><PipelineBar key={i} stage={p} />)}
        </GlassCard>
        <GlassCard>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
            <h3 style={{ fontSize:18, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.025em" }}>Top Candidates</h3>
            <button onClick={()=>setPage("candidates")} style={{ background:"none", border:"none", color:"#38BDF8", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontFamily:"'Inter',sans-serif" }}>
              View All 134 <Icon name="chevronRight" size={14} color="#38BDF8" strokeWidth={2.5} />
            </button>
          </div>
          {APPLICANTS.slice(0,5).map(a=>(
            <div key={a.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 0", borderBottom:"1px solid var(--border-card)", cursor:"pointer" }}>
              <Avatar initials={a.avatar} size={46} gradient={`linear-gradient(135deg,${a.color},${a.color}aa)`} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.015em" }}>{a.name}</div>
                <div style={{ fontSize:13, color:"var(--text-secondary)", marginTop:3, letterSpacing:"-0.01em" }}>{a.rank} · {a.exp} · {a.nationality}</div>
              </div>
              <div style={{ textAlign:"center", flexShrink:0 }}>
                <div style={{ fontSize:22, fontWeight:700, color:"#38BDF8", letterSpacing:"-0.03em", fontFeatureSettings:'"tnum"' }}>{a.score}</div>
                <div style={{ fontSize:10, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:600 }}>AI Match</div>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

function ManageJobs({ setShowModal }) {
  const [filter,setFilter]=useState("All");
  const filters=["All","Active","Paused","Closed"];
  const filtered=filter==="All"┈┈┈┈┈┈┈┈JOBS:JOBS.filter(j=>j.status===filter);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
        <div>
          <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-primary)", marginBottom:6, letterSpacing:"-0.03em" }}>Job Management</h2>
          <p style={{ fontSize:15, color:"var(--text-secondary)", letterSpacing:"-0.01em" }}>{JOBS.length} total postings · {JOBS.filter(j=>j.status==="Active").length} active</p>
        </div>
        <button onClick={()=>setShowModal(true)} style={{ padding:"12px 22px", borderRadius:11, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:14, boxShadow:"0 6px 18px rgba(2,132,199,0.35)", display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
          <Icon name="plus" size={17} color="#fff" strokeWidth={2.5} /> Post Vacancy
        </button>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:24 }}>
        {filters.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ padding:"9px 20px", borderRadius:999, border:filter===f—none":"1px solid var(--border-card)", cursor:"pointer", fontWeight:500, fontSize:13, background:filter===f—linear-gradient(135deg,#0284C7,#0EA5E9)":"transparent", color:filter===f—#fff":"var(--text-secondary)", fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {filtered.map(job=>(
          <GlassCard key={job.id} style={{ padding:22 }}>
            <div style={{ display:"flex", alignItems:"center", gap:18, flexWrap:"wrap" }}>
              <div style={{ width:52, height:52, borderRadius:13, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(2,132,199,0.3)" }}>
                <Icon name="anchor" size={24} color="#fff" strokeWidth={2} />
              </div>
              <div style={{ flex:1, minWidth:200 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <span style={{ fontSize:17, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.02em" }}>{job.title}</span>
                  <span style={{ fontSize:13, color:"var(--text-secondary)" }}>· {job.vessel}</span>
                  {job.urgent&&<UrgentBadge />}
                </div>
                <div style={{ fontSize:13, color:"var(--text-tertiary)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>
                  Posted {job.posted} → Expires {job.expires} · {job.salary}/mo
                </div>
              </div>
              <div style={{ display:"flex", gap:24, flexShrink:0 }}>
                {[{val:job.applicants,label:"Applicants",color:"#38BDF8"},{val:job.shortlisted,label:"Shortlisted",color:"#A78BFA"}].map(s=>(
                  <div key={s.label} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:26, fontWeight:700, color:s.color, letterSpacing:"-0.03em", fontFeatureSettings:'"tnum"' }}>{s.val}</div>
                    <div style={{ fontSize:11, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.04em", fontWeight:500, marginTop:2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <span style={{ padding:"6px 14px", borderRadius:999, fontSize:12, fontWeight:600, background:job.status==="Active"—rgba(16,185,129,0.12)":job.status==="Paused"—rgba(245,158,11,0.12)":"rgba(255,255,255,0.05)", color:job.status==="Active"—#34D399":job.status==="Paused"—#FBBF24":"var(--text-tertiary)", border:`1px solid ${job.status==="Active"—rgba(16,185,129,0.25)":job.status==="Paused"—rgba(245,158,11,0.25)":"rgba(255,255,255,0.08)"}`, display:"inline-flex", alignItems:"center", gap:6, letterSpacing:"-0.01em" }}>
                <Icon name={job.status==="Active"—play":job.status==="Paused"—pause":"x"} size={11} strokeWidth={2.5} />
                {job.status}
              </span>
              <div style={{ display:"flex", gap:8 }}>
                <button style={{ padding:"8px 14px", borderRadius:8, border:"1px solid var(--border-card)", background:"transparent", color:"#38BDF8", fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="edit" size={13} color="#38BDF8" strokeWidth={2} /> Edit
                </button>
                <button style={{ padding:"8px 14px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="users" size={13} color="#fff" strokeWidth={2} /> View
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Candidates() {
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");
  const [selected,setSelected]=useState(null);
  const statuses=["All","Applied","Under Review","Shortlisted","Interview","Selected","Rejected"];
  const filtered=APPLICANTS.filter(a=>(statusFilter==="All"||a.status===statusFilter)&&(a.name.toLowerCase().includes(search.toLowerCase())||a.rank.toLowerCase().includes(search.toLowerCase())));
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-primary)", marginBottom:6, letterSpacing:"-0.03em" }}>Candidate Pool</h2>
        <p style={{ fontSize:15, color:"var(--text-secondary)", letterSpacing:"-0.01em" }}>{APPLICANTS.length} candidates across all postings</p>
      </div>
      <GlassCard style={{ marginBottom:22, padding:18, display:"flex", gap:14 }}>
        <div style={{ position:"relative", flex:2, minWidth:220 }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", display:"flex" }}>
            <Icon name="search" size={17} color="var(--text-tertiary)" strokeWidth={2} />
          </span>
          <input placeholder="Search by name or rank…" value={search} onChange={e=>setSearch(e.target.value)} style={{ width:"100%", padding:"11px 14px 11px 42px", borderRadius:10, border:"1px solid var(--border-card)", fontSize:14, color:"var(--text-primary)", outline:"none", background:"var(--bg-tertiary)", boxSizing:"border-box", fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }} />
        </div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{ flex:1, minWidth:160, padding:"11px 14px", borderRadius:10, border:"1px solid var(--border-card)", fontSize:14, color:"var(--text-primary)", background:"var(--bg-tertiary)", outline:"none", fontFamily:"'Inter',sans-serif" }}>
          {statuses.map(s=><option key={s}>{s}</option>)}
        </select>
      </GlassCard>
      <div style={{ display:"grid", gridTemplateColumns:selected—1fr 1fr":"1fr", gap:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:selected—1fr":"repeat(2,1fr)", gap:14 }}>
          {filtered.map(a=>(
            <GlassCard key={a.id} style={{ padding:22, cursor:"pointer", border:selected┈┈┈┈┈┈┈┈.id===a.id┈┈┈┈┈┈┈┈`1.5px solid ${a.color}60`:"1px solid var(--border-card)" }} onClick={()=>setSelected(selected┈┈┈┈┈┈┈┈.id===a.id┈┈┈┈┈┈┈┈null:a)}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:14 }}>
                <Avatar initials={a.avatar} size={48} gradient={`linear-gradient(135deg,${a.color},${a.color}aa)`} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:15, fontWeight:600, color:"var(--text-primary)", marginBottom:4, letterSpacing:"-0.015em" }}>{a.name}</div>
                  <div style={{ fontSize:13, color:"var(--text-secondary)", letterSpacing:"-0.01em" }}>{a.rank} · {a.exp}</div>
                  <div style={{ fontSize:12, color:"var(--text-tertiary)", marginTop:2, letterSpacing:"-0.01em" }}>{a.nationality}</div>
                </div>
                <div style={{ textAlign:"center", background:`${a.color}15`, borderRadius:10, padding:"8px 12px" }}>
                  <div style={{ fontSize:22, fontWeight:700, color:a.color, letterSpacing:"-0.03em", fontFeatureSettings:'"tnum"' }}>{a.score}</div>
                  <div style={{ fontSize:9, color:"var(--text-tertiary)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginTop:1 }}>Match</div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", gap:6 }}>
                  {[{label:"CDC",val:a.cdc},{label:"STCW",val:a.stcw}].map(c=>(
                    <span key={c.label} style={{ background:c.val—rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)", color:c.val—#34D399":"#F87171", padding:"3px 9px", borderRadius:6, fontSize:11, fontWeight:600, border:`1px solid ${c.val—rgba(16,185,129,0.25)":"rgba(239,68,68,0.25)"}`, display:"inline-flex", alignItems:"center", gap:4, letterSpacing:"-0.01em" }}>
                      <Icon name={c.val—check":"x"} size={10} strokeWidth={2.5} color={c.val—#34D399":"#F87171"} />{c.label}
                    </span>
                  ))}
                </div>
                <StatusBadge status={a.status} />
              </div>
            </GlassCard>
          ))}
        </div>
        {selected&&(
          <GlassCard style={{ padding:28, alignSelf:"flex-start", position:"sticky", top:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:24 }}>
              <h3 style={{ fontSize:19, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.025em" }}>Candidate Details</h3>
              <button onClick={()=>setSelected(null)} style={{ background:"var(--bg-tertiary)", border:"1px solid var(--border-card)", cursor:"pointer", color:"var(--text-secondary)", width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name="x" size={16} strokeWidth={2.2} />
              </button>
            </div>
            <div style={{ textAlign:"center", marginBottom:26 }}>
              <div style={{ display:"inline-block" }}>
                <Avatar initials={selected.avatar} size={80} gradient={`linear-gradient(135deg,${selected.color},${selected.color}aa)`} />
              </div>
              <div style={{ fontSize:22, fontWeight:600, color:"var(--text-primary)", marginTop:14, letterSpacing:"-0.025em" }}>{selected.name}</div>
              <div style={{ fontSize:14, color:"var(--text-secondary)", marginTop:4, letterSpacing:"-0.01em" }}>{selected.rank} · {selected.nationality}</div>
              <div style={{ display:"inline-flex", alignItems:"baseline", gap:6, marginTop:14, background:`${selected.color}15`, borderRadius:999, padding:"8px 18px" }}>
                <span style={{ fontSize:28, fontWeight:700, color:selected.color, letterSpacing:"-0.03em" }}>{selected.score}</span>
                <span style={{ fontSize:13, color:selected.color, fontWeight:500 }}>/ 100 AI Match</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px 24px", marginBottom:24, padding:18, background:"var(--bg-tertiary)", borderRadius:12 }}>
              {[{label:"Experience",val:selected.exp},{label:"Nationality",val:selected.nationality},{label:"CDC",val:selected.cdc—Valid":"Missing",icon:selected.cdc—check":"x",iconColor:selected.cdc—#34D399":"#F87171"},{label:"STCW",val:selected.stcw—Valid":"Missing",icon:selected.stcw—check":"x",iconColor:selected.stcw—#34D399":"#F87171"}].map(f=>(
                <div key={f.label}>
                  <div style={{ fontSize:11, color:"var(--text-tertiary)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{f.label}</div>
                  <div style={{ fontSize:14, color:"var(--text-primary)", fontWeight:500, display:"flex", alignItems:"center", gap:6, letterSpacing:"-0.01em" }}>
                    {f.icon&&<Icon name={f.icon} size={14} color={f.iconColor} strokeWidth={2.5} />}{f.val}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:20 }}>
              <p style={{ fontSize:11, fontWeight:600, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>Update Status</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[{action:"Shortlist",icon:"star",gradient:"linear-gradient(135deg,#A78BFA,#C4B5FD)"},{action:"Schedule Interview",icon:"mic",gradient:"linear-gradient(135deg,#0284C7,#0EA5E9)"},{action:"Select",icon:"checkCircle",gradient:"linear-gradient(135deg,#34D399,#6EE7B7)"},{action:"Reject",icon:"xCircle",gradient:"linear-gradient(135deg,#F87171,#FCA5A5)"}].map(({action,icon,gradient})=>(
                  <button key={action} style={{ padding:"11px 14px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:500, fontSize:13, background:gradient, color:"#fff", display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
                    <Icon name={icon} size={15} color="#fff" strokeWidth={2.2} />{action}
                  </button>
                ))}
              </div>
            </div>
            <button style={{ width:"100%", padding:"12px", borderRadius:10, border:"1px solid var(--border-card)", background:"transparent", color:"#38BDF8", fontWeight:500, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
              <Icon name="fileText" size={15} color="#38BDF8" strokeWidth={2} /> View Full Profile & Documents
            </button>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

function Notifications() {
  const [notifs,setNotifs]=useState(NOTIFICATIONS);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <div>
          <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-primary)", marginBottom:6, letterSpacing:"-0.03em" }}>Notifications</h2>
          <p style={{ fontSize:15, color:"var(--text-secondary)", letterSpacing:"-0.01em" }}>{notifs.filter(n=>!n.read).length} unread</p>
        </div>
        <button onClick={()=>setNotifs(n=>n.map(x=>({...x,read:true})))} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:14, fontWeight:600, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>Mark all read</button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {notifs.map(n=>(
          <GlassCard key={n.id} style={{ padding:22, border:n.read—1px solid var(--border-card)":`1.5px solid ${n.color}40`, cursor:"pointer" }} onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id┈┈┈┈┈┈┈┈{...x,read:true}:x))}>
            <div style={{ display:"flex", gap:16 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`${n.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={n.icon} size={20} color={n.color} strokeWidth={2} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:15, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.02em" }}>{n.title}</span>
                  <span style={{ fontSize:12, color:"var(--text-tertiary)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>{n.time}</span>
                </div>
                <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.55, margin:0, letterSpacing:"-0.01em" }}>{n.msg}</p>
              </div>
              {!n.read&&<div style={{ width:8, height:8, borderRadius:"50%", background:n.color, flexShrink:0, marginTop:8 }} />}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Subscription() {
  const plans=[
    {name:"Starter",price:"$49",period:"/m✓,features:["5 Job Posts","100 Candidate Views","Basic Filters","Email Support"],current:false},
    {name:"Professional",price:"$149",period:"/m✓,features:["25 Job Posts","Unlimited Views","Advanced Filters","Priority Support","Analytics","Featured Badges","Direct Messaging"],current:true},
    {name:"Enterprise",price:"$399",period:"/m✓,features:["Unlimited Posts","Unlimited Everything","Dedicated Manager","API Access","Custom Integrations","Analytics"],current:false},
  ];
  return (
    <div>
      <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-primary)", marginBottom:8, letterSpacing:"-0.03em" }}>Subscription & Billing</h2>
      <p style={{ fontSize:15, color:"var(--text-secondary)", marginBottom:32, letterSpacing:"-0.01em" }}>Current plan: <strong style={{color:"#38BDF8"}}>Professional</strong> · Renews June 15, 2025</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:32 }}>
        {plans.map(plan=>(
          <div key={plan.name} style={{ background:plan.current—linear-gradient(145deg,#0284C7,#0EA5E9)":"var(--bg-card)", border:plan.current—none":"1px solid var(--border-card)", borderRadius:16, padding:30, boxShadow:plan.current—0 20px 50px rgba(2,132,199,0.4)":"0 4px 20px rgba(0,0,0,0.25)", transform:plan.current—scale(1.04)":"none", position:"relative" }}>
            {plan.current&&<div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#FB923C,#FBBF24)", color:"#fff", borderRadius:999, padding:"5px 14px", fontSize:11, fontWeight:600, letterSpacing:"0.04em", textTransform:"uppercase" }}>Current Plan</div>}
            <div style={{ fontSize:12, fontWeight:600, color:plan.current—rgba(255,255,255,0.75)":"var(--text-tertiary)", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>{plan.name}</div>
            <div style={{ fontSize:44, fontWeight:700, color:plan.current—#fff":"var(--text-primary)", letterSpacing:"-0.04em", lineHeight:1 }}>{plan.price}<span style={{ fontSize:16, fontWeight:400, color:plan.current—rgba(255,255,255,0.6)":"var(--text-tertiary)" }}>{plan.period}</span></div>
            <div style={{ margin:"22px 0", display:"flex", flexDirection:"column", gap:10 }}>
              {plan.features.map(f=>(
                <div key={f} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Icon name="check" size={15} color={plan.current—#6EE7B7":"#38BDF8"} strokeWidth={2.5} />
                  <span style={{ fontSize:14, color:plan.current—rgba(255,255,255,0.85)":"var(--text-secondary)", letterSpacing:"-0.01em" }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ width:"100%", padding:"13px", borderRadius:10, border:plan.current—1px solid rgba(255,255,255,0.3)":"none", background:plan.current—rgba(255,255,255,0.15)":"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
              {plan.current—Active Plan":"Upgrade"}
            </button>
          </div>
        ))}
      </div>
      <GlassCard>
        <h3 style={{ fontSize:18, fontWeight:600, color:"var(--text-primary)", marginBottom:20, letterSpacing:"-0.025em" }}>Payment History</h3>
        {[{inv:"INV-2025-005",date:"May 1, 2025",amount:"$149"},{inv:"INV-2025-004",date:"Apr 1, 2025",amount:"$149"},{inv:"INV-2025-003",date:"Mar 1, 2025",amount:"$149"},{inv:"INV-2025-002",date:"Feb 1, 2025",amount:"$49"}].map((inv,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 0", borderBottom:"1px solid var(--border-card)" }}>
            <div style={{ width:40, height:40, borderRadius:10, background:"rgba(2,132,199,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="fileText" size={18} color="#38BDF8" strokeWidth={2} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.015em" }}>{inv.inv}</div>
              <div style={{ fontSize:12, color:"var(--text-tertiary)", marginTop:2, fontFamily:"'JetBrains Mono',monospace" }}>{inv.date}</div>
            </div>
            <div style={{ fontSize:17, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.02em", fontFeatureSettings:'"tnum"' }}>{inv.amount}</div>
            <span style={{ background:"rgba(16,185,129,0.12)", color:"#34D399", padding:"5px 12px", borderRadius:999, fontSize:12, fontWeight:600, border:"1px solid rgba(16,185,129,0.25)", display:"inline-flex", alignItems:"center", gap:5 }}>
              <Icon name="check" size={12} color="#34D399" strokeWidth={2.5} /> Paid
            </span>
            <button style={{ padding:"7px 14px", borderRadius:8, border:"1px solid var(--border-card)", background:"transparent", color:"#38BDF8", fontSize:12, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
              <Icon name="download" size={13} color="#38BDF8" strokeWidth={2} /> Download
            </button>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

export default function CompanyDashboard() {
  const [page,setPage]=useState("dashboard");
  const [sidebarOpen,setSidebar]=useState(true);
  const [showModal,setShowModal]=useState(false);
  const [theme,setTheme]=useState("dark");
  const isDark=theme==="dark";
  const unread=NOTIFICATIONS.filter(n=>!n.read).length;

  const renderPage=()=>{
    switch(page){
      case "dashboard": return <DashboardHome setPage={setPage} setShowModal={setShowModal}/>;
      case "jobs": return <ManageJobs setShowModal={setShowModal}/>;
      case "candidates": case "ai-matching": return <Candidates/>;
      case "notifications": return <Notifications/>;
      case "subscription": return <Subscription/>;
      default: return <DashboardHome setPage={setPage} setShowModal={setShowModal}/>;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2┈┈┈┈┈┈┈┈family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains→Mono:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --bg-primary:${isDark—#09090B":"#FAFAFA"};
          --bg-card:${isDark—#131316":"#FFFFFF"};
          --bg-tertiary:${isDark—#1C1C20":"#F4F4F5"};
          --border-card:${isDark—rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"};
          --text-primary:${isDark—#FAFAFA":"#09090B"};
          --text-secondary:${isDark—#A1A1AA":"#52525B"};
          --text-tertiary:${isDark—#71717A":"#A1A1AA"};
        }
        body,html{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;background:var(--bg-primary);color:var(--text-primary);}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.7}}
        @keyframes pulseUrgent{0%,100%{box-shadow:0 0 0 0 rgba(248,113,113,0.4)}50%{box-shadow:0 0 0 8px rgba(248,113,113,0)}}
        .page-content{animation:fadeIn 0.4s cubic-bezier(0.4,0,0.2,1);}
        ::-webkit-scrollbar{width:8px;height:8px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,0.3);border-radius:4px;}
        input::placeholder{color:var(--text-tertiary);}
        input,select,textarea,button{font-family:'Inter',-apple-system,sans-serif;}
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg-primary)", color:"var(--text-primary)" }}>
        {showModal&&<PostJobModal onClose={()=>setShowModal(false)} />}

        <aside style={{ width:sidebarOpen┈┈┈┈┈┈┈┈260:76, minHeight:"100vh", background:isDark—#09090B":"#fff", borderRight:"1px solid var(--border-card)", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, bottom:0, zIndex:1000, transition:"width 0.3s cubic-bezier(0.4,0,0.2,1)", overflow:"hidden" }}>
          <div style={{ padding:sidebarOpen—22px 20px":"20px 18px", borderBottom:"1px solid var(--border-card)", display:"flex", alignItems:"center", gap:12, whiteSpace:"nowrap", overflow:"hidden" }}>
            <div style={{ width:40, height:40, background:"linear-gradient(135deg,#0284C7,#38BDF8)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 6px 20px rgba(2,132,199,0.4)" }}>
              <Icon name="waves" size={20} color="#fff" strokeWidth={2.2} />
            </div>
            {sidebarOpen&&(
              <div>
                <div style={{ fontWeight:700, fontSize:18, color:"var(--text-primary)", letterSpacing:"-0.025em", lineHeight:1.1 }}>OceanCrew</div>
                <div style={{ fontSize:10, color:"#38BDF8", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, marginTop:2 }}>SKYbird Systems</div>
              </div>
            )}
          </div>

          {sidebarOpen&&(
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--border-card)", display:"flex", alignItems:"center", gap:12, overflow:"hidden", whiteSpace:"nowrap" }}>
              <div style={{ width:36, height:36, background:"linear-gradient(135deg,#0284C7,#38BDF8)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:12, color:"#fff", flexShrink:0, letterSpacing:"-0.02em" }}>PS</div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.015em" }}>Pacific Star</div>
                <div style={{ fontSize:11, color:"#34D399", fontWeight:500, display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                  <Icon name="shield" size={10} color="#34D399" strokeWidth={2.5} /> Verified Agency
                </div>
              </div>
            </div>
          )}

          <nav style={{ flex:1, padding:"18px 12px", display:"flex", flexDirection:"column", gap:2, overflowY:"aut✓ }}>
            {["main","ai","manage"].map(section=>{
              const items=NAV_ITEMS.filter(n=>n.section===section);
              return (
                <div key={section}>
                  {sidebarOpen&&<div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--text-tertiary)", fontWeight:600, padding:"10px 14px 6px", marginTop:section!=="main"┈┈┈┈┈┈┈┈8:0 }}>{section==="main"—Main":section==="ai"—AI Tools":"Settings"}</div>}
                  {items.map(item=>{
                    const active=page===item.id;
                    return (
                      <button key={item.id} onClick={()=>setPage(item.id)} title={!sidebarOpen┈┈┈┈┈┈┈┈item.label:""} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:sidebarOpen—10px 14px":"12px", borderRadius:10, border:"none", cursor:"pointer", marginBottom:2, background:active—rgba(56,189,248,0.12)":"transparent", color:active—#38BDF8":"var(--text-secondary)", transition:"all 0.15s ease", justifyContent:sidebarOpen—flex-start":"center", fontSize:14, fontWeight:active┈┈┈┈┈┈┈┈600:500, letterSpacing:"-0.01em", overflow:"hidden", fontFamily:"'Inter',sans-serif", borderLeft:active—2px solid #38BDF8":"2px solid transparent" }}
                        onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background="var(--bg-tertiary)"; e.currentTarget.style.color="var(--text-primary)"; }}}
                        onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--text-secondary)"; }}}
                      >
                        <Icon name={item.icon} size={18} color={active—#38BDF8":"currentColor"} strokeWidth={active┈┈┈┈┈┈┈┈2.4:2} />
                        {sidebarOpen&&<span style={{ whiteSpace:"nowrap" }}>{item.label}</span>}
                        {sidebarOpen&&item.badge&&(
                          <span style={{ marginLeft:"aut✓, background:item.badgeColor||"#EF4444", color:"#fff", borderRadius:typeof item.badge==="string"┈┈┈┈┈┈┈┈6:999, minWidth:22, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:typeof item.badge==="string"┈┈┈┈┈┈┈┈9:11, fontWeight:600, padding:typeof item.badge==="string"—0 8px":"0 6px", letterSpacing:typeof item.badge==="string"—0.05em":"-0.01em" }}>{item.badge}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          <div style={{ padding:"14px 12px", borderTop:"1px solid var(--border-card)" }}>
            <button onClick={()=>setSidebar(s=>!s)} style={{ width:"100%", padding:"9px", borderRadius:9, border:"1px solid var(--border-card)", background:"var(--bg-tertiary)", color:"var(--text-secondary)", cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:8, letterSpacing:"-0.01em", fontWeight:500, fontFamily:"'Inter',sans-serif" }}>
              <Icon name={sidebarOpen—chevronLeft":"chevronRight"} size={15} strokeWidth={2.2} />
              {sidebarOpen&&"Collapse"}
            </button>
          </div>
        </aside>

        <div style={{ flex:1, marginLeft:sidebarOpen┈┈┈┈┈┈┈┈260:76, transition:"margin-left 0.3s cubic-bezier(0.4,0,0.2,1)", minWidth:0, display:"flex", flexDirection:"column" }}>
          <header style={{ background:isDark—rgba(19,19,22,0.7)":"rgba(255,255,255,0.7)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border-card)", padding:"0 32px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, gap:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:18 }}>
              <h2 style={{ fontSize:18, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.025em" }}>
                {page==="dashboard"—Good morning, David":NAV_ITEMS.find(n=>n.id===page)┈┈┈┈┈┈┈┈.label||"Dashboard"}
              </h2>
              <span style={{ fontSize:13, color:"var(--text-tertiary)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>
                {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
              </span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button onClick={()=>setShowModal(true)} style={{ padding:"10px 18px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(2,132,199,0.35)", display:"flex", alignItems:"center", gap:7, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
                <Icon name="plus" size={16} color="#fff" strokeWidth={2.5} /> Post Job
              </button>
              <button onClick={()=>setPage("notifications")} style={{ width:40, height:40, borderRadius:10, border:"1px solid var(--border-card)", background:"var(--bg-card)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", color:"var(--text-secondary)" }}>
                <Icon name="bell" size={18} strokeWidth={2} />
                {unread>0&&<span style={{ position:"absolute", top:8, right:8, width:8, height:8, borderRadius:"50%", background:"#EF4444", border:"2px solid var(--bg-card)", animation:"pulseDot 2s infinite" }} />}
              </button>
              <button onClick={()=>setTheme(t=>t==="dark"—light":"dark")} style={{ width:40, height:40, borderRadius:10, border:"1px solid var(--border-card)", background:"var(--bg-card)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-secondary)" }}>
                <Icon name={isDark—moon":"sun"} size={18} strokeWidth={2} />
              </button>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 12px 6px 6px", background:"var(--bg-card)", border:"1px solid var(--border-card)", borderRadius:10, cursor:"pointer" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:600, fontSize:11, letterSpacing:"-0.02em" }}>DC</div>
                <span style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)", letterSpacing:"-0.015em" }}>David</span>
              </div>
            </div>
          </header>

          <main style={{ flex:1, padding:32, overflowY:"aut✓ }}>
            <div className="page-content">{renderPage()}</div>
          </main>

          <footer style={{ padding:"16px 32px", borderTop:"1px solid var(--border-card)", background:isDark—rgba(19,19,22,0.5)":"rgba(255,255,255,0.5)", textAlign:"center", backdropFilter:"blur(20px)" }}>
            <p style={{ fontSize:12, color:"var(--text-tertiary)", letterSpacing:"-0.01em" }}>
              © 2025 <strong style={{ color:"#38BDF8", fontWeight:600 }}>OceanCrew</strong> · Powered by <strong style={{ color:"#38BDF8", fontWeight:600 }}>SKYbird Systems</strong>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
