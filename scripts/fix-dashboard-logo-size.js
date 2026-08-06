const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf8');

code = code.replace(
  /<div className="w-\[280px\] h-\[30px\]"><\/div>/g,
  '<div className="w-[320px] h-[30px]"></div>'
);

code = code.replace(
  /className="h-\[95px\] w-auto object-contain absolute left-\[-20px\] top-1\/2"/g,
  'className="h-[75px] w-auto object-contain absolute left-[-20px] top-1/2"'
);

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Fixed dashboard logo size and spacing');
