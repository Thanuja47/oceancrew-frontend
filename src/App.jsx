import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   OCEANCREW™  —  MAIN APP WITH ROUTING
   All pages connected into one seamless application
   Powered by SKYbird Systems

   Routes:
   /              → Landing Page
   /login         → Auth (Login)
   /register      → Auth (Register)
   /seafarer/*    → Seafarer Dashboard
   /company/*     → Company Dashboard
   /admin/*       → Admin Panel
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   MINI ROUTER (no external dependency needed)
───────────────────────────────────────────── */
function useRouter() {
  const [path, setPath] = useState(window.location.hash.replace("#", "") || "/");

  useEffect(() => {
    const onHash = () => setPath(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to) => {
    window.location.hash = to;
    setPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { path, navigate };
}

/* ─────────────────────────────────────────────
   AUTH CONTEXT
───────────────────────────────────────────── */
const DEFAULT_AUTH = { user: null, role: null, token: null };

/* ─────────────────────────────────────────────
   SVG ICON SYSTEM
───────────────────────────────────────────── */
const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    home:         <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    anchor:       <><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    ship:         <><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></>,
    waves:        <><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></>,
    user:         <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    users:        <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    briefcase:    <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    shield:       <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    building:     <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    check:        <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle:  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    x:            <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrowRight:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    chevronLeft:  <><polyline points="15 18 9 12 15 6"/></>,
    chevronDown:  <><polyline points="6 9 12 15 18 9"/></>,
    search:       <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:         <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    star:         <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    zap:          <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    sparkles:     <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>,
    globe:        <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    lock:         <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    eye:          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    moon:         <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:          <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    logOut:       <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    send:         <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    folder:       <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
    trendUp:      <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    activity:     <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    award:        <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    creditCard:   <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    settings:     <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    dashboard:    <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>,
    pipeline:     <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    plus:         <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    bookmark:     <><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></>,
    fileText:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
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
   LOADING SCREEN
───────────────────────────────────────────── */
function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => { setFadeOut(true); setTimeout(onDone, 600); }, 400);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #08090C 0%, #0F2444 60%, #0284C7 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1, transition: "opacity 0.6s ease",
    }}>
      {/* Animated rings */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {[300, 450, 600].map((size, i) => (
          <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.12)", animation: `ringPulse ${2 + i * 0.5}s ease-in-out infinite ${i * 0.3}s` }} />
        ))}
      </div>

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{
          width: 84, height: 84, borderRadius: 22,
          background: "linear-gradient(135deg, #0284C7, #38BDF8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: "0 0 60px rgba(56,189,248,0.5), 0 0 120px rgba(2,132,199,0.3)",
          animation: "logoFloat 3s ease-in-out infinite",
        }}>
          <Icon name="waves" size={40} color="#fff" strokeWidth={2} />
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", fontFamily: "'Sora', sans-serif", marginBottom: 6 }}>
          OceanCrew
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 48 }}>
          by SKYbird Systems
        </p>

        {/* Progress bar */}
        <div style={{ width: 260, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", margin: "0 auto 16px" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0284C7, #38BDF8)", borderRadius: 4, transition: "width 0.35s cubic-bezier(.4,0,.2,1)" }} />
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em", fontFamily: "'JetBrains Mono', monospace" }}>
          {progress < 100 ? "Initializing platform…" : "Ready"}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────────── */
