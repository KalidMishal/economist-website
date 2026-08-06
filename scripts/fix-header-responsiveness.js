const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Fix Logo height for laptop screens (lg and xl breakpoints)
code = code.replace(
  /'h-\[60px\] lg:h-\[165px\]'/g,
  "'h-[60px] lg:h-[105px] xl:h-[135px] 2xl:h-[165px]'"
);

// Fix Sub-nav padding-left to match the new logo sizes so it never overlaps
code = code.replace(
  /md:pl-\[170px\] lg:pl-\[210px\] xl:pl-\[230px\]/g,
  'md:pl-[170px] lg:pl-[170px] xl:pl-[210px] 2xl:pl-[250px]'
);

fs.writeFileSync('src/components/Header.tsx', code);
console.log('Fixed Header responsiveness for laptops');
