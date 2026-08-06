const fs = require('fs');
const files = [
  'src/app/page.tsx',
  'src/components/Header.tsx',
  'src/components/Footer.tsx'
];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/px-4 xl:px-0/g, 'w-[92%] md:w-[94%] xl:w-[95%] 2xl:w-[96%]');
  fs.writeFileSync(file, code);
  console.log('Fixed padding in', file);
}
