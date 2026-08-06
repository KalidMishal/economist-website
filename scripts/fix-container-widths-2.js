const fs = require('fs');

// 1. Fix page.tsx and Header.tsx (where the w-[92%]... is applied to inner containers)
const files = ['src/app/page.tsx', 'src/components/Header.tsx'];
for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/w-\[92%\] md:w-\[94%\] xl:w-\[95%\] 2xl:w-\[96%\]/g, 'w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]');
  fs.writeFileSync(file, code);
  console.log('Fixed padding in', file);
}

// 2. Fix Footer.tsx (w-[92%]... was applied to the outer <footer> tag, it needs to be w-full, and inner div needs the w-[85%])
let footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerCode = footerCode.replace(
  /<footer className="bg-\[#1c1c1c\] text-white pt-10 pb-8 w-\[92%\] md:w-\[94%\] xl:w-\[95%\] 2xl:w-\[96%\]">/g,
  '<footer className="bg-[#1c1c1c] w-full text-white pt-10 pb-8">'
);
footerCode = footerCode.replace(
  /<div className="max-w-\[1380px\] mx-auto w-full">/g,
  '<div className="max-w-[1380px] mx-auto w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">'
);
fs.writeFileSync('src/components/Footer.tsx', footerCode);
console.log('Fixed padding in src/components/Footer.tsx');
