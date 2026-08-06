const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

code = code.replace(
  /top: figureRect\.top - editorRect\.top \+ editorRef\.current\.scrollTop - 52,/g,
  'top: figureRect.top - editorRect.top + editorRef.current.scrollTop - 40,'
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed toolbar top offset to be much closer');
