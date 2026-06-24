const fs = require("fs");
let content = fs.readFileSync("src/AdminPanel.jsx", "utf8");
content = content.replace(/const initSeafarers = \[[\s\S]*?\];/, "const initSeafarers = [];");
content = content.replace(/const initCompanies = \[[\s\S]*?\];/, "const initCompanies = [];");
content = content.replace(/const PENDING = \[[\s\S]*?\];/, "const PENDING = [];");
content = content.replace(/const PIPELINE_INIT = \[[\s\S]*?\];/, "const PIPELINE_INIT = [];");
content = content.replace(/const INIT_INVOICES = \[[\s\S]*?\];/, "const INIT_INVOICES = [];");
content = content.replace(/const ACTIVITY = \[[\s\S]*?\];/, "const ACTIVITY = [];");

// Also add MobileNav
if (!content.includes("MobileNav")) {
  // Wait, I need to add MobileNav import and usage
}

fs.writeFileSync("src/AdminPanel.jsx", content);
console.log("AdminPanel demo data cleared.");
