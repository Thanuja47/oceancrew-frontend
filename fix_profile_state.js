const fs = require('fs');
let s = fs.readFileSync('src/SeafarerDashboard.jsx', 'utf8');

// The exact string to replace
const target = `function ProfilePage({isDark,showToast,userName}){
  const T=useT(isDark);
  const SEAFARER = `;

const replacement = `function ProfilePage({isDark,showToast,userName}){
  const T=useT(isDark);
  const [seaServiceList, setSeaServiceList] = useState(SEA_SERVICE);
  const [editingSeaService, setEditingSeaService] = useState(false);
  const SEAFARER = `;

if(s.includes(target)) {
    s = s.replace(target, replacement);
    fs.writeFileSync('src/SeafarerDashboard.jsx', s);
    console.log("Successfully injected state to ProfilePage");
} else {
    console.log("Target not found!");
}
