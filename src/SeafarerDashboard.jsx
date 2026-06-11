/* eslint-disable */
import { useState, useEffect, useRef } from "react";

const Icon = ({ name, size=18, color="currentColor", strokeWidth=1.8 }) => {
  const icons = {
    dashboard:<><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    anchor:<><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    user:<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    fileText:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    creditCard:<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    checkCircle:<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    xCircle:<><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    clock:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    zap:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    trendUp:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    send:<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    upload:<><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    download:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    moon:<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    chevronLeft:<><polyline points="15 18 9 12 15 6"/></>,
    chevronRight:<><polyline points="9 18 15 12 9 6"/></>,
    layers:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    award:<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    alertCircle:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    dollarSign:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    lock:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    filter:<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    messageSquare:<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    target:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    building:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    logOut:<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  };
  const p=icons[name];
  if(!p)return null;
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{flexShrink:0,display:"inline-block",verticalAlign:"middle"}}>
      {p}
    </svg>
  );
};

const D={
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
const L={
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

/* â”€â”€ API & AUTH â”€â”€ */
const API = "https://oceancrew-backend-production.up.railway.app";
const getToken = () => localStorage.getItem("token");

const CERTS=[
  {id:"cdc",   label:"CDC / Seaman's Book",  uploaded:false,expiry:null,required:true},
  {id:"stcw",  label:"STCW Basic Safety",    uploaded:false,expiry:null,required:true},
  {id:"passport",label:"Passport",           uploaded:false,expiry:null,required:true},
  {id:"coc",   label:"COC Master Mariner",   uploaded:false,expiry:null,required:false},
  {id:"medical",label:"Medical Certificate", uploaded:false,expiry:null,required:false},
  {id:"gmdss", label:"GMDSS",                uploaded:false,expiry:null,required:false},
];

const SEA_SERVICE=[
  {vessel:"MV Ocean Star",type:"Container",rank:"Master",flag:"Panama",from:"2020-01",to:"2023-06"},
  {vessel:"MV Pacific Glory",type:"Bulk Carrier",rank:"Chief Officer",flag:"Singapore",from:"2017-03",to:"2019-12"},
  {vessel:"MT Gulf Star",type:"Oil Tanker",rank:"Chief Officer",flag:"Marshall Islands",from:"2014-06",to:"2017-02"},
];

const NAV=[
  {section:"Main",items:[
    {id:"dashboard",   icon:"dashboard",  label:"Dashboard"},
    {id:"jobs",        icon:"briefcase",  label:"Find Jobs"},
    {id:"applications",icon:"layers",     label:"My Applications"},
  ]},
  {section:"Profile",items:[
    {id:"profile",     icon:"user",       label:"My Profile"},
    {id:"documents",   icon:"fileText",   label:"Documents"},
    {id:"cv",          icon:"award",      label:"My CV"},
  ]},
  {section:"Account",items:[
    {id:"subscription",icon:"creditCard", label:"Subscription"},
    {id:"notifications",icon:"bell",     label:"Notifications"},
    {id:"settings",    icon:"settings",  label:"Settings"},
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

function Btn({children,onClick,variant="primary",isDark,size="md",icon,fullWidth}){
  const T=useT(isDark);
  const bg=variant==="primary"?(isDark?"#38BDF8":"#1a2332"):variant==="success"?"linear-gradient(135deg,#34D399,#10B981)":variant==="danger"?T.redBg:variant==="ghost"?(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"):"transparent";
  const col=variant==="primary"?"#fff":variant==="success"?"#fff":variant==="danger"?T.red:T.t2;
  const pad=size==="sm"?"6px 12px":size==="lg"?"14px 28px":"9px 18px";
  return(
    <button onClick={onClick} style={{width:fullWidth?"100%":"auto",padding:pad,borderRadius:10,border:"none",cursor:"pointer",fontWeight:600,fontSize:size==="sm"?11:13,fontFamily:"'Inter',sans-serif",transition:"all 0.18s",background:bg,color:col,display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:variant==="primary"?(isDark?"0 4px 14px rgba(56,189,248,0.25)":"0 4px 14px rgba(26,35,50,0.2)"):"none"}}
      onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
      onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
      {icon&&<Icon name={icon} size={size==="sm"?12:14} color="currentColor" strokeWidth={2}/>}
      {children}
    </button>
  );
}

function Spark({data,color,height=26}){
  const max=Math.max(...data);
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:2,height}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,borderRadius:2,background:color,height:`${(v/max)*100}%`,minHeight:2,opacity:0.25+(i/data.length)*0.65}}/>
      ))}
    </div>
  );
}

