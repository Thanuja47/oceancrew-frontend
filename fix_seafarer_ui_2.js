const fs = require('fs');
let s = fs.readFileSync('src/SeafarerDashboard.jsx', 'utf8');

// 1. Add SeaService state to ProfilePage
s = s.replace(
  /function ProfilePage\(\{isDark,showToast,userName\}\)\{\n  const T=useT\(isDark\);\n  const SEAFARER = /g,
  `function ProfilePage({isDark,showToast,userName}){\n  const T=useT(isDark);\n  const [seaServiceList, setSeaServiceList] = useState(SEA_SERVICE);\n  const [editingSeaService, setEditingSeaService] = useState(false);\n  const SEAFARER = `
);

// Replace the Sea Service render block
s = s.replace(
  /<div style=\{\{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14\}\}>[\s\S]*?<h3 style=\{\{fontSize:14,fontWeight:600,color:T\.t1,fontFamily:"'Sora',sans-serif"\}\}>Sea Service<\/h3>[\s\S]*?<button onClick=\{\(\)=>showToast\("Sea service edit opened","info"\)\} style=\{\{background:"none",border:"none",color:"#38BDF8",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4\}\}><Icon name="edit2" size=\{12\}\/> Edit<\/button>[\s\S]*?<\/div>[\s\S]*?\{SEA_SERVICE\.map\(\(s,i\)=>\([\s\S]*?<\/div>\s*\)\)\}/,
  `<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Sea Service</h3>
              <button onClick={()=>setEditingSeaService(!editingSeaService)} style={{background:"none",border:"none",color:"#38BDF8",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="edit2" size={12}/> {editingSeaService?"Done":"Edit"}</button>
            </div>
            {editingSeaService ? (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {seaServiceList.map((s,i)=>(
                  <div key={i} style={{padding:"10px",background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.02)",borderRadius:8,display:"grid",gap:8}}>
                    <input type="text" value={s.vessel} onChange={(e)=>{const n=[...seaServiceList];n[i].vessel=e.target.value;setSeaServiceList(n);}} style={{padding:8,background:"transparent",border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`,color:T.t1,borderRadius:4}} placeholder="Vessel Name"/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <input type="text" value={s.rank} onChange={(e)=>{const n=[...seaServiceList];n[i].rank=e.target.value;setSeaServiceList(n);}} style={{padding:8,background:"transparent",border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`,color:T.t1,borderRadius:4}} placeholder="Rank"/>
                      <input type="text" value={s.type} onChange={(e)=>{const n=[...seaServiceList];n[i].type=e.target.value;setSeaServiceList(n);}} style={{padding:8,background:"transparent",border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`,color:T.t1,borderRadius:4}} placeholder="Type"/>
                    </div>
                    <button onClick={()=>{const n=[...seaServiceList];n.splice(i,1);setSeaServiceList(n);}} style={{background:"rgba(239,68,68,0.1)",color:"#ef4444",border:"none",padding:"6px",borderRadius:4,cursor:"pointer",fontSize:11}}>Remove</button>
                  </div>
                ))}
                <button onClick={()=>setSeaServiceList([...seaServiceList,{vessel:"",type:"",rank:"",flag:"",from:"",to:""}])} style={{padding:"10px",background:"transparent",border:\`1px dashed \${isDark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)"}\`,color:T.t2,borderRadius:8,cursor:"pointer"}}>+ Add Sea Service</button>
              </div>
            ) : (
              seaServiceList.map((s,i)=>(
                <div key={i} style={{padding:"10px 0",borderBottom:i<seaServiceList.length-1?\`1px solid \${isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.08)"}\`:0}}>
                  <div style={{fontSize:12,fontWeight:600,color:T.t1,marginBottom:2}}>{s.vessel}</div>
                  <div style={{fontSize:10,color:T.t3,marginBottom:3}}>{s.type} • {s.flag}</div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <Bdg label={s.rank} color={T.t2} bg={isDark?"rgba(255,255,255,0.05)":"rgba(100,116,139,0.07)"}/>
                    <span style={{fontSize:10,color:T.t3,fontFamily:"'JetBrains Mono',monospace"}}>{s.from}-{s.to}</span>
                  </div>
                </div>
              ))
            )}`
);

// 2. CVPage - Add payment modal state
s = s.replace(
  /function CVPage\(\{isDark,showToast,userName\}\)\{\n  const T=useT\(isDark\);\n/g,
  `function CVPage({isDark,showToast,userName}){\n  const T=useT(isDark);\n  const [showPaymentModal, setShowPaymentModal] = useState(false);\n`
);

// 3. Replace the Payment button section in CVPage to trigger modal
s = s.replace(
  /<button onClick=\{\(\)=>\{\s*showToast\("Processing sandbox payment\.\.\.","info"\);\s*setTimeout\(\(\)=>showToast\("Sandbox Payment Successful!","success"\), 1500\);\s*\}\} style=\{\{width:"100%",padding:16,borderRadius:12,background:"linear-gradient\(135deg, #6366f1, #8b5cf6\)",color:"#fff",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10,boxShadow:"0 4px 14px rgba\(99, 102, 241, 0\.3\)"\}\}>\s*<Icon name="creditCard" size=\{18\}\/> Pay with Card \(Sandbox\)\s*<\/button>\s*<button style=\{\{width:"100%",padding:16,borderRadius:12,background:T\.accent,color:"#fff",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 14px rgba\(56, 189, 248, 0\.3\)"\}\}/g,
  `<button onClick={()=>setShowPaymentModal(true)} style={{width:"100%",padding:16,borderRadius:12,background:T.accent,color:"#fff",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 14px rgba(56, 189, 248, 0.3)"}}`
);

// 4. Add Payment Modal at the end of CVPage before return statement closes
s = s.replace(
  /(\s*<\/div>\s*<\/div>\s*\n\s*\}\s*\n\s*\/\* Subscription \*\/)/,
  `
      {showPaymentModal && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:isDark?"#0A1628":"#fff",width:"100%",maxWidth:400,borderRadius:16,padding:24,border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{color:T.t1,margin:0,fontSize:18,fontFamily:"'Sora',sans-serif"}}>Select Payment Method</h3>
              <button onClick={()=>setShowPaymentModal(false)} style={{background:"none",border:"none",color:T.t3,cursor:"pointer"}}><Icon name="x" size={20}/></button>
            </div>
            
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <button onClick={()=>{setShowPaymentModal(false); showToast("Processing Card Payment...","info"); setTimeout(()=>showToast("Payment Successful!","success"), 1500);}} style={{width:"100%",padding:"16px",borderRadius:12,background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",fontWeight:600,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 14px rgba(99, 102, 241, 0.3)"}}>
                <Icon name="creditCard" size={20}/> Pay with Card (Sandbox)
              </button>
              
              <button onClick={()=>{setShowPaymentModal(false); showToast("Bank details sent to your email.","success");}} style={{width:"100%",padding:"16px",borderRadius:12,background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:T.t1,border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`,fontWeight:600,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                <Icon name="briefcase" size={20}/> Bank Transfer
              </button>
            </div>
          </div>
        </div>
      )}
      $1`
);

fs.writeFileSync('src/SeafarerDashboard.jsx', s);
console.log('Done modifying SeafarerDashboard.jsx with UI 2');
