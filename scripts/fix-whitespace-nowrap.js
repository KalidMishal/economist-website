const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /whitespace-nowrap group-hover/g,
  'group-hover'
);

content = content.replace(
  /transition-colors whitespace-nowrap/g,
  'transition-colors'
);

// Scale down the large title so it fits on one line on laptops
content = content.replace(
  /lg:text-\[27px\] font-serif/g,
  'lg:text-[20px] 2xl:text-[27px] font-serif'
);

fs.writeFileSync(filePath, content);
console.log('Removed whitespace-nowrap and scaled fonts!');
