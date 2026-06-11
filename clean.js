const fs = require('fs');
let c = fs.readFileSync('src/AuthFlow.jsx', 'utf8');
c = c.split('â†’').join('');
c = c.replace(/<div style=\{\{fontSize:9,color:isDark\?"#38BDF8":"#94A3B8",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginTop:2\}\}>Maritime Platform<\/div>/g, '');
fs.writeFileSync('src/AuthFlow.jsx', c);
