const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf8');

code = code.replace(
  /className="h-\[65px\] w-auto object-contain -ml-\[20px\]"/g,
  'className="h-[25px] w-auto object-contain -ml-[20px]"'
);

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Fixed dashboard logo size again');
