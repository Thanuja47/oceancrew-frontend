/* eslint-disable */
import { useState, useEffect, useRef } from "react";

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    waves:       <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></>,
    anchor:      <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    briefcase:   <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    search:      <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    check:       <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    shield:      <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    star:        <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    zap:         <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    globe:       <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    users:       <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    fileText:    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    arrowRight:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    chevronDown: <><polyline points="6 9 12 15 18 9"/></>,
    sparkles:    <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>,
    award:       <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    trendUp:     <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    lock:        <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    menu:        <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x:           <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    send:        <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    mic:         <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    phone:       <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
  };
  const p = icons[name];
  if (!p) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink:0, display:"inline-block", verticalAlign:"middle" }}>{p}</svg>
  );
};

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now()-start)/duration, 1);
          const eased = 1 - Math.pow(1-p, 3);
          setCount(Math.floor(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold:0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function Counter({ target, suffix="" }) {
  const [count, ref] = useCounter(target);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
  { icon:"anchor",    color:"#0284C7", title:"Verified Profiles",       desc:"Complete digital profiles with CDC, STCW, sea service records — all verified by our team." },
  { icon:"briefcase", color:"#0EA5E9", title:"Global Job Marketplace",  desc:"Thousands of verified vacancies from top shipping companies across 40+ countries." },
  { icon:"sparkles",  color:"#7C3AED", title:"AI Job Matching",         desc:"Intelligent engine matches seafarers to roles based on rank, vessel type and certificates." },
  { icon:"shield",    color:"#0284C7", title:"Verified Companies",      desc:"Every company manually verified by our admin team. Zero fraud, zero fake listings." },
  { icon:"zap",       color:"#0EA5E9", title:"Instant Applications",    desc:"Apply to multiple positions in seconds with your digital profile." },
  { icon:"trendUp",   color:"#0284C7", title:"Live Status Tracking",    desc:"Follow your application from submitted to selected — real time." },
];

const STEPS = {
  seafarer:[
    { step:"01", icon:"users",      title:"Create Profile",   desc:"Register free and build your maritime profile." },
    { step:"02", icon:"fileText",   title:"Upload Documents", desc:"Securely upload CDC, STCW and all certificates." },
    { step:"03", icon:"search",     title:"Browse & Apply",   desc:"Search global jobs and apply with one click." },
    { step:"04", icon:"award",      title:"Get Hired",        desc:"Track applications live and receive job offers." },
  ],
  company:[
    { step:"01", icon:"shield",       title:"Register & Verify",  desc:"Submit company details for admin approval." },
    { step:"02", icon:"briefcase",    title:"Post Vacancies",     desc:"Create detailed job postings instantly." },
    { step:"03", icon:"sparkles",     title:"Find Candidates",    desc:"AI surfaces verified seafarers instantly." },
    { step:"04", icon:"checkCircle",  title:"Hire Confidently",   desc:"Manage recruitment from shortlist to contract." },
  ],
};

const TESTIMONIALS = [
  { name:"Capt. Rajesh Fernando",  role:"Master Mariner · 18 Years",    avatar:"RF", color:"#0284C7", text:"OceanCrew changed how I find contracts. Within two weeks I had three verified offers. The document vault alone saves hours of paperwork." },
  { name:"Shanaka Perera",          role:"Chief Engineer · Sri Lanka",   avatar:"SP", color:"#0EA5E9", text:"Finally a platform built for seafarers. The AI job matching found me roles I never would have discovered on my own." },
  { name:"David Chen",              role:"HR Director · Pacific Star",   avatar:"DC", color:"#7C3AED", text:"We reduced hiring time by 60%. The candidate filters are incredible — right seafarers for each vessel in minutes." },
];

const PRICING = [
  { name:"Starter",      price:"$49",  period:"/mo", popular:false, color:"#0EA5E9", features:["5 Job Posts","100 Candidate Views","Basic Filters","Email Support","Company Profile"] },
  { name:"Professional", price:"$149", period:"/mo", popular:true,  color:"#0284C7", features:["25 Job Posts","Unlimited Views","AI Filters","Priority Support","Analytics","Featured Badges","Messaging"] },
  { name:"Enterprise",   price:"$399", period:"/mo", popular:false, color:"#1E3A5F", features:["Unlimited Posts","Unlimited Everything","Account Manager","API Access","Custom Integrations","Analytics"] },
];

const FLOW = [
  { label:"Applied",      color:"#0284C7", icon:"send"        },
  { label:"Under Review", color:"#FBBF24", icon:"eye"         },
  { label:"Shortlisted",  color:"#7C3AED", icon:"star"        },
  { label:"Interview",    color:"#0EA5E9", icon:"mic"         },
  { label:"Selected",     color:"#10B981", icon:"checkCircle" },
];

const FAQS = [
  { q:"Is OceanCrew free for seafarers?",      a:"Yes — 100% free for seafarers. Browse jobs, create profile, upload documents and apply to unlimited positions at no cost, forever." },
  { q:"How are companies verified?",           a:"Every company submits registration documents and business licenses. Our admin team manually reviews and approves each one before they can post jobs." },
  { q:"What documents can I upload?",          a:"CDC, STCW certificates, passport, medical certificates, CV and any maritime documents. We support PDF, JPG and PNG up to 10MB." },
  { q:"How does AI job matching work?",        a:"Our engine analyzes your rank, vessel experience, certificates and salary expectations to surface the most relevant jobs automatically." },
  { q:"How long does company verification take?", a:"Typically 24 hours on business days. You'll receive an email notification once approved and ready to post jobs." },
];

export default function LandingPage() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("seafarer");
  const [activeFaq, setActiveFaq] = useState(null);
  const [appliedDemo, setAppliedDemo] = useState(false);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 40); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [scrolled]);

  const NAV_LINKS = ["Features","How It Works","Pricing","About"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; -webkit-font-smoothing: antialiased; background: #fff; color: #0F172A; overflow-x: hidden; }
        a { text-decoration: none; }
        img { max-width: 100%; }
        button, input { font-family: inherit; }

        /* ── TYPOGRAPHY SCALE ── */
        .h1 { font-size: clamp(32px, 6vw, 60px); font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; font-family: 'Sora', sans-serif; }
        .h2 { font-size: clamp(24px, 4vw, 44px); font-weight: 700; letter-spacing: -0.035em; font-family: 'Sora', sans-serif; }
        .h3 { font-size: clamp(18px, 2.5vw, 24px); font-weight: 600; letter-spacing: -0.025em; font-family: 'Sora', sans-serif; }
        .body { font-size: clamp(14px, 1.6vw, 16px); line-height: 1.7; color: #475569; }

        /* ── SPACING ── */
        .section { padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px); }
        .container { max-width: 1200px; margin: 0 auto; }

        /* ── GRID SYSTEM ── */
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(20px, 3vw, 40px); }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 2.5vw, 28px); }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(14px, 2vw, 24px); }

        /* ── MOBILE: Stack everything ── */
        @media (max-width: 768px) {
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-card { display: none !important; }
          .pricing-popular { transform: none !important; }
          .flow-wrap { flex-wrap: wrap; gap: 12px !important; justify-content: center; }
          .flow-arrow { display: none !important; }
        }

        /* ── TABLET: 2 columns ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .show-mobile { display: none !important; }
        }

        /* ── DESKTOP: full layout ── */
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
          .hero-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.5); } }
        @keyframes float    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes shimmer  { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        .fade-up { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) both; }
        .fade-up-2 { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) 0.15s both; }
        .fade-up-3 { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) 0.3s both; }

        /* ── CARD HOVER ── */
        .card-hover { transition: all 0.25s cubic-bezier(.4,0,.2,1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(2,132,199,0.14) !important; border-color: rgba(2,132,199,0.3) !important; }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #BAE6FD; border-radius: 3px; }
      `}</style>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background: scrolled || mobileOpen ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled || mobileOpen ? "1px solid rgba(2,132,199,0.1)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(2,132,199,0.08)" : "none",
        transition: "all 0.3s ease",
      }}>
        {/* Top bar */}
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,5vw,40px)", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(2,132,199,0.35)", flexShrink:0 }}>
              <Icon name="waves" size={20} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:18, color:"#0F172A", letterSpacing:"-0.03em", lineHeight:1.1, fontFamily:"'Sora',sans-serif" }}>OceanCrew</div>
              <div style={{ fontSize:8, color:"#0284C7", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600 }}>by SKYbird Systems</div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:28 }}>
            {NAV_LINKS.map(l=>(
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{ color:"#475569", fontSize:14, fontWeight:500, letterSpacing:"-0.01em", transition:"color 0.15s" }}
                onMouseEnter={e=>e.target.style.color="#0284C7"}
                onMouseLeave={e=>e.target.style.color="#475569"}
              >{l}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hide-mobile" style={{ display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
            <button style={{ padding:"9px 18px", borderRadius:9, border:"1.5px solid #0284C7", background:"transparent", color:"#0284C7", fontWeight:600, fontSize:13, cursor:"pointer", transition:"all 0.18s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#0284C7";e.currentTarget.style.color="#fff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#0284C7";}}
            >Sign In</button>
            <button style={{ padding:"9px 20px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:13, cursor:"pointer", boxShadow:"0 4px 14px rgba(2,132,199,0.35)", whiteSpace:"nowrap" }}>
              Get Started Free
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="show-mobile" onClick={()=>setMobileOpen(o=>!o)}
            style={{ width:42, height:42, borderRadius:10, border:"1.5px solid rgba(2,132,199,0.25)", background:"rgba(2,132,199,0.06)", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#0284C7", flexShrink:0 }}>
            <Icon name={mobileOpen?"x":"menu"} size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{ background:"#fff", borderTop:"1px solid rgba(2,132,199,0.1)", padding:"8px 24px 24px" }}>
            {NAV_LINKS.map((l,i)=>(
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
                onClick={()=>setMobileOpen(false)}
                style={{ display:"block", padding:"14px 0", color:"#0F172A", fontSize:16, fontWeight:500, borderBottom: i<NAV_LINKS.length-1?"1px solid rgba(2,132,199,0.08)":"none", transition:"color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#0284C7"}
                onMouseLeave={e=>e.currentTarget.style.color="#0F172A"}
              >{l}</a>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18 }}>
              <button style={{ padding:"13px", borderRadius:10, border:"1.5px solid #0284C7", background:"transparent", color:"#0284C7", fontWeight:700, fontSize:14, cursor:"pointer" }}>Sign In</button>
              <button style={{ padding:"13px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 4px 14px rgba(2,132,199,0.35)" }}>Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{ minHeight:"100vh", background:"linear-gradient(160deg,#F0F9FF 0%,#E0F2FE 45%,#BAE6FD 100%)", display:"flex", alignItems:"center", paddingTop:68, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(2,132,199,0.12) 1.5px,transparent 1.5px)", backgroundSize:"44px 44px", pointerEvents:"none", opacity:0.7 }} />
        <div style={{ position:"absolute", top:-120, right:-120, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(2,132,199,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />

        <div className="container" style={{ padding:"clamp(40px,8vw,80px) clamp(20px,5vw,40px)", width:"100%" }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:"clamp(32px,5vw,60px)", alignItems:"center" }}>
            {/* Left content */}
            <div className="fade-up">
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(2,132,199,0.1)", border:"1px solid rgba(2,132,199,0.22)", borderRadius:999, padding:"6px 16px", marginBottom:"clamp(18px,3vw,26px)" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", display:"inline-block", animation:"pulseDot 2s infinite" }} />
                <span style={{ fontSize:"clamp(11px,1.5vw,13px)", color:"#0284C7", fontWeight:600 }}>Global Maritime Recruitment Platform</span>
              </div>

              <h1 className="h1" style={{ color:"#0F172A", marginBottom:"clamp(14px,2.5vw,22px)" }}>
                Connecting<br />
                <span style={{ background:"linear-gradient(135deg,#0284C7,#38BDF8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Seafarers</span>
                {" "}with<br />Global Opportunities
              </h1>

              <p className="body fade-up-2" style={{ marginBottom:"clamp(24px,4vw,36px)", maxWidth:480 }}>
                The world's most trusted maritime recruitment platform. Verified seafarers, verified companies — powered by SKYbird Systems.
              </p>

              <div className="fade-up-3" style={{ display:"flex", gap:"clamp(10px,2vw,14px)", flexWrap:"wrap", marginBottom:"clamp(24px,3vw,36px)" }}>
                <button style={{ padding:"clamp(12px,2vw,15px) clamp(20px,3vw,30px)", borderRadius:12, border:"none", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:700, fontSize:"clamp(13px,1.5vw,15px)", cursor:"pointer", boxShadow:"0 6px 24px rgba(2,132,199,0.4)", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", whiteSpace:"nowrap" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="none"}
                >
                  <Icon name="search" size={17} color="#fff" strokeWidth={2.2} /> Find Jobs — It's Free
                </button>
                <button style={{ padding:"clamp(12px,2vw,15px) clamp(20px,3vw,30px)", borderRadius:12, border:"1.5px solid #0284C7", background:"rgba(255,255,255,0.8)", color:"#0284C7", fontWeight:700, fontSize:"clamp(13px,1.5vw,15px)", cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", whiteSpace:"nowrap" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#0284C7";e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.8)";e.currentTarget.style.color="#0284C7";}}
                >
                  <Icon name="briefcase" size={17} strokeWidth={2} /> Hire Seafarers
                </button>
              </div>

              <div style={{ display:"flex", gap:"clamp(14px,3vw,22px)", flexWrap:"wrap" }}>
                {[{icon:"shield",text:"Admin Verified"},{icon:"lock",text:"256-bit SSL"},{icon:"globe",text:"Global Network"}].map(b=>(
                  <div key={b.text} style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <Icon name={b.icon} size={14} color="#0284C7" strokeWidth={2.2} />
                    <span style={{ fontSize:"clamp(11px,1.4vw,13px)", color:"#475569", fontWeight:500 }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — job card (hidden on mobile) */}
            <div className="hero-card fade-up-2" style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:"rgba(255,255,255,0.92)", backdropFilter:"blur(20px)", borderRadius:20, padding:24, boxShadow:"0 20px 60px rgba(2,132,199,0.15)", border:"1px solid rgba(2,132,199,0.12)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                  <div>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:999, padding:"3px 10px", marginBottom:8 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", display:"inline-block", animation:"pulseDot 2s infinite" }} />
                      <span style={{ fontSize:10, color:"#10B981", fontWeight:600 }}>HIRING NOW</span>
                    </div>
                    <div style={{ fontSize:20, fontWeight:700, color:"#0F172A", fontFamily:"'Sora',sans-serif" }}>Chief Officer</div>
                    <div style={{ fontSize:13, color:"#475569", marginTop:3 }}>Pacific Star Shipping · Singapore</div>
                  </div>
                  <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:13, fontFamily:"'Sora',sans-serif" }}>PS</div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                  {["Container","12 Months","$4,200/mo","STCW"].map(t=>(
                    <span key={t} style={{ padding:"4px 10px", borderRadius:999, background:"rgba(2,132,199,0.1)", border:"1px solid rgba(2,132,199,0.2)", color:"#0284C7", fontSize:11, fontWeight:500 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:"rgba(124,58,237,0.06)", borderRadius:10, marginBottom:14, border:"1px solid rgba(124,58,237,0.15)" }}>
                  <Icon name="sparkles" size={15} color="#7C3AED" strokeWidth={2} />
                  <span style={{ fontSize:12, color:"#7C3AED", fontWeight:600 }}>94% AI Match Score — Strong fit</span>
                </div>
                <button onClick={()=>setAppliedDemo(a=>!a)} style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:appliedDemo?"linear-gradient(135deg,#10B981,#34D399)":"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:600, fontSize:14, cursor:"pointer", boxShadow:"0 4px 14px rgba(2,132,199,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all 0.25s" }}>
                  {appliedDemo ? <><Icon name="checkCircle" size={16} color="#fff" strokeWidth={2.2} />Applied!</> : <><Icon name="arrowRight" size={16} color="#fff" strokeWidth={2.2} />Apply Now — Free</>}
                </button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[{val:"12,000+",label:"Verified Seafarers",color:"#0284C7"},{val:"850+",label:"Shipping Companies",color:"#0EA5E9"}].map(s=>(
                  <div key={s.label} style={{ background:"rgba(255,255,255,0.88)", backdropFilter:"blur(20px)", borderRadius:14, padding:"18px 20px", boxShadow:"0 6px 24px rgba(2,132,199,0.1)", border:"1px solid rgba(2,132,199,0.1)" }}>
                    <div style={{ fontSize:24, fontWeight:700, color:s.color, fontFamily:"'Sora',sans-serif", letterSpacing:"-0.04em" }}>{s.val}</div>
                    <div style={{ fontSize:12, color:"#64748B", marginTop:4, fontWeight:500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="section" style={{ background:"#fff" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,52px)" }}>
            <h2 className="h2" style={{ color:"#0F172A", marginBottom:14 }}>Trusted by Maritime Professionals</h2>
            <p className="body">The fastest growing maritime recruitment platform in the region.</p>
          </div>
          <div className="grid-4">
            {[
              {value:12000,suffix:"+",label:"Verified Seafarers",   icon:"anchor",    color:"#0284C7"},
              {value:850,  suffix:"+",label:"Shipping Companies",   icon:"briefcase", color:"#0EA5E9"},
              {value:3400, suffix:"+",label:"Jobs Posted",          icon:"briefcase", color:"#0284C7"},
              {value:98,   suffix:"%",label:"Placement Success",    icon:"award",     color:"#0EA5E9"},
            ].map((s,i)=>(
              <div key={i} className="card-hover" style={{ textAlign:"center", padding:"clamp(24px,3vw,36px) clamp(16px,2vw,24px)", background:"linear-gradient(145deg,#F0F9FF,#E0F2FE)", borderRadius:18, border:"1px solid #BAE6FD" }}>
                <div style={{ width:48, height:48, borderRadius:13, background:"rgba(2,132,199,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <Icon name={s.icon} size={24} color={s.color} strokeWidth={1.8} />
                </div>
                <div style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:s.color, letterSpacing:"-0.04em", lineHeight:1, fontFamily:"'Sora',sans-serif" }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#475569", marginTop:10, fontWeight:500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section id="features" className="section" style={{ background:"linear-gradient(180deg,#F8FAFC,#F0F9FF)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,56px)" }}>
            <h2 className="h2" style={{ color:"#0F172A", marginBottom:14 }}>Built for the Maritime Industry</h2>
            <p className="body" style={{ maxWidth:520, margin:"0 auto" }}>Every feature designed for how seafarers and shipping companies actually work.</p>
          </div>
          <div className="grid-3">
            {FEATURES.map((f,i)=>(
              <div key={i} className="card-hover" style={{ background:"#fff", borderRadius:18, padding:"clamp(22px,3vw,30px)", border:"1px solid #E0F2FE", boxShadow:"0 2px 14px rgba(2,132,199,0.06)" }}>
                <div style={{ width:50, height:50, borderRadius:13, background:`${f.color}12`, border:`1px solid ${f.color}25`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
                  <Icon name={f.icon} size={24} color={f.color} strokeWidth={1.8} />
                </div>
                <h3 className="h3" style={{ color:"#0F172A", marginBottom:10 }}>{f.title}</h3>
                <p className="body" style={{ fontSize:"clamp(13px,1.5vw,14px)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="section" style={{ background:"#fff" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(30px,4vw,48px)" }}>
            <h2 className="h2" style={{ color:"#0F172A" }}>How OceanCrew Works</h2>
          </div>

          {/* Toggle tabs */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"clamp(28px,4vw,44px)" }}>
            <div style={{ background:"#F0F9FF", borderRadius:12, padding:5, display:"flex", gap:4 }}>
              {[{id:"seafarer",label:"⚓ For Seafarers"},{id:"company",label:"🏢 For Companies"}].map(t=>(
                <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ padding:"clamp(8px,1.5vw,10px) clamp(14px,2.5vw,26px)", borderRadius:9, border:"none", cursor:"pointer", fontWeight:600, fontSize:"clamp(12px,1.5vw,14px)", background:activeTab===t.id?"linear-gradient(135deg,#0284C7,#0EA5E9)":"transparent", color:activeTab===t.id?"#fff":"#64748B", transition:"all 0.25s", boxShadow:activeTab===t.id?"0 4px 16px rgba(2,132,199,0.35)":"none", whiteSpace:"nowrap" }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-4">
            {STEPS[activeTab].map((step,i)=>(
              <div key={i} className="card-hover" style={{ background:"#fff", borderRadius:18, padding:"clamp(20px,3vw,28px)", border:"1px solid #E0F2FE", boxShadow:"0 2px 14px rgba(2,132,199,0.06)", position:"relative" }}>
                <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#0284C7,#38BDF8)", color:"#fff", fontWeight:700, fontSize:13, marginBottom:16, boxShadow:"0 4px 12px rgba(2,132,199,0.35)", fontFamily:"'JetBrains Mono',monospace" }}>{step.step}</div>
                <div style={{ width:38, height:38, borderRadius:11, background:"rgba(2,132,199,0.08)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                  <Icon name={step.icon} size={19} color="#0284C7" strokeWidth={1.8} />
                </div>
                <h3 className="h3" style={{ color:"#0F172A", marginBottom:8, fontSize:"clamp(15px,2vw,18px)" }}>{step.title}</h3>
                <p className="body" style={{ fontSize:"clamp(12px,1.4vw,14px)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          APPLICATION FLOW
      ══════════════════════════════════════ */}
      <section style={{ background:"linear-gradient(135deg,#0C1627,#0F2444,#0284C7)", padding:"clamp(60px,8vw,90px) clamp(20px,5vw,40px)" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 className="h2" style={{ color:"#fff", marginBottom:14 }}>Track Every Application Step</h2>
          <p style={{ fontSize:"clamp(13px,1.6vw,15px)", color:"rgba(255,255,255,0.65)", marginBottom:"clamp(32px,5vw,50px)" }}>
            Real-time status so you're never left wondering.
          </p>
          <div className="flow-wrap" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
            {FLOW.map((s,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center" }}>
                <div className="card-hover" style={{ background:`${s.color}20`, border:`1.5px solid ${s.color}60`, borderRadius:14, padding:"clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)", minWidth:"clamp(90px,10vw,120px)", textAlign:"center", backdropFilter:"blur(10px)", cursor:"default" }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:`${s.color}25`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}>
                    <Icon name={s.icon} size={17} color={s.color} strokeWidth={2} />
                  </div>
                  <div style={{ color:s.color, fontWeight:600, fontSize:"clamp(10px,1.2vw,12px)" }}>{s.label}</div>
                </div>
                {i < FLOW.length-1 && (
                  <div className="flow-arrow" style={{ width:"clamp(16px,3vw,28px)", height:2, background:`linear-gradient(90deg,${s.color}60,${FLOW[i+1].color}60)` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="section" style={{ background:"#F8FAFC" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(32px,5vw,52px)" }}>
            <h2 className="h2" style={{ color:"#0F172A" }}>What Maritime Professionals Say</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="card-hover" style={{ background:"#fff", borderRadius:20, padding:"clamp(22px,3vw,30px)", border:"1px solid #E0F2FE", boxShadow:"0 2px 14px rgba(2,132,199,0.06)" }}>
                <div style={{ display:"flex", gap:2, marginBottom:16 }}>
                  {[...Array(5)].map((_,i)=><span key={i} style={{ color:"#FBBF24", fontSize:14 }}>★</span>)}
                </div>
                <p style={{ fontSize:"clamp(13px,1.5vw,14px)", color:"#475569", lineHeight:1.72, marginBottom:22, fontStyle:"italic" }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${t.color},${t.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:14, fontFamily:"'Sora',sans-serif", flexShrink:0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:"#0F172A", fontFamily:"'Sora',sans-serif" }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"#94A3B8", marginTop:2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section id="pricing" className="section" style={{ background:"#fff" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(30px,5vw,52px)" }}>
            <h2 className="h2" style={{ color:"#0F172A", marginBottom:14 }}>Simple, Transparent Pricing</h2>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:999, padding:"8px 18px" }}>
              <Icon name="checkCircle" size={15} color="#10B981" strokeWidth={2.2} />
              <span style={{ fontSize:"clamp(12px,1.5vw,14px)", color:"#10B981", fontWeight:600 }}>Seafarers use OceanCrew 100% Free — Always</span>
            </div>
          </div>
          <div className="grid-3" style={{ alignItems:"start" }}>
            {PRICING.map((plan,i)=>(
              <div key={i} style={{
                borderRadius:22, padding:"clamp(24px,3.5vw,32px)",
                background:plan.popular?"linear-gradient(145deg,#0284C7,#0EA5E9)":plan.name==="Enterprise"?"linear-gradient(145deg,#0C1627,#0F2444)":"#F8FAFC",
                border:plan.popular||plan.name==="Enterprise"?"none":"1.5px solid #E0F2FE",
                boxShadow:plan.popular?"0 20px 50px rgba(2,132,199,0.35)":"0 4px 20px rgba(0,0,0,0.06)",
                position:"relative", transition:"transform 0.25s",
              }} className="pricing-popular"
                onMouseEnter={e=>!plan.popular&&(e.currentTarget.style.transform="translateY(-4px)")}
                onMouseLeave={e=>!plan.popular&&(e.currentTarget.style.transform="none")}
              >
                {plan.popular&&<div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#F97316,#FBBF24)", color:"#fff", borderRadius:999, padding:"5px 16px", fontSize:11, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", whiteSpace:"nowrap" }}>⭐ Most Popular</div>}
                <div style={{ fontSize:12, fontWeight:600, color:plan.popular||plan.name==="Enterprise"?"rgba(255,255,255,0.6)":"#64748B", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>{plan.name}</div>
                <div style={{ fontSize:"clamp(36px,5vw,46px)", fontWeight:800, color:plan.popular||plan.name==="Enterprise"?"#fff":"#0F172A", letterSpacing:"-0.04em", lineHeight:1, fontFamily:"'Sora',sans-serif" }}>
                  {plan.price}<span style={{ fontSize:16, fontWeight:400, color:plan.popular||plan.name==="Enterprise"?"rgba(255,255,255,0.5)":"#94A3B8" }}>{plan.period}</span>
                </div>
                <div style={{ margin:"clamp(16px,2.5vw,22px) 0", display:"flex", flexDirection:"column", gap:10 }}>
                  {plan.features.map(f=>(
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <Icon name="check" size={14} color={plan.popular?"#6EE7B7":plan.name==="Enterprise"?"#38BDF8":"#0284C7"} strokeWidth={2.5} />
                      <span style={{ fontSize:"clamp(12px,1.5vw,13px)", color:plan.popular||plan.name==="Enterprise"?"rgba(255,255,255,0.82)":"#475569" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width:"100%", padding:"clamp(11px,1.8vw,13px)", borderRadius:11, border:plan.popular||plan.name==="Enterprise"?"1px solid rgba(255,255,255,0.25)":"none", background:plan.popular||plan.name==="Enterprise"?"rgba(255,255,255,0.15)":"linear-gradient(135deg,#0284C7,#0EA5E9)", color:"#fff", fontWeight:700, fontSize:"clamp(13px,1.6vw,14px)", cursor:"pointer", boxShadow:!plan.popular&&plan.name!=="Enterprise"?"0 4px 14px rgba(2,132,199,0.35)":"none" }}>
                  Get Started →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section className="section" style={{ background:"#F8FAFC" }}>
        <div className="container">
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"clamp(30px,4vw,48px)" }}>
              <h2 className="h2" style={{ color:"#0F172A" }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {FAQS.map((faq,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:14, border:activeFaq===i?"1.5px solid rgba(2,132,199,0.3)":"1px solid #E0F2FE", overflow:"hidden", transition:"all 0.22s", boxShadow:activeFaq===i?"0 6px 24px rgba(2,132,199,0.1)":"none" }}>
                  <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{ width:"100%", padding:"clamp(14px,2vw,18px) clamp(16px,3vw,22px)", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, textAlign:"left" }}>
                    <span style={{ fontSize:"clamp(13px,1.7vw,15px)", fontWeight:600, color:"#0F172A", lineHeight:1.4 }}>{faq.q}</span>
                    <div style={{ flexShrink:0, transition:"transform 0.25s", transform:activeFaq===i?"rotate(180deg)":"none" }}>
                      <Icon name="chevronDown" size={18} color="#64748B" strokeWidth={2} />
                    </div>
                  </button>
                  {activeFaq===i&&(
                    <div style={{ padding:"0 clamp(16px,3vw,22px) clamp(14px,2vw,18px)", borderTop:"1px solid #F0F9FF" }}>
                      <p style={{ fontSize:"clamp(13px,1.5vw,14px)", color:"#475569", lineHeight:1.7, marginTop:14 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="section" style={{ background:"linear-gradient(135deg,#0EA5E9,#0284C7,#0C1627)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div className="container" style={{ textAlign:"center", position:"relative", zIndex:1, maxWidth:700 }}>
          <h2 className="h2" style={{ color:"#fff", marginBottom:"clamp(12px,2vw,18px)" }}>Your Next Maritime Career Move Starts Here</h2>
          <p style={{ fontSize:"clamp(13px,1.8vw,16px)", color:"rgba(255,255,255,0.7)", marginBottom:"clamp(28px,4vw,40px)", lineHeight:1.65 }}>
            Join thousands of verified seafarers and hundreds of trusted shipping companies on the world's leading maritime recruitment platform.
          </p>
          <div style={{ display:"flex", gap:"clamp(10px,2vw,14px)", justifyContent:"center", flexWrap:"wrap" }}>
            <button style={{ padding:"clamp(12px,2vw,15px) clamp(22px,3vw,34px)", borderRadius:12, border:"none", background:"#fff", color:"#0284C7", fontWeight:700, fontSize:"clamp(13px,1.6vw,15px)", cursor:"pointer", boxShadow:"0 8px 28px rgba(0,0,0,0.2)", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}
            >
              <Icon name="anchor" size={17} color="#0284C7" strokeWidth={2.2} /> Join as Seafarer — Free
            </button>
            <button style={{ padding:"clamp(12px,2vw,15px) clamp(22px,3vw,34px)", borderRadius:12, border:"1.5px solid rgba(255,255,255,0.4)", background:"rgba(255,255,255,0.1)", color:"#fff", fontWeight:700, fontSize:"clamp(13px,1.6vw,15px)", cursor:"pointer", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            >
              <Icon name="briefcase" size={17} color="#fff" strokeWidth={2} /> Register Your Company
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{ background:"#0C1627", padding:"clamp(40px,6vw,60px) clamp(20px,5vw,40px) clamp(24px,3vw,32px)" }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"clamp(28px,4vw,44px)", marginBottom:"clamp(32px,4vw,48px)" }}>
            {/* Brand */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#0284C7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon name="waves" size={18} color="#fff" strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:17, color:"#fff", fontFamily:"'Sora',sans-serif" }}>OceanCrew</div>
                  <div style={{ fontSize:8, color:"#38BDF8", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600 }}>Global Maritime</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:240, marginBottom:20 }}>
                Connecting verified seafarers with the world's leading shipping companies.
              </p>
              <div style={{ display:"flex", gap:8 }}>
                {["in","tw","fb"].map(s=>(
                  <div key={s} style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.5)", fontSize:10, fontWeight:700, cursor:"pointer", textTransform:"uppercase", transition:"all 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
                  >{s}</div>
                ))}
              </div>
            </div>
            {/* Links */}
            {[
              {heading:"Platform", links:["Find Jobs","Post Vacancies","Seafarer Profile","Company Portal","Pricing"]},
              {heading:"Company",  links:["About Us","Careers","Blog","Contact","Partners"]},
              {heading:"Legal",    links:["Privacy Policy","Terms","Cookie Policy","GDPR","Security"]},
            ].map(col=>(
              <div key={col.heading}>
                <h4 style={{ color:"#fff", fontWeight:600, fontSize:13, marginBottom:16, textTransform:"uppercase", letterSpacing:"0.08em" }}>{col.heading}</h4>
                {col.links.map(link=>(
                  <div key={link} style={{ marginBottom:10 }}>
                    <a href="#" style={{ color:"rgba(255,255,255,0.45)", fontSize:13, transition:"color 0.15s" }}
                      onMouseEnter={e=>e.target.style.color="#38BDF8"}
                      onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.45)"}
                    >{link}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"clamp(18px,3vw,26px)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>© 2025 OceanCrew. All rights reserved.</p>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>
              Powered by <strong style={{ color:"#38BDF8" }}>SKYbird Systems</strong>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
