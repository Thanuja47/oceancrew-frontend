const fs = require('fs');

const mappings = {
  'â†’': '→',
  'â€”': '—',
  'âœ“': '✓',
  'Â·': '·',
  'â˜…': '★',
  'ðŸ’³': '💳',
  'ðŸ ¦': '🏦',
  'â”€': '─',
  'AÂ ': '· ',
  'o"': '✓',
  '?"': '—',
  '+\'': '→',
  '??????': '••••••••',
  'o"?': '✎',
  'dY" ': '✉',
  'dY"  ': '📍',
  'dY"': '📞',
  'dYO  ': '🌍',
  'o"': '✓',
  '?': '★',
  'o?': '✎',
  '+"': '─',
  '+\'': '→',
  '?"': '—'
};

const files = fs.readdirSync('src').filter(f => f.endsWith('.jsx')).map(f => 'src/' + f);

files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  let original = text;
  
  for (const [bad, good] of Object.entries(mappings)) {
    // Escape regex chars for string replace
    const escaped = bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    text = text.replace(new RegExp(escaped, 'g'), good);
  }
  
  // Specific fixes
  text = text.replace(/A \?/g, '· ');
  text = text.replace(/A \·/g, '· ');
  text = text.replace(/A /g, '· ');

  if (text !== original) {
    fs.writeFileSync(f, text);
    console.log('Fixed', f);
  }
});
console.log('Done mapping mojibake');
