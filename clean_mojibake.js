const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replacements
  content = content.replace(/\?"/g, '—');
  content = content.replace(/\+'/g, '→');
  content = content.replace(/A /g, '· ');
  content = content.replace(/o"/g, '✓');
  content = content.replace(/\?\\?\\?\\?\\?\\?\\?\\?/g, '┈┈┈┈┈┈┈┈');
  content = content.replace(/oZ/g, '⋮');
  content = content.replace(/o%/g, '↑');
  content = content.replace(/dY"\?/g, '↓');
  content = content.replace(/dYO\?/g, '⨯');
  content = content.replace(/~\./g, '⭐');
  content = content.replace(/"\?/g, '✦');
  content = content.replace(/\?/g, '—');
  content = content.replace(/\+/g, '→');
  content = content.replace(/\+\?/g, '←');
  
  // Specific literal fixes
  content = content.replace(/AÂ /g, '· ');
  content = content.replace(/AÂ/g, '·');
  content = content.replace(/â€”/g, '—');
  content = content.replace(/âœ“/g, '✓');
  content = content.replace(/â†’/g, '→');
  content = content.replace(/â€¢/g, '•');
  content = content.replace(/â€Š/g, ''); // hair space

  // Dashboard section headers: /* â• â•  ROOT â• â•  */ to /* ══ ROOT ══ */
  content = content.replace(/â• â• /g, '══');
  content = content.replace(/â•â• /g, '══');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      fixFile(fullPath);
    }
  });
}

traverseDir(directoryPath);
console.log('Mojibake fixing completed.');
