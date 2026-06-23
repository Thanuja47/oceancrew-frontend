/* eslint-disable */
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   OCEANCREW™  —  ADMIN CONTROL CENTER
   Enterprise Operations Dashboard
   Powered by SKYbird Systems
   
   Typography: Sora (display) + Inter (body) + JetBrains Mono (data)
   Theme: Dark / Light via CSS variables
   Icons: Lucide-style SVG system
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   SVG ICON SYSTEM
───────────────────────────────────────────── */
const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    dashboard:    <><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    clock:        <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    shield:       <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    users:        <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    building:     <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    briefcase:    <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    chartBar:     <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    creditCard:   <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    activity:     <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    settings:     <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    check:        <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle:  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    x:            <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    xCircle:      <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    alertCircle:  <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    alertTriangle:<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    trendUp:      <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    trendDown:    <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
    sparkles:     <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/></>,
    zap:          <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    search:       <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:         <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    eye:          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    fileText:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    download:     <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    globe:        <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    anchor:       <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    moon:         <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:          <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    chevronLeft:  <><polyline points="15 18 9 12 15 6"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    chevronDown:  <><polyline points="6 9 12 15 18 9"/></>,
    plus:         <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    ban:          <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    refresh:      <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    mail:         <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    layers:       <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    award:        <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    flag:         <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    log:          <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/></>,
    target:       <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    terminal:     <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
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

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PLATFORM_STATS = [
  { label:"Total Seafarers",    value:12847, icon:"anchor",     color:"#38BDF8", bg:"rgba(56,189,248,0.1)",    change:"+124 today",    trend:"up",   sparkline:[40,55,45,70,60,85,80,100,90,95] },
  { label:"Verified Companies", value:863,   icon:"building",   color:"#A78BFA", bg:"rgba(167,139,250,0.1)",   change:"+8 this week",  trend:"up",   sparkline:[30,40,38,55,50,70,65,80,75,85] },
  { label:"Active Job Posts",   value:1247,  icon:"briefcase",  color:"#34D399", bg:"rgba(52,211,153,0.1)",    change:"+43 today",     trend:"up",   sparkline:[50,45,60,55,75,70,90,85,95,100] },
  { label:"Pending Approvals",  value:14,    icon:"alertCircle",color:"#F87171", bg:"rgba(248,113,113,0.1)",   change:"Action needed", trend:"alert",sparkline:[10,8,12,6,14,10,16,12,18,14] },
  { label:"Monthly Revenue",    value:"$28.4K",icon:"creditCard",color:"#FBBF24",bg:"rgba(251,191,36,0.1)",    change:"+12% MoM",      trend:"up",   sparkline:[60,55,70,65,80,75,85,80,90,95] },
  { label:"Total Applications", value:38492, icon:"layers",     color:"#38BDF8", bg:"rgba(56,189,248,0.1)",    change:"+391 today",    trend:"up",   sparkline:[45,50,55,65,60,75,70,85,80,90] },
];

const PENDING_COMPANIES = [
  { id:1, name:"Neptune Shipping Ltd.",   country:"Greece",      type:"Shipping Co.",  submitted:"May 20", contact:"Andreas P.", docs:3, logo:"NS", color:"#38BDF8" },
  { id:2, name:"Golden Ocean Manning",    country:"Philippines", type:"Manning Agency",submitted:"May 19", contact:"Maria S.",   docs:4, logo:"GO", color:"#34D399" },
  { id:3, name:"Horizon Maritime Group",  country:"UAE",         type:"Shipping Co.",  submitted:"May 18", contact:"Ahmed A.",   docs:3, logo:"HM", color:"#A78BFA" },
  { id:4, name:"EastWave Crew Services",  country:"India",       type:"Manning Agency",submitted:"May 17", contact:"Vikram N.",  docs:5, logo:"EW", color:"#FBBF24" },
];

const PENDING_JOBS = [
  { id:1, title:"Master",         company:"Pacific Star",   vessel:"Container",  salary:"$7,500", submitted:"May 21", logo:"PS", color:"#38BDF8" },
  { id:2, title:"Chief Engineer", company:"Neptune Shipping",vessel:"Oil Tanker", salary:"$5,800", submitted:"May 21", logo:"NS", color:"#34D399" },
  { id:3, title:"2nd Officer",    company:"Golden Ocean",   vessel:"Bulk Carrier",salary:"$3,200", submitted:"May 20", logo:"GO", color:"#A78BFA" },
  { id:4, title:"ETO",            company:"Horizon Maritime",vessel:"Cruise Ship",salary:"$3,900", submitted:"May 20", logo:"HM", color:"#FBBF24" },
  { id:5, title:"Chief Officer",  company:"EastWave Crew",  vessel:"LNG Carrier", salary:"$4,800", submitted:"May 19", logo:"EW", color:"#F87171" },
];

const ALL_COMPANIES = [
  { id:1, name:"Pacific Star Shipping Co.", country:"Singapore",   plan:"Professional", status:"Active",    jobs:8,  hired:47,  logo:"PS", color:"#38BDF8"  },
  { id:2, name:"Emirates Maritime Co.",     country:"UAE",          plan:"Enterprise",   status:"Active",    jobs:12, hired:89,  logo:"EM", color:"#A78BFA"  },
  { id:3, name:"MSC Global Lines",          country:"Switzerland",  plan:"Enterprise",   status:"Active",    jobs:24, hired:132, logo:"MS", color:"#34D399"  },
  { id:4, name:"Royal Caribbean Crew",      country:"USA",          plan:"Professional", status:"Active",    jobs:6,  hired:28,  logo:"RC", color:"#FBBF24"  },
  { id:5, name:"Evergreen Marine Corp",     country:"Taiwan",       plan:"Starter",      status:"Suspended", jobs:0,  hired:5,   logo:"EV", color:"#F87171"  },
];

