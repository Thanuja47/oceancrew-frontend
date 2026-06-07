const fs = require('fs');
const path = require('path');

const files = [
  'src/AdminPanel.jsx',
  'src/CompanyDashboard.jsx',
  'src/SeafarerDashboard.jsx',
  'src/AuthFlow.jsx',
  'src/App.jsx'
];

const replacements = [
  { bad: /â€”/g, good: '—' },
  { bad: /âœ“/g, good: '✓' },
  { bad: /âœ•/g, good: '✕' },
  { bad: /â„¹/g, good: 'ℹ' },
  { bad: /â†’/g, good: '→' },
  { bad: /â† /g, good: '←' },
  { bad: /â€¢/g, good: '•' },
  { bad: /Ã—/g, good: '×' },
  { bad: /â€¦/g, good: '…' },
  { bad: /â€œ/g, good: '“' },
  { bad: /â€/g, good: '”' },
  { bad: /Â·/g, good: '·' },
  { bad: /ðŸŽ‰/g, good: '🎉' },
  // removed empty regex
  { bad: /o"/g, good: '✓' } // Some places had o" VERIFIED or similar due to extreme corruption
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    replacements.forEach(({bad, good}) => {
      content = content.replace(bad, good);
    });
    // Fix specific extreme corruptions seen in logs
    content = content.replace(/o" VERIFIED/g, "✓ VERIFIED");
    content = content.replace(/o" Active Pro/g, "✓ Active Pro");
    content = content.replace(/o" Uploaded/g, "✓ Uploaded");
    content = content.replace(/o" Verified/g, "✓ Verified");
    content = content.replace(/A  Pro Member/g, "· Pro Member");
    content = content.replace(/A  Professional/g, "· Professional");
    content = content.replace(/A  /g, "· ");
    content = content.replace(/A  /g, "· ");

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned ${file}`);
  }
});
