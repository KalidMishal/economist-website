const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /selection\.removeAllRanges\(\);\s*selection\.addRange\(range\);/g;
code = code.replace(regex, `if (selection) {\n            selection.removeAllRanges();\n            selection.addRange(range);\n          }`);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed TS error");
