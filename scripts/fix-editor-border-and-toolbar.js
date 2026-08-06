const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

// Remove border from editor
code = code.replace(
  'className="w-full min-h-[400px] text-lg text-gray-800 border border-gray-200 rounded-xl p-8 focus:ring-0',
  'className="w-full min-h-[400px] text-lg text-gray-800 p-8 focus:ring-0'
);

// Move toolbar even closer (from - 40 to - 15)
code = code.replace(
  /top: figureRect\.top - editorRect\.top \+ editorRef\.current\.scrollTop - 40,/g,
  'top: figureRect.top - editorRect.top + editorRef.current.scrollTop - 15,'
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Removed editor border and moved toolbar flush');
