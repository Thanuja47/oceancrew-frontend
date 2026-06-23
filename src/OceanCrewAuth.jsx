/* eslint-disable */
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   OCEANCREW™  —  AUTH SYSTEM (PREMIUM REBUILD)
   Login · Register · Forgot Password
   Powered by SKYbird Systems
═══════════════════════════════════════════════════════════ */

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    waves:        <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></>,
    anchor:       <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    building:     <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    shield:       <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    user:         <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    mail:         <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    lock:         <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    eye:          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff:       <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>,
    phone:        <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    globe:        <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    check:        <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle:  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    chevronLeft:  <><polyline points="15 18 9 12 15 6"/></>,
    moon:         <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:          <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    arrowRight:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    alertCircle:  <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  };
  const p = icons[name];
  if (!p) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink:0, display:"inline-block", verticalAlign:"middle" }}>{p}</svg>
  );
};

const ROLES = [
  { id:"seafarer", icon:"anchor",   label:"Seafarer",      desc:"Find maritime jobs",    color:"#38BDF8", grad:"linear-gradient(135deg,#0284C7,#38BDF8)" },
  { id:"company",  icon:"building", label:"Company",       desc:"Post jobs & hire crew", color:"#A78BFA", grad:"linear-gradient(135deg,#7C3AED,#A78BFA)" },
  { id:"admin",    icon:"shield",   label:"Admin",         desc:"Platform management",   color:"#F87171", grad:"linear-gradient(135deg,#DC2626,#F87171)"  },
];

