const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

code = code.replace(/#e65c2b/g, '#e3120b');
code = code.replace(/#cf4b1f/g, '#b80f09');
code = code.replace(/#ff7a45/g, '#ff3333');
code = code.replace(/rgba\(230,92,43,0\.5\)/g, 'rgba(227,18,11,0.5)');

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Replaced all orange colors with Economist red');
