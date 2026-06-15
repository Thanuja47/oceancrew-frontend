import React, { useState } from "react";
import { Link } from "react-router-dom";

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    anchor:<><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    arrowRight:<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    fileText:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    messageCircle:<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></>,
    creditCard:<><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    globe:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
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

export default function LandingPage({ isDark = true }) {
  const [hovered, setHovered] = useState(null);

  const T = {
    bg: isDark ? "#0A0F1A" : "#FFFFFF",
    bg2: isDark ? "#121A2F" : "#F8FAFC",
    t1: isDark ? "#F8FAFC" : "#0F172A",
    t2: isDark ? "#E2E8F0" : "#334155",
    t3: isDark ? "#94A3B8" : "#64748B",
    primary: isDark ? "#38BDF8" : "#0EA5E9",
    accent: isDark ? "#0EA5E9" : "#0284C7",
    cardBg: isDark ? "rgba(30, 41, 59, 0.4)" : "#FFFFFF",
    border: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(100, 116, 139, 0.15)",
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: T.bg,
      color: T.t1,
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
      position: "relative"
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%", width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(10, 15, 26, 0) 70%)",
        filter: "blur(60px)", zIndex: 0, borderRadius: "50%", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "-10%", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, rgba(10, 15, 26, 0) 70%)",
        filter: "blur(60px)", zIndex: 0, borderRadius: "50%", pointerEvents: "none"
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: isDark ? "rgba(10, 15, 26, 0.8)" : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}`,
        padding: "16px 5%", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px rgba(56, 189, 248, 0.3)` }}>
            <Icon name="anchor" color="#fff" size={20} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: T.t1, fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>OceanCrew</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", gap: 24, display: window.innerWidth < 768 ? "none" : "flex" }}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} style={{ color: T.t2, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = T.primary} onMouseLeave={(e) => e.target.style.color = T.t2}>
                {link.name}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link to="/auth" style={{ color: T.t1, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Log In</Link>
            <Link to="/auth" style={{
              background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              color: "#fff", textDecoration: "none", padding: "10px 20px", borderRadius: 8,
              fontSize: 14, fontWeight: 600, transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: `0 4px 14px rgba(56, 189, 248, 0.25)`
            }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 6px 20px rgba(56, 189, 248, 0.4)` }}
              onMouseLeave={(e) => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 4px 14px rgba(56, 189, 248, 0.25)` }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: "160px 5% 100px", maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 30,
          background: "rgba(56, 189, 248, 0.1)", border: `1px solid rgba(56, 189, 248, 0.2)`,
          color: T.primary, fontSize: 13, fontWeight: 600, marginBottom: 24, letterSpacing: "0.02em"
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.primary, boxShadow: `0 0 10px ${T.primary}` }} />
          The Modern Maritime Platform
        </div>
        
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, fontFamily: "'Sora', sans-serif",
          lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24, color: T.t1
        }}>
          Connect with the Best <br />
          <span style={{
            background: `linear-gradient(to right, ${T.primary}, #818CF8)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Maritime Talent</span> Worldwide
        </h1>
        
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: T.t3, maxWidth: 680, margin: "0 auto 40px", lineHeight: 1.6
        }}>
          OceanCrew revolutionizes marine recruitment. Seamlessly match skilled seafarers with top shipping companies globally using AI-driven tools.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link to="/auth?role=company" style={{
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: "#fff",
            textDecoration: "none", padding: "16px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
            boxShadow: `0 8px 24px rgba(56, 189, 248, 0.3)`
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
            Hire Crew <Icon name="arrowRight" size={18} />
          </Link>
          <Link to="/auth?role=seafarer" style={{
            background: "transparent", color: T.t1, border: `2px solid ${T.border}`,
            textDecoration: "none", padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.cardBg; e.currentTarget.style.borderColor = T.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.border; }}>
            Find Jobs <Icon name="search" size={18} />
          </Link>
        </div>

        {/* Dashboard Preview Image */}
        <div style={{
          marginTop: 80, position: "relative", borderRadius: 16, border: `1px solid ${T.border}`,
          background: T.bg2, padding: 8, boxShadow: `0 24px 64px rgba(0,0,0,0.4)`
        }}>
          <div style={{ display: "flex", gap: 6, padding: "8px 12px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
          </div>
          <div style={{
            height: 400, borderRadius: 10, background: `linear-gradient(to bottom right, ${T.cardBg}, rgba(0,0,0,0.2))`,
            display: "flex", alignItems: "center", justifyContent: "center", color: T.t3,
            backgroundImage: `url('https://images.unsplash.com/photo-1542124505-797746522cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.8
          }}>
            <div style={{
              background: "rgba(10, 15, 26, 0.7)", backdropFilter: "blur(8px)", padding: "20px 40px",
              borderRadius: 12, border: `1px solid ${T.border}`, color: "#fff", fontSize: 20, fontWeight: 600
            }}>
              Interactive Dashboards Inside
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "100px 5%", background: T.bg2, position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, fontFamily: "'Sora', sans-serif", color: T.t1, marginBottom: 16 }}>
              Why Choose OceanCrew
            </h2>
            <p style={{ fontSize: 18, color: T.t3, maxWidth: 600, margin: "0 auto" }}>
              Built specifically for the maritime industry, replacing outdated methods with modern technology.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {[
              { icon: "briefcase", title: "Smart Job Matching", desc: "Algorithms match seafarer qualifications with exact company requirements instantly." },
              { icon: "fileText", title: "Automated CV Builder", desc: "Seafarers can generate professional, industry-standard CVs with one click." },
              { icon: "shield", title: "Verified Profiles", desc: "Built-in document verification ensures candidates have valid certificates." },
              { icon: "messageCircle", title: "Direct Communication", desc: "Real-time messaging between crew managers and candidates." },
              { icon: "creditCard", title: "Secure Payments", desc: "Integrated Stripe billing for premium features and subscriptions." },
              { icon: "globe", title: "Global Reach", desc: "Connect with talent and opportunities across international waters." }
            ].map((f, i) => (
              <div key={i} style={{
                background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 16, padding: 32,
                transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden"
              }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: hovered === i ? T.primary : "rgba(56, 189, 248, 0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
                  transition: "all 0.3s", color: hovered === i ? "#fff" : T.primary
                }}>
                  <Icon name={f.icon} size={24} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: T.t1, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: T.t3, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: "64px 5%", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="anchor" color="#fff" size={16} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: T.t1, fontFamily: "'Sora', sans-serif" }}>OceanCrew</span>
            </div>
            <p style={{ color: T.t3, maxWidth: 300, fontSize: 14, lineHeight: 1.6 }}>
              The premium platform connecting maritime professionals with global shipping companies.
            </p>
          </div>
          
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <div>
              <h4 style={{ color: T.t1, fontWeight: 700, marginBottom: 16 }}>Platform</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Find Jobs", "Hire Crew", "Pricing", "Features"].map(l => (
                  <Link key={l} to="/auth" style={{ color: T.t3, textDecoration: "none", fontSize: 14 }}>{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: T.t1, fontWeight: 700, marginBottom: 16 }}>Support</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Help Center", "Terms of Service", "Privacy Policy", "Contact Us"].map(l => (
                  <Link key={l} to="#" style={{ color: T.t3, textDecoration: "none", fontSize: 14 }}>{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: 1200, margin: "64px auto 0", paddingTop: 24, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: T.t3, fontSize: 14 }}>&copy; 2026 OceanCrew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
