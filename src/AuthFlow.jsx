import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Icon = ({ name, size=18, color="currentColor", strokeWidth=1.8 }) => {
  const icons = {
    anchor:<><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff:<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
    mail:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    lock:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    user:<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    building:<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    phone:<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    arrowLeft:<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    send:<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    alertCircle:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    moon:<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
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

/* â”€â”€ FIELD â”€â”€ */
function Field({ label, placeholder, type="text", value, onChange, icon, isDark, error }) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";

  const borderColor = error
    ? (isDark ? "#F87171" : "#DC2626")
    : focused
      ? (isDark ? "#38BDF8" : "#1a2332")
      : (isDark ? "rgba(255,255,255,0.1)" : "rgba(100,116,139,0.2)");

  return (
    <div>
      {label && (
        <div style={{fontSize:10,fontWeight:700,color:isDark?"#475569":"#94A3B8",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:7,fontFamily:"'Inter',sans-serif"}}>
          {label}
        </div>
      )}
      <div style={{position:"relative"}}>
        {icon && (
          <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",opacity:focused?1:0.5}}>
            <Icon name={icon} size={15} color={focused?(isDark?"#38BDF8":"#1a2332"):(isDark?"#475569":"#94A3B8")} strokeWidth={2}/>
          </span>
        )}
        <input
          type={isPassword && showPw ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width:"100%",
            padding:`13px ${isPassword?"44px":"16px"} 13px ${icon?"42px":"16px"}`,
            borderRadius:12,
            border:`1.5px solid ${borderColor}`,
            background:isDark?"rgba(255,255,255,0.04)":"rgba(100,116,139,0.05)",
            color:isDark?"#F1F5F9":"#1a2332",
            fontSize:14,outline:"none",
            fontFamily:"'Inter',sans-serif",
            boxSizing:"border-box",
            transition:"border-color 0.2s",
            boxShadow:focused?(isDark?"0 0 0 3px rgba(56,189,248,0.1)":"0 0 0 3px rgba(26,35,50,0.06)"):"none",
          }}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPw(s=>!s)}
            style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:isDark?"#475569":"#94A3B8",padding:0,display:"flex",alignItems:"center"}}>
            <Icon name={showPw?"eyeOff":"eye"} size={15} color="currentColor" strokeWidth={2}/>
          </button>
        )}
      </div>
      {error && (
        <div style={{fontSize:11,color:isDark?"#F87171":"#DC2626",marginTop:5,display:"flex",alignItems:"center",gap:5,fontFamily:"'Inter',sans-serif"}}>
          <Icon name="alertCircle" size={11} color={isDark?"#F87171":"#DC2626"} strokeWidth={2}/>{error}
        </div>
      )}
    </div>
  );
}

/* â”€â”€ LAYOUT â”€â”€ */
function AuthLayout({ children, isDark, rightContent }) {
  return (
    <div style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr"}}>
      {/* Left */}
      <div style={{
        display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
        padding:"48px 40px",minHeight:"100vh",
        background:isDark?"#08090C":"linear-gradient(145deg,#dce8f5,#e8eef7,#edf2f9)",
      }}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:48,alignSelf:"flex-start"}}>
          <div style={{width:40,height:40,borderRadius:11,
            background:isDark?"linear-gradient(135deg,#0284C7,#38BDF8)":"#1a2332",
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:isDark?"0 4px 16px rgba(2,132,199,0.35)":"0 4px 12px rgba(26,35,50,0.22)"}}>
            <Icon name="anchor" size={18} color="#fff" strokeWidth={2}/>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:18,color:isDark?"#F1F5F9":"#1a2332",fontFamily:"'Sora',sans-serif",lineHeight:1.1}}>OceanCrew</div>
            <div style={{fontSize:8,color:isDark?"#38BDF8":"#94A3B8",letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:600}}>by SKYbird Systems</div>
          </div>
        </div>
        <div style={{width:"100%",maxWidth:420}}>{children}</div>
      </div>

      {/* Right */}
      <div style={{
        background:"linear-gradient(160deg,#0C1A2E,#0A2440,#072040)",
        display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
        padding:"60px 48px",position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:"-10%",right:"-10%",width:400,height:400,borderRadius:"50%",background:"rgba(56,189,248,0.05)",filter:"blur(60px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-10%",left:"-5%",width:300,height:300,borderRadius:"50%",background:"rgba(167,139,250,0.06)",filter:"blur(50px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(56,189,248,0.08) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none",opacity:0.5}}/>
        <div style={{position:"relative",zIndex:1,textAlign:"center",width:"100%"}}>
          {rightContent}
        </div>
      </div>
    </div>
  );
}

