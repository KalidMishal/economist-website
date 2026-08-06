const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /<button className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 rounded transition-colors">([\s\S]*?)Preview\s*<\/button>/;
const replacement = `<button onClick={() => setIsPreviewMode(true)} className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 rounded transition-colors">$1Preview\n            </button>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Wired up Preview button");
