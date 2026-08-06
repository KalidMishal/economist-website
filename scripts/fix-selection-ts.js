const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /selection\.removeAllRanges\(\);\s*selection\.addRange\(finalRange\);/g;
const replacement = `if (selection) {\n                selection.removeAllRanges();\n                selection.addRange(finalRange);\n              }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed TS errors for selection");