function Toast({msg,type,onClose}){
  const c={success:"#34D399",error:"#F87171",info:"#38BDF8",warning:"#FBBF24"}[type]||"#38BDF8";
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[]);
  return(
    <div style={{position:"fixed",top:80,right:24,zIndex:9999,padding:"12px 20px",borderRadius:14,
      background:"rgba(10,15,25,0.96)",border:`1px solid ${c}40`,color:c,fontSize:13,fontWeight:600,
      backdropFilter:"blur(20px)",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
      display:"flex",alignItems:"center",gap:8,fontFamily:"'Inter',sans-serif",
      animation:"slideIn 0.3s ease"}}>
      {type==="success"?"âœ“":type==="error"?"âœ•":"â„¹"} {msg}
    </div>
  );
}
/* â•â• DASHBOARD â•â• */
function DashboardPage({setPage,isDark,showToast,applications,jobs,notifications,userName}){
  const T=useT(isDark);
  const applied=(applications||[]).length;
  const shortlisted=(applications||[]).filter(a=>["Shortlisted","Interview","Offer"].includes(a.status)).length;
  const offers=(applications||[]).filter(a=>a.status==="Offer").length;
  const unread=(notifications||[]).filter(n=>!n.read).length;
  const SEAFARER = {name:userName||"User", avatar:(userName||"User")[0], rank:"Seafarer", nationality:"Global", yearsExp:0, verified:false, sub:"Free", availability:"Now", profileStrength:50};

  const stageColor={Applied:T.t3,Shortlisted:"#38BDF8",Interview:"#A78BFA",Offer:T.yellow,Hired:T.green,Rejected:T.red};

  return(
    <div>
      {/* Hero */}
      <Card isDark={isDark} style={{marginBottom:20,padding:0,overflow:"hidden"}}>
        <div style={{padding:"32px 36px",
          background:isDark?"linear-gradient(135deg,#0C1627,#0F2444)":"linear-gradient(135deg,#EFF6FF,#EDE9FE)",
          position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:"-5%",top:"-30%",width:360,height:360,borderRadius:"50%",
            background:isDark?"rgba(56,189,248,0.05)":"rgba(139,92,246,0.08)",filter:"blur(50px)",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
            <div style={{display:"flex",alignItems:"center",gap:18}}>
              {/* Avatar */}
              <div style={{width:68,height:68,borderRadius:"50%",
                background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.1)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:24,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'Sora',sans-serif",
                border:isDark?"2px solid rgba(56,189,248,0.3)":"2px solid rgba(26,35,50,0.15)",
                flexShrink:0}}>
                {SEAFARER.avatar}
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <h1 style={{fontSize:24,fontWeight:700,color:isDark?"#fff":T.t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.02em"}}>{SEAFARER.name}</h1>
                  {SEAFARER.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:999,letterSpacing:0.5}}>âœ“ VERIFIED</span>}
                </div>
                <div style={{fontSize:13,color:isDark?"rgba(255,255,255,0.6)":T.t2,marginBottom:8}}>{SEAFARER.rank} Â· {SEAFARER.nationality} Â· {SEAFARER.yearsExp} years exp.</div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  <Bdg label={SEAFARER.sub==="Pro"?"â­ Pro Member":"Free"} color={T.yellow} bg={T.yellowBg}/>
                  <Bdg label={`Available ${SEAFARER.availability}`} color={T.green} bg={T.greenBg}/>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Btn onClick={()=>setPage("jobs")} isDark={isDark} variant="primary" icon="search">Browse Jobs</Btn>
              <Btn onClick={()=>setPage("profile")} isDark={isDark} variant="ghost" icon="user">Edit Profile</Btn>
            </div>
          </div>
        </div>

        {/* Profile strength bar */}
        <div style={{padding:"16px 36px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}`,display:"flex",alignItems:"center",gap:16}}>
          <span style={{fontSize:12,color:T.t3,fontWeight:500,whiteSpace:"nowrap"}}>Profile Strength</span>
          <div style={{flex:1,height:6,borderRadius:3,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}}>
            <div style={{height:"100%",width:`${SEAFARER.profileStrength}%`,borderRadius:3,
              background:`linear-gradient(90deg,${isDark?"#38BDF8":"#1a2332"},${isDark?"#0EA5E9":"#475569"})`,
              transition:"width 1.2s ease"}}/>
          </div>
          <span style={{fontSize:12,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'JetBrains Mono',monospace"}}>{SEAFARER.profileStrength}%</span>
          <Btn onClick={()=>setPage("profile")} isDark={isDark} variant="ghost" size="sm">Complete Profile â†’</Btn>
        </div>
      </Card>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:20}}>
        {[
          {label:"Jobs Applied",   val:applied,    icon:"layers",     dc:"#38BDF8",sp:[1,2,2,3,3,4,4,applied],  change:"Total",         ok:true},
          {label:"Shortlisted",    val:shortlisted,icon:"star",       dc:"#FBBF24",sp:[0,0,1,1,1,2,2,shortlisted],change:"Companies noticed",ok:true},
          {label:"Active Offers",  val:offers,     icon:"zap",        dc:"#34D399",sp:[0,0,0,0,0,0,1,offers],   change:"Review now!",    ok:true},
          {label:"Profile Views",  val:24,         icon:"eye",        dc:"#A78BFA",sp:[2,3,4,5,6,8,10,24],      change:"+8 this week",  ok:true},
        ].map((s,i)=>(
          <Card key={i} isDark={isDark} style={{padding:"20px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:38,height:38,borderRadius:11,background:isDark?`${s.dc}18`:T.sub,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={s.icon} size={17} color={isDark?s.dc:T.t2} strokeWidth={1.8}/>
              </div>
              <Bdg label={s.change} color={s.ok?T.green:T.red} bg={s.ok?T.greenBg:T.redBg}/>
            </div>
            <div style={{fontSize:34,fontWeight:700,color:isDark?s.dc:T.t1,letterSpacing:"-0.04em",lineHeight:1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>{s.val}</div>
            <div style={{fontSize:12,color:T.t2,marginBottom:12}}>{s.label}</div>
            <Spark data={s.sp} color={isDark?s.dc:"#94A3B8"} height={26}/>
          </Card>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
        {/* Application tracker */}
        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Application Tracker</h3>
            <Btn onClick={()=>setPage("applications")} isDark={isDark} variant="ghost" size="sm">View All â†’</Btn>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(applications||[]).slice(0,4).map(app=>{
              const col=stageColor[app.status]||T.t3;
              return(
                <div key={app.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",
                  background:isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.04)",borderRadius:12,
                  border:app.status==="Offer"?`1px solid ${T.green}30`:"none"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:700,color:T.t2,fontFamily:"'Sora',sans-serif"}}>{app.logo}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{app.title} â€” {app.company}</div>
                    <div style={{fontSize:11,color:T.t3}}>{app.salary}/mo Â· Applied {app.applied}</div>
                  </div>
                  <Bdg label={app.status} color={col} bg={`${col}18`}/>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Notifications */}
        <Card isDark={isDark}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Notifications</h3>
            {unread>0&&<Bdg label={`${unread} new`} color={T.red} bg={T.redBg}/>}
          </div>
          {(notifications||[]).slice(0,4).map(n=>(
            <div key={n.id} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.07)"}`}}>
              <div style={{width:30,height:30,borderRadius:8,flexShrink:0,
                background:n.read?(isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)"):(isDark?"rgba(56,189,248,0.12)":"rgba(26,35,50,0.08)"),
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon name={n.icon} size={13} color={n.read?T.t3:(isDark?"#38BDF8":T.accent)} strokeWidth={2}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:11,color:n.read?T.t3:T.t1,fontWeight:n.read?400:500,lineHeight:1.4,marginBottom:2}}>{n.msg}</p>
                <span style={{fontSize:9,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{n.time}</span>
              </div>
              {!n.read&&<div style={{width:6,height:6,borderRadius:"50%",background:isDark?"#38BDF8":T.accent,flexShrink:0,marginTop:4}}/>}
            </div>
          ))}
          <Btn onClick={()=>setPage("notifications")} isDark={isDark} variant="ghost" size="sm" fullWidth>View All Notifications</Btn>
        </Card>
      </div>

      {/* Recommended jobs */}
      <Card isDark={isDark}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Recommended Jobs For You</h3>
          <Btn onClick={()=>setPage("jobs")} isDark={isDark} variant="ghost" size="sm">Browse All â†’</Btn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {(jobs||[]).slice(0,3).map(job=>(
            <div key={job.id} style={{padding:"16px",borderRadius:14,
              background:isDark?"rgba(255,255,255,0.025)":"rgba(100,116,139,0.04)",
              border:job.urgent?`1px solid ${T.red}30`:(isDark?"1px solid rgba(255,255,255,0.04)":"none"),
              transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}
              onMouseLeave={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.025)":"rgba(100,116,139,0.04)"}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:600,color:isDark?"#38BDF8":T.accent}}>{job.match}% match</div>
                {job.urgent&&<Bdg label="URGENT" color={T.red} bg={T.redBg}/>}
              </div>
              <div style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:3}}>{job.title}</div>
              <div style={{fontSize:11,color:T.t3,marginBottom:8}}>{job.company} Â· {job.country}</div>
              <div style={{fontSize:13,fontWeight:700,color:T.green,marginBottom:10}}>{job.salary}/mo</div>
              <Btn onClick={()=>showToast("Opening job...","info")} isDark={isDark} variant="primary" size="sm" fullWidth>Apply Now</Btn>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
/* â•â• FIND JOBS â•â• */
function FindJobsPage({isDark,showToast,jobs,searchQuery}){
  const T=useT(isDark);
  const [search,setSearch]=useState(searchQuery||"");
  const [rankFilter,setRankFilter]=useState("All");
  const [applied,setApplied]=useState([]);
  const filtered=(jobs||[]).filter(j=>(rankFilter==="All"||j.title===rankFilter)&&(j.title.toLowerCase().includes(search.toLowerCase())||j.company.toLowerCase().includes(search.toLowerCase())));

  const apply=(job)=>{
    if(applied.includes(job.id)){showToast("Already applied","warning");return;}
    setApplied(p=>[...p,job.id]);
    showToast(`Applied to ${job.title} at ${job.company}!`,"success");
  };

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Find Jobs</h2>
        <p style={{fontSize:14,color:T.t3}}>Jobs matched to your rank and experience. Pro membership â€” unlimited applications.</p>
      </div>

      <Card isDark={isDark} style={{marginBottom:16,padding:16,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:2,minWidth:200}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={15} color={T.t3} strokeWidth={2}/></span>
          <input placeholder="Search jobs, companies..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",padding:"10px 14px 10px 36px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.07)":"none",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.06)",color:T.t1,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"'Inter',sans-serif"}}/>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["All","Master","Chief Officer","Chief Engineer","ETO"].map(r=>(
            <button key={r} onClick={()=>setRankFilter(r)} style={{padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:600,fontSize:11,fontFamily:"'Inter',sans-serif",transition:"all 0.15s",
              background:rankFilter===r?(isDark?"#38BDF8":"#1a2332"):(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"),
              color:rankFilter===r?"#fff":T.t3}}>{r}</button>
          ))}
        </div>
      </Card>

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {filtered.map(job=>(
          <Card key={job.id} isDark={isDark} style={{padding:"20px 24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
              <div style={{width:50,height:50,borderRadius:14,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:14,fontWeight:700,color:T.t2,fontFamily:"'Sora',sans-serif"}}>{job.company.slice(0,2).toUpperCase()}</div>
              <div style={{flex:1,minWidth:180}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <span style={{fontSize:16,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{job.title}</span>
                  {job.urgent&&<Bdg label="URGENT" color={T.red} bg={T.redBg}/>}
                  {job.verified&&<Bdg label="âœ“ Verified Co." color="#38BDF8" bg="rgba(56,189,248,0.1)"/>}
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {[job.company,job.vessel,job.country,job.duration,`Posted ${job.posted}`].map(tag=>(
                    <Bdg key={tag} label={tag} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                  ))}
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:22,fontWeight:700,color:T.green,fontFamily:"'Sora',sans-serif",marginBottom:2}}>{job.salary}<span style={{fontSize:12,color:T.t3,fontWeight:400}}>/mo</span></div>
                <div style={{fontSize:12,fontWeight:700,color:job.match>90?T.green:job.match>80?T.yellow:T.t2}}>{job.match}% match</div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <Btn onClick={()=>showToast("Viewing job details...","info")} isDark={isDark} variant="ghost" size="sm" icon="eye">View</Btn>
                <Btn onClick={()=>apply(job)} isDark={isDark} variant={applied.includes(job.id)?"ghost":"primary"} size="sm" icon={applied.includes(job.id)?"checkCircle":"send"}>
                  {applied.includes(job.id)?"Applied":"Apply Now"}
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* â•â• MY APPLICATIONS â•â• */
function ApplicationsPage({isDark,showToast,applications}){
  const T=useT(isDark);
  const stageColor={Applied:T.t3,Shortlisted:"#38BDF8",Interview:"#A78BFA",Offer:T.yellow,Hired:T.green,Rejected:T.red};
  const stages=["Applied","Shortlisted","Interview","Offer","Hired"];

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>My Applications</h2>
        <p style={{fontSize:14,color:T.t3}}>{(applications||[]).length} applications â€” track your journey</p>
      </div>

      {/* Stage summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:20}}>
        {stages.map(stage=>{
          const count=(applications||[]).filter(a=>a.status===stage).length;
          const col=stageColor[stage]||T.t3;
          return(
            <Card key={stage} isDark={isDark} style={{padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:700,color:col,fontFamily:"'Sora',sans-serif",marginBottom:4}}>{count}</div>
              <div style={{fontSize:11,color:T.t3}}>{stage}</div>
            </Card>
          );
        })}
      </div>

      {/* Application timeline */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {(applications||[]).map(app=>{
          const col=stageColor[app.status]||T.t3;
          const stageIdx=stages.indexOf(app.status);
          return(
            <Card key={app.id} isDark={isDark} style={{padding:"20px 24px"}}>
              <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap",marginBottom:16}}>
                <div style={{width:46,height:46,borderRadius:13,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:700,color:T.t2,fontFamily:"'Sora',sans-serif"}}>{app.logo}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>{app.title} â€” {app.company}</div>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                    <Bdg label={app.vessel} color={T.t2} bg={isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)"}/>
                    <Bdg label={app.salary+"/mo"} color={T.green} bg={T.greenBg}/>
                    <Bdg label={`Applied ${app.applied}`} color={T.t3} bg={isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.05)"}/>
                  </div>
                </div>
                <Bdg label={app.status} color={col} bg={`${col}18`}/>
              </div>

              {/* Progress bar */}
              {app.status!=="Rejected"&&(
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    {stages.map((stage,i)=>(
                      <div key={stage} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                        <div style={{width:28,height:28,borderRadius:"50%",
                          background:i<=stageIdx?(isDark?col:"#1a2332"):isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.08)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          border:i===stageIdx?`2px solid ${col}`:"none",
                          transition:"all 0.3s"}}>
                          {i<stageIdx
                            ?<Icon name="check" size={12} color="#fff" strokeWidth={2.5}/>
                            :<span style={{fontSize:9,fontWeight:700,color:i<=stageIdx?"#fff":T.t3}}>{i+1}</span>}
                        </div>
                        <span style={{fontSize:9,color:i===stageIdx?col:T.t3,fontWeight:i===stageIdx?700:400,whiteSpace:"nowrap"}}>{stage}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{height:3,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)",borderRadius:2,position:"relative",marginTop:4}}>
                    <div style={{position:"absolute",top:0,left:0,height:"100%",
                      width:`${Math.max((stageIdx/(stages.length-1))*100,0)}%`,
                      background:isDark?col:"#1a2332",borderRadius:2,transition:"width 0.8s ease"}}/>
                  </div>
                </div>
              )}

              {app.status==="Offer"&&(
                <div style={{marginTop:14,padding:"12px 16px",borderRadius:12,background:T.greenBg,border:`1px solid ${T.green}30`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:13,fontWeight:600,color:T.green}}>ðŸŽ‰ You have an offer! Review and respond.</span>
                  <div style={{display:"flex",gap:8}}>
                    <Btn onClick={()=>showToast("Offer accepted! Company will contact you.","success")} isDark={isDark} variant="success" size="sm" icon="check">Accept</Btn>
                    <Btn onClick={()=>showToast("Offer declined.","info")} isDark={isDark} variant="danger" size="sm">Decline</Btn>
                  </div>
                </div>
              )}
              {app.status==="Interview"&&(
                <div style={{marginTop:14,padding:"12px 16px",borderRadius:12,background:T.purpleBg,border:`1px solid ${T.purple}30`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:13,fontWeight:600,color:T.purple}}>ðŸ“… Interview scheduled â€” check your email for details.</span>
                  <Btn onClick={()=>showToast("Opening interview details...","info")} isDark={isDark} variant="ghost" size="sm">View Details</Btn>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ProfilePage({isDark,showToast,userName}){
  const T=useT(isDark);
  const SEAFARER = {name:userName||"User", avatar:(userName||"User")[0], rank:"Seafarer", nationality:"Global", yearsExp:0, verified:false, sub:"Free", availability:"Now", profileStrength:50, homePort:"Unknown"};
  const [form,setForm]=useState({
    name:SEAFARER.name,rank:SEAFARER.rank,nationality:SEAFARER.nationality,
    homePort:SEAFARER.homePort,yearsExp:SEAFARER.yearsExp,
    email:"rajesh.f@gmail.com",phone:"+94 77 123 4567",
    availability:SEAFARER.availability,
    summary:"Highly experienced Master Mariner with 18 years at sea across container vessels and bulk carriers. Strong record of safe navigation and crew management.",
    preferred:"Container Vessel, Bulk Carrier, Oil Tanker",
  });

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>My Profile</h2>
        <p style={{fontSize:14,color:T.t3}}>This is how companies see you. Keep it complete and up to date.</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
        {/* Profile card */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <Card isDark={isDark} style={{textAlign:"center",padding:"28px 20px"}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'Sora',sans-serif",border:isDark?"2px solid rgba(56,189,248,0.3)":"2px solid rgba(26,35,50,0.12)"}}>
              {SEAFARER.avatar}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:4}}>
              <span style={{fontSize:16,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{form.name}</span>
              {SEAFARER.verified&&<span style={{background:"linear-gradient(135deg,#38BDF8,#0EA5E9)",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 7px",borderRadius:999}}>âœ“ VER</span>}
            </div>
            <div style={{fontSize:12,color:T.t3,marginBottom:14}}>{form.rank}</div>
            <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:18,flexWrap:"wrap"}}>
              <Bdg label={SEAFARER.sub==="Pro"?"â­ Pro":"Free"} color={T.yellow} bg={T.yellowBg}/>
              <Bdg label={`Available ${form.availability}`} color={T.green} bg={T.greenBg}/>
            </div>
            {/* Profile strength */}
            <div style={{marginBottom:4}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:11,color:T.t3}}>Profile Strength</span>
                <span style={{fontSize:11,fontWeight:700,color:isDark?"#38BDF8":T.t1}}>{SEAFARER.profileStrength}%</span>
              </div>
              <div style={{height:5,borderRadius:3,background:isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}}>
                <div style={{height:"100%",width:`${SEAFARER.profileStrength}%`,borderRadius:3,background:isDark?"#38BDF8":"#1a2332"}}/>
              </div>
            </div>
          </Card>

          {/* Sea service */}
          <Card isDark={isDark}>
            <h3 style={{fontSize:14,fontWeight:600,color:T.t1,marginBottom:14,fontFamily:"'Sora',sans-serif"}}>Sea Service</h3>
            {SEA_SERVICE.map((s,i)=>(
              <div key={i} style={{padding:"10px 0",borderBottom:i<SEA_SERVICE.length-1?`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}`:0}}>
                <div style={{fontSize:12,fontWeight:600,color:T.t1,marginBottom:2}}>{s.vessel}</div>
                <div style={{fontSize:10,color:T.t3,marginBottom:3}}>{s.type} Â· {s.flag}</div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <Bdg label={s.rank} color={T.t2} bg={isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"}/>
                  <span style={{fontSize:10,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{s.from}â€“{s.to}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Edit form */}
        <Card isDark={isDark}>
          <h3 style={{fontSize:16,fontWeight:600,color:T.t1,marginBottom:20,fontFamily:"'Sora',sans-serif"}}>Edit Profile</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            {[
              {k:"name",l:"Full Name"},{k:"rank",l:"Current Rank"},
              {k:"email",l:"Email"},{k:"phone",l:"Phone / WhatsApp"},
              {k:"nationality",l:"Nationality"},{k:"homePort",l:"Home Port"},
              {k:"yearsExp",l:"Years at Sea"},{k:"availability",l:"Available From"},
              {k:"preferred",l:"Preferred Vessel Types"},
            ].map(f=>(
              <div key={f.k} style={{gridColumn:f.k==="preferred"?"1/-1":"auto"}}>
                <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{f.l}</div>
                <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                  style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Professional Summary</div>
            <textarea value={form.summary} onChange={e=>setForm(p=>({...p,summary:e.target.value}))} rows={3}
              style={{width:"100%",padding:"10px 13px",borderRadius:10,border:isDark?"1px solid rgba(255,255,255,0.08)":"1px solid rgba(100,116,139,0.12)",background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.04)",color:T.t1,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <Btn onClick={()=>showToast("Profile saved successfully","success")} isDark={isDark} variant="primary" icon="check">Save Profile</Btn>
        </Card>
      </div>
    </div>
  );
}
/* â•â• DOCUMENTS â•â• */
function DocumentsPage({isDark,showToast}){
  const T=useT(isDark);
  const [certs,setCerts]=useState(CERTS);
  const refs=useRef({});

  const handleUpload=(id,e)=>{
    const file=e.target.files[0];
    if(!file)return;
    setCerts(p=>p.map(c=>c.id===id?{...c,uploaded:true,fileName:file.name}:c));
    showToast(`${file.name} uploaded successfully`,"success");
  };

  const uploaded=certs.filter(c=>c.uploaded).length;
  const strength=Math.round((uploaded/certs.length)*100);

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>My Documents</h2>
        <p style={{fontSize:14,color:T.t3}}>Securely stored and encrypted. Only shared with companies you apply to.</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
        {[
          {label:"Uploaded",val:uploaded,color:T.green,bg:T.greenBg},
          {label:"Missing",val:certs.length-uploaded,color:T.yellow,bg:T.yellowBg},
          {label:"Vault Strength",val:`${strength}%`,color:isDark?"#38BDF8":T.t1,bg:isDark?"rgba(56,189,248,0.1)":T.sub},
        ].map((s,i)=>(
          <Card key={i} isDark={isDark} style={{padding:"18px 20px"}}>
            <div style={{fontSize:26,fontWeight:700,color:s.color,fontFamily:"'Sora',sans-serif",marginBottom:4}}>{s.val}</div>
            <div style={{fontSize:12,color:T.t2}}>{s.label}</div>
          </Card>
        ))}
      </div>

      <Card isDark={isDark} style={{marginBottom:14,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,background:isDark?"rgba(56,189,248,0.05)":"rgba(26,35,50,0.03)",border:isDark?"1px solid rgba(56,189,248,0.15)":"none"}}>
        <Icon name="shield" size={18} color={isDark?"#38BDF8":T.accent} strokeWidth={2}/>
        <p style={{fontSize:12,color:T.t2}}>All documents are AES-256 encrypted. Only shared with companies after your explicit approval per application.</p>
      </Card>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {certs.map(cert=>(
          <Card key={cert.id} isDark={isDark} style={{padding:"16px 20px",border:cert.uploaded?`1px solid ${T.green}30`:(isDark?"1px solid rgba(255,255,255,0.07)":"none")}}>
            <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
              <div style={{width:42,height:42,borderRadius:12,
                background:cert.uploaded?T.greenBg:(isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"),
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                border:cert.uploaded?`1px solid ${T.green}40`:"none"}}>
                <Icon name="fileText" size={18} color={cert.uploaded?T.green:T.t3} strokeWidth={1.8}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>{cert.label}</span>
                  {cert.required&&<Bdg label="Required" color={T.yellow} bg={T.yellowBg}/>}
                </div>
                {cert.uploaded
                  ?<div style={{fontSize:11,color:T.green}}>âœ“ Uploaded{cert.expiry?` Â· Expires ${cert.expiry}`:""}{cert.fileName?` Â· ${cert.fileName}`:""}</div>
                  :<div style={{fontSize:11,color:T.t3}}>Not uploaded yet</div>}
              </div>
              <input ref={el=>refs.current[cert.id]=el} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>handleUpload(cert.id,e)}/>
              <div style={{display:"flex",gap:7}}>
                {cert.uploaded&&(
                  <Btn onClick={()=>showToast("Downloading...","info")} isDark={isDark} variant="ghost" size="sm" icon="download">Download</Btn>
                )}
                <Btn onClick={()=>refs.current[cert.id].click()} isDark={isDark} variant={cert.uploaded?"ghost":"primary"} size="sm" icon="upload">
                  {cert.uploaded?"Replace":"Upload"}
                </Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* â•â• MY CV â•â• */
function CVPage({isDark,showToast,userName}){
  const T=useT(isDark);
  const SEAFARER = {name:userName||"User", avatar:(userName||"User")[0], rank:"Seafarer", nationality:"Global", yearsExp:0, verified:false, sub:"Free", availability:"Now", profileStrength:50, homePort:"Unknown"};
  const [requested,setRequested]=useState(false);
  const [paid,setPaid]=useState(false);
  const [loading,setLoading]=useState(false);
  const fileInputRef = useRef(null);
  const [file,setFile] = useState(null);

  const handlePay=async ()=>{
    if(!file){showToast("Please select your base CV PDF first","warning");return;}
    setLoading(true);
    try{
      const token = getToken();
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(',')[1];
        const res = await fetch(`${API}/api/cv/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ fileName: file.name, fileData: base64, mimeType: file.type }),
        });
        if(res.ok){
          setPaid(true);
          setRequested(true);
          showToast("Payment successful! CV generation request sent.","success");
        }else{
          showToast("Upload failed","error");
        }
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }catch{
      showToast("Error processing file","error");
      setLoading(false);
    }
  };

  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>My Professional CV</h2>
        <p style={{fontSize:14,color:T.t3}}>OceanCrew generates a premium maritime CV from your profile. Admin reviews and sends it to you.</p>
      </div>

      {!paid?(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Card isDark={isDark}>
            <div style={{marginBottom:20}}>
              <h3 style={{fontSize:18,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:8}}>Professional CV Generation</h3>
              <p style={{fontSize:13,color:T.t2,lineHeight:1.7}}>Our team manually generates a premium maritime CV from your profile â€” formatted exactly to industry standards that shipping companies and manning agencies expect.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
              {["Premium maritime CV layout","All sea service history formatted","Certificates listed professionally","Reviewed by our maritime HR team","Delivered to your email within 24h","PDF format â€” ready to send anywhere"].map((f,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:T.greenBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon name="check" size={11} color={T.green} strokeWidth={2.5}/>
                  </div>
                  <span style={{fontSize:13,color:T.t2}}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{padding:"16px 20px",borderRadius:14,background:isDark?"rgba(56,189,248,0.05)":"rgba(26,35,50,0.03)",border:`1px solid ${isDark?"rgba(56,189,248,0.15)":"rgba(26,35,50,0.08)"}`,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:T.t3,marginBottom:2}}>One-time payment</div>
                <div style={{fontSize:32,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em"}}>$4.99</div>
              </div>
              <Bdg label="One-time only" color={T.green} bg={T.greenBg}/>
            </div>
            <div style={{marginBottom:20}}>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setFile(e.target.files[0])} ref={fileInputRef} style={{display:"none"}}/>
              <Btn onClick={()=>fileInputRef.current.click()} isDark={isDark} variant="ghost" fullWidth icon="upload">
                {file?file.name:"1. Select Current CV (PDF)"}
              </Btn>
            </div>
            <Btn onClick={handlePay} disabled={loading} isDark={isDark} variant="primary" icon="creditCard" fullWidth size="lg">
              {loading ? "Processing..." : "2. Pay $4.99 â€” Generate My CV"}
            </Btn>
          </Card>

          {/* Preview sample */}
          <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(100,116,139,0.1)"}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,fontWeight:600,color:T.t1}}>CV Preview Sample</span>
              <Bdg label="How it will look" color={T.yellow} bg={T.yellowBg}/>
            </div>
            <div style={{padding:20,background:isDark?"rgba(255,255,255,0.01)":"#f8f9fa",overflowY:"auto",maxHeight:500}}>
              <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.1)"}}>
                <div style={{background:"linear-gradient(135deg,#0A1628,#1C2F52)",padding:"22px 26px"}}>
                  <div style={{fontSize:9,color:"#C9A96E",letterSpacing:3,textTransform:"uppercase",fontWeight:600,marginBottom:6,fontFamily:"'Inter',sans-serif"}}>Maritime Professional</div>
                  <div style={{fontSize:20,fontWeight:700,color:"#fff",fontFamily:"Georgia,serif",marginBottom:4}}>{SEAFARER.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",fontFamily:"'Inter',sans-serif",marginBottom:10}}>{SEAFARER.rank}</div>
                  <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                    {["ðŸ“§ rajesh.f@gmail.com","ðŸ“± +94 77 123 4567","ðŸ“ Colombo","ðŸŒ Sri Lankan"].map((i,idx)=>(
                      <span key={idx} style={{fontSize:9,color:"rgba(255,255,255,0.6)",fontFamily:"'Inter',sans-serif"}}>{i}</span>
                    ))}
                  </div>
                </div>
                <div style={{padding:"18px 26px"}}>
                  <div style={{fontSize:8,fontWeight:700,color:"#0A1628",letterSpacing:2,textTransform:"uppercase",borderBottom:"2px solid #C9A96E",paddingBottom:3,marginBottom:10,fontFamily:"'Inter',sans-serif"}}>Sea Service</div>
                  {SEA_SERVICE.map((s,i)=>(
                    <div key={i} style={{padding:"8px 10px",background:"#f8f9fa",borderRadius:6,borderLeft:"3px solid #C9A96E",marginBottom:7}}>
                      <div style={{fontSize:11,fontWeight:600,color:"#1a2332",fontFamily:"'Inter',sans-serif"}}>{s.vessel}</div>
                      <div style={{fontSize:9,color:"#64748b",fontFamily:"'Inter',sans-serif"}}>{s.type} Â· {s.rank} Â· {s.from}â€“{s.to}</div>
                    </div>
                  ))}
                  <div style={{fontSize:8,fontWeight:700,color:"#0A1628",letterSpacing:2,textTransform:"uppercase",borderBottom:"2px solid #C9A96E",paddingBottom:3,margin:"12px 0 8px",fontFamily:"'Inter',sans-serif"}}>Certificates</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {CERTS.filter(c=>c.uploaded).map(c=>(
                      <span key={c.id} style={{padding:"3px 8px",borderRadius:999,background:"rgba(10,22,40,0.07)",color:"#1a2332",fontSize:9,fontFamily:"'Inter',sans-serif"}}>âœ“ {c.label}</span>
                    ))}
                  </div>
                  <div style={{marginTop:12,padding:"8px 12px",background:"rgba(10,22,40,0.04)",borderRadius:6,display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:9,color:"#64748b",fontFamily:"'Inter',sans-serif"}}>Experience: {SEAFARER.yearsExp} years</span>
                    <span style={{fontSize:9,color:"#C9A96E",fontWeight:700,fontFamily:"'Inter',sans-serif"}}>Generated by OceanCrew</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ):(
        <Card isDark={isDark} style={{textAlign:"center",padding:"60px 40px"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:T.greenBg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",border:`2px solid ${T.green}40`}}>
            <Icon name="checkCircle" size={36} color={T.green} strokeWidth={1.5}/>
          </div>
          <h3 style={{fontSize:24,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:10}}>CV Request Received!</h3>
          <p style={{fontSize:14,color:T.t2,lineHeight:1.7,maxWidth:480,margin:"0 auto 28px"}}>Your payment of <strong style={{color:T.green}}>$4.99</strong> was successful. Our team is now generating your professional maritime CV. You'll receive it at <strong style={{color:isDark?"#38BDF8":T.t1}}>rajesh.f@gmail.com</strong> within 24 hours.</p>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:T.yellowBg,borderRadius:999,padding:"8px 18px"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:T.yellow,display:"inline-block",animation:"pulseDot 2s infinite"}}/>
            <span style={{fontSize:12,color:T.yellow,fontWeight:600}}>Admin is preparing your CV â€” estimated 24 hours</span>
          </div>
        </Card>
      )}
    </div>
  );
}

/* â•â• SUBSCRIPTION â•â• */
function SubscriptionPage({isDark,showToast,userName}){
  const T=useT(isDark);
  const SEAFARER = {name:userName||"User", avatar:(userName||"User")[0], rank:"Seafarer", nationality:"Global", yearsExp:0, verified:false, sub:"Free", availability:"Now", profileStrength:50, homePort:"Unknown"};
  const isPro=SEAFARER.sub==="Pro";
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Subscription</h2>
        <p style={{fontSize:14,color:T.t3}}>Manage your OceanCrew membership</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        {/* Free plan */}
        <Card isDark={isDark} style={{padding:"28px",border:!isPro?`2px solid ${isDark?"#38BDF8":"#1a2332"}`:(isDark?"1px solid rgba(255,255,255,0.07)":"none")}}>
          <div style={{fontSize:10,fontWeight:700,color:T.t3,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>Free</div>
          <div style={{fontSize:40,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:8}}>$0<span style={{fontSize:14,color:T.t3,fontWeight:400}}>/mo</span></div>
          <p style={{fontSize:12,color:T.t3,marginBottom:20}}>Browse jobs, build profile, upload documents</p>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
            {["Browse all job postings","Build full maritime profile","Upload documents to vault","Receive job match alerts"].map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                <Icon name="check" size={13} color={T.green} strokeWidth={2.5}/>
                <span style={{fontSize:12,color:T.t2}}>{f}</span>
              </div>
            ))}
            {["Apply to jobs","Priority in search results"].map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                <Icon name="x" size={13} color={T.t3} strokeWidth={2.5}/>
                <span style={{fontSize:12,color:T.t3}}>{f}</span>
              </div>
            ))}
          </div>
          {!isPro&&<Bdg label="Current Plan" color={isDark?"#38BDF8":T.t1} bg={isDark?"rgba(56,189,248,0.1)":T.accentBg}/>}
        </Card>

        {/* Pro plan */}
        <Card isDark={isDark} style={{padding:"28px",background:isDark?"linear-gradient(145deg,rgba(56,189,248,0.08),rgba(56,189,248,0.03))":"linear-gradient(145deg,#EFF6FF,#f8faff)",border:isPro?`2px solid ${isDark?"#38BDF8":"#1a2332"}`:(isDark?"1px solid rgba(56,189,248,0.2)":"1px solid rgba(26,35,50,0.1)")}}>
          {isPro&&<div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(90deg,${isDark?"#38BDF8":"#1a2332"},${isDark?"#0EA5E9":"#475569"})`,color:"#fff",fontSize:9,fontWeight:800,padding:"4px 14px",borderRadius:"0 0 8px 8px",letterSpacing:1.5}}>CURRENT PLAN</div>}
          <div style={{fontSize:10,fontWeight:700,color:isDark?"#38BDF8":T.t1,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>Pro Member</div>
          <div style={{fontSize:40,fontWeight:700,color:isDark?"#38BDF8":T.t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:8}}>$4<span style={{fontSize:14,color:T.t3,fontWeight:400}}>/mo</span></div>
          <p style={{fontSize:12,color:T.t3,marginBottom:20}}>Full access â€” apply to unlimited jobs</p>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
            {["Everything in Free","Apply to unlimited jobs","Priority placement in search","Direct message companies","Early access to urgent jobs","Pro badge on your profile"].map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                <Icon name="check" size={13} color={isDark?"#38BDF8":T.t1} strokeWidth={2.5}/>
                <span style={{fontSize:12,color:T.t2}}>{f}</span>
              </div>
            ))}
          </div>
          {isPro
            ?<Bdg label="âœ“ Active Pro Member" color={isDark?"#38BDF8":T.t1} bg={isDark?"rgba(56,189,248,0.1)":T.accentBg}/>
            :<Btn onClick={()=>showToast("Redirecting to payment...","info")} isDark={isDark} variant="primary" icon="zap" fullWidth>Upgrade to Pro â€” $4/mo</Btn>}
        </Card>
      </div>

      {isPro&&(
        <Card isDark={isDark} style={{padding:"20px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
            <div>
              <h3 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Pro Membership Active</h3>
              <p style={{fontSize:12,color:T.t3}}>Next billing date: June 1, 2025 Â· $4.00</p>
            </div>
            <div style={{display:"flex",gap:10}}>
              <Btn onClick={()=>showToast("Downloading receipt...","info")} isDark={isDark} variant="ghost" size="sm" icon="download">Download Receipt</Btn>
              <Btn onClick={()=>showToast("Subscription cancelled. Access until Jun 1.","warning")} isDark={isDark} variant="danger" size="sm">Cancel</Btn>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

/* â•â• NOTIFICATIONS â•â• */
function NotificationsPage({isDark,showToast,notifications,setNotifications,handleNotifClick}){
  const T=useT(isDark);
  const markRead=async(id)=>{
    setNotifications(p=>p.map(n=>n._id===id?{...n,read:true}:n));
    if(typeof id === "string") {
      try { await fetch(`${API}/api/notifications/${id}/read`, {method:"PUT",headers:{Authorization:`Bearer ${getToken()}`}}); }catch{}
    }
  };
  const markAll=async()=>{
    setNotifications(p=>p.map(n=>({...n,read:true})));
    try { await fetch(`${API}/api/notifications/read-all`, {method:"PUT",headers:{Authorization:`Bearer ${getToken()}`}}); }catch{}
  };
  const unread=notifications.filter(n=>!n.read).length;
  const typeColor={pipeline:"#38BDF8",match:T.green,badge:T.yellow,offer:T.purple};
  const notifs = notifications;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:4}}>Notifications</h2>
          <p style={{fontSize:14,color:T.t3}}>{unread} unread</p>
        </div>
        {unread>0&&<Btn onClick={markAll} isDark={isDark} variant="ghost" size="sm">Mark All Read</Btn>}
      </div>
      <Card isDark={isDark} style={{padding:0,overflow:"hidden"}}>
        {notifs.map((n,i)=>{
          const col=typeColor[n.type]||T.t3;
          const id = n._id || n.id;
          return(
            <div key={id} onClick={()=>markRead(id)} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 22px",borderBottom:i<notifs.length-1?(isDark?"1px solid rgba(255,255,255,0.05)":"1px solid rgba(100,116,139,0.07)"):"none",cursor:"pointer",background:!n.read?(isDark?"rgba(56,189,248,0.03)":"rgba(26,35,50,0.02)"):"transparent",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=isDark?"rgba(255,255,255,0.02)":"rgba(100,116,139,0.03)"}
              onMouseLeave={e=>e.currentTarget.style.background=!n.read?(isDark?"rgba(56,189,248,0.03)":"rgba(26,35,50,0.02)"):"transparent"}>
              <div style={{width:38,height:38,borderRadius:11,background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${col}25`}}>
                <Icon name={n.icon||"bell"} size={16} color={col} strokeWidth={2}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:13,color:n.read?T.t2:T.t1,fontWeight:n.read?400:500,lineHeight:1.5,marginBottom:4}}>{n.msg}</p>
                <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{n.time||new Date(n.createdAt).toLocaleDateString()}</span>
              </div>
              {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:isDark?"#38BDF8":T.accent,flexShrink:0,marginTop:6}}/>}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* â•â• SETTINGS â•â• */
function SettingsPage({isDark,showToast}){
  const T=useT(isDark);
  return(
    <div>
      <h2 style={{fontSize:26,fontWeight:700,color:T.t1,fontFamily:"'Sora',sans-serif",marginBottom:24}}>Settings</h2>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {[
          {title:"Notifications",icon:"bell",items:[
            {l:"New Job Match Alerts",v:true,type:"toggle"},
            {l:"Application Status Updates",v:true,type:"toggle"},
            {l:"Company Messages",v:true,type:"toggle"},
            {l:"Platform Announcements",v:false,type:"toggle"},
          ]},
          {title:"Privacy",icon:"shield",items:[
            {l:"Profile Visible to Companies",v:true,type:"toggle"},
            {l:"Show Availability Status",v:true,type:"toggle"},
            {l:"Allow Direct Contact",v:false,type:"toggle"},
          ]},
          {title:"Account",icon:"settings",items:[
            {l:"Email Address",v:"rajesh.f@gmail.com",type:"text"},
            {l:"Phone / WhatsApp",v:"+94 77 123 4567",type:"text"},
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
/* â•â• ROOT â•â• */
export default function SeafarerDashboard(){
  const [page,setPage]=useState("dashboard");
  const [sidebar,setSidebar]=useState(true);
  const [theme,setTheme]=useState("dark");
  const [toast,setToast]=useState(null);
  const isDark=theme==="dark";
  const T=useT(isDark);
  const showToast=(msg,type="info")=>setToast({msg,type});

  /* â”€â”€ Real user name from localStorage â”€â”€ */
  const userName = localStorage.getItem("userName") || "Seafarer";
  const userAvatar = userName.slice(0,2).toUpperCase();

  /* â”€â”€ Real API state â”€â”€ */
  const [jobs,setJobs]=useState([]);
  const [applications,setApplications]=useState([]);
  const [notifications,setNotifications]=useState([]);
  const [searchQuery,setSearchQuery]=useState("");
  const [loadingJobs,setLoadingJobs]=useState(false);

  /* â”€â”€ Fetch jobs â”€â”€ */
  const fetchJobs = async (q="") => {
    setLoadingJobs(true);
    try {
      const url = q ? `${API}/api/jobs?search=${encodeURIComponent(q)}` : `${API}/api/jobs`;
      const res = await fetch(url);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch { setJobs([]); }
    setLoadingJobs(false);
  };

  /* â”€â”€ Fetch my applications â”€â”€ */
  const fetchApplications = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/applications/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch { setApplications([]); }
  };

  /* â”€â”€ Fetch notifications â”€â”€ */
  const fetchNotifications = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch { setNotifications([]); }
  };

  /* â”€â”€ Mark notification read + navigate â”€â”€ */
  const handleNotifClick = async (notif) => {
    const token = getToken();
    if (token && !notif.read) {
      await fetch(`${API}/api/notifications/${notif._id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(p => p.map(n => n._id===notif._id ? {...n,read:true} : n));
    }
    if (notif.link) setPage(notif.link);
    else setPage("notifications");
  };

  /* â”€â”€ Search bar handler â”€â”€ */
  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length > 1) { fetchJobs(q); setPage("jobs"); }
    else if (q.length === 0) fetchJobs("");
  };

  /* â”€â”€ Initial load + poll notifications every 15s â”€â”€ */
  useEffect(()=>{
    fetchJobs();
    fetchApplications();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  },[]);

  const unreadNotifs = notifications.filter(n=>!n.read).length;

  const renderPage=()=>{
    const p={isDark,showToast,jobs,loadingJobs,fetchJobs,applications,fetchApplications,notifications,setNotifications,handleNotifClick,userName};
    switch(page){
      case "dashboard":    return <DashboardPage setPage={setPage} userName={userName} {...p}/>;
      case "jobs":         return <FindJobsPage {...p} searchQuery={searchQuery}/>;
      case "applications": return <ApplicationsPage {...p}/>;
      case "profile":      return <ProfilePage {...p}/>;
      case "documents":    return <DocumentsPage {...p}/>;
      case "cv":           return <CVPage {...p}/>;
      case "subscription": return <SubscriptionPage {...p}/>;
      case "notifications":return <NotificationsPage {...p}/>;
      case "settings":     return <SettingsPage {...p}/>;
      default:             return <DashboardPage setPage={setPage} userName={userName} {...p}/>;
    }
  };

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
          display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,bottom:0,
          zIndex:1000,transition:"width .28s ease",overflow:"hidden"}}>

          <div style={{padding:sidebar?"20px 18px":"18px 14px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",alignItems:"center",gap:12,whiteSpace:"nowrap"}}>
            <div style={{width:38,height:38,borderRadius:11,background:isDark?"linear-gradient(135deg,#0284C7,#38BDF8)":"#1a2332",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:isDark?"0 4px 16px rgba(2,132,199,0.35)":"0 4px 12px rgba(26,35,50,0.22)"}}>
              <Icon name="anchor" size={18} color="#fff" strokeWidth={2}/>
            </div>
            {sidebar&&(
              <div>
                <div style={{fontWeight:700,fontSize:17,color:T.t1,fontFamily:"'Sora',sans-serif",lineHeight:1.1}}>OceanCrew</div>
                <div style={{fontSize:8,color:isDark?"#38BDF8":"#94A3B8",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginTop:2}}>Seafarer Portal</div>
              </div>
            )}
          </div>

          {sidebar&&(
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:isDark?"#38BDF8":T.t1,fontWeight:700,fontSize:13,fontFamily:"'Sora',sans-serif",flexShrink:0,border:isDark?"1px solid rgba(56,189,248,0.2)":"1px solid rgba(26,35,50,0.1)"}}>{userAvatar}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{userName}</div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginTop:2}}>
                  <span style={{fontSize:9,color:"#38BDF8",fontWeight:700}}>âœ“ VERIFIED</span>
                  <span style={{fontSize:9,color:T.t3}}>Â· Pro Member</span>
                </div>
              </div>
            </div>
          )}

          <nav style={{flex:1,padding:"10px 8px",overflowY:"auto",display:"flex",flexDirection:"column",gap:0}}>
            {NAV.map(section=>(
              <div key={section.section}>
                {sidebar&&<div style={{fontSize:9,fontWeight:700,color:T.t3,textTransform:"uppercase",letterSpacing:"0.12em",padding:"10px 12px 4px",marginTop:6}}>{section.section}</div>}
                {section.items.map(item=>{
                  const active=page===item.id;
                  const ac=isDark?"#38BDF8":"#1a2332";
                  const badge=item.id==="notifications"?unreadNotifs:item.badge;
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
                      {sidebar&&badge>0&&(
                        <span style={{background:"#EF4444",color:"#fff",borderRadius:999,minWidth:17,height:17,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,padding:"0 4px"}}>{badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div style={{padding:"10px 8px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,display:"flex",flexDirection:"column",gap:6}}>
            <button onClick={()=>{localStorage.clear();window.location.reload();}} title={!sidebar?"Log Out":""}
              style={{width:"100%",padding:"8px 12px",borderRadius:9,border:"none",background:isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)",color:"#EF4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:sidebar?"flex-start":"center",gap:8,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.18)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)";}}>
              <Icon name="logOut" size={14} color="#EF4444" strokeWidth={2.2}/>
              {sidebar&&"Log Out"}
            </button>
            <button onClick={()=>setSidebar(s=>!s)} style={{width:"100%",padding:"8px",borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`,background:"transparent",color:T.t3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontSize:11,fontWeight:500,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)";e.currentTarget.style.color=T.t1;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t3;}}>
              <Icon name={sidebar?"chevronLeft":"chevronRight"} size={13} strokeWidth={2.2}/>
              {sidebar&&"Collapse"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{flex:1,marginLeft:sidebar?252:68,transition:"margin-left .28s ease",display:"flex",flexDirection:"column",minWidth:0}}>
          <header style={{background:isDark?D.header:L.header,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(150,170,200,0.15)"}`,padding:"0 28px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <h2 style={{fontSize:15,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>
                {NAV.flatMap(s=>s.items).find(n=>n.id===page)?.label||"Dashboard"}
              </h2>
              <span style={{fontSize:11,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>
                {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
              </span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={13} color={T.t3} strokeWidth={2}/></span>
                <input placeholder="Search jobs..." value={searchQuery} onChange={handleSearch} style={{width:180,padding:"7px 12px 7px 30px",borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",color:T.t1,fontSize:12,outline:"none",fontFamily:"'Inter',sans-serif"}}/>
              </div>
              <Btn onClick={()=>setPage("jobs")} isDark={isDark} variant="primary" size="sm" icon="search">Find Jobs</Btn>
              <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2}}>
                <Icon name={isDark?"sun":"moon"} size={14} strokeWidth={2}/>
              </button>
              <button onClick={()=>setPage("notifications")} style={{width:34,height:34,borderRadius:9,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.9)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.t2,position:"relative"}}>
                <Icon name="bell" size={14} strokeWidth={2}/>
                {unreadNotifs>0&&<div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:"50%",background:"#EF4444",border:`2px solid ${isDark?"#08090C":"#fff"}`}}/>}
              </button>
              <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 12px 5px 6px",background:isDark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.95)",borderRadius:999,border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(150,170,200,0.2)"}`,cursor:"pointer"}}
                onClick={()=>setPage("profile")}>
                <div style={{width:26,height:26,borderRadius:"50%",background:isDark?"rgba(56,189,248,0.15)":"rgba(26,35,50,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:isDark?"#38BDF8":T.t1,flexShrink:0,fontFamily:"'Sora',sans-serif"}}>{userAvatar}</div>
                <span style={{fontSize:12,fontWeight:600,color:T.t1}}>{userName.split(" ")[0]}</span>
              </div>
            </div>
          </header>

          <main style={{flex:1,padding:24,overflowY:"auto"}}>
            <div className="page-anim">{renderPage()}</div>
          </main>

          <footer style={{padding:"11px 28px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(150,170,200,0.1)"}`,background:isDark?D.header:L.header,backdropFilter:"blur(16px)",textAlign:"center"}}>
            <p style={{fontSize:11,color:T.t3}}>
              2025 <strong style={{color:isDark?"#38BDF8":T.t1,fontWeight:600}}>OceanCrew</strong> Seafarer Portal
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
