const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/className="text-\[18px\] font-bold font-sans text-black mb-6"/g, 'className="text-[18px] font-bold font-sans text-black mb-6 lg:mb-4 2xl:mb-6"');
content = content.replace(/<ol className="flex flex-col w-full mb-10">/g, '<ol className="flex flex-col w-full mb-10 lg:mb-5 2xl:mb-10">');
content = content.replace(/border-b border-\[#e6e6e6\] pb-4 mb-4/g, 'border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4');
content = content.replace(/border-b border-\[#e6e6e6\] pb-4 mb-0/g, 'border-b border-[#e6e6e6] pb-4 mb-0 lg:pb-2 lg:mb-0 2xl:pb-4 2xl:mb-0');

fs.writeFileSync(filePath, content);
console.log('Fixed Stories height!');
