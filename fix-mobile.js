const fs = require('fs');
let c = fs.readFileSync('src/mobile.css', 'utf8');
c = c.replace(/gridTemplateColumns:\s*\\?"([^"]*)\\?"/g, 'grid-template-columns: $1');
c = c.replace(/gridTemplateColumns/g, 'grid-template-columns');
c = c.replace(/marginLeft/g, 'margin-left');
c = c.replace(/borderLeft/g, 'border-left');
c = c.replace(/paddingBottom/g, 'padding-bottom');
// Also replace string values that had quotes with just the raw value inside the attribute selector
c = c.replace(/\[style\*="([^"]+)":\s*\\"([^"]+)\\""\]/g, '[style*="$1: $2"]');
// Handle specific ones
c = c.replace(/grid-template-columns: \\"repeat\(3\\"/g, 'grid-template-columns: repeat(3');
c = c.replace(/grid-template-columns: \\"repeat\(4\\"/g, 'grid-template-columns: repeat(4');
c = c.replace(/grid-template-columns: \\"repeat\(5\\"/g, 'grid-template-columns: repeat(5');
c = c.replace(/grid-template-columns: \\"1fr 1fr\\"/g, 'grid-template-columns: 1fr 1fr');
c = c.replace(/grid-template-columns: \\"2fr 1fr\\"/g, 'grid-template-columns: 2fr 1fr');
c = c.replace(/grid-template-columns: \\"3fr 2fr\\"/g, 'grid-template-columns: 3fr 2fr');
c = c.replace(/grid-template-columns: \\"1fr 2fr\\"/g, 'grid-template-columns: 1fr 2fr');
c = c.replace(/grid-template-columns: \\"2fr 1fr 1fr 1fr\\"/g, 'grid-template-columns: 2fr 1fr 1fr 1fr');

// Fix the actual selectors that are like `div[style*="gridTemplateColumns: \"1fr 1fr\""]`
// They are actually exactly: `div[style*="gridTemplateColumns: \"1fr 1fr\""]`
c = c.replace(/div\[style\*="grid-template-columns: \\"([^"]+)\\""\]/g, 'div[style*="grid-template-columns: $1"]');
c = c.replace(/div\[style\*="grid-template-columns: \\"repeat\(([0-9]+)"\]/g, 'div[style*="grid-template-columns: repeat($1"]');

fs.writeFileSync('src/mobile.css', c);
console.log("Done");