const ALL_SEAFARERS = [
  { id:1, name:"Capt. Rajesh Fernando",  rank:"Master",         country:"Sri Lanka", status:"Active",    apps:12, verified:true,  avatar:"RF", color:"#38BDF8" },
  { id:2, name:"Eng. Priya Nair",        rank:"Chief Engineer", country:"India",     status:"Active",    apps:8,  verified:true,  avatar:"PN", color:"#A78BFA" },
  { id:3, name:"Shanaka Perera",         rank:"Chief Officer",  country:"Sri Lanka", status:"Active",    apps:5,  verified:true,  avatar:"SP", color:"#34D399" },
  { id:4, name:"Mohammed Al Farsi",      rank:"2nd Officer",    country:"Oman",      status:"Inactive",  apps:2,  verified:false, avatar:"MA", color:"#FBBF24" },
  { id:5, name:"Dilshan Wickrama",       rank:"ETO",            country:"Sri Lanka", status:"Active",    apps:7,  verified:true,  avatar:"DW", color:"#38BDF8" },
  { id:6, name:"Chen Wei Long",          rank:"Chief Officer",  country:"China",     status:"Suspended", apps:1,  verified:false, avatar:"CW", color:"#F87171" },
];

const ACTIVITY_LOGS = [
  { id:1, type:"approved",  icon:"checkCircle", msg:"Neptune Shipping Ltd. was approved",                      time:"2 min ago",  color:"#34D399", category:"Company" },
  { id:2, type:"job",       icon:"briefcase",   msg:"New job posted: Master — Pacific Star Shipping",          time:"15 min ago", color:"#38BDF8", category:"Job"     },
  { id:3, type:"user",      icon:"anchor",      msg:"New seafarer registered: Nuwan Jayasuriya (Master)",      time:"34 min ago", color:"#A78BFA", category:"User"    },
  { id:4, type:"payment",   icon:"creditCard",  msg:"Payment received: $399 — MSC Global Lines (Enterprise)", time:"1h ago",     color:"#FBBF24", category:"Payment" },
  { id:5, type:"job",       icon:"checkCircle", msg:"Job approved: Chief Engineer — Emirates Maritime Co.",    time:"2h ago",     color:"#34D399", category:"Job"     },
  { id:6, type:"suspended", icon:"ban",         msg:"Company suspended: Evergreen Marine Corp",                time:"3h ago",     color:"#F87171", category:"Alert"   },
  { id:7, type:"user",      icon:"anchor",      msg:"New seafarer registered: Ravi Krishnamurthy",             time:"4h ago",     color:"#A78BFA", category:"User"    },
  { id:8, type:"payment",   icon:"creditCard",  msg:"Payment received: $149 — Royal Caribbean Crew",          time:"5h ago",     color:"#FBBF24", category:"Payment" },
];

const NAV_SECTIONS = [
  { label:"Overview", items:[
    { id:"dashboard",    icon:"dashboard",  label:"Dashboard"       },
    { id:"analytics",    icon:"chartBar",   label:"Analytics"       },
    { id:"activity",     icon:"activity",   label:"Activity Logs"   },
  ]},
  { label:"Management", items:[
    { id:"approvals",    icon:"zap",        label:"Approvals",    badge:14, badgeColor:"#F87171" },
    { id:"companies",    icon:"building",   label:"Companies"       },
    { id:"seafarers",    icon:"anchor",     label:"Seafarers"       },
    { id:"jobs",         icon:"briefcase",  label:"Job Postings"    },
  ]},
  { label:"Platform", items:[
    { id:"subscriptions",icon:"creditCard", label:"Subscriptions"   },
    { id:"reports",      icon:"fileText",   label:"Reports"         },
    { id:"settings",     icon:"settings",   label:"Settings"        },
  ]},
];