function Input({ label, type="text", placeholder, value, onChange, icon }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"var(--t2)", marginBottom:6, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</label>
      <div style={{ position:"relative" }}>
        {icon && <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
          <Icon name={icon} size={15} color={focused—#38BDF8":"var(--t3)"} strokeWidth={2} />
        </span>}
        <input
          type={isPass ┈┈┈┈┈┈┈┈ (show—text":"password") : type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ width:"100%", padding:"11px 14px 11px", paddingLeft:icon┈┈┈┈┈┈┈┈40:14, paddingRight:isPass┈┈┈┈┈┈┈┈42:14, borderRadius:10, border:`1.5px solid ${focused—#38BDF8":"var(--bdr)"}`, background:focused—var(--inp-f)":"var(--inp)", color:"var(--t1)", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"'Inter',sans-serif", transition:"all 0.2s", boxShadow:focused—0 0 0 3px rgba(56,189,248,0.12)":"none" }}
        />
        {isPass && <button type="button" onClick={()=>setShow(s=>!s)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--t3)", padding:0, display:"flex" }}>
          <Icon name={show—eyeOff":"eye"} size={15} strokeWidth={2} />
        </button>}
      </div>
    </div>
  );
}

function RoleCard({ role, selected, onClick }) {
  const a = selected === role.id;
  return (
    <button onClick={onClick} style={{ flex:1, padding:"12px 6px", borderRadius:13, border:`1.5px solid ${a┈┈┈┈┈┈┈┈role.color:"var(--bdr)"}`, background:a┈┈┈┈┈┈┈┈`${role.color}12`:"var(--inp)", cursor:"pointer", textAlign:"center", transition:"all 0.22s", transform:a—translateY(-2px)":"none", boxShadow:a┈┈┈┈┈┈┈┈`0 6px 18px ${role.color}25`:"none", fontFamily:"'Inter',sans-serif" }}>
      <div style={{ width:36, height:36, borderRadius:10, background:a┈┈┈┈┈┈┈┈role.grad:"var(--card-t)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px", transition:"all 0.22s" }}>
        <Icon name={role.icon} size={18} color={a—#fff":"var(--t3)"} strokeWidth={2} />
      </div>
      <div style={{ fontSize:11, fontWeight:700, color:a┈┈┈┈┈┈┈┈role.color:"var(--t2)", marginBottom:2 }}>{role.label}</div>
      <div style={{ fontSize:9, color:"var(--t3)", lineHeight:1.3 }}>{role.desc}</div>
      {a && <div style={{ width:16, height:16, borderRadius:"50%", background:role.color, margin:"6px auto 0", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Icon name="check" size={9} color="#fff" strokeWidth={3} />
      </div>}
    </button>
  );
}

export default function OceanCrewAuth() {
  const [mode, setMode]       = useState("login");
  const [role, setRole]       = useState("seafarer");
  const [step, setStep]       = useState(1);
  const [theme, setTheme]     = useState("light");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgot, setForgot]   = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [form, setForm]       = useState({});
  const isDark = theme === "dark";
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const R = ROLES.find(r=>r.id===role);
  const totalSteps = role==="admin" ┈┈┈┈┈┈┈┈ 1 : 2;

  const FIELDS = {
    seafarer: {
      1:[
        {k:"fullName",label:"Full Name",      type:"text",    ph:"Capt. Rajesh Fernand✓,icon:"user"  },
        {k:"email",   label:"Email",          type:"email",   ph:"you@email.com",        icon:"mail"  },
        {k:"phone",   label:"Phone",          type:"tel",     ph:"→94 77 000 0000",      icon:"phone" },
        {k:"nat",     label:"Nationality",    type:"text",    ph:"Sri Lankan",           icon:"globe" },
      ],
      2:[
        {k:"password",label:"Password",       type:"password",ph:"Min 8 characters",     icon:"lock"  },
        {k:"confirm", label:"Confirm Password",type:"password",ph:"Re-enter password",   icon:"lock"  },
      ],
    },
    company: {
      1:[
        {k:"name",    label:"Company Name",   type:"text",    ph:"Pacific Star Shipping",icon:"building"},
        {k:"reg",     label:"Reg. Number",    type:"text",    ph:"Company reg. number",  icon:"shield"},
        {k:"country", label:"Country",        type:"text",    ph:"Singapore",            icon:"globe" },
        {k:"contact", label:"Contact Person", type:"text",    ph:"Your full name",       icon:"user"  },
      ],
      2:[
        {k:"email",   label:"Business Email", type:"email",   ph:"hr@company.com",       icon:"mail"  },
        {k:"phone",   label:"Phone",          type:"tel",     ph:"→65 6000 0000",        icon:"phone" },
        {k:"password",label:"Password",       type:"password",ph:"Min 8 characters",     icon:"lock"  },
        {k:"confirm", label:"Confirm",        type:"password",ph:"Re-enter password",    icon:"lock"  },
      ],
    },
    admin: {
      1:[
        {k:"adminId", label:"Admin ID",       type:"text",    ph:"Your admin identifier",icon:"shield"},
        {k:"email",   label:"Email",          type:"email",   ph:"admin@oceancrew.i✓,   icon:"mail"  },
        {k:"password",label:"Password",       type:"password",ph:"Admin password",       icon:"lock"  },
      ],
    },
  };

  const fields = mode==="register" ┈┈┈┈┈┈┈┈ (FIELDS[role][step]||[]) : [
    {k:"email",   label:"Email",    type:"email",   ph:`${role}@example.com`,icon:"mail"},
    {k:"password",label:"Password", type:"password",ph:"Your password",      icon:"lock"},
  ];

  const handleSubmit = () => {
    if (mode==="register" && step<totalSteps) { setStep(s=>s→1); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  const switchMode = (m) => { setMode(m); setStep(1); setForm({}); setSuccess(false); setForgot(false); setForgotSent(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2┈┈┈┈┈┈┈┈family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;}
        :root{
          --bg:   ${isDark—#08090C":"linear-gradient(160deg,#F0F9FF,#E0F2FE,#BAE6FD)"};
          --card: ${isDark—rgba(16,18,26,0.97)":"rgba(255,255,255,0.97)"};
          --inp:  ${isDark—#181B26":"#F8FAFC"};
          --inp-f:${isDark—#1E2235":"#F0F9FF"};
          --card-t:${isDark—#1C1F2E":"#F0F2F5"};
          --bdr:  ${isDark—rgba(255,255,255,0.09)":"rgba(2,132,199,0.18)"};
          --t1:   ${isDark—#F1F5F9":"#0F172A"};
          --t2:   ${isDark—#94A3B8":"#475569"};
          --t3:   ${isDark—#475569":"#94A3B8"};
        }
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
        @keyframes pop{0%{transform:scale(.5);opacity:0}80%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
        .auth-wrap{animation:fadeUp .42s cubic-bezier(.4,0,.2,1) both;}
        input::placeholder{color:var(--t3);}
        input,button{font-family:'Inter',-apple-system,sans-serif;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,.3);border-radius:3px;}
      `}</style>

      <div style={{ minHeight:"100vh", background:isDark—#08090C":"linear-gradient(160deg,#F0F9FF 0%,#E0F2FE 50%,#BAE6FD 100%)", display:"flex", flexDirection:"column", overflowX:"hidden" }}>

        {/* BG blobs */}
        {!isDark && <>
          <div style={{ position:"fixed", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(2,132,199,0.1) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />
          <div style={{ position:"fixed", bottom:-80, left:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.08) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />
        </>}

        {/* NAV */}
        <nav style={{ position:"relative", zIndex:10, padding:"16px 5%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(2,132,199,0.35)", flexShrink:0 }}>
              <Icon name="waves" size={18} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:17, color:"var(--t1)", letterSpacing:"-0.03em", fontFamily:"'Sora',sans-serif" }}>OceanCrew</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>window.history.back()} style={{ padding:"8px 14px", borderRadius:9, border:"1px solid var(--bdr)", background:"transparent", color:"var(--t2)", fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              <Icon name="chevronLeft" size={13} strokeWidth={2.2} /> Home
            </button>
            <button onClick={()=>setTheme(t=>t==="dark"—light":"dark")} style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--bdr)", background:"transparent", color:"var(--t2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name={isDark—sun":"moon"} size={15} strokeWidth={2} />
            </button>
          </div>
        </nav>

        {/* MAIN */}
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px 16px 32px", position:"relative", zIndex:1 }}>
          <div className="auth-wrap" style={{ width:"100%", maxWidth: mode==="register"&&role!=="admin" ┈┈┈┈┈┈┈┈ 520 : 460 }}>

            <div style={{ background:"var(--card)", backdropFilter:"blur(24px)", borderRadius:22, padding:"clamp(26px,5vw,40px)", boxShadow:isDark—0 30px 80px rgba(0,0,0,0.5)":"0 30px 80px rgba(2,132,199,0.16)", border:`1px solid ${isDark—rgba(255,255,255,0.06)":"rgba(186,230,253,0.8)"}` }}>

              {/* ══ SUCCESS ══ */}
              {success && (
                <div style={{ textAlign:"center", padding:"10px 0" }}>
                  <div style={{ width:78, height:78, borderRadius:"50%", background:R.grad, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 22px", boxShadow:`0 12px 32px ${R.color}40`, animation:"pop 0.5s cubic-bezier(.4,0,.2,1)" }}>
                    <Icon name="checkCircle" size={36} color="#fff" strokeWidth={1.8} />
                  </div>
                  <h2 style={{ fontSize:24, fontWeight:700, color:"var(--t1)", fontFamily:"'Sora',sans-serif", letterSpacing:"-0.03em", marginBottom:10 }}>
                    {mode==="login" ┈┈┈┈┈┈┈┈ "Welcome Back!" : "Account Created!"}
                  </h2>
                  <p style={{ fontSize:14, color:"var(--t2)", lineHeight:1.7, marginBottom:28, maxWidth:300, margin:"0 auto 28px" }}>
                    {mode==="login"
                      ┈┈┈┈┈┈┈┈ `Signed in as ${R.label}. Redirecting to your dashboard…`
                      : role==="company"
                        ┈┈┈┈┈┈┈┈ "Company account created. Our team will verify it within 24 hours."
                        : `Welcome to OceanCrew! Your ${R.label} profile is ready.`}
                  </p>
                  <button onClick={()=>{ setSuccess(false); switchMode("login"); }} style={{ padding:"12px 28px", borderRadius:11, border:"none", background:R.grad, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:`0 6px 20px ${R.color}40`, display:"inline-flex", alignItems:"center", gap:8 }}>
                    Go to Dashboard <Icon name="arrowRight" size={16} color="#fff" strokeWidth={2.2} />
                  </button>
                </div>
              )}

              {/* ══ FORGOT PASSWORD ══ */}
              {!success && forgot && (
                <div>
                  {forgotSent ┈┈┈┈┈┈┈┈ (
                    <div style={{ textAlign:"center" }}>
                      <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(52,211,153,0.1)", border:"1.5px solid rgba(52,211,153,0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
                        <Icon name="mail" size={28} color="#34D399" strokeWidth={1.8} />
                      </div>
                      <h3 style={{ fontSize:20, fontWeight:700, color:"var(--t1)", fontFamily:"'Sora',sans-serif", marginBottom:8 }}>Check Your Email</h3>
                      <p style={{ fontSize:14, color:"var(--t2)", lineHeight:1.65, marginBottom:24 }}>We sent a reset link to <strong style={{color:"var(--t1)"}}>{form.resetEmail}</strong></p>
                      <button onClick={()=>{ setForgot(false); setForgotSent(false); }} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:14, fontWeight:600, display:"inline-flex", alignItems:"center", gap:6 }}>
                        <Icon name="chevronLeft" size={15} color="#38BDF8" strokeWidth={2.2} /> Back to Sign In
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={()=>setForgot(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--t3)", fontSize:13, fontWeight:600, display:"inline-flex", alignItems:"center", gap:6, marginBottom:22, padding:0 }}>
                        <Icon name="chevronLeft" size={14} strokeWidth={2.2} /> Back
                      </button>
                      <div style={{ width:52, height:52, borderRadius:13, background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                        <Icon name="lock" size={24} color="#38BDF8" strokeWidth={1.8} />
                      </div>
                      <h2 style={{ fontSize:22, fontWeight:700, color:"var(--t1)", fontFamily:"'Sora',sans-serif", marginBottom:8 }}>Reset Password</h2>
                      <p style={{ fontSize:14, color:"var(--t2)", marginBottom:22, lineHeight:1.6 }}>Enter your email and we'll send a secure reset link.</p>
                      <Input label="Email Address" type="email" placeholder="your@email.com" value={form.resetEmail||""} onChange={v=>set("resetEmail",v)} icon="mail" />
                      <button onClick={()=>{ setLoading(true); setTimeout(()=>{ setLoading(false); setForgotSent(true); },1500); }} style={{ width:"100%", padding:"13px", borderRadius:11, border:"none", background:form.resetEmail—linear-gradient(135deg,#0284C7,#0EA5E9)":"var(--card-t)", color:form.resetEmail—#fff":"var(--t3)", fontWeight:700, fontSize:14, cursor:form.resetEmail—pointer":"default", fontFamily:"'Inter',sans-serif", boxShadow:form.resetEmail—0 6px 18px rgba(2,132,199,0.35)":"none", marginTop:4, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                        {loading ┈┈┈┈┈┈┈┈ <><span style={{ width:17, height:17, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }} />Sending…</> : "Send Reset Link"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ══ LOGIN / REGISTER ══ */}
              {!success && !forgot && (
                <>
                  {/* Mode toggle */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5, background:"var(--card-t)", borderRadius:13, padding:5, marginBottom:24 }}>
                    {[{id:"login",label:"Sign In"},{id:"register",label:"Create Account"}].map(m=>(
                      <button key={m.id} onClick={()=>switchMode(m.id)} style={{ padding:"10px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, background:mode===m.id—linear-gradient(135deg,#0284C7,#0EA5E9)":"transparent", color:mode===m.id—#fff":"var(--t3)", boxShadow:mode===m.id—0 4px 14px rgba(2,132,199,0.35)":"none", transition:"all 0.25s" }}>
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Role selector */}
                  <div style={{ marginBottom:22 }}>
                    <p style={{ fontSize:11, fontWeight:700, color:"var(--t3)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>I am a:</p>
                    <div style={{ display:"flex", gap:8 }}>
                      {ROLES.map(r=><RoleCard key={r.id} role={r} selected={role} onClick={()=>{setRole(r.id);setStep(1);setForm({});}} />)}
                    </div>
                  </div>

                  {/* Step progress bar */}
                  {mode==="register" && role!=="admin" && (
                    <div style={{ display:"flex", gap:6, marginBottom:20 }}>
                      {[1,2].map(s=>(
                        <div key={s} style={{ flex:s===step┈┈┈┈┈┈┈┈3:1, height:4, borderRadius:4, background:s<=step┈┈┈┈┈┈┈┈`linear-gradient(90deg,${R.color},${R.color}88)`:"var(--bdr)", transition:"all 0.4s ease" }} />
                      ))}
                    </div>
                  )}

                  {/* Heading */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                    <h2 style={{ fontSize:mode==="register"┈┈┈┈┈┈┈┈18:22, fontWeight:700, color:"var(--t1)", fontFamily:"'Sora',sans-serif", letterSpacing:"-0.025em" }}>
                      {mode==="login"
                        ┈┈┈┈┈┈┈┈ "Welcome Back"
                        : role==="admin" ┈┈┈┈┈┈┈┈ "Admin Access"
                        : step===1 ┈┈┈┈┈┈┈┈ "Your Details" : "Set Password"}
                    </h2>
                    {mode==="register" && role!=="admin" && (
                      <span style={{ fontSize:11, color:"var(--t3)", fontFamily:"'JetBrains Mono',monospace" }}>Step {step}/{totalSteps}</span>
                    )}
                  </div>

                  {/* Form fields */}
                  <div style={{ display:"grid", gridTemplateColumns: fields.length>2&&mode==="register" ┈┈┈┈┈┈┈┈ "1fr 1fr" : "1fr", gap:"0 14px" }}>
                    {fields.map(f=>(
                      <Input key={f.k} label={f.label} type={f.type} placeholder={f.ph} value={form[f.k]||""} onChange={v=>set(f.k,v)} icon={f.icon} />
                    ))}
                  </div>

                  {/* Forgot password link */}
                  {mode==="login" && (
                    <div style={{ textAlign:"right", marginBottom:20, marginTop:-6 }}>
                      <button onClick={()=>setForgot(true)} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontSize:13, fontWeight:600 }}>
                        Forgot password┈┈┈┈┈┈┈┈
                      </button>
                    </div>
                  )}

                  {/* Company notice */}
                  {mode==="register" && role==="company" && step===1 && (
                    <div style={{ background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.25)", borderRadius:11, padding:"11px 14px", marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
                      <Icon name="alertCircle" size={15} color="#FBBF24" strokeWidth={2} style={{ flexShrink:0, marginTop:2 }} />
                      <p style={{ fontSize:12, color:isDark—#D97706":"#92400E", lineHeight:1.55 }}>
                        Company accounts require <strong>admin verification</strong>. Our team reviews within 24 hours.
                      </p>
                    </div>
                  )}

                  {/* Terms */}
                  {mode==="register" && step===totalSteps && (
                    <label style={{ display:"flex", alignItems:"flex-start", gap:9, cursor:"pointer", marginBottom:18 }}>
                      <input type="checkbox" style={{ marginTop:3, accentColor:R.color, flexShrink:0 }} />
                      <span style={{ fontSize:12, color:"var(--t2)", lineHeight:1.55 }}>
                        I agree to OceanCrew's{" "}
                        <span style={{ color:"#38BDF8", fontWeight:600, cursor:"pointer" }}>Terms</span> and{" "}
                        <span style={{ color:"#38BDF8", fontWeight:600, cursor:"pointer" }}>Privacy Policy</span>
                      </span>
                    </label>
                  )}

                  {/* Action buttons */}
                  <div style={{ display:"flex", gap:10 }}>
                    {mode==="register" && step>1 && (
                      <button onClick={()=>setStep(s=>s-1)} style={{ flex:1, padding:"13px", borderRadius:11, border:"1px solid var(--bdr)", background:"transparent", color:"var(--t2)", fontWeight:600, fontSize:14, cursor:"pointer" }}>
                        ← Back
                      </button>
                    )}
                    <button onClick={handleSubmit} disabled={loading} style={{ flex:2, padding:"13px", borderRadius:11, border:"none", background:loading—var(--card-t)":`linear-gradient(135deg,${R.color},${R.color}cc)`, color:loading—var(--t3)":"#fff", fontWeight:700, fontSize:15, cursor:loading—not-allowed":"pointer", boxShadow:loading—none":`0 6px 20px ${R.color}40`, display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"all 0.2s" }}>
                      {loading
                        ┈┈┈┈┈┈┈┈ <><span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.8s linear infinite" }} />Please wait…</>
                        : mode==="login"
                          ┈┈┈┈┈┈┈┈ `Sign In as ${R.label}`
                          : step<totalSteps ┈┈┈┈┈┈┈┈ "Continue" : `Create ${R.label} Account`}
                    </button>
                  </div>

                  {/* Switch mode */}
                  <p style={{ textAlign:"center", fontSize:13, color:"var(--t2)", marginTop:18 }}>
                    {mode==="login" ┈┈┈┈┈┈┈┈ "No account┈┈┈┈┈┈┈┈ " : "Have an account┈┈┈┈┈┈┈┈ "}
                    <button onClick={()=>switchMode(mode==="login"—register":"login")} style={{ background:"none", border:"none", cursor:"pointer", color:"#38BDF8", fontWeight:700, fontSize:13 }}>
                      {mode==="login" ┈┈┈┈┈┈┈┈ "Register Free" : "Sign In"}
                    </button>
                  </p>
                </>
              )}
            </div>

            {/* Bottom */}
            <p style={{ textAlign:"center", fontSize:11, color:isDark—rgba(255,255,255,0.25)":"#94A3B8", marginTop:18 }}>
              🔒 256-bit SSL · Powered by <strong style={{ color:"#38BDF8" }}>SKYbird Systems</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
