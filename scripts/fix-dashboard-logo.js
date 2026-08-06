const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf8');

code = code.replace(
  /\/Logo Newyork Capital\.svg/g,
  '/Logo 2 Newyork capital.svg'
);

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Fixed dashboard logo');
