const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /h-\[770px\] bg-\[#f9f9f9\] border border-\[#e6e6e6\] flex items-start justify-center pt-4 mb-6 ml-0 lg:ml-\[-2%\] pr-0 lg:pr-5 relative/g,
  'lg:h-[550px] 2xl:h-[770px] bg-[#f9f9f9] border border-[#e6e6e6] flex items-start justify-center pt-4 mb-6 ml-0 lg:ml-[-2%] pr-0 lg:pr-5 relative'
);

fs.writeFileSync(filePath, content);
console.log('Fixed Advertisement height!');
