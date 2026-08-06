const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /if \(newImg\) \{/g;
const replacement = `if (newImg && newImg.parentNode) {`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed TS error for parentNode");