function LandingPage({ navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("seafarer");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: "anchor",    color: "#0284C7", title: "Verified Maritime Profiles",     desc: "Complete digital profiles with CDC, STCW, sea service records — all verified." },
    { icon: "briefcase", color: "#0EA5E9", title: "Global Job Marketplace",          desc: "Thousands of verified vacancies from top shipping companies worldwide." },
    { icon: "sparkles",  color: "#7C3AED", title: "AI-Powered Job Matching",        desc: "Intelligent engine matches seafarers by rank, vessel type and certificates." },
    { icon: "shield",    color: "#0284C7", title: "Admin-Verified Companies",       desc: "Every company manually verified. Zero fraud, zero fake listings." },
    { icon: "zap",       color: "#0EA5E9", title: "Instant Applications",           desc: "Apply to multiple positions in seconds with your digital profile." },
    { icon: "trendUp",   color: "#0284C7", title: "Real-Time Status Tracking",      desc: "Follow your application from submitted to selected — live." },
  ];

  const steps = {
    seafarer: [
      { step: "01", icon: "user",      title: "Create Profile",    desc: "Register free and build your professional maritime profile." },
      { step: "02", icon: "fileText",  title: "Upload Documents",  desc: "Upload CDC, STCW, passport and certificates securely." },
      { step: "03", icon: "search",    title: "Browse & Apply",    desc: "Search global jobs and apply with one click." },
      { step: "04", icon: "award",     title: "Get Hired",         desc: "Track applications live and receive offers." },
    ],
    company: [
      { step: "01", icon: "shield",       title: "Register & Verify",  desc: "Submit company details for admin approval." },
      { step: "02", icon: "briefcase",    title: "Post Vacancies",     desc: "Create detailed job postings instantly." },
      { step: "03", icon: "sparkles",     title: "Find Candidates",    desc: "AI surfaces verified seafarers matching your needs." },
      { step: "04", icon: "checkCircle",  title: "Hire Confidently",   desc: "Manage recruitment from shortlist to contract." },
    ],
  };

  const testimonials = [
    { name: "Capt. Rajesh Fernando", role: "Master Mariner · 18 Years", avatar: "RF", color: "#0284C7", text: "OceanCrew completely changed how I find contracts. Within two weeks I had three verified offers." },
    { name: "Shanaka Perera",         role: "Chief Engineer · Sri Lanka", avatar: "SP", color: "#0EA5E9", text: "Finally a platform built for seafarers. The AI job matching found me roles I never would have discovered." },
    { name: "David Chen",             role: "HR Director · Pacific Star", avatar: "DC", color: "#7C3AED", text: "We reduced hiring time by 60%. The candidate filters are incredible — right seafarers in minutes." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5%", background: scrolled ? "rgba(255,255,255,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(2,132,199,0.1)" : "none", transition: "all 0.35s ease" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#0284C7,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(2,132,199,0.35)" }}>
              <Icon name="waves" size={18} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#0F172A", letterSpacing: "-0.03em", fontFamily: "'Sora', sans-serif" }}>OceanCrew</div>
              <div style={{ fontSize: 8, color: "#0284C7", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>by SKYbird Systems</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/login")} style={{ padding: "9px 18px", borderRadius: 9, border: "1.5px solid #0284C7", background: "transparent", color: "#0284C7", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0284C7"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0284C7"; }}
            >Sign In</button>
            <button onClick={() => navigate("/register")} style={{ padding: "9px 20px", borderRadius: 9, border: "none", background: "linear-gradient(135deg,#0284C7,#0EA5E9)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", boxShadow: "0 4px 14px rgba(2,132,199,0.35)", fontFamily: "'Inter', sans-serif" }}>
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(160deg,#F0F9FF 0%,#E0F2FE 45%,#BAE6FD 100%)", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(2,132,199,0.12) 1.5px,transparent 1.5px)", backgroundSize: "44px 44px", opacity: 0.7, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -120, right: -120, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(2,132,199,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5%", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div style={{ animation: "fadeUp 0.8s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(2,132,199,0.1)", border: "1px solid rgba(2,132,199,0.22)", borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                <span style={{ fontSize: 12, color: "#0284C7", fontWeight: 600 }}>Global Maritime Recruitment Platform</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 22, fontFamily: "'Sora', sans-serif" }}>
                Connecting<br />
                <span style={{ background: "linear-gradient(135deg,#0284C7,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Seafarers</span>
                {" "}with Global<br />Opportunities
              </h1>
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, marginBottom: 36, letterSpacing: "-0.01em", maxWidth: 480 }}>
                The world's most trusted maritime recruitment platform. Verified seafarers, verified companies — powered by SKYbird Systems.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
                <button onClick={() => navigate("/register")} style={{ padding: "14px 30px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#0284C7,#0EA5E9)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 24px rgba(2,132,199,0.4)", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "none"}
                >
                  <Icon name="search" size={17} color="#fff" strokeWidth={2.2} />
                  Find Jobs — Free
                </button>
                <button onClick={() => navigate("/register")} style={{ padding: "14px 30px", borderRadius: 12, border: "1.5px solid #0284C7", background: "rgba(255,255,255,0.8)", color: "#0284C7", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#0284C7"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.color = "#0284C7"; }}
                >
                  <Icon name="briefcase" size={17} strokeWidth={2} />
                  Hire Seafarers
                </button>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[{ icon: "shield", text: "Admin Verified" }, { icon: "lock", text: "256-bit SSL" }, { icon: "globe", text: "Global Network" }].map(b => (
                  <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <Icon name={b.icon} size={14} color="#0284C7" strokeWidth={2.2} />
                    <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.8s ease 0.2s both" }}>
              {/* Live job card */}
              <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderRadius: 20, padding: 24, boxShadow: "0 20px 60px rgba(2,132,199,0.15)", border: "1px solid rgba(2,132,199,0.12)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 999, padding: "3px 10px", marginBottom: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                      <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600, letterSpacing: "0.04em" }}>HIRING NOW</span>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", fontFamily: "'Sora', sans-serif", letterSpacing: "-0.025em" }}>Chief Officer</div>
                    <div style={{ fontSize: 13, color: "#475569", marginTop: 3 }}>Pacific Star Shipping · Singapore</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0284C7,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>PS</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {["Container Vessel", "12 Months", "$4,200/mo", "STCW Required"].map(t => (
                    <span key={t} style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 999, background: "rgba(2,132,199,0.1)", border: "1px solid rgba(2,132,199,0.2)", color: "#0284C7", fontSize: 11, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(124,58,237,0.06)", borderRadius: 10, marginBottom: 14, border: "1px solid rgba(124,58,237,0.15)" }}>
                  <Icon name="sparkles" size={15} color="#7C3AED" strokeWidth={2} />
                  <span style={{ fontSize: 12, color: "#7C3AED", fontWeight: 600 }}>94% AI Match Score — Strong fit for your profile</span>
                </div>
                <button onClick={() => navigate("/register")} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#0284C7,#0EA5E9)", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(2,132,199,0.35)", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Icon name="arrowRight" size={16} color="#fff" strokeWidth={2.2} />
                  Apply Now — It's Free
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ val: "12,000+", label: "Active Seafarers", color: "#0284C7" }, { val: "850+", label: "Verified Companies", color: "#0EA5E9" }].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", borderRadius: 14, padding: "18px 20px", boxShadow: "0 6px 24px rgba(2,132,199,0.1)", border: "1px solid rgba(2,132,199,0.1)" }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: s.color, letterSpacing: "-0.04em", fontFamily: "'Sora', sans-serif" }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "linear-gradient(180deg,#F8FAFC,#F0F9FF)", padding: "90px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.035em", marginBottom: 14, fontFamily: "'Sora', sans-serif" }}>Built for the Maritime Industry</h2>
            <p style={{ fontSize: 16, color: "#64748B", maxWidth: 500, margin: "0 auto" }}>Every feature designed for how seafarers and shipping companies actually work.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1px solid #E0F2FE", boxShadow: "0 2px 14px rgba(2,132,199,0.06)", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.boxShadow = "0 12px 36px rgba(2,132,199,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#E0F2FE"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(2,132,199,0.06)"; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 13, background: `${f.color}12`, border: `1px solid ${f.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon name={f.icon} size={24} color={f.color} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: 10, fontFamily: "'Sora', sans-serif" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#fff", padding: "90px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.035em", marginBottom: 14, fontFamily: "'Sora', sans-serif" }}>How OceanCrew Works</h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
            <div style={{ background: "#F0F9FF", borderRadius: 12, padding: 5, display: "flex", gap: 4 }}>
              {[{ id: "seafarer", label: "⚓ For Seafarers" }, { id: "company", label: "🏢 For Companies" }].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "10px 26px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: activeTab === t.id ? "linear-gradient(135deg,#0284C7,#0EA5E9)" : "transparent", color: activeTab === t.id ? "#fff" : "#64748B", fontFamily: "'Inter', sans-serif", transition: "all 0.25s", boxShadow: activeTab === t.id ? "0 4px 16px rgba(2,132,199,0.35)" : "none" }}>{t.label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
            {steps[activeTab].map((step, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 18, padding: 26, border: "1px solid #E0F2FE", boxShadow: "0 2px 14px rgba(2,132,199,0.06)", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(2,132,199,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(2,132,199,0.06)"; }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#0284C7,#38BDF8)", color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 16, boxShadow: "0 4px 12px rgba(2,132,199,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>{step.step}</div>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(2,132,199,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon name={step.icon} size={19} color="#0284C7" strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: 8, fontFamily: "'Sora', sans-serif" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#F8FAFC", padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.035em", fontFamily: "'Sora', sans-serif" }}>What Maritime Professionals Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E0F2FE", boxShadow: "0 2px 14px rgba(2,132,199,0.06)", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(2,132,199,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(2,132,199,0.06)"; }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#FBBF24", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.72, marginBottom: 22, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},${t.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Sora', sans-serif", boxShadow: `0 4px 12px ${t.color}40` }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#0EA5E9,#0284C7,#0C1627)", padding: "90px 5%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: 18, fontFamily: "'Sora', sans-serif" }}>Your Next Maritime Career Move Starts Here</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 40, lineHeight: 1.65 }}>Join thousands of verified seafarers and hundreds of trusted shipping companies worldwide.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/register")} style={{ padding: "15px 34px", borderRadius: 12, border: "none", background: "#fff", color: "#0284C7", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 28px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <Icon name="anchor" size={17} color="#0284C7" strokeWidth={2.2} />
              Join as Seafarer — Free
            </button>
            <button onClick={() => navigate("/register")} style={{ padding: "15px 34px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              <Icon name="briefcase" size={17} color="#fff" strokeWidth={2} />
              Register Your Company
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0C1627", padding: "50px 5% 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#0284C7,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="waves" size={18} color="#fff" strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-0.03em", fontFamily: "'Sora', sans-serif" }}>OceanCrew</div>
                <div style={{ fontSize: 8, color: "#38BDF8", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Global Maritime Recruitment</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Features", "How It Works", "Pricing", "About"].map(l => (
                <a key={l} href="#" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "'Inter', sans-serif", transition: "color 0.15s" }}
                  onMouseEnter={e => e.target.style.color = "#38BDF8"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                >{l}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 OceanCrew. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Powered by <strong style={{ color: "#38BDF8" }}>SKYbird Systems</strong></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH PAGE
───────────────────────────────────────────── */
function AuthPage({ navigate, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState("seafarer");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const roles = [
    { id: "seafarer", icon: "anchor",   label: "Seafarer",         color: "#0284C7", desc: "Find maritime jobs" },
    { id: "company",  icon: "building", label: "Company / Agency", color: "#0EA5E9", desc: "Post jobs & hire"   },
    { id: "admin",    icon: "shield",   label: "Admin",            color: "#7C3AED", desc: "Platform control"   },
  ];

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "seafarer") navigate("/seafarer");
      else if (role === "company") navigate("/company");
      else navigate("/admin");
    }, 1600);
  };

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-input)", color: "var(--text-1)", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#F0F9FF 0%,#E0F2FE 50%,#BAE6FD 100%)", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        :root { --border: rgba(2,132,199,0.2); --bg-input: rgba(255,255,255,0.9); --text-1: #0F172A; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Mini nav */}
      <nav style={{ padding: "16px 5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#0284C7,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="waves" size={18} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0F172A", letterSpacing: "-0.03em", fontFamily: "'Sora', sans-serif" }}>OceanCrew</div>
            <div style={{ fontSize: 8, color: "#0284C7", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>by SKYbird Systems</div>
          </div>
        </button>
        <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(2,132,199,0.2)", borderRadius: 9, padding: "8px 14px", cursor: "pointer", color: "#475569", fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
          <Icon name="chevronLeft" size={15} color="#475569" strokeWidth={2} /> Back to Home
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: mode === "register" ? 540 : 460 }}>
          <div style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(28px)", borderRadius: 24, padding: "40px 38px", boxShadow: "0 30px 80px rgba(2,132,199,0.16)", border: "1px solid rgba(186,230,253,0.8)" }}>

            {/* Mode toggle */}
            <div style={{ display: "flex", background: "#F0F9FF", borderRadius: 12, padding: 4, gap: 4, marginBottom: 28 }}>
              {[{ id: "login", label: "Sign In" }, { id: "register", label: "Create Account" }].map(m => (
                <button key={m.id} onClick={() => { setMode(m.id); setStep(1); setForm({}); }} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: mode === m.id ? "linear-gradient(135deg,#0284C7,#0EA5E9)" : "transparent", color: mode === m.id ? "#fff" : "#64748B", fontFamily: "'Inter', sans-serif", transition: "all 0.25s", boxShadow: mode === m.id ? "0 3px 12px rgba(2,132,199,0.35)" : "none" }}>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Role selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {roles.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)} style={{ flex: 1, padding: "11px 8px", borderRadius: 12, border: role === r.id ? `2px solid ${r.color}` : "1.5px solid #E2E8F0", background: role === r.id ? `${r.color}10` : "#fff", cursor: "pointer", textAlign: "center", transition: "all 0.22s" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                    <Icon name={r.icon} size={20} color={role === r.id ? r.color : "#94A3B8"} strokeWidth={role === r.id ? 2.2 : 1.8} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: role === r.id ? r.color : "#64748B", letterSpacing: "-0.01em" }}>{r.label}</div>
                  <div style={{ fontSize: 9, color: "#94A3B8", marginTop: 2, letterSpacing: "-0.01em" }}>{r.desc}</div>
                  {role === r.id && <div style={{ width: 18, height: 18, borderRadius: "50%", background: r.color, margin: "8px auto 0", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={10} color="#fff" strokeWidth={2.8} /></div>}
                </button>
              ))}
            </div>

            {/* Login form */}
            {mode === "login" && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.025em", marginBottom: 22, textAlign: "center", fontFamily: "'Sora', sans-serif" }}>Welcome Back</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={form.email || ""} onChange={e => set("email", e.target.value)} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#0284C7"}
                    onBlur={e => e.target.style.borderColor = "rgba(2,132,199,0.2)"}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} placeholder="Your password" value={form.password || ""} onChange={e => set("password", e.target.value)} style={{ ...inputStyle, paddingRight: 42 }}
                      onFocus={e => e.target.style.borderColor = "#0284C7"}
                      onBlur={e => e.target.style.borderColor = "rgba(2,132,199,0.2)"}
                    />
                    <button onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                      <Icon name="eye" size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginBottom: 22 }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#0284C7", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Forgot password?</button>
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "13px", borderRadius: 11, border: "none", background: loading ? "#94A3B8" : "linear-gradient(135deg,#0284C7,#0EA5E9)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 6px 22px rgba(2,132,199,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "'Inter', sans-serif" }}>
                  {loading ? <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />Signing In…</> : `Sign In →`}
                </button>
              </div>
            )}

            {/* Register form */}
            {mode === "register" && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.025em", marginBottom: 6, textAlign: "center", fontFamily: "'Sora', sans-serif" }}>Create Account</h2>
                <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", marginBottom: 22 }}>Join thousands of maritime professionals</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                  {[
                    { k: "name",     label: "Full Name",   type: "text",     placeholder: "Your full name",    full: false },
                    { k: "email",    label: "Email",        type: "email",    placeholder: "your@email.com",    full: false },
                    { k: "phone",    label: "Phone",        type: "tel",      placeholder: "+94 77 000 0000",   full: false },
                    { k: "country",  label: "Country",      type: "text",     placeholder: "Sri Lanka",         full: false },
                    { k: "password", label: "Password",     type: "password", placeholder: "Min 8 characters",  full: true  },
                  ].map(f => (
                    <div key={f.k} style={{ gridColumn: f.full ? "1/-1" : "auto", marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={form[f.k] || ""} onChange={e => set(f.k, e.target.value)} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#0284C7"}
                        onBlur={e => e.target.style.borderColor = "rgba(2,132,199,0.2)"}
                      />
                    </div>
                  ))}
                </div>
                {role === "company" && (
                  <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
                    <Icon name="zap" size={15} color="#F97316" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>Company accounts require <strong>admin verification</strong>. Our team will review within 24 hours.</p>
                  </div>
                )}
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 20 }}>
                  <input type="checkbox" style={{ marginTop: 2, accentColor: "#0284C7" }} />
                  <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>I agree to OceanCrew's <span style={{ color: "#0284C7", fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: "#0284C7", fontWeight: 600 }}>Privacy Policy</span></span>
                </label>
                <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "13px", borderRadius: 11, border: "none", background: loading ? "#94A3B8" : "linear-gradient(135deg,#0284C7,#0EA5E9)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 6px 22px rgba(2,132,199,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "'Inter', sans-serif" }}>
                  {loading ? <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />Creating Account…</> : `Create Account →`}
                </button>
              </div>
            )}

            <p style={{ textAlign: "center", fontSize: 13, color: "#64748B", marginTop: 20 }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setForm({}); setStep(1); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#0284C7", fontWeight: 700, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                {mode === "login" ? "Register Free →" : "Sign In →"}
              </button>
            </p>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 20 }}>
            🔒 256-bit SSL · Powered by <strong style={{ color: "#0284C7" }}>SKYbird Systems</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD SHELL (shared layout)
───────────────────────────────────────────── */
function DashboardShell({ navigate, role, navItems, navSections, user, children, theme, setTheme, activePage, setActivePage }) {
  const [sidebar, setSidebar] = useState(true);
  const isDark = theme === "dark";
  const roleColors = { seafarer: "#38BDF8", company: "#38BDF8", admin: "#F87171" };
  const color = roleColors[role];

  return (
    <>
      <style>{`
        :root {
          --bg-primary:  ${isDark ? "#08090C" : "#F7F8FA"};
          --bg-card:     ${isDark ? "#10121A" : "#FFFFFF"};
          --bg-tertiary: ${isDark ? "#181B26" : "#F0F2F5"};
          --border:      ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
          --text-1:      ${isDark ? "#F1F5F9" : "#0F172A"};
          --text-2:      ${isDark ? "#94A3B8" : "#475569"};
          --text-3:      ${isDark ? "#475569" : "#94A3B8"};
        }
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.4)}}
        @keyframes pageIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .page-in{animation:pageIn .35s cubic-bezier(.4,0,.2,1);}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(56,189,248,.25);border-radius:3px;}
        input,select,button,textarea{font-family:'Inter',-apple-system,sans-serif;}
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-1)", fontFamily: "'Inter', sans-serif" }}>

        {/* SIDEBAR */}
        <aside style={{ width: sidebar ? 252 : 72, minHeight: "100vh", background: isDark ? "#09090C" : "#fff", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 1000, transition: "width .3s cubic-bezier(.4,0,.2,1)", overflow: "hidden" }}>
          {/* Logo */}
          <div style={{ padding: sidebar ? "20px 18px" : "18px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 11, whiteSpace: "nowrap", overflow: "hidden" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#0284C7,#38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 5px 18px rgba(2,132,199,0.4)" }}>
              <Icon name="waves" size={19} color="#fff" strokeWidth={2.2} />
            </div>
            {sidebar && (
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "var(--text-1)", letterSpacing: "-0.03em", fontFamily: "'Sora', sans-serif", lineHeight: 1.1 }}>OceanCrew</div>
                <div style={{ fontSize: 8, color: "#38BDF8", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, marginTop: 2 }}>SKYbird Systems</div>
              </div>
            )}
          </div>

          {/* User pill */}
          {sidebar && (
            <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${color},${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0, fontFamily: "'Sora', sans-serif" }}>
                {user.avatar}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.015em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                <div style={{ fontSize: 10, color, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                  {user.role}
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
            {navSections.map(section => (
              <div key={section.label}>
                {sidebar && <div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.12em", padding: "10px 14px 6px", marginTop: 6 }}>{section.label}</div>}
                {section.items.map(item => {
                  const active = activePage === item.id;
                  return (
                    <button key={item.id} onClick={() => setActivePage(item.id)} title={!sidebar ? item.label : ""}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: sidebar ? "10px 14px" : "11px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? `${color}15` : "transparent", color: active ? color : "var(--text-3)", fontSize: 13, fontWeight: active ? 600 : 500, letterSpacing: "-0.01em", justifyContent: sidebar ? "flex-start" : "center", transition: "all .15s ease", borderLeft: active ? `2px solid ${color}` : "2px solid transparent", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--bg-tertiary)"; e.currentTarget.style.color = "var(--text-1)"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-3)"; } }}
                    >
                      <Icon name={item.icon} size={16} color={active ? color : "currentColor"} strokeWidth={active ? 2.2 : 1.8} />
                      {sidebar && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
                      {sidebar && item.badge && (
                        <span style={{ marginLeft: "auto", background: item.badgeColor || "#EF4444", color: "#fff", borderRadius: 999, minWidth: 18, height: 17, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, padding: "0 5px", letterSpacing: "-0.01em" }}>{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Collapse + Logout */}
          <div style={{ padding: "10px 10px 14px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
            {sidebar && (
              <button onClick={() => navigate("/")} style={{ width: "100%", padding: "9px", borderRadius: 9, border: "none", background: "rgba(248,113,113,0.08)", color: "#F87171", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", transition: "all .15s" }}>
                <Icon name="logOut" size={14} color="#F87171" strokeWidth={2} /> Sign Out
              </button>
            )}
            <button onClick={() => setSidebar(s => !s)} style={{ width: "100%", padding: "9px", borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg-tertiary)", color: "var(--text-3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 12, fontWeight: 500, fontFamily: "'Inter', sans-serif", transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-3)"; }}
            >
              <Icon name={sidebar ? "chevronLeft" : "chevronRight"} size={14} strokeWidth={2.2} />
              {sidebar && "Collapse"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{ flex: 1, marginLeft: sidebar ? 252 : 72, transition: "margin-left .3s cubic-bezier(.4,0,.2,1)", display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Header */}
          <header style={{ background: isDark ? "rgba(16,18,26,0.75)" : "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.025em", fontFamily: "'Sora', sans-serif" }}>
                {navSections.flatMap(s => s.items).find(n => n.id === activePage)?.label || "Dashboard"}
              </h2>
              <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}>
                {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg-card)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-2)", transition: "all .15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
              >
                <Icon name={isDark ? "sun" : "moon"} size={15} strokeWidth={2} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 11px 5px 6px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer" }}>
                <div style={{ width: 27, height: 27, borderRadius: "50%", background: `linear-gradient(135deg,${color},${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 10, fontFamily: "'Sora', sans-serif" }}>{user.avatar}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.015em" }}>{user.name.split(" ")[0]}</span>
              </div>
            </div>
          </header>

          {/* Page */}
          <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
            <div className="page-in">{children}</div>
          </main>

          <footer style={{ padding: "12px 28px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "-0.01em" }}>
              © 2025 <strong style={{ color, fontWeight: 600 }}>OceanCrew</strong> · Powered by <strong style={{ color, fontWeight: 600 }}>SKYbird Systems</strong>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SIMPLE DASHBOARD PAGES (inline summaries)
───────────────────────────────────────────── */
function SeafarerHome({ navigate }) {
  const jobs = [
    { title: "Master", company: "Maersk Line", vessel: "Container", salary: "$7,500", location: "Singapore", match: 97, color: "#38BDF8", logo: "ML" },
    { title: "Chief Officer", company: "Pacific Star", vessel: "Bulk Carrier", salary: "$4,800", location: "Hong Kong", match: 92, color: "#A78BFA", logo: "PS" },
    { title: "Chief Engineer", company: "MSC Global", vessel: "Oil Tanker", salary: "$5,800", location: "Rotterdam", match: 88, color: "#34D399", logo: "MS" },
  ];
  const stats = [
    { label: "Applications", value: 12, color: "#38BDF8", icon: "send" },
    { label: "Shortlisted",  value: 3,  color: "#A78BFA", icon: "star" },
    { label: "Under Review", value: 4,  color: "#FBBF24", icon: "eye"  },
    { label: "Jobs Saved",   value: 7,  color: "#34D399", icon: "bookmark" },
  ];
  return (
    <div>
      {/* Welcome */}
      <div style={{ background: "linear-gradient(135deg,#0C1627,#0F2444,#0284C7)", borderRadius: 18, padding: "32px 36px", marginBottom: 24, position: "relative", overflow: "hidden", boxShadow: "0 16px 50px rgba(2,132,199,0.2)", border: "1px solid rgba(56,189,248,0.15)" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(56,189,248,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulseDot 2s infinite" }} />
              <span style={{ fontSize: 11, color: "#34D399", fontWeight: 600 }}>Open to Work · Profile Active</span>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>Welcome back, Rajesh 👋</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Master Mariner · 18 Years · Container Vessel</p>
          </div>
          <button style={{ padding: "11px 22px", borderRadius: 11, border: "none", background: "#fff", color: "#0284C7", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontFamily: "'Inter', sans-serif" }}>
            <Icon name="search" size={15} color="#0284C7" strokeWidth={2.2} /> Browse Jobs
          </button>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, boxShadow: "0 2px 14px rgba(0,0,0,0.12)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${s.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Icon name={s.icon} size={19} color={s.color} strokeWidth={1.8} />
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: s.color, letterSpacing: "-0.04em", fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 5, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Recommended jobs */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.02em", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="sparkles" size={17} color="#A78BFA" strokeWidth={2} /> AI Recommended Jobs
          </h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {jobs.map((job, i) => (
            <div key={i} style={{ background: "var(--bg-tertiary)", borderRadius: 13, padding: 18, border: "1px solid var(--border)", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${job.color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg,${job.color},${job.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 11, fontFamily: "'Sora', sans-serif" }}>{job.logo}</div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${job.color}15`, border: `1px solid ${job.color}30`, borderRadius: 999, padding: "3px 8px", fontSize: 10, color: job.color, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                  <Icon name="sparkles" size={9} color={job.color} strokeWidth={2.2} />{job.match}%
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.015em", marginBottom: 2, fontFamily: "'Sora', sans-serif" }}>{job.title}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 12 }}>{job.company} · {job.location}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: job.color, fontFamily: "'JetBrains Mono', monospace" }}>{job.salary}</span>
                <button style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: `linear-gradient(135deg,${job.color},${job.color}cc)`, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Apply →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompanyHome() {
  const stats = [
    { label: "Active Jobs",      value: 8,   color: "#38BDF8", icon: "briefcase" },
    { label: "Total Applicants", value: 134, color: "#A78BFA", icon: "users"     },
    { label: "Shortlisted",      value: 23,  color: "#FBBF24", icon: "star"      },
    { label: "Total Hired",      value: 47,  color: "#34D399", icon: "award"     },
  ];
  const applicants = [
    { name: "Capt. Rajesh Fernando", rank: "Master",         score: 95, status: "Shortlisted",  avatar: "RF", color: "#38BDF8" },
    { name: "Shanaka Perera",         rank: "Chief Officer",  score: 91, status: "Interview",    avatar: "SP", color: "#34D399" },
    { name: "Eng. Priya Nair",        rank: "Chief Engineer", score: 88, status: "Under Review", avatar: "PN", color: "#A78BFA" },
  ];
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#0C1627,#0F2444,#0284C7)", borderRadius: 18, padding: "30px 34px", marginBottom: 22, position: "relative", overflow: "hidden", boxShadow: "0 16px 50px rgba(2,132,199,0.2)", border: "1px solid rgba(56,189,248,0.15)" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", marginBottom: 5, fontFamily: "'Sora', sans-serif" }}>Pacific Star Shipping Co.</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Manning Agency · Singapore · Professional Plan</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, boxShadow: "0 2px 14px rgba(0,0,0,0.12)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${s.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Icon name={s.icon} size={19} color={s.color} strokeWidth={1.8} />
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: s.color, letterSpacing: "-0.04em", fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 5, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.02em", fontFamily: "'Sora', sans-serif", marginBottom: 20 }}>Top Candidates</h3>
        {applicants.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: i < applicants.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${a.color},${a.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>{a.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.015em" }}>{a.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{a.rank}</div>
            </div>
            <div style={{ textAlign: "center", marginRight: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#38BDF8", letterSpacing: "-0.03em", fontFamily: "'JetBrains Mono', monospace" }}>{a.score}</div>
              <div style={{ fontSize: 9, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>AI Match</div>
            </div>
            <span style={{ background: a.status === "Shortlisted" ? "rgba(167,139,250,0.12)" : a.status === "Interview" ? "rgba(14,165,233,0.12)" : "rgba(251,191,36,0.12)", color: a.status === "Shortlisted" ? "#A78BFA" : a.status === "Interview" ? "#0EA5E9" : "#FBBF24", padding: "4px 11px", borderRadius: 999, fontSize: 11, fontWeight: 500, border: `1px solid ${a.status === "Shortlisted" ? "rgba(167,139,250,0.25)" : a.status === "Interview" ? "rgba(14,165,233,0.25)" : "rgba(251,191,36,0.25)"}` }}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminHome() {
  const stats = [
    { label: "Total Seafarers",    value: "12,847", color: "#38BDF8", icon: "anchor"     },
    { label: "Companies",          value: "863",    color: "#A78BFA", icon: "building"   },
    { label: "Active Jobs",        value: "1,247",  color: "#34D399", icon: "briefcase"  },
    { label: "Pending Approvals",  value: "14",     color: "#F87171", icon: "zap"        },
    { label: "Monthly Revenue",    value: "$28.4K", color: "#FBBF24", icon: "creditCard" },
    { label: "Applications",       value: "38.4K",  color: "#38BDF8", icon: "send"       },
  ];
  const activity = [
    { icon: "checkCircle", msg: "Neptune Shipping Ltd. was approved",                      time: "2 min ago",  color: "#34D399" },
    { icon: "briefcase",   msg: "New job posted: Master — Pacific Star Shipping",          time: "15 min ago", color: "#38BDF8" },
    { icon: "anchor",      msg: "New seafarer registered: Nuwan Jayasuriya",               time: "34 min ago", color: "#A78BFA" },
    { icon: "creditCard",  msg: "Payment: $399 — MSC Global Lines (Enterprise)",           time: "1h ago",     color: "#FBBF24" },
  ];
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#0C1627,#0F2444,#0284C7)", borderRadius: 18, padding: "30px 34px", marginBottom: 22, position: "relative", overflow: "hidden", boxShadow: "0 16px 50px rgba(2,132,199,0.2)", border: "1px solid rgba(56,189,248,0.15)" }}>
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 999, padding: "4px 12px", marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulseDot 2s infinite" }} />
              <span style={{ fontSize: 11, color: "#34D399", fontWeight: 600 }}>All Systems Operational · Live</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", fontFamily: "'Sora', sans-serif" }}>OceanCrew Admin Center</h2>
          </div>
          <div style={{ background: "rgba(248,113,113,0.2)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 11, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <Icon name="zap" size={15} color="#F87171" strokeWidth={2.2} />
            <span style={{ fontSize: 13, color: "#F87171", fontWeight: 600 }}>14 Pending Approvals</span>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, boxShadow: "0 2px 14px rgba(0,0,0,0.12)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${s.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <Icon name={s.icon} size={19} color={s.color} strokeWidth={1.8} />
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: s.color, letterSpacing: "-0.04em", fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 5, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.02em", fontFamily: "'Sora', sans-serif" }}>Live Activity Feed</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulseDot 1.5s infinite" }} />
            <span style={{ fontSize: 12, color: "#34D399", fontWeight: 600 }}>Live</span>
          </div>
        </div>
        {activity.map((log, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: "var(--bg-tertiary)", borderRadius: 10, marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: `${log.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={log.icon} size={16} color={log.color} strokeWidth={2} />
            </div>
            <p style={{ fontSize: 13, color: "var(--text-2)", flex: 1, letterSpacing: "-0.01em" }}>{log.msg}</p>
            <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD WRAPPERS
───────────────────────────────────────────── */
function SeafarerPortal({ navigate, theme, setTheme }) {
  const [activePage, setActivePage] = useState("dashboard");
  const navSections = [
    { label: "Main", items: [
      { id: "dashboard",     icon: "home",      label: "Dashboard"     },
      { id: "jobs",          icon: "briefcase", label: "Browse Jobs"   },
      { id: "applications",  icon: "send",      label: "Applications", badge: 3  },
      { id: "saved",         icon: "bookmark",  label: "Saved Jobs",   badge: 7, badgeColor: "#34D399" },
    ]},
    { label: "Profile", items: [
      { id: "documents",     icon: "folder",    label: "Documents"     },
      { id: "notifications", icon: "bell",      label: "Notifications",badge: 2  },
      { id: "profile",       icon: "user",      label: "My Profile"    },
    ]},
  ];
  const user = { name: "Capt. Rajesh Fernando", avatar: "RF", role: "Master Mariner" };
  const renderContent = () => {
    switch (activePage) {
      case "dashboard": return <SeafarerHome navigate={navigate} />;
      default: return (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "60px 24px", textAlign: "center", boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name={navSections.flatMap(s => s.items).find(i => i.id === activePage)?.icon || "home"} size={26} color="#38BDF8" strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-1)", fontFamily: "'Sora', sans-serif", marginBottom: 8, letterSpacing: "-0.025em" }}>
            {navSections.flatMap(s => s.items).find(i => i.id === activePage)?.label}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-3)" }}>This section is coming in the next build 🚀</p>
        </div>
      );
    }
  };
  return <DashboardShell navigate={navigate} role="seafarer" navItems={[]} navSections={navSections} user={user} theme={theme} setTheme={setTheme} activePage={activePage} setActivePage={setActivePage}>{renderContent()}</DashboardShell>;
}

function CompanyPortal({ navigate, theme, setTheme }) {
  const [activePage, setActivePage] = useState("dashboard");
  const navSections = [
    { label: "Main", items: [
      { id: "dashboard",    icon: "dashboard",  label: "Dashboard"       },
      { id: "jobs",         icon: "briefcase",  label: "Job Management"  },
      { id: "candidates",   icon: "users",      label: "Candidates",     badge: 134 },
      { id: "pipeline",     icon: "pipeline",   label: "Pipeline"        },
    ]},
    { label: "Manage", items: [
      { id: "notifications",icon: "bell",       label: "Notifications",  badge: 2 },
      { id: "subscription", icon: "creditCard", label: "Subscription"    },
      { id: "profile",      icon: "building",   label: "Company Profile" },
    ]},
  ];
  const user = { name: "David Chen", avatar: "DC", role: "HR Director" };
  const renderContent = () => {
    switch (activePage) {
      case "dashboard": return <CompanyHome />;
      default: return (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "60px 24px", textAlign: "center", boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name={navSections.flatMap(s => s.items).find(i => i.id === activePage)?.icon || "home"} size={26} color="#38BDF8" strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-1)", fontFamily: "'Sora', sans-serif", marginBottom: 8, letterSpacing: "-0.025em" }}>
            {navSections.flatMap(s => s.items).find(i => i.id === activePage)?.label}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-3)" }}>This section is coming in the next build 🚀</p>
        </div>
      );
    }
  };
  return <DashboardShell navigate={navigate} role="company" navItems={[]} navSections={navSections} user={user} theme={theme} setTheme={setTheme} activePage={activePage} setActivePage={setActivePage}>{renderContent()}</DashboardShell>;
}

function AdminPortal({ navigate, theme, setTheme }) {
  const [activePage, setActivePage] = useState("dashboard");
  const navSections = [
    { label: "Overview", items: [
      { id: "dashboard",    icon: "dashboard",  label: "Dashboard"      },
      { id: "analytics",    icon: "activity",   label: "Analytics"      },
    ]},
    { label: "Management", items: [
      { id: "approvals",    icon: "zap",        label: "Approvals",     badge: 14, badgeColor: "#F87171" },
      { id: "companies",    icon: "building",   label: "Companies"      },
      { id: "seafarers",    icon: "anchor",     label: "Seafarers"      },
      { id: "jobs",         icon: "briefcase",  label: "Job Postings"   },
    ]},
    { label: "Platform", items: [
      { id: "subscriptions",icon: "creditCard", label: "Subscriptions"  },
      { id: "settings",     icon: "settings",   label: "Settings"       },
    ]},
  ];
  const user = { name: "System Admin", avatar: "SA", role: "Super Admin" };
  const renderContent = () => {
    switch (activePage) {
      case "dashboard": return <AdminHome />;
      default: return (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "60px 24px", textAlign: "center", boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(248,113,113,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name={navSections.flatMap(s => s.items).find(i => i.id === activePage)?.icon || "home"} size={26} color="#F87171" strokeWidth={1.8} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-1)", fontFamily: "'Sora', sans-serif", marginBottom: 8, letterSpacing: "-0.025em" }}>
            {navSections.flatMap(s => s.items).find(i => i.id === activePage)?.label}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-3)" }}>This section is coming in the next build 🚀</p>
        </div>
      );
    }
  };
  return <DashboardShell navigate={navigate} role="admin" navItems={[]} navSections={navSections} user={user} theme={theme} setTheme={setTheme} activePage={activePage} setActivePage={setActivePage}>{renderContent()}</DashboardShell>;
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const { path, navigate } = useRouter();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
        @keyframes ringPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.1;transform:scale(1.05)}}
        @keyframes logoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        a{text-decoration:none;}
      `}</style>

      {/* Splash screen */}
      {loading && <SplashScreen onDone={() => setLoading(false)} />}

      {/* Router */}
      {!loading && (
        <>
          {(path === "/" || path === "") && <LandingPage navigate={navigate} />}
          {path === "/login"    && <AuthPage navigate={navigate} initialMode="login"    />}
          {path === "/register" && <AuthPage navigate={navigate} initialMode="register" />}
          {path.startsWith("/seafarer") && <SeafarerPortal navigate={navigate} theme={theme} setTheme={setTheme} />}
          {path.startsWith("/company")  && <CompanyPortal  navigate={navigate} theme={theme} setTheme={setTheme} />}
          {path.startsWith("/admin")    && <AdminPortal    navigate={navigate} theme={theme} setTheme={setTheme} />}
        </>
      )}
    </>
  );
}