/* ─────────────────────────────────────────────
   PRIMITIVE COMPONENTS
───────────────────────────────────────────── */
function GlassCard({ children, style = {}, onClick, glow }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hov && glow ? "rgba(56,189,248,0.3)" : "var(--border)"}`,
        borderRadius: 16,
        padding: 24,
        boxShadow: hov && glow ? "0 8px 40px rgba(56,189,248,0.08)" : "0 2px 16px rgba(0,0,0,0.18)",
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        transform: hov && glow ? "translateY(-2px)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function AvatarBadge({ initials, size = 40, gradient = "linear-gradient(135deg,#0284C7,#38BDF8)", online = false }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%", background: gradient,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 600, fontSize: size * 0.34,
        fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
      }}>{initials}</div>
      {online && <div style={{ position:"absolute", bottom:1, right:1, width:size*0.24, height:size*0.24, borderRadius:"50%", background:"#34D399", border:"2px solid var(--bg-card)" }} />}
    </div>
  );
}

function Chip({ children, color = "#38BDF8", bg, border }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 999,
      background: bg || `${color}18`,
      border: `1px solid ${border || `${color}35`}`,
      color, fontSize: 12, fontWeight: 500,
      letterSpacing: "-0.01em", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function StatCard({ stat, delay = 0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  const max = Math.max(...stat.sparkline);
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: 16, padding: 22, overflow: "hidden", position: "relative",
      boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
      opacity: show ? 1 : 0, transform: show ? "none" : "translateY(16px)",
      transition: "opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${stat.color}40`;
        e.currentTarget.style.boxShadow = `0 8px 36px rgba(0,0,0,0.28), 0 0 0 1px ${stat.color}20`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.18)";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Glow blob */}
      <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:`radial-gradient(circle, ${stat.color}18 0%, transparent 70%)`, pointerEvents:"none" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <div style={{ width:42, height:42, borderRadius:11, background:stat.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon name={stat.icon} size={20} color={stat.color} strokeWidth={1.8} />
        </div>
        <Chip color={stat.trend === "alert" ? "#F87171" : "#34D399"}>
          <Icon name={stat.trend === "up" ? "trendUp" : stat.trend === "alert" ? "alertTriangle" : "activity"} size={11} strokeWidth={2.2} />
          {stat.change}
        </Chip>
      </div>

      <div style={{ fontSize: 38, fontWeight: 700, color: stat.color, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "'Sora', sans-serif", fontFeatureSettings: '"tnum"' }}>
        {stat.value.toLocaleString ? stat.value.toLocaleString() : stat.value}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 6, fontWeight: 500, letterSpacing: "-0.01em" }}>{stat.label}</div>

      {/* Sparkline */}
      <div style={{ display:"flex", alignItems:"flex-end", gap:3, marginTop:16, height:32 }}>
        {stat.sparkline.map((v, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 3, background: stat.color,
            height: `${(v / max) * 100}%`, minHeight: 3,
            opacity: 0.25 + (i / stat.sparkline.length) * 0.75,
            transition: "height 0.6s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

function BarChart({ data, height = 120 }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 150); }, []);
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height, paddingTop:16 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:11, fontWeight:600, color:"var(--text-3)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.03em" }}>{d.value}</span>
          <div style={{ width:"100%", borderRadius:"4px 4px 0 0", background:`linear-gradient(180deg,${d.color},${d.color}77)`, height: animated ? `${(d.value / max) * (height - 36)}px` : "4px", minHeight:4, transition:`height 0.7s cubic-bezier(.4,0,.2,1) ${i * 40}ms` }} />
          <span style={{ fontSize:10, fontWeight:500, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutRing({ value, max, color, size = 80 }) {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const [dash, setDash] = useState(0);
  useEffect(() => { setTimeout(() => setDash((value / max) * circ), 200); }, [value, max, circ]);
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-tertiary)" strokeWidth={7} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition:"stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:size * 0.2, fontWeight:700, color, fontFamily:"'Sora',sans-serif", letterSpacing:"-0.03em" }}>{pct}%</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGES
───────────────────────────────────────────── */
function DashboardHome({ setPage }) {
  const monthlyRev = [
    { label:"Jan", value:182, color:"#38BDF8" }, { label:"Feb", value:214, color:"#38BDF8" },
    { label:"Mar", value:198, color:"#38BDF8" }, { label:"Apr", value:246, color:"#0EA5E9" },
    { label:"May", value:284, color:"#0284C7" },
  ];
  const weekSignups = [
    { label:"M", value:34, color:"#A78BFA" }, { label:"T", value:52, color:"#A78BFA" },
    { label:"W", value:28, color:"#A78BFA" }, { label:"T", value:67, color:"#C4B5FD" },
    { label:"F", value:81, color:"#A78BFA" }, { label:"S", value:43, color:"#A78BFA" },
    { label:"S", value:19, color:"#7C3AED" },
  ];
  const nationalities = [
    { country:"Sri Lanka",   pct:38, color:"#38BDF8" },
    { country:"India",       pct:24, color:"#A78BFA" },
    { country:"Philippines", pct:18, color:"#34D399" },
    { country:"Indonesia",   pct:12, color:"#FBBF24" },
    { country:"Others",      pct:8,  color:"#64748B" },
  ];

  return (
    <div>
      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #0C1627 0%, #0F2444 40%, #0284C7 100%)",
        borderRadius: 20, padding: "36px 40px", marginBottom: 28,
        position: "relative", overflow: "hidden",
        boxShadow: "0 20px 60px rgba(2,132,199,0.2)",
        border: "1px solid rgba(56,189,248,0.15)",
      }}>
        <div style={{ position:"absolute", right:-80, top:-80, width:360, height:360, borderRadius:"50%", background:"rgba(56,189,248,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:"35%", bottom:-100, width:260, height:260, borderRadius:"50%", background:"rgba(167,139,250,0.05)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(52,211,153,0.15)", border:"1px solid rgba(52,211,153,0.25)", borderRadius:999, padding:"5px 14px", marginBottom:14 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#34D399", animation:"pulseDot 2s infinite", display:"inline-block" }} />
              <span style={{ fontSize:12, color:"#34D399", fontWeight:600, letterSpacing:"0.02em" }}>All Systems Operational · Live</span>
            </div>
            <h1 style={{ fontSize:36, fontWeight:700, color:"#fff", letterSpacing:"-0.035em", lineHeight:1.1, marginBottom:10, fontFamily:"'Sora',sans-serif" }}>
              OceanCrew Control Center
            </h1>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)", letterSpacing:"-0.01em", fontWeight:400 }}>
              {new Date().toLocaleDateString("en-US",{weekday:"long", year:"numeric", month:"long", day:"numeric"})}
            </p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => setPage("approvals")} style={{
              padding:"12px 22px", borderRadius:11, border:"none", cursor:"pointer",
              background:"rgba(248,113,113,0.2)", color:"#F87171",
              fontWeight:600, fontSize:14, border:"1px solid rgba(248,113,113,0.35)",
              display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif",
              letterSpacing:"-0.01em",
            }}>
              <Icon name="zap" size={16} color="#F87171" strokeWidth={2.2} />
              14 Pending Approvals
            </button>
            <button onClick={() => setPage("analytics")} style={{
              padding:"12px 22px", borderRadius:11, border:"none", cursor:"pointer",
              background:"rgba(255,255,255,0.1)", color:"#fff",
              fontWeight:600, fontSize:14, border:"1px solid rgba(255,255,255,0.18)",
              backdropFilter:"blur(12px)", display:"flex", alignItems:"center", gap:8,
              fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em",
            }}>
              <Icon name="chartBar" size={16} color="#fff" strokeWidth={2} />
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {PLATFORM_STATS.map((s, i) => <StatCard key={i} stat={s} delay={i * 70} />)}
      </div>

      {/* Revenue + Signups charts */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:20, marginBottom:20 }}>
        <GlassCard glow>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <h3 style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.025em", fontFamily:"'Sora',sans-serif" }}>Monthly Revenue</h3>
            <Chip color="#34D399">
              <Icon name="trendUp" size={11} strokeWidth={2.5} />
              +12% MoM
            </Chip>
          </div>
          <p style={{ fontSize:13, color:"var(--text-3)", marginBottom:16, letterSpacing:"-0.01em" }}>Subscriptions & job posting fees (×100 USD)</p>
          <BarChart data={monthlyRev} height={130} />
        </GlassCard>

        <GlassCard glow>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <h3 style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.025em", fontFamily:"'Sora',sans-serif" }}>Weekly Signups</h3>
            <Chip color="#A78BFA">324 this week</Chip>
          </div>
          <p style={{ fontSize:13, color:"var(--text-3)", marginBottom:16, letterSpacing:"-0.01em" }}>New seafarers & companies joined</p>
          <BarChart data={weekSignups} height={130} />
        </GlassCard>
      </div>

      {/* Platform health + Nationality + Activity */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 2fr", gap:20 }}>
        {/* Health rings */}
        <GlassCard glow>
          <h3 style={{ fontSize:16, fontWeight:600, color:"var(--text-1)", marginBottom:22, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>Platform Health</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {[
              { label:"Seafarers",  value:12847, max:15000, color:"#38BDF8" },
              { label:"Companies",  value:863,   max:1000,  color:"#A78BFA" },
              { label:"Active Jobs",value:1247,  max:2000,  color:"#34D399" },
              { label:"Uptime",     value:99,    max:100,   color:"#FBBF24" },
            ].map(d => (
              <div key={d.label} style={{ textAlign:"center" }}>
                <DonutRing value={d.value} max={d.max} color={d.color} size={72} />
                <div style={{ fontSize:11, color:"var(--text-3)", marginTop:6, fontWeight:500, letterSpacing:"-0.01em" }}>{d.label}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Nationalities */}
        <GlassCard glow>
          <h3 style={{ fontSize:16, fontWeight:600, color:"var(--text-1)", marginBottom:22, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>Top Nationalities</h3>
          {nationalities.map((n, i) => (
            <div key={i} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:13, color:"var(--text-2)", fontWeight:500, letterSpacing:"-0.01em" }}>{n.country}</span>
                <span style={{ fontSize:13, fontWeight:700, color:n.color, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>{n.pct}%</span>
              </div>
              <div style={{ height:6, borderRadius:3, background:"var(--bg-tertiary)" }}>
                <div style={{ height:"100%", width:`${n.pct}%`, background:`linear-gradient(90deg,${n.color},${n.color}88)`, borderRadius:3, transition:"width 1.2s ease" }} />
              </div>
            </div>
          ))}
        </GlassCard>

        {/* Live activity */}
        <GlassCard>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>Live Activity Feed</h3>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#34D399", animation:"pulseDot 1.5s infinite", display:"inline-block" }} />
              <span style={{ fontSize:12, color:"#34D399", fontWeight:600, letterSpacing:"-0.01em" }}>Live</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {ACTIVITY_LOGS.slice(0, 6).map(log => (
              <div key={log.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:"var(--bg-tertiary)", borderRadius:10 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:`${log.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={log.icon} size={16} color={log.color} strokeWidth={2} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:12, color:"var(--text-2)", fontWeight:500, letterSpacing:"-0.01em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{log.msg}</p>
                </div>
                <span style={{ fontSize:11, color:"var(--text-3)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em", flexShrink:0 }}>{log.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Approvals() {
  const [companies, setCompanies] = useState(PENDING_COMPANIES);
  const [jobs, setJobs] = useState(PENDING_JOBS);
  const [tab, setTab] = useState("companies");
  const [toast, setToast] = useState(null);

  const act = (type, id, action) => {
    if (type === "company") setCompanies(c => c.filter(x => x.id !== id));
    else setJobs(j => j.filter(x => x.id !== id));
    const msg = action === "approve" ? "✅ Approved successfully" : "❌ Rejected";
    setToast({ msg, ok: action === "approve" });
    setTimeout(() => setToast(null), 2600);
  };

  return (
    <div>
      {toast && (
        <div style={{ position:"fixed", top:80, right:28, zIndex:9999, padding:"12px 22px", borderRadius:12, fontWeight:600, fontSize:13, background: toast.ok ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)", color: toast.ok ? "#34D399" : "#F87171", border: `1px solid ${toast.ok ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`, backdropFilter:"blur(20px)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", letterSpacing:"-0.01em" }}>{toast.msg}</div>
      )}

      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>Pending Approvals</h2>
        <p style={{ fontSize:15, color:"var(--text-3)", letterSpacing:"-0.01em" }}>{companies.length + jobs.length} items require your review</p>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:24, background:"var(--bg-tertiary)", borderRadius:12, padding:5, width:"fit-content" }}>
        {[
          { id:"companies", icon:"building", label:`Companies (${companies.length})` },
          { id:"jobs",      icon:"briefcase",label:`Job Posts (${jobs.length})` },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:"9px 20px", borderRadius:9, border:"none", cursor:"pointer",
            fontWeight:600, fontSize:13, letterSpacing:"-0.01em",
            background: tab === t.id ? "linear-gradient(135deg,#0284C7,#0EA5E9)" : "transparent",
            color: tab === t.id ? "#fff" : "var(--text-3)",
            boxShadow: tab === t.id ? "0 4px 16px rgba(2,132,199,0.35)" : "none",
            display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif",
            transition:"all 0.2s",
          }}>
            <Icon name={t.icon} size={15} color={tab === t.id ? "#fff" : "var(--text-3)"} strokeWidth={2} />
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {tab === "companies" && (companies.length === 0 ? (
          <GlassCard style={{ textAlign:"center", padding:"60px 24px" }}>
            <Icon name="checkCircle" size={48} color="#34D399" strokeWidth={1.5} />
            <p style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", marginTop:16, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>All companies reviewed!</p>
          </GlassCard>
        ) : companies.map(co => (
          <GlassCard key={co.id} glow>
            <div style={{ display:"flex", alignItems:"center", gap:18, flexWrap:"wrap" }}>
              <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg,${co.color},${co.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:16, flexShrink:0, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{co.logo}</div>
              <div style={{ flex:1, minWidth:180 }}>
                <div style={{ fontSize:16, fontWeight:600, color:"var(--text-1)", marginBottom:8, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{co.name}</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {[co.type, co.country, `Submitted ${co.submitted}`, `${co.docs} Documents`].map(tag => (
                    <Chip key={tag} color="#38BDF8">{tag}</Chip>
                  ))}
                </div>
              </div>
              <div style={{ fontSize:13, color:"var(--text-3)", letterSpacing:"-0.01em", flexShrink:0 }}>
                Contact: <strong style={{ color:"var(--text-2)" }}>{co.contact}</strong>
              </div>
              <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                <button style={{ padding:"8px 16px", borderRadius:9, border:"1px solid var(--border)", background:"transparent", color:"#38BDF8", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="eye" size={13} color="#38BDF8" strokeWidth={2} /> View Docs
                </button>
                <button onClick={() => act("company", co.id, "reject")} style={{ padding:"8px 16px", borderRadius:9, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#F87171", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="x" size={13} color="#F87171" strokeWidth={2.5} /> Reject
                </button>
                <button onClick={() => act("company", co.id, "approve")} style={{ padding:"8px 16px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#10B981,#34D399)", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 12px rgba(16,185,129,0.35)", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="check" size={13} color="#fff" strokeWidth={2.5} /> Approve
                </button>
              </div>
            </div>
          </GlassCard>
        )))}

        {tab === "jobs" && (jobs.length === 0 ? (
          <GlassCard style={{ textAlign:"center", padding:"60px 24px" }}>
            <Icon name="checkCircle" size={48} color="#34D399" strokeWidth={1.5} />
            <p style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", marginTop:16, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>All job posts reviewed!</p>
          </GlassCard>
        ) : jobs.map(job => (
          <GlassCard key={job.id} glow>
            <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              <div style={{ width:46, height:46, borderRadius:12, background:`linear-gradient(135deg,${job.color},${job.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13, flexShrink:0, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{job.logo}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>
                  {job.title} <span style={{ fontSize:13, color:"var(--text-3)", fontWeight:400 }}>· {job.vessel}</span>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  {[job.company, job.salary+"/mo", `Submitted ${job.submitted}`].map(t => <Chip key={t} color="#38BDF8">{t}</Chip>)}
                </div>
              </div>
              <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                <button onClick={() => act("job", job.id, "reject")} style={{ padding:"8px 16px", borderRadius:9, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#F87171", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="x" size={13} color="#F87171" strokeWidth={2.5} /> Reject
                </button>
                <button onClick={() => act("job", job.id, "approve")} style={{ padding:"8px 16px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#10B981,#34D399)", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 12px rgba(16,185,129,0.35)", display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter',sans-serif" }}>
                  <Icon name="check" size={13} color="#fff" strokeWidth={2.5} /> Approve
                </button>
              </div>
            </div>
          </GlassCard>
        )))}
      </div>
    </div>
  );
}

function Companies() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = ALL_COMPANIES.filter(c =>
    (statusFilter === "All" || c.status === statusFilter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>All Companies</h2>
        <p style={{ fontSize:15, color:"var(--text-3)", letterSpacing:"-0.01em" }}>{ALL_COMPANIES.length} registered companies</p>
      </div>

      <GlassCard style={{ marginBottom:20, padding:16, display:"flex", gap:14 }}>
        <div style={{ position:"relative", flex:2 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>
            <Icon name="search" size={16} color="var(--text-3)" strokeWidth={2} />
          </span>
          <input placeholder="Search companies…" value={search} onChange={e => setSearch(e.target.value)} style={{ width:"100%", padding:"10px 14px 10px 38px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ flex:1, padding:"10px 14px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:14, outline:"none", fontFamily:"'Inter',sans-serif" }}>
          {["All","Active","Suspended"].map(s => <option key={s}>{s}</option>)}
        </select>
      </GlassCard>

      <GlassCard style={{ padding:0, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr", padding:"12px 24px", background:"var(--bg-tertiary)", borderBottom:"1px solid var(--border)" }}>
          {["Company","Plan","Jobs","Hired","Status","Action"].map(h => (
            <span key={h} style={{ fontSize:11, fontWeight:600, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{h}</span>
          ))}
        </div>
        {filtered.map((co, i) => (
          <div key={co.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr", padding:"16px 24px", borderBottom: i < filtered.length-1 ? "1px solid var(--border)" : "none", alignItems:"center", transition:"background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-tertiary)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${co.color},${co.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{co.logo}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.015em" }}>{co.name}</div>
                <div style={{ fontSize:11, color:"var(--text-3)", marginTop:2, letterSpacing:"-0.01em" }}>{co.country}</div>
              </div>
            </div>
            <Chip color="#38BDF8">{co.plan}</Chip>
            <span style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.03em" }}>{co.jobs}</span>
            <span style={{ fontSize:15, fontWeight:700, color:"var(--text-1)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.03em" }}>{co.hired}</span>
            <Chip color={co.status === "Active" ? "#34D399" : "#F87171"}>
              <Icon name={co.status === "Active" ? "checkCircle" : "xCircle"} size={11} strokeWidth={2.2} />
              {co.status}
            </Chip>
            <button style={{ padding:"6px 12px", borderRadius:8, border:"1px solid var(--border)", background:"transparent", color:"#38BDF8", fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:5, fontFamily:"'Inter',sans-serif" }}>
              <Icon name="eye" size={12} color="#38BDF8" strokeWidth={2} /> View
            </button>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

function Seafarers() {
  const [search, setSearch] = useState("");
  const filtered = ALL_SEAFARERS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.rank.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>All Seafarers</h2>
        <p style={{ fontSize:15, color:"var(--text-3)", letterSpacing:"-0.01em" }}>{ALL_SEAFARERS.length} registered seafarers</p>
      </div>
      <GlassCard style={{ marginBottom:20, padding:16 }}>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>
            <Icon name="search" size={16} color="var(--text-3)" strokeWidth={2} />
          </span>
          <input placeholder="Search seafarers by name or rank…" value={search} onChange={e => setSearch(e.target.value)} style={{ width:"100%", padding:"10px 14px 10px 38px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif" }} />
        </div>
      </GlassCard>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {filtered.map(s => (
          <GlassCard key={s.id} glow style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
              <AvatarBadge initials={s.avatar} size={48} gradient={`linear-gradient(135deg,${s.color},${s.color}88)`} online={s.status === "Active"} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{s.name}</div>
                <div style={{ fontSize:13, color:"var(--text-3)", marginTop:3, letterSpacing:"-0.01em" }}>{s.rank} · {s.country}</div>
              </div>
              <Chip color={s.status === "Active" ? "#34D399" : s.status === "Suspended" ? "#F87171" : "#64748B"}>
                {s.status}
              </Chip>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:6 }}>
                <Chip color={s.verified ? "#34D399" : "#F87171"}>
                  <Icon name={s.verified ? "check" : "x"} size={10} strokeWidth={2.5} />
                  {s.verified ? "Verified" : "Unverified"}
                </Chip>
                <Chip color="#38BDF8">
                  <Icon name="layers" size={10} strokeWidth={2} />
                  {s.apps} apps
                </Chip>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button style={{ padding:"5px 11px", borderRadius:7, border:"1px solid var(--border)", background:"transparent", color:"#38BDF8", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>View</button>
                <button style={{ padding:"5px 11px", borderRadius:7, border:"none", background: s.status === "Active" ? "rgba(248,113,113,0.12)" : "rgba(52,211,153,0.12)", color: s.status === "Active" ? "#F87171" : "#34D399", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
                  {s.status === "Active" ? "Suspend" : "Restore"}
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  const growth = [
    { label:"Jan", value:82, color:"#38BDF8" }, { label:"Feb", value:91, color:"#38BDF8" },
    { label:"Mar", value:104, color:"#38BDF8" }, { label:"Apr", value:116, color:"#0EA5E9" },
    { label:"May", value:128, color:"#0284C7" },
  ];
  return (
    <div>
      <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:28 }}>Platform Analytics</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {[
          { label:"Avg. Time to Hire",  value:"11 Days",  icon:"clock",    color:"#38BDF8", bg:"rgba(56,189,248,0.1)",  change:"Improved",  trend:"up",   sparkline:[80,70,75,65,60,55,50,48,45,44] },
          { label:"Application Rate",   value:"3.2 / Job",icon:"target",   color:"#A78BFA", bg:"rgba(167,139,250,0.1)", change:"+0.4 MoM",  trend:"up",   sparkline:[50,55,60,58,65,70,72,75,78,80] },
          { label:"Conversion Rate",    value:"6.8%",     icon:"activity", color:"#34D399", bg:"rgba(52,211,153,0.1)",  change:"+1.2%",     trend:"up",   sparkline:[40,45,50,48,55,60,62,65,66,68] },
        ].map((s, i) => <StatCard key={i} stat={s} delay={i * 80} />)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
        <GlassCard glow>
          <h3 style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.025em", marginBottom:6, fontFamily:"'Sora',sans-serif" }}>Seafarer Growth (×100)</h3>
          <p style={{ fontSize:13, color:"var(--text-3)", marginBottom:16 }}>Total platform registrations over time</p>
          <BarChart data={growth} height={140} />
        </GlassCard>
        <GlassCard glow>
          <h3 style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.025em", marginBottom:22, fontFamily:"'Sora',sans-serif" }}>Subscription Mix</h3>
          {[
            { plan:"Enterprise",   count:12, revenue:"$4,788", color:"#38BDF8" },
            { plan:"Professional", count:31, revenue:"$4,619", color:"#A78BFA" },
            { plan:"Starter",      count:44, revenue:"$2,156", color:"#34D399" },
          ].map(p => (
            <div key={p.plan} style={{ marginBottom:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <div>
                  <span style={{ fontSize:13, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.015em" }}>{p.plan}</span>
                  <span style={{ fontSize:11, color:"var(--text-3)", marginLeft:8 }}>{p.count} companies</span>
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:p.color, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>{p.revenue}/mo</span>
              </div>
              <div style={{ height:7, borderRadius:3, background:"var(--bg-tertiary)" }}>
                <div style={{ height:"100%", width:`${(p.count/87)*100}%`, background:`linear-gradient(90deg,${p.color},${p.color}77)`, borderRadius:3, transition:"width 1.2s ease" }} />
              </div>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

function Subscriptions() {
  const subs = [
    { company:"MSC Global Lines",      plan:"Enterprise",   amount:"$399", renewal:"Jun 1",  logo:"MS", color:"#1E3A5F", status:"Active"    },
    { company:"Emirates Maritime Co.", plan:"Enterprise",   amount:"$399", renewal:"Jun 5",  logo:"EM", color:"#A78BFA", status:"Active"    },
    { company:"Pacific Star Shipping", plan:"Professional", amount:"$149", renewal:"Jun 15", logo:"PS", color:"#38BDF8", status:"Active"    },
    { company:"Royal Caribbean Crew",  plan:"Professional", amount:"$149", renewal:"Jun 20", logo:"RC", color:"#FBBF24", status:"Active"    },
    { company:"Evergreen Marine",      plan:"Starter",      amount:"$49",  renewal:"—",      logo:"EV", color:"#F87171", status:"Suspended" },
  ];
  const mrr = subs.filter(s => s.status === "Active").reduce((a, s) => a + parseInt(s.amount.replace("$","")), 0);

  return (
    <div>
      <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:28 }}>Subscriptions</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {[
          { label:"Monthly Recurring Revenue", value:`$${mrr.toLocaleString()}`, icon:"creditCard", color:"#34D399", bg:"rgba(52,211,153,0.1)", change:"MRR",          trend:"up",   sparkline:[60,65,70,68,75,80,78,85,88,90] },
          { label:"Active Subscriptions",       value:subs.filter(s=>s.status==="Active").length, icon:"checkCircle", color:"#38BDF8", bg:"rgba(56,189,248,0.1)", change:"Companies", trend:"up",   sparkline:[3,4,4,5,5,6,6,7,7,4] },
          { label:"Enterprise Plans",           value:subs.filter(s=>s.plan==="Enterprise").length, icon:"award", color:"#A78BFA", bg:"rgba(167,139,250,0.1)", change:"Highest tier",trend:"stable",sparkline:[1,1,1,2,2,2,2,2,2,2] },
        ].map((s, i) => <StatCard key={i} stat={s} delay={i * 80} />)}
      </div>

      <GlassCard style={{ padding:0, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", padding:"13px 24px", background:"var(--bg-tertiary)", borderBottom:"1px solid var(--border)" }}>
          {["Company","Plan","Monthly","Renewal","Status"].map(h => (
            <span key={h} style={{ fontSize:11, fontWeight:600, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{h}</span>
          ))}
        </div>
        {subs.map((s, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", padding:"16px 24px", borderBottom: i < subs.length-1 ? "1px solid var(--border)" : "none", alignItems:"center", transition:"background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-tertiary)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${s.color},${s.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:11, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{s.logo}</div>
              <span style={{ fontSize:14, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.015em" }}>{s.company}</span>
            </div>
            <Chip color="#38BDF8">{s.plan}</Chip>
            <span style={{ fontSize:17, fontWeight:700, color:"#34D399", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.03em" }}>{s.amount}</span>
            <span style={{ fontSize:13, color:"var(--text-2)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>{s.renewal}</span>
            <Chip color={s.status === "Active" ? "#34D399" : "#F87171"}>
              <Icon name={s.status === "Active" ? "check" : "ban"} size={10} strokeWidth={2.5} />
              {s.status}
            </Chip>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

function ActivityLogs() {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Company","Job","User","Payment","Alert"];
  const filtered = filter === "All" ? ACTIVITY_LOGS : ACTIVITY_LOGS.filter(l => l.category === filter);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
        <div>
          <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>Activity Logs</h2>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#34D399", animation:"pulseDot 1.5s infinite", display:"inline-block" }} />
            <span style={{ fontSize:13, color:"#34D399", fontWeight:600, letterSpacing:"-0.01em" }}>Live Feed</span>
          </div>
        </div>
        <button style={{ padding:"9px 18px", borderRadius:10, border:"1px solid var(--border)", background:"transparent", color:"#38BDF8", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:7, fontFamily:"'Inter',sans-serif" }}>
          <Icon name="download" size={15} color="#38BDF8" strokeWidth={2} /> Export
        </button>
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:22, flexWrap:"wrap" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding:"7px 16px", borderRadius:999, border: filter===c ? "none" : "1px solid var(--border)", background: filter===c ? "linear-gradient(135deg,#0284C7,#0EA5E9)" : "transparent", color: filter===c ? "#fff" : "var(--text-3)", fontSize:12, fontWeight:600, cursor:"pointer", letterSpacing:"-0.01em", fontFamily:"'Inter',sans-serif", transition:"all 0.18s" }}>
            {c}
          </button>
        ))}
      </div>

      <GlassCard style={{ padding:0, overflow:"hidden" }}>
        {filtered.map((log, i) => (
          <div key={log.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 22px", borderBottom: i < filtered.length-1 ? "1px solid var(--border)" : "none", transition:"background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-tertiary)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ width:38, height:38, borderRadius:10, background:`${log.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name={log.icon} size={17} color={log.color} strokeWidth={2} />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, color:"var(--text-1)", fontWeight:500, letterSpacing:"-0.01em", marginBottom:3 }}>{log.msg}</p>
              <Chip color={log.color} bg="transparent" border="transparent">{log.category}</Chip>
            </div>
            <span style={{ fontSize:12, color:"var(--text-3)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em", flexShrink:0 }}>{log.time}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h2 style={{ fontSize:28, fontWeight:700, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", marginBottom:28 }}>System Settings</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        {[
          { title:"Platform Configuration", icon:"settings", items:[
            { label:"Platform Name",          val:"OceanCrew",             type:"text"   },
            { label:"Support Email",          val:"support@oceancrew.io",  type:"text"   },
            { label:"Max Jobs (Starter Plan)",val:"5",                     type:"text"   },
            { label:"Maintenance Mode",       val:false,                   type:"toggle" },
          ]},
          { title:"Security & Auth", icon:"shield", items:[
            { label:"JWT Token Expiry",       val:"24 hours",              type:"text"   },
            { label:"Max Login Attempts",     val:"5",                     type:"text"   },
            { label:"Require 2FA for Admin",  val:true,                    type:"toggle" },
            { label:"IP Rate Limiting",       val:true,                    type:"toggle" },
          ]},
        ].map(section => (
          <GlassCard key={section.title}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:"rgba(56,189,248,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name={section.icon} size={18} color="#38BDF8" strokeWidth={2} />
              </div>
              <h3 style={{ fontSize:16, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>{section.title}</h3>
            </div>
            {section.items.map((item, i) => (
              <div key={item.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", borderBottom: i < section.items.length-1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize:14, fontWeight:500, color:"var(--text-2)", letterSpacing:"-0.01em" }}>{item.label}</span>
                {item.type === "toggle" ? (
                  <div style={{ width:44, height:24, borderRadius:12, background: item.val ? "#0284C7" : "var(--bg-tertiary)", border:"1px solid var(--border)", position:"relative", cursor:"pointer", transition:"background 0.2s" }}>
                    <div style={{ position:"absolute", top:3, left: item.val ? "calc(100% - 21px)" : 3, width:16, height:16, borderRadius:"50%", background:"#fff", boxShadow:"0 2px 6px rgba(0,0,0,0.3)", transition:"left 0.2s" }} />
                  </div>
                ) : (
                  <input defaultValue={item.val} style={{ padding:"8px 14px", borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-1)", fontSize:13, outline:"none", width:220, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }} />
                )}
              </div>
            ))}
          </GlassCard>
        ))}
        <button style={{ padding:"13px 26px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(2,132,199,0.35)", alignSelf:"flex-start", display:"flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif", letterSpacing:"-0.01em" }}>
          <Icon name="check" size={16} color="#fff" strokeWidth={2.5} /> Save Changes
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN LAYOUT
───────────────────────────────────────────── */
export default function AdminPanel() {
  const [page, setPage]       = useState("dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme]     = useState("dark");
  const isDark = theme === "dark";
  const pending = PENDING_COMPANIES.length + PENDING_JOBS.length;

  const renderPage = () => {
    switch(page) {
      case "dashboard":    return <DashboardHome setPage={setPage} />;
      case "approvals":    return <Approvals />;
      case "companies":    return <Companies />;
      case "seafarers":    return <Seafarers />;
      case "analytics":    return <Analytics />;
      case "subscriptions":return <Subscriptions />;
      case "activity":     return <ActivityLogs />;
      case "settings":     return <Settings />;
      default:             return <DashboardHome setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --bg-primary:   ${isDark ? "#08090C"         : "#F7F8FA"};
          --bg-card:      ${isDark ? "#10121A"         : "#FFFFFF"};
          --bg-tertiary:  ${isDark ? "#181B26"         : "#F0F2F5"};
          --border:       ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
          --text-1:       ${isDark ? "#F1F5F9"         : "#0F172A"};
          --text-2:       ${isDark ? "#94A3B8"         : "#475569"};
          --text-3:       ${isDark ? "#475569"         : "#94A3B8"};
          --sidebar-bg:   ${isDark ? "#08090C"         : "#FFFFFF"};
        }
        body,html{
          font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
          -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
          background:var(--bg-primary); color:var(--text-1);
        }
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.4)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .page-anim{animation:fadeIn .38s cubic-bezier(.4,0,.2,1);}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,.25);border-radius:3px;}
        ::-webkit-scrollbar-thumb:hover{background:rgba(56,189,248,.45);}
        input::placeholder,textarea::placeholder{color:var(--text-3);}
        input,select,textarea,button{font-family:'Inter',-apple-system,sans-serif;}
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg-primary)" }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: sidebar ? 256 : 72, minHeight:"100vh",
          background:"var(--sidebar-bg)",
          borderRight:"1px solid var(--border)",
          display:"flex", flexDirection:"column",
          position:"fixed", top:0, left:0, bottom:0,
          zIndex:1000, transition:"width .3s cubic-bezier(.4,0,.2,1)",
          overflow:"hidden",
        }}>
          {/* Logo */}
          <div style={{ padding: sidebar ? "22px 20px" : "20px 16px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:12, whiteSpace:"nowrap" }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 6px 20px rgba(2,132,199,0.4)" }}>
              <Icon name="anchor" size={20} color="#fff" strokeWidth={2} />
            </div>
            {sidebar && (
              <div>
                <div style={{ fontWeight:700, fontSize:18, color:"var(--text-1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif", lineHeight:1.1 }}>OceanCrew</div>
                <div style={{ fontSize:9, color:"#38BDF8", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, marginTop:3 }}>Admin · SKYbird Systems</div>
              </div>
            )}
          </div>

          {/* Admin badge */}
          {sidebar && (
            <div style={{ padding:"13px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:12 }}>
              <AvatarBadge initials="SA" size={36} gradient="linear-gradient(135deg,#F87171,#FB923C)" online />
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.015em" }}>Super Admin</div>
                <div style={{ fontSize:10, color:"#F87171", fontWeight:600, display:"flex", alignItems:"center", gap:4, marginTop:1 }}>
                  <Icon name="shield" size={9} color="#F87171" strokeWidth={2.5} />
                  Full Access
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav style={{ flex:1, padding:"14px 10px", overflowY:"auto", display:"flex", flexDirection:"column", gap:2 }}>
            {NAV_SECTIONS.map(section => (
              <div key={section.label}>
                {sidebar && (
                  <div style={{ fontSize:10, fontWeight:600, color:"var(--text-3)", textTransform:"uppercase", letterSpacing:"0.1em", padding:"10px 14px 6px", marginTop:6 }}>
                    {section.label}
                  </div>
                )}
                {section.items.map(item => {
                  const active = page === item.id;
                  return (
                    <button key={item.id} onClick={() => setPage(item.id)}
                      title={!sidebar ? item.label : ""}
                      style={{
                        width:"100%", display:"flex", alignItems:"center", gap:11,
                        padding: sidebar ? "10px 14px" : "12px",
                        borderRadius:10, border:"none", cursor:"pointer",
                        background: active ? "rgba(56,189,248,0.1)" : "transparent",
                        color: active ? "#38BDF8" : "var(--text-3)",
                        fontSize:14, fontWeight: active ? 600 : 500,
                        letterSpacing:"-0.01em", justifyContent: sidebar ? "flex-start" : "center",
                        transition:"all .15s ease", position:"relative", overflow:"hidden",
                        fontFamily:"'Inter',sans-serif",
                        borderLeft: active ? "2px solid #38BDF8" : "2px solid transparent",
                      }}
                      onMouseEnter={e => { if(!active){ e.currentTarget.style.background="var(--bg-tertiary)"; e.currentTarget.style.color="var(--text-1)"; }}}
                      onMouseLeave={e => { if(!active){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--text-3)"; }}}
                    >
                      <Icon name={item.icon} size={17} color={active ? "#38BDF8" : "currentColor"} strokeWidth={active ? 2.2 : 1.8} />
                      {sidebar && <span style={{ whiteSpace:"nowrap" }}>{item.label}</span>}
                      {sidebar && item.badge && (
                        <span style={{ marginLeft:"auto", background: item.badgeColor || "#EF4444", color:"#fff", borderRadius:999, minWidth:20, height:19, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, padding:"0 6px", animation:"pulseDot 2.5s infinite", letterSpacing:"-0.01em" }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Collapse */}
          <div style={{ padding:"12px 10px", borderTop:"1px solid var(--border)" }}>
            <button onClick={() => setSidebar(s => !s)} style={{ width:"100%", padding:"9px", borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-tertiary)", color:"var(--text-3)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:13, fontWeight:500, fontFamily:"'Inter',sans-serif", transition:"all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(56,189,248,0.1)"; e.currentTarget.style.color="#38BDF8"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--bg-tertiary)"; e.currentTarget.style.color="var(--text-3)"; }}
            >
              <Icon name={sidebar ? "chevronLeft" : "chevronRight"} size={15} strokeWidth={2.2} />
              {sidebar && "Collapse"}
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div style={{ flex:1, marginLeft: sidebar ? 256 : 72, transition:"margin-left .3s cubic-bezier(.4,0,.2,1)", display:"flex", flexDirection:"column", minWidth:0 }}>

          {/* Header */}
          <header style={{
            background: isDark ? "rgba(16,18,26,0.75)" : "rgba(255,255,255,0.75)",
            backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)",
            padding:"0 32px", height:66,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            position:"sticky", top:0, zIndex:100, gap:16,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <h2 style={{ fontSize:17, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.025em", fontFamily:"'Sora',sans-serif" }}>
                {page === "dashboard" ? "Admin Dashboard" : NAV_SECTIONS.flatMap(s => s.items).find(n => n.id === page)?.label || "Dashboard"}
              </h2>
              <span style={{ fontSize:12, color:"var(--text-3)", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"-0.02em" }}>
                {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
              </span>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {pending > 0 && (
                <button onClick={() => setPage("approvals")} style={{ padding:"8px 16px", borderRadius:9, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#F87171", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:7, fontFamily:"'Inter',sans-serif", animation:"pulseDot 3s infinite", letterSpacing:"-0.01em" }}>
                  <Icon name="zap" size={13} color="#F87171" strokeWidth={2.5} />
                  {pending} Pending
                </button>
              )}

              <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{ width:38, height:38, borderRadius:9, border:"1px solid var(--border)", background:"var(--bg-card)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-2)", transition:"all .15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#38BDF8"; e.currentTarget.style.color="#38BDF8"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-2)"; }}
              >
                <Icon name={isDark ? "sun" : "moon"} size={16} strokeWidth={2} />
              </button>

              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 12px 6px 7px", background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:10, cursor:"pointer" }}>
                <AvatarBadge initials="SA" size={28} gradient="linear-gradient(135deg,#F87171,#FB923C)" online />
                <span style={{ fontSize:13, fontWeight:600, color:"var(--text-1)", letterSpacing:"-0.015em" }}>Admin</span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main style={{ flex:1, padding:32, overflowY:"auto" }}>
            <div className="page-anim">{renderPage()}</div>
          </main>

          {/* Footer */}
          <footer style={{ padding:"14px 32px", borderTop:"1px solid var(--border)", background: isDark ? "rgba(16,18,26,0.5)" : "rgba(255,255,255,0.5)", backdropFilter:"blur(16px)", textAlign:"center" }}>
            <p style={{ fontSize:12, color:"var(--text-3)", letterSpacing:"-0.01em" }}>
              © 2025 <strong style={{ color:"#38BDF8", fontWeight:600 }}>OceanCrew</strong> Admin Panel · Powered by{" "}
              <strong style={{ color:"#38BDF8", fontWeight:600 }}>SKYbird Systems</strong>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
