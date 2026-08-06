const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf8');

const regex = /\{\/\* Spacer for the absolute logo \*\/\}\s*<div className="w-\[340px\] h-\[30px\]"><\/div>\s*<img src="\/Logo 2 Newyork capital\.svg" alt="Newyork Capital" className="h-\[65px\] w-auto object-contain absolute left-\[-20px\] top-1\/2" style=\{\{ transform: 'translateY\(-45\%\)' \}\} \/>/;
const replacement = `<img src="/Logo 2 Newyork capital.svg" alt="Newyork Capital" className="h-[65px] w-auto object-contain -ml-[20px]" />`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Made dashboard logo relative');
