const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const regex = /\} else if \(imageAlignment\.includes\('Right'\)\) \{/g;
const replacement = `} else if (imageAlignment.startsWith('Right')) {`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed image alignment logic');
