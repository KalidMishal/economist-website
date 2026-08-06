const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update column widths
content = content.replace(
  '<div className="w-full lg:w-[75%] flex flex-col pr-5">',
  '<div className="w-full lg:w-[70%] 2xl:w-[75%] flex flex-col pr-5">'
);

content = content.replace(
  '<div className="hidden lg:flex w-full lg:w-[25%] flex-col pl-4 border-l-0 md:border-l border-[#e6e6e6] mt-8 lg:mt-0">',
  '<div className="hidden lg:flex w-full lg:w-[30%] 2xl:w-[25%] flex-col pl-4 border-l-0 md:border-l border-[#e6e6e6] mt-8 lg:mt-0">'
);

// Update font sizes in the list
content = content.replace(
  /className="text-\[17px\] font-serif font-medium text-\[#3b3b3b\] leading-\[1.3\] group-hover:text-\[#003a6a\] hover:underline transition-all mt-1"/g,
  'className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] hover:underline transition-all mt-1"'
);

fs.writeFileSync(filePath, content);
console.log('Fixed widths and fonts!');
