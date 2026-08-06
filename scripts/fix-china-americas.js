const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /className="w-\[120px\] md:w-\[195px\]/g,
  'className="w-[120px] md:w-[130px] 2xl:w-[195px]'
);

content = content.replace(
  /className="text-\[23px\] xl:text-\[25px\] font-serif font-medium/g,
  'className="text-[19px] 2xl:text-[25px] font-serif font-medium'
);

content = content.replace(
  /className="text-\[16\.5px\] font-serif text-\[#3b3b3b\] mb-3/g,
  'className="text-[14px] 2xl:text-[16.5px] font-serif text-[#3b3b3b] mb-3'
);

fs.writeFileSync(filePath, content);
console.log('Fixed China and Americas styling!');
