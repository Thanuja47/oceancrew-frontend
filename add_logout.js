const fs = require('fs');

let c = fs.readFileSync('src/CompanyDashboard.jsx', 'utf8');

// The exact text with correct spacing (10 spaces before the div, not 12)
const oldBlock = `{/* Collapse */}\r\n          <div style={{padding:"10px 8px",borderTop:\`1px solid \${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}\`}}>`;
const newBlock = `{/* Collapse */}\r\n          <div style={{padding:"10px 8px",borderTop:\`1px solid \${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}\`,display:"flex",flexDirection:"column",gap:6}}>\r\n            <button onClick={()=>{localStorage.clear();window.location.reload();}} title={!sidebar?"Log Out":""}\r\n              style={{width:"100%",padding:"8px 12px",borderRadius:9,border:"none",background:isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)",color:"#EF4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:sidebar?"flex-start":"center",gap:8,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}\r\n              onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.18)";}}\r\n              onMouseLeave={e=>{e.currentTarget.style.background=isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)";}}>\r\n              <Icon name="logOut" size={14} color="#EF4444" strokeWidth={2.2}/>\r\n              {sidebar&&"Log Out"}\r\n            </button>`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  console.log('SUCCESS - button added');
} else {
  console.log('Not found, checking CRLF vs LF...');
  // Try LF version
  const lfOld = `{/* Collapse */}\n          <div style={{padding:"10px 8px",borderTop:\`1px solid \${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}\`}}>`;
  if (c.includes(lfOld)) {
    console.log('Found LF version');
    const lfNew = `{/* Collapse */}\n          <div style={{padding:"10px 8px",borderTop:\`1px solid \${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}\`,display:"flex",flexDirection:"column",gap:6}}>\n            <button onClick={()=>{localStorage.clear();window.location.reload();}} title={!sidebar?"Log Out":""}\n              style={{width:"100%",padding:"8px 12px",borderRadius:9,border:"none",background:isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)",color:"#EF4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:sidebar?"flex-start":"center",gap:8,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}\n              onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.18)";}}\n              onMouseLeave={e=>{e.currentTarget.style.background=isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)";}}>\n              <Icon name="logOut" size={14} color="#EF4444" strokeWidth={2.2}/>\n              {sidebar&&"Log Out"}\n            </button>`;
    c = c.replace(lfOld, lfNew);
    console.log('LF replace done');
  } else {
    console.log('Neither CRLF nor LF found. Doing index-based insertion.');
    // Insert logout button right after the collapse div opening tag using index
    const insertMarker = `{/* Collapse */}`;
    const idx = c.indexOf(insertMarker);
    // Find the next > after the div opening
    const divEnd = c.indexOf('>', c.indexOf('<div', idx)) + 1;
    const insertBtn = `\r\n            <button onClick={()=>{localStorage.clear();window.location.reload();}} title={!sidebar?"Log Out":""}\r\n              style={{width:"100%",padding:"8px 12px",borderRadius:9,border:"none",background:isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)",color:"#EF4444",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:sidebar?"flex-start":"center",gap:8,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",transition:"all .12s"}}\r\n              onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.18)";}}\r\n              onMouseLeave={e=>{e.currentTarget.style.background=isDark?"rgba(239,68,68,0.1)":"rgba(239,68,68,0.07)";}}>\r\n              <Icon name="logOut" size={14} color="#EF4444" strokeWidth={2.2}/>\r\n              {sidebar&&"Log Out"}\r\n            </button>`;
    c = c.substring(0, divEnd) + insertBtn + c.substring(divEnd);
    // Also add display flex to the div
    c = c.replace(
      c.substring(c.indexOf('<div', idx), c.indexOf('>', c.indexOf('<div', idx)) + 1),
      c.substring(c.indexOf('<div', idx), c.indexOf('>', c.indexOf('<div', idx)) + 1).replace('}}>',`},display:"flex",flexDirection:"column",gap:6}}>`).replace('`}}>', '`,display:"flex",flexDirection:"column",gap:6}}>')
    );
    console.log('Index-based insert done');
  }
}

fs.writeFileSync('src/CompanyDashboard.jsx', c);
console.log('Final logOut count:', (c.match(/logOut/g)||[]).length);
