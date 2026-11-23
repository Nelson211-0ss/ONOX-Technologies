// Builds every page into /public as folder/index.html (clean URLs, no .html)
// Usage: npm run build
const fs = require("fs");
const path = require("path");
const { layout } = require("./layout");
const pages = require("./pages");

const OUT = path.join(__dirname, "..", "public");

for (const page of pages) {
  const html = layout(page);
  const dir = path.join(OUT, page.route);
  const file = path.join(dir, page.file || "index.html");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, html);
  console.log("  built /" + (page.file ? page.file : page.route));
}
console.log(`\nDone: ${pages.length} pages written to public/`);
