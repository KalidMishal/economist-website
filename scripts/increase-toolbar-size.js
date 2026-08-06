const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

// Container
code = code.replace(
  /className="absolute z-\[50\] bg-\[\#1a1b26\] text-white rounded-lg shadow-xl flex items-center px-4 py-2 gap-4"/g,
  'className="absolute z-[50] bg-[#1a1b26] text-white rounded-xl shadow-xl flex items-center px-6 py-3 gap-6"'
);

// Fonts
code = code.replace(
  /className="text-\[9px\] font-bold uppercase tracking-widest text-gray-400">Size/g,
  'className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Size'
);

code = code.replace(
  /className="text-xs font-bold hover:text-white text-gray-300">S</g,
  'className="text-sm font-bold hover:text-white text-gray-300">S<'
);
code = code.replace(
  /className="text-xs font-bold hover:text-white text-gray-300">M</g,
  'className="text-sm font-bold hover:text-white text-gray-300">M<'
);
code = code.replace(
  /className="text-xs font-bold hover:text-white text-gray-300">FULL</g,
  'className="text-sm font-bold hover:text-white text-gray-300">FULL<'
);

// Inner gaps
code = code.replace(
  /className="flex items-center gap-2"/g,
  'className="flex items-center gap-3"'
);

// Separators
code = code.replace(
  /className="w-px h-4 bg-gray-600"/g,
  'className="w-px h-5 bg-gray-600"'
);

// SVGs
code = code.replace(
  /width="14" height="14"/g,
  'width="18" height="18"'
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Increased toolbar size');
