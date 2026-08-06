const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

code = code.replace(/text-\[#e65c2b\] bg-orange-50/g, 'text-[#1a65d6] bg-[#f0f5ff]');

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed tag colors");