/* â•â• LOGIN â•â• */
function LoginPage({ isDark, onNavigate }) {
  const [form, setForm] = useState({ email:"", password:"", remember:false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const ac = isDark ? "#38BDF8" : "#1a2332";
  const t1 = isDark ? "#F1F5F9" : "#1a2332";
  const t2 = isDark ? "#94A3B8" : "#4a5568";
  const t3 = isDark ? "#475569" : "#94A3B8";
  const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(100,116,139,0.2)";

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleLogin = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("https://oceancrew-backend-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setSuccess(true);
        // Save token or user info if needed
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user?.role || "seafarer");
        
        setTimeout(() => {
          if (data.user?.role === "company") onNavigate("company-dashboard");
          else if (data.user?.role === "admin") onNavigate("admin-dashboard");
          else onNavigate("dashboard");
        }, 1200);
      } else {
        setErrors({ email: data.message || "Invalid credentials. Please try again." });
      }
    } catch (err) {
      setLoading(false);
      setErrors({ email: "Could not connect to server. Please try again later." });
    }
  };

  const rightContent = (
    <div>
      <div style={{fontSize:56,marginBottom:24}}>âš“</div>
      <h2 style={{fontSize:30,fontWeight:700,color:"#fff",fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:14,lineHeight:1.2}}>
        Welcome back to<br/><span style={{color:"#38BDF8"}}>OceanCrew</span>
      </h2>
      <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.75,marginBottom:36,maxWidth:300,margin:"0 auto 36px"}}>
        The world's most trusted maritime recruitment platform.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,maxWidth:340,margin:"0 auto"}}>
        {[{val:"12,847",label:"Seafarers"},{val:"863",label:"Companies"},{val:"98%",label:"Success"}].map((s,i)=>(
          <div key={i} style={{padding:"16px 10px",borderRadius:14,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{fontSize:20,fontWeight:700,color:"#38BDF8",fontFamily:"'Sora',sans-serif",marginBottom:4}}>{s.val}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",letterSpacing:1,textTransform:"uppercase"}}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AuthLayout isDark={isDark} rightContent={rightContent}>
      <div>
        <h1 style={{fontSize:30,fontWeight:700,color:t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:6}}>Sign in</h1>
        <p style={{fontSize:14,color:t2,marginBottom:32}}>
          New to OceanCrew?{" "}
          <button onClick={()=>onNavigate("register")} style={{color:ac,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontSize:14,fontFamily:"'Inter',sans-serif",padding:0}}>
            Create an account â†’
          </button>
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:20}}>
          <Field label="Email Address" placeholder="you@example.com" type="email" icon="mail" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} isDark={isDark} error={errors.email}/>
          <Field label="Password" placeholder="Enter your password" type="password" icon="lock" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} isDark={isDark} error={errors.password}/>
        </div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
            <div onClick={()=>setForm(p=>({...p,remember:!p.remember}))}
              style={{width:18,height:18,borderRadius:5,border:`1.5px solid ${form.remember?ac:border}`,background:form.remember?ac:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",cursor:"pointer"}}>
              {form.remember && <Icon name="check" size={11} color="#fff" strokeWidth={2.5}/>}
            </div>
            <span style={{fontSize:13,color:t2,fontFamily:"'Inter',sans-serif"}}>Remember me</span>
          </label>
          <button onClick={()=>onNavigate("forgot")} style={{color:ac,background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"'Inter',sans-serif",fontWeight:500,padding:0}}>
            Forgot password?
          </button>
        </div>

        <button onClick={handleLogin} disabled={loading||success}
          style={{width:"100%",padding:"14px",borderRadius:12,border:"none",
            background:success?"linear-gradient(135deg,#34D399,#10B981)":(isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332"),
            color:"#fff",fontSize:14,fontWeight:700,cursor:loading||success?"not-allowed":"pointer",
            fontFamily:"'Inter',sans-serif",transition:"all 0.25s",
            boxShadow:isDark?"0 4px 20px rgba(56,189,248,0.3)":"0 4px 20px rgba(26,35,50,0.25)",
            display:"flex",alignItems:"center",justifyContent:"center",gap:10,opacity:loading?0.8:1,marginBottom:20}}>
          {loading ? (
            <><div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",animation:"spin 0.7s linear infinite"}}/> Signing in...</>
          ) : success ? (
            <><Icon name="check" size={18} color="#fff" strokeWidth={2.5}/> Signed in!</>
          ) : "Sign In â†’"}
        </button>

        <div style={{display:"flex",alignItems:"center",gap:12,margin:"4px 0 20px"}}>
          <div style={{flex:1,height:1,background:isDark?"rgba(255,255,255,0.07)":"rgba(100,116,139,0.15)"}}/>
          <span style={{fontSize:12,color:t3,fontFamily:"'Inter',sans-serif"}}>or continue as</span>
          <div style={{flex:1,height:1,background:isDark?"rgba(255,255,255,0.07)":"rgba(100,116,139,0.15)"}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{label:"Seafarer",icon:"anchor"},{label:"Company",icon:"building"}].map(r=>(
            <button key={r.label} onClick={()=>onNavigate("register")}
              style={{padding:"12px",borderRadius:12,border:`1.5px solid ${border}`,background:"transparent",color:t2,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=ac;e.currentTarget.style.color=ac;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=t2;}}>
              <Icon name={r.icon} size={15} color="currentColor" strokeWidth={2}/>{r.label}
            </button>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}

/* â•â• REGISTER â•â• */
function RegisterPage({ isDark, onNavigate }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [form, setForm] = useState({name:"",email:"",password:"",confirm:"",phone:"",rank:"",company:""});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const ac = isDark ? "#38BDF8" : "#1a2332";
  const t1 = isDark ? "#F1F5F9" : "#1a2332";
  const t2 = isDark ? "#94A3B8" : "#4a5568";
  const t3 = isDark ? "#475569" : "#94A3B8";
  const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(100,116,139,0.2)";
  const ranks = ["Master","Chief Officer","2nd Officer","3rd Officer","Chief Engineer","2nd Engineer","3rd Engineer","ETO","Bosun","AB Seaman","Cook"];

  const pwStrength = (pw) => {
    if (!pw) return { score:0, label:"", color:"" };
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    const map = [{label:"Weak",color:"#F87171"},{label:"Fair",color:"#FBBF24"},{label:"Good",color:"#38BDF8"},{label:"Strong",color:"#34D399"}];
    return { score:s, ...map[s-1]||{} };
  };
  const pws = pwStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.password || form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.phone) e.phone = "Phone required";
    if (type === "seafarer" && !form.rank) e.rank = "Select your rank";
    if (type === "company" && !form.company) e.company = "Company name required";
    return e;
  };

  const handleNext = async () => {
    if (step === 1) { if (!type) return; setStep(2); return; }
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("https://oceancrew-backend-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: type,
          phone: form.phone,
          rank: form.rank,
          companyName: form.company
        })
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setStep(3);
      } else {
        setErrors({ email: data.message || "Registration failed. Please try again." });
      }
    } catch (err) {
      setLoading(false);
      setErrors({ email: "Could not connect to server. Please try again later." });
    }
  };

  const features = type === "company"
    ? ["Access 12,000+ verified seafarers","Post jobs in minutes","Smart rank-based matching","Full hiring pipeline tools"]
    : ["Browse all jobs for free","Apply with one click (Pro)","Secure document vault","Professional CV generation"];

  const rightContent = (
    <div>
      <div style={{fontSize:46,marginBottom:18}}>{type==="company"?"ðŸ¢":"âš“"}</div>
      <h2 style={{fontSize:26,fontWeight:700,color:"#fff",fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:12,lineHeight:1.2}}>
        {type==="company"?"Find the Right Crew":"Your Career Starts Here"}
      </h2>
      <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.75,maxWidth:280,margin:"0 auto 28px"}}>
        {type==="company"?"Access verified seafarers and hire confidently.":"Join thousands of seafarers finding better contracts."}
      </p>
      <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:280,margin:"0 auto"}}>
        {features.map((f,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"rgba(52,211,153,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon name="check" size={11} color="#34D399" strokeWidth={2.5}/>
            </div>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.7)",textAlign:"left"}}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );

  /* Step 1 */
  if (step === 1) return (
    <AuthLayout isDark={isDark} rightContent={rightContent}>
      <div>
        <button onClick={()=>onNavigate("login")} style={{display:"flex",alignItems:"center",gap:6,color:t3,background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"'Inter',sans-serif",marginBottom:32,padding:0}}>
          <Icon name="arrowLeft" size={14} color="currentColor" strokeWidth={2}/>Back to login
        </button>
        <h1 style={{fontSize:28,fontWeight:700,color:t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:6}}>Create account</h1>
        <p style={{fontSize:14,color:t2,marginBottom:28}}>Choose how you're joining OceanCrew</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28}}>
          {[
            {id:"seafarer",icon:"anchor",title:"I'm a Seafarer",desc:"Looking for maritime jobs worldwide.",badge:"Free Forever",bc:"#34D399"},
            {id:"company",icon:"building",title:"I'm a Company",desc:"Looking for crew and maritime professionals.",badge:"From $49/mo",bc:"#38BDF8"},
          ].map(opt=>(
            <div key={opt.id} onClick={()=>setType(opt.id)}
              style={{padding:"22px 18px",borderRadius:14,cursor:"pointer",position:"relative",
                border:`2px solid ${type===opt.id?ac:border}`,
                background:type===opt.id?(isDark?"rgba(56,189,248,0.06)":"rgba(26,35,50,0.04)"):"transparent",
                transition:"all 0.2s"}}
              onMouseEnter={e=>{if(type!==opt.id)e.currentTarget.style.borderColor=isDark?"rgba(56,189,248,0.4)":"rgba(26,35,50,0.3)";}}
              onMouseLeave={e=>{if(type!==opt.id)e.currentTarget.style.borderColor=border;}}>
              {type===opt.id&&(
                <div style={{position:"absolute",top:10,right:10,width:20,height:20,borderRadius:"50%",background:ac,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Icon name="check" size={11} color="#fff" strokeWidth={2.5}/>
                </div>
              )}
              <Icon name={opt.icon} size={26} color={type===opt.id?ac:t3} strokeWidth={1.6}/>
              <div style={{fontSize:15,fontWeight:600,color:t1,fontFamily:"'Sora',sans-serif",margin:"10px 0 5px"}}>{opt.title}</div>
              <div style={{fontSize:12,color:t3,marginBottom:12,lineHeight:1.5}}>{opt.desc}</div>
              <span style={{fontSize:10,fontWeight:700,color:opt.bc,background:`${opt.bc}18`,padding:"3px 9px",borderRadius:999}}>{opt.badge}</span>
            </div>
          ))}
        </div>

        <button onClick={handleNext} disabled={!type}
          style={{width:"100%",padding:"14px",borderRadius:12,border:"none",
            background:!type?"rgba(100,116,139,0.2)":(isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332"),
            color:!type?t3:"#fff",fontSize:14,fontWeight:700,cursor:!type?"not-allowed":"pointer",
            fontFamily:"'Inter',sans-serif",marginBottom:16,
            boxShadow:type?(isDark?"0 4px 20px rgba(56,189,248,0.3)":"0 4px 20px rgba(26,35,50,0.25)"):"none"}}>
          Continue â†’
        </button>
        <p style={{textAlign:"center",fontSize:13,color:t3,fontFamily:"'Inter',sans-serif"}}>
          Already have an account?{" "}
          <button onClick={()=>onNavigate("login")} style={{color:ac,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"'Inter',sans-serif",padding:0}}>Sign in</button>
        </p>
      </div>
    </AuthLayout>
  );

  /* Step 2 */
  if (step === 2) return (
    <AuthLayout isDark={isDark} rightContent={rightContent}>
      <div>
        <button onClick={()=>setStep(1)} style={{display:"flex",alignItems:"center",gap:6,color:t3,background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"'Inter',sans-serif",marginBottom:24,padding:0}}>
          <Icon name="arrowLeft" size={14} color="currentColor" strokeWidth={2}/>Back
        </button>
        <h1 style={{fontSize:24,fontWeight:700,color:t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:4}}>
          {type==="seafarer"?"Seafarer Registration":"Company Registration"}
        </h1>
        <p style={{fontSize:13,color:t2,marginBottom:22}}>Fill your details to get started</p>

        <div style={{display:"flex",flexDirection:"column",gap:13,marginBottom:16}}>
          <Field label="Full Name" placeholder={type==="seafarer"?"e.g. Capt. Rajesh Fernando":"e.g. John Smith"} icon="user" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} isDark={isDark} error={errors.name}/>
          <Field label="Email" placeholder="you@example.com" type="email" icon="mail" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} isDark={isDark} error={errors.email}/>
          <Field label="Phone / WhatsApp" placeholder="+94 77 000 0000" icon="phone" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} isDark={isDark} error={errors.phone}/>

          {type==="seafarer" && (
            <div>
              <div style={{fontSize:10,fontWeight:700,color:t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:7,fontFamily:"'Inter',sans-serif"}}>Current Rank</div>
              <select value={form.rank} onChange={e=>setForm(p=>({...p,rank:e.target.value}))}
                style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${errors.rank?(isDark?"#F87171":"#DC2626"):border}`,background:isDark?"#0f1e36":"#fff",color:form.rank?t1:t3,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif"}}>
                <option value="">Select your rank</option>
                {ranks.map(r=><option key={r}>{r}</option>)}
              </select>
              {errors.rank&&<div style={{fontSize:11,color:isDark?"#F87171":"#DC2626",marginTop:5,fontFamily:"'Inter',sans-serif"}}>{errors.rank}</div>}
            </div>
          )}

          {type==="company" && (
            <Field label="Company Name" placeholder="e.g. Pacific Star Shipping Co." icon="building" value={form.company} onChange={e=>setForm(p=>({...p,company:e.target.value}))} isDark={isDark} error={errors.company}/>
          )}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <Field label="Password" placeholder="Min 8 characters" type="password" icon="lock" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} isDark={isDark} error={errors.password}/>
              {form.password && (
                <div style={{marginTop:7}}>
                  <div style={{display:"flex",gap:3,marginBottom:3}}>
                    {[1,2,3,4].map(i=>(
                      <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=pws.score?(pws.color||"#38BDF8"):(isDark?"rgba(255,255,255,0.08)":"rgba(100,116,139,0.15)"),transition:"background 0.3s"}}/>
                    ))}
                  </div>
                  {pws.label&&<div style={{fontSize:10,color:pws.color,fontFamily:"'Inter',sans-serif",fontWeight:600}}>{pws.label}</div>}
                </div>
              )}
            </div>
            <Field label="Confirm Password" placeholder="Repeat password" type="password" icon="lock" value={form.confirm} onChange={e=>setForm(p=>({...p,confirm:e.target.value}))} isDark={isDark} error={errors.confirm}/>
          </div>
        </div>

        <div style={{padding:"11px 14px",borderRadius:10,background:isDark?"rgba(56,189,248,0.05)":"rgba(26,35,50,0.03)",border:`1px solid ${isDark?"rgba(56,189,248,0.12)":"rgba(26,35,50,0.08)"}`,marginBottom:16,display:"flex",gap:9,alignItems:"flex-start"}}>
          <Icon name="shield" size={14} color={isDark?"#38BDF8":"#1a2332"} strokeWidth={2}/>
          <p style={{fontSize:11,color:t3,lineHeight:1.6,margin:0,fontFamily:"'Inter',sans-serif"}}>
            {type==="company"?"Your company will be verified by our admin team within 24 hours.":"Free to create. Upgrade to Pro ($4/mo) to apply to jobs."}
          </p>
        </div>

        <button onClick={handleNext} disabled={loading}
          style={{width:"100%",padding:"14px",borderRadius:12,border:"none",
            background:isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332",
            color:"#fff",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",
            fontFamily:"'Inter',sans-serif",
            boxShadow:isDark?"0 4px 20px rgba(56,189,248,0.3)":"0 4px 20px rgba(26,35,50,0.25)",
            display:"flex",alignItems:"center",justifyContent:"center",gap:10,opacity:loading?0.8:1}}>
          {loading ? (
            <><div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",animation:"spin 0.7s linear infinite"}}/> Creating account...</>
          ) : "Create Account â†’"}
        </button>
      </div>
    </AuthLayout>
  );

  /* Step 3 â€” success */
  return (
    <AuthLayout isDark={isDark} rightContent={
      <div>
        <div style={{fontSize:56,marginBottom:20}}>ðŸŽ‰</div>
        <h2 style={{fontSize:26,fontWeight:700,color:"#fff",fontFamily:"'Sora',sans-serif",marginBottom:12}}>You're all set!</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.75,maxWidth:280,margin:"0 auto"}}>
          {type==="company"?"Our team will verify your company within 24 hours.":"Start browsing jobs right away."}
        </p>
      </div>
    }>
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:isDark?"rgba(52,211,153,0.12)":"rgba(22,163,74,0.1)",border:`2px solid ${isDark?"rgba(52,211,153,0.4)":"rgba(22,163,74,0.3)"}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <Icon name="check" size={36} color={isDark?"#34D399":"#16A34A"} strokeWidth={2}/>
        </div>
        <h2 style={{fontSize:26,fontWeight:700,color:t1,fontFamily:"'Sora',sans-serif",marginBottom:10}}>Account Created!</h2>
        <p style={{fontSize:14,color:t2,lineHeight:1.7,marginBottom:8}}>Welcome to OceanCrew, <strong style={{color:t1}}>{form.name||"friend"}</strong>!</p>
        <p style={{fontSize:13,color:t3,lineHeight:1.7,marginBottom:32}}>
          {type==="company"
            ?"We'll verify your company and notify you at "+form.email+" within 24 hours."
            :"Your account is live. Browse all jobs free â€” upgrade to Pro ($4/mo) to apply."}
        </p>
        <button onClick={()=>onNavigate("login")}
          style={{width:"100%",padding:"14px",borderRadius:12,border:"none",
            background:isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332",
            color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",
            boxShadow:isDark?"0 4px 20px rgba(56,189,248,0.3)":"0 4px 20px rgba(26,35,50,0.25)"}}>
          Go to Dashboard â†’
        </button>
      </div>
    </AuthLayout>
  );
}

/* â•â• FORGOT PASSWORD â•â• */
function ForgotPage({ isDark, onNavigate }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ac = isDark ? "#38BDF8" : "#1a2332";
  const t1 = isDark ? "#F1F5F9" : "#1a2332";
  const t2 = isDark ? "#94A3B8" : "#4a5568";
  const t3 = isDark ? "#475569" : "#94A3B8";

  const handleSend = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1500);
  };

  const rightContent = (
    <div>
      <div style={{fontSize:52,marginBottom:20}}>ðŸ”’</div>
      <h2 style={{fontSize:26,fontWeight:700,color:"#fff",fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:12}}>Secure Recovery</h2>
      <p style={{fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.75,maxWidth:280,margin:"0 auto 28px"}}>Reset links expire after 30 minutes for your security.</p>
      <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:260,margin:"0 auto"}}>
        {["Link sent to your email","Expires in 30 minutes","One-time secure link","Contact support if needed"].map((f,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:10,background:"rgba(255,255,255,0.05)"}}>
            <Icon name="shield" size={13} color="#38BDF8" strokeWidth={2}/>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.65)",textAlign:"left"}}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === 2) return (
    <AuthLayout isDark={isDark} rightContent={rightContent}>
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{width:76,height:76,borderRadius:"50%",background:isDark?"rgba(56,189,248,0.1)":"rgba(26,35,50,0.06)",border:`2px solid ${isDark?"rgba(56,189,248,0.3)":"rgba(26,35,50,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <Icon name="send" size={30} color={ac} strokeWidth={1.5}/>
        </div>
        <h2 style={{fontSize:26,fontWeight:700,color:t1,fontFamily:"'Sora',sans-serif",marginBottom:10}}>Check your email</h2>
        <p style={{fontSize:14,color:t2,lineHeight:1.7,marginBottom:6}}>We sent a reset link to</p>
        <p style={{fontSize:14,fontWeight:600,color:ac,marginBottom:28}}>{email}</p>
        <div style={{padding:"14px 18px",borderRadius:12,background:isDark?"rgba(56,189,248,0.05)":"rgba(26,35,50,0.03)",border:`1px solid ${isDark?"rgba(56,189,248,0.12)":"rgba(26,35,50,0.08)"}`,marginBottom:28,textAlign:"left"}}>
          <p style={{fontSize:12,color:t3,lineHeight:1.7,margin:0,fontFamily:"'Inter',sans-serif"}}>
            Didn't get it? Check spam or{" "}
            <button onClick={()=>setStep(1)} style={{color:ac,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:"'Inter',sans-serif",padding:0}}>try again</button>.
          </p>
        </div>
        <button onClick={()=>onNavigate("login")}
          style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",boxShadow:isDark?"0 4px 20px rgba(56,189,248,0.3)":"0 4px 20px rgba(26,35,50,0.25)"}}>
          Back to Sign In
        </button>
      </div>
    </AuthLayout>
  );

  return (
    <AuthLayout isDark={isDark} rightContent={rightContent}>
      <div>
        <button onClick={()=>onNavigate("login")} style={{display:"flex",alignItems:"center",gap:6,color:t3,background:"none",border:"none",cursor:"pointer",fontSize:13,fontFamily:"'Inter',sans-serif",marginBottom:32,padding:0}}>
          <Icon name="arrowLeft" size={14} color="currentColor" strokeWidth={2}/>Back to login
        </button>
        <h1 style={{fontSize:28,fontWeight:700,color:t1,fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:6}}>Forgot password?</h1>
        <p style={{fontSize:14,color:t2,marginBottom:28,lineHeight:1.6}}>Enter your email and we'll send a reset link.</p>
        <div style={{marginBottom:24}}>
          <Field label="Email Address" placeholder="you@example.com" type="email" icon="mail" value={email} onChange={e=>setEmail(e.target.value)} isDark={isDark} error={error}/>
        </div>
        <button onClick={handleSend} disabled={loading}
          style={{width:"100%",padding:"14px",borderRadius:12,border:"none",
            background:isDark?"linear-gradient(135deg,#38BDF8,#0EA5E9)":"#1a2332",
            color:"#fff",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",
            fontFamily:"'Inter',sans-serif",
            boxShadow:isDark?"0 4px 20px rgba(56,189,248,0.3)":"0 4px 20px rgba(26,35,50,0.25)",
            display:"flex",alignItems:"center",justifyContent:"center",gap:10,opacity:loading?0.8:1,marginBottom:20}}>
          {loading ? (
            <><div style={{width:18,height:18,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",animation:"spin 0.7s linear infinite"}}/> Sending...</>
          ) : "Send Reset Link â†’"}
        </button>
        <p style={{textAlign:"center",fontSize:13,color:t3,fontFamily:"'Inter',sans-serif"}}>
          Remember it?{" "}
          <button onClick={()=>onNavigate("login")} style={{color:ac,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"'Inter',sans-serif",padding:0}}>Sign in</button>
        </p>
      </div>
    </AuthLayout>
  );
}

/* â•â• ROOT â•â• */
export default function AuthFlow() {
  const [page, setPage] = useState("login");
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const handleNavigate = (dest) => {
    if (dest === "dashboard") navigate("/seafarer");
    else if (dest === "company-dashboard") navigate("/company");
    else if (dest === "admin-dashboard") navigate("/admin");
    else setPage(dest);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body,html{font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes spin{to{transform:rotate(360deg)}}
        input,select,button{font-family:'Inter',-apple-system,sans-serif;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.3);border-radius:3px;}
      `}</style>

      {/* Theme toggle */}
      <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")}
        style={{position:"fixed",top:20,right:20,zIndex:9999,width:38,height:38,borderRadius:10,
          border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
          background:isDark?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.9)",
          cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          color:isDark?"#94A3B8":"#4a5568",boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
        <Icon name={isDark?"sun":"moon"} size={15} color="currentColor" strokeWidth={2}/>
      </button>

      <div style={{animation:"fadeIn 0.3s ease both"}} key={page}>
        {page==="login"    && <LoginPage    isDark={isDark} onNavigate={handleNavigate}/>}
        {page==="register" && <RegisterPage isDark={isDark} onNavigate={handleNavigate}/>}
        {page==="forgot"   && <ForgotPage   isDark={isDark} onNavigate={handleNavigate}/>}
      </div>
    </>
  );
}
