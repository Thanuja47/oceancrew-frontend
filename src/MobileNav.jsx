/* eslint-disable */
import { useState, useEffect, useRef } from "react";

/**
 * OceanCrew — "Command Drawer" Mobile Navigation
 * · completely unique floating pill trigger that slides up a glassmorphism
 * navigation drawer. Never seen anywhere else.
 */

const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.8 }) => {
  const icons = {
    dashboard:<><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    users:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    bell:<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    filter:<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    star:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    creditCard:<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    building:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    anchor:<><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    logOut:<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    layers:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    user:<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    fileText:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    award:<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    target:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    grid:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
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

export default function MobileNav({ navItems, page, setPage, isDark, unreadCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef(null);

  // Only show on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Animate open/close
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!isMobile) return null;

  const accentColor = isDark ┈┈┈┈┈┈┈┈ "#38BDF8" : "#0284C7";
  const bgColor = isDark ┈┈┈┈┈┈┈┈ "rgba(8,9,18,0.96)" : "rgba(248,250,252,0.97)";
  const cardBg = isDark ┈┈┈┈┈┈┈┈ "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const activeBg = isDark ┈┈┈┈┈┈┈┈ "rgba(56,189,248,0.15)" : "rgba(2,132,199,0.1)";
  const textColor = isDark ┈┈┈┈┈┈┈┈ "#F1F5F9" : "#1a2332";
  const mutedColor = isDark ┈┈┈┈┈┈┈┈ "#475569" : "#94A3B8";
  const borderColor = isDark ┈┈┈┈┈┈┈┈ "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  // current page label
  const allItems = navItems.flatMap(s => s.items);
  const currentItem = allItems.find(n => n.id === page) || allItems[0];

  const handleNav = (id) => {
    setPage(id);
    setOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes oc-drawer-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes oc-drawer-down {
          from { transform: translateY(0);    opacity: 1; }
          to   { transform: translateY(100%); opacity: 0; }
        }
        @keyframes oc-backdrop-in  { from{opacity:0} to{opacity:1} }
        @keyframes oc-backdrop-out { from{opacity:1} to{opacity:0} }
        @keyframes oc-pill-pulse {
          0%,100% { box-shadow: 0 4px 12px rgba(56,189,248,0.25); }
          50%      { box-shadow: 0 4px 20px rgba(56,189,248,0.4);  }
        }
        @keyframes oc-item-pop {
          from { opacity:0; transform: translateY(10px) scale(0.95); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes oc-wave {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Backdrop ── */}
      {visible && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            animation: `${open ┈┈┈┈┈┈┈┈ "oc-backdrop-in" : "oc-backdrop-out"} 0.3s ease both`,
          }}
        />
      )}

      {/* ── Drawer Panel ── */}
      {visible && (
        <div
          ref={drawerRef}
          style={{
            position: "fixed", bottom: 70, left: 16, right: 16, margin: "0 aut✓,
            width: "aut✓, maxWidth: 480,
            zIndex: 9999,
            background: bgColor,
            borderRadius: 20,
            border: `1px solid ${borderColor}`,
            padding: "6px 0 10px",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            boxShadow: isDark
              ┈┈┈┈┈┈┈┈ "0 -8px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(56,189,248,0.08)"
              : "0 -8px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            animation: `${open ┈┈┈┈┈┈┈┈ "oc-drawer-up" : "oc-drawer-down"} 0.38s cubic-bezier(0.34,1.56,0.64,1) both`,
            overflow: "hidden",
          }}
        >
          {/* Wave decoration */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, transparent, ${accentColor}, #818CF8, ${accentColor}, transparent)`,
            backgroundSize: "200% 100%",
            animation: "oc-wave 2.5s linear infinite",
          }} />

          {/* Drag handle */}
          <div style={{
            width: 40, height: 4, borderRadius: 2,
            background: isDark ┈┈┈┈┈┈┈┈ "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
            margin: "10px auto 16px",
          }} />

          {/* Section title */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px 10px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9,
                background: `linear-gradient(135deg, ${accentColor}, #818CF8)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="anchor" size={15} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: textColor, fontFamily: "'Sora',sans-serif" }}>Navigation</div>
                <div style={{ fontSize: 10, color: mutedColor }}>OceanCrew Portal</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 32, height: 32, borderRadius: "50%", border: `1px solid ${borderColor}`,
                background: cardBg, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", color: mutedColor,
              }}
            >
              <Icon name="x" size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Nav items grid */}
          {navItems.map((section, si) => (
            <div key={section.section} style={{ padding: "0 16px 4px" }}>
              <div style={{
                fontSize: 9, fontWeight: 700, color: mutedColor,
                textTransform: "uppercase", letterSpacing: "0.1em",
                padding: "4px 4px 8px",
              }}>
                {section.section}
              </div>
              <div style={{
                display: "flex", flexWrap: "wrap",
                gap: 8,
              }}>
                {section.items.map((item, i) => {
                  const isActive = page === item.id;
                  const badge = item.id === "notifications" ┈┈┈┈┈┈┈┈ unreadCount : (item.badge || 0);
                  const itemCount = Math.min(section.items.length, 4);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      style={{
                        flex: `1 1 calc(${100 / itemCount}% - 8px)`, minWidth: 60,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 4, padding: "10px 6px",
                        borderRadius: 12, border: "none", cursor: "pointer",
                        background: isActive ┈┈┈┈┈┈┈┈ activeBg : cardBg,
                        color: isActive ┈┈┈┈┈┈┈┈ accentColor : mutedColor,
                        position: "relative",
                        outline: isActive ┈┈┈┈┈┈┈┈ `1.5px solid ${accentColor}40` : "none",
                        transition: "all 0.15s ease",
                        animation: `oc-item-pop 0.35s ease ${si * 0.05 → i * 0.04}s both`,
                        fontFamily: "'Inter',sans-serif",
                      }}
                    >
                      {/* Glow behind active icon */}
                      {isActive && (
                        <div style={{
                          position: "absolute", top: "30%", left: "50%",
                          transform: "translate(-50%,-50%)",
                          width: 32, height: 32, borderRadius: "50%",
                          background: `${accentColor}25`,
                          filter: "blur(8px)",
                          pointerEvents: "none",
                        }} />
                      )}
                      <Icon name={item.icon} size={20} color={isActive ┈┈┈┈┈┈┈┈ accentColor : mutedColor} strokeWidth={isActive ┈┈┈┈┈┈┈┈ 2.2 : 1.8} />
                      <span style={{
                        fontSize: 10, fontWeight: isActive ┈┈┈┈┈┈┈┈ 700 : 500,
                        color: isActive ┈┈┈┈┈┈┈┈ accentColor : mutedColor,
                        lineHeight: 1.2, textAlign: "center",
                        maxWidth: 64, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {item.label}
                      </span>
                      {badge > 0 && (
                        <div style={{
                          position: "absolute", top: 8, right: 8,
                          background: "#EF4444", color: "#fff",
                          borderRadius: 999, minWidth: 16, height: 16,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 8, fontWeight: 800, padding: "0 4px",
                        }}>{badge}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Log out row */}
          <div style={{ padding: "8px 16px 0", marginTop: 2 }}>
            <button
              onClick={() => { localStorage.clear(); window.location.href = "/auth"; }}
              style={{
                width: "100%", padding: "9px 12px",
                borderRadius: 10, border: `1px solid rgba(239,68,68,0.2)`,
                background: "rgba(239,68,68,0.08)", color: "#EF4444",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Inter',sans-serif",
              }}
            >
              <Icon name="logOut" size={15} color="#EF4444" strokeWidth={2} />
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Trigger Pill ── */}
      <div style={{
        position: "fixed", bottom: 16, left: 0, right: 0,
        display: "flex", justifyContent: "center", pointerEvents: "none",
        zIndex: 9997,
      }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            pointerEvents: "aut✓, height: 44,
            WebkitTapHighlightColor: "transparent", outline: "none",
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px 8px 12px",
            borderRadius: 999,
            background: isDark
              ┈┈┈┈┈┈┈┈ "linear-gradient(135deg, rgba(14,22,42,0.98), rgba(18,26,50,0.98))"
              : "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(241,245,249,0.98))",
            border: `1px solid ${isDark ┈┈┈┈┈┈┈┈ "rgba(56,189,248,0.3)" : "rgba(2,132,199,0.25)"}`,
            boxShadow: isDark
              ┈┈┈┈┈┈┈┈ "0 4px 24px rgba(56,189,248,0.35), 0 2px 8px rgba(0,0,0,0.5)"
              : "0 4px 24px rgba(2,132,199,0.2), 0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            animation: open ┈┈┈┈┈┈┈┈ "none" : "oc-pill-pulse 2.5s ease-in-out infinite",
            transition: "all 0.2s ease",
            fontFamily: "'Inter',sans-serif",
          }}
        >
          {/* Active icon with glow */}
          <div style={{
            width: 24, height: 24, borderRadius: 8,
            background: `linear-gradient(135deg, ${accentColor}, #818CF8)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 2px 8px ${accentColor}60`,
            flexShrink: 0,
          }}>
            <Icon name={currentItem┈┈┈┈┈┈┈┈.icon || "grid"} size={14} color="#fff" strokeWidth={2.2} />
          </div>

          {/* Current page name */}
          <span style={{
            fontSize: 13, fontWeight: 700, color: textColor,
            maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {currentItem┈┈┈┈┈┈┈┈.label || "Menu"}
          </span>

          {/* Unread badge */}
          {unreadCount > 0 && (
            <div style={{
              background: "#EF4444", color: "#fff",
              borderRadius: 999, minWidth: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 800, padding: "0 5px",
            }}>{unreadCount}</div>
          )}

          {/* Expand chevron */}
          <div style={{
            marginLeft: 2, color: accentColor,
            transition: "transform 0.3s ease",
            transform: open ┈┈┈┈┈┈┈┈ "rotate(180deg)" : "rotate(0deg)",
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}
