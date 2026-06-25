const fs = require('fs');
let css = fs.readFileSync('src/mobile.css', 'utf8');

const newRules = `
  /* Fix cramped Dashboard Headers */
  .dashboard-main-wrapper header > div:first-child > span { display: none !important; } /* Hide Date */
  .dashboard-main-wrapper header > div:last-child > div:first-child { display: none !important; } /* Hide Search */
  .dashboard-main-wrapper header > div:last-child > div:last-child > span { display: none !important; } /* Hide Username */
  
  .dashboard-main-wrapper header {
    padding: 0 12px !important;
  }
  .dashboard-main-wrapper header > div:last-child {
    gap: 6px !important;
  }
  .dashboard-main-wrapper header h2 {
    font-size: 14px !important;
  }
  
  /* Landing page mobile fixes */
  .landing-nav-links { display: none !important; }
`;

// Insert inside the @media (max-width: 768px) block
css = css.replace('/* Main content: remove sidebar margin, full width */', newRules + '\n  /* Main content: remove sidebar margin, full width */');

fs.writeFileSync('src/mobile.css', css);
console.log('mobile.css updated!');
