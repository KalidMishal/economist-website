const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /className="text-\[19px\] font-serif text-\[#0f0f0f\] leading-tight mb-3/g,
  'className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3'
);

fs.writeFileSync(filePath, content);
console.log('Fixed grid headline font sizes!');
