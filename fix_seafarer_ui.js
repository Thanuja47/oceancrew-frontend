const fs = require('fs');
let s = fs.readFileSync('src/SeafarerDashboard.jsx', 'utf8');

// 1. Add "Edit" option to Sea Service Header
s = s.replace(
  /<h3 style=\{\{fontSize:14,fontWeight:600,color:T\.t1,marginBottom:14,fontFamily:"'Sora',sans-serif"\}\}>Sea Service<\/h3>/,
  `<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontSize:14,fontWeight:600,color:T.t1,fontFamily:"'Sora',sans-serif"}}>Sea Service</h3>
              <button onClick={()=>showToast("Sea service edit opened","info")} style={{background:"none",border:"none",color:"#38BDF8",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="edit2" size={12}/> Edit</button>
            </div>`
);

// 2. Add "Card Payment (Sandbox)" button to CV Payment
s = s.replace(
  /(\{\/\* Payment \*\/\}[\s\S]*?)<button style=\{\{width:"100%",padding:16,borderRadius:12,background:T\.accent,color:"#fff",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 14px rgba\(56, 189, 248, 0\.3\)"\}\}/,
  `$1<button onClick={()=>{showToast("Processing sandbox payment...","info"); setTimeout(()=>showToast("Sandbox Payment Successful!","success"), 1500);}} style={{width:"100%",padding:16,borderRadius:12,background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:10,boxShadow:"0 4px 14px rgba(99, 102, 241, 0.3)"}}>
                <Icon name="creditCard" size={18}/> Pay with Card (Sandbox)
              </button>
              <button style={{width:"100%",padding:16,borderRadius:12,background:T.accent,color:"#fff",border:"none",fontWeight:600,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 14px rgba(56, 189, 248, 0.3)"}}`
);

// 3. Add "Add Document" to Documents Page
// Find where DocumentsPage maps certs and add a button at the end
s = s.replace(
  /(<div style=\{\{display:"flex",flexDirection:"column",gap:10\}\}>\s*\{certs\.map\(cert=>\([\s\S]*?<\/Card>\s*\)\)\})/,
  `$1\n        <button onClick={()=>setCerts(p=>[...p,{id:"doc_"+Date.now(),label:"Custom Document",uploaded:false,required:false}])} style={{width:"100%",padding:14,borderRadius:10,border:\`1px dashed \${isDark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.1)"}\`,background:"transparent",color:T.t2,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:10}}>
          <Icon name="plus" size={16}/> Add Custom Document
        </button>`
);

// 4. Edit Profile Picture missing in "Edit Profile" (from screenshot 1)
// Add a small camera icon / edit button for profile picture
s = s.replace(
  /<div style=\{\{width:70,height:70,borderRadius:"50%",background:isDark\?"#1a2332":"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:isDark\?"#38BDF8":T\.accent,marginBottom:20\}\}>/,
  `<div style={{width:70,height:70,borderRadius:"50%",background:isDark?"#1a2332":"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:isDark?"#38BDF8":T.accent,marginBottom:20,position:"relative",cursor:"pointer"}} onClick={()=>showToast("Profile picture update opened","info")}>
                  <div style={{position:"absolute",bottom:-2,right:-2,width:24,height:24,borderRadius:"50%",background:"#38BDF8",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",border:\`2px solid \${isDark?D.card:L.card}\`}}>
                    <Icon name="camera" size={12}/>
                  </div>`
);

fs.writeFileSync('src/SeafarerDashboard.jsx', s);
console.log('Done modifying SeafarerDashboard.jsx');
