const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Header.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /className="text-\[15px\] lg:text-\[15\.5px\] font-extrabold text-\[#333\]/g,
  'className="text-[13px] lg:text-[13.5px] 2xl:text-[15.5px] font-extrabold text-[#333]'
);

fs.writeFileSync(filePath, content);
console.log('Fixed secondary navbar font size!');
