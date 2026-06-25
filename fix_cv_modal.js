const fs = require('fs');
let s = fs.readFileSync('src/SeafarerDashboard.jsx', 'utf8');

// Change the button to open the modal
const oldBtn = `<Btn onClick={handlePay} disabled={loading} isDark={isDark} variant="primary" icon="creditCard" fullWidth size="lg">
              {loading ? "Processing..." : "2. Pay $4.99 — Generate My CV"}
            </Btn>`;

const newBtn = `<Btn onClick={()=>setShowPaymentModal(true)} disabled={loading} isDark={isDark} variant="primary" icon="creditCard" fullWidth size="lg">
              {loading ? "Processing..." : "2. Pay $4.99 — Generate My CV"}
            </Btn>`;

s = s.replace(oldBtn, newBtn);

// Add the modal before the end of the CVPage function body
// The end of CVPage is:
const cvEnd = `      </div>
    </div>
  );
}`;

const modalJSX = `
      {showPaymentModal && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:isDark?"#0A1628":"#fff",width:"100%",maxWidth:400,borderRadius:16,padding:24,border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{color:isDark?"#fff":"#0A1628",margin:0,fontSize:18,fontFamily:"'Sora',sans-serif"}}>Select Payment Method</h3>
              <button onClick={()=>setShowPaymentModal(false)} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer"}}><Icon name="x" size={20}/></button>
            </div>
            
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <button onClick={()=>{setShowPaymentModal(false); showToast("Processing Card Payment...","info"); setTimeout(()=>showToast("Payment Successful!","success"), 1500);}} style={{width:"100%",padding:"16px",borderRadius:12,background:"#38BDF8",color:"#fff",border:"none",fontWeight:600,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 14px rgba(56, 189, 248, 0.3)"}}>
                <Icon name="creditCard" size={20}/> Pay with Card (Sandbox)
              </button>
              
              <button onClick={()=>{setShowPaymentModal(false); showToast("Bank details sent to your email.","success");}} style={{width:"100%",padding:"16px",borderRadius:12,background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",color:isDark?"#fff":"#0A1628",border:\`1px solid \${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}\`,fontWeight:600,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                <Icon name="briefcase" size={20}/> Bank Transfer
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}`;

s = s.replace(cvEnd, modalJSX);

fs.writeFileSync('src/SeafarerDashboard.jsx', s);
console.log("Done inserting modal");
