/* eslint-disable */
import { useState, useEffect, useCallback } from "react";
import LandingPage     from "./LandingPage_Premium";
import OceanCrewAuth   from "./OceanCrewAuth";
import SeafarerDashboard from "./SeafarerDashboard_Premium";
import CompanyDashboard  from "./CompanyDashboard_Premium";
import AdminPanel        from "./AdminPanel_Premium";

/* ─────────────────────────────────────────────
   MINI HASH ROUTER
───────────────────────────────────────────── */
function useRouter() {
  const [path, setPath] = useState(
    window.location.hash.replace("#", "") || "/"
  );

  useEffect(() => {
    const onHash = () =>
      setPath(window.location.hash.replace("#", "") || "/");
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
   SPLASH SCREEN
───────────────────────────────────────────── */
function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 600);
        }, 400);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg,#08090C 0%,#0F2444 60%,#0284C7 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1, transition: "opacity 0.6s ease",
    }}>
      <style>{`
        @keyframes ringPulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.1;transform:scale(1.05)} }
        @keyframes logoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      {/* Rings */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
        {[300,450,600].map((size,i) => (
          <div key={i} style={{ position:"absolute", width:size, height:size, borderRadius:"50%", border:"1px solid rgba(56,189,248,0.12)", animation:`ringPulse ${2+i*0.5}s ease-in-out infinite ${i*0.3}s` }} />
        ))}
      </div>

      {/* Logo */}
      <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
        <div style={{
          width:84, height:84, borderRadius:22,
          background:"linear-gradient(135deg,#0284C7,#38BDF8)",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 24px",
          boxShadow:"0 0 60px rgba(56,189,248,0.5),0 0 120px rgba(2,132,199,0.3)",
          animation:"logoFloat 3s ease-in-out infinite",
        }}>
          {/* Waves SVG */}
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
          </svg>
        </div>

        <h1 style={{ fontSize:42, fontWeight:800, color:"#fff", letterSpacing:"-0.04em", fontFamily:"'Sora',sans-serif", marginBottom:6 }}>
          OceanCrew
        </h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, marginBottom:48 }}>
          by SKYbird Systems
        </p>

        {/* Progress bar */}
        <div style={{ width:260, height:4, background:"rgba(255,255,255,0.1)", borderRadius:4, overflow:"hidden", margin:"0 auto 16px" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#0284C7,#38BDF8)", borderRadius:4, transition:"width 0.35s cubic-bezier(.4,0,.2,1)" }} />
        </div>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", letterSpacing:"0.04em" }}>
          {progress < 100 ? "Initializing platform…" : "Ready"}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const { path, navigate } = useRouter();
  const [loading, setLoading] = useState(true);

  /* Inject global fonts + reset */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden;}
        a{text-decoration:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Splash */}
      {loading && <SplashScreen onDone={() => setLoading(false)} />}

      {/* Router — renders after splash */}
      {!loading && (
        <>
          {/* Landing Page */}
          {(path === "/" || path === "") && (
            <LandingPage navigate={navigate} />
          )}

          {/* Auth */}
          {(path === "/login" || path === "/register") && (
            <OceanCrewAuth
              navigate={navigate}
              initialMode={path === "/register" ? "register" : "login"}
            />
          )}

          {/* Seafarer Dashboard */}
          {path.startsWith("/seafarer") && (
            <SeafarerDashboard navigate={navigate} />
          )}

          {/* Company Dashboard */}
          {path.startsWith("/company") && (
            <CompanyDashboard navigate={navigate} />
          )}

          {/* Admin Panel */}
          {path.startsWith("/admin") && (
            <AdminPanel navigate={navigate} />
          )}
        </>
      )}
    </>
  );
}
