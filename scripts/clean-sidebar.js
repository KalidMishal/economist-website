const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /<div className="pt-8 border-t border-gray-200">[\s\S]*?<span className="text-\[12px\] text-gray-400 italic">No tags added yet<\/span>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<p className="text-\[9px\]/;

const replacement = `</div>\n                    <p className="text-[9px]`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Cleaned up sidebar tags");
