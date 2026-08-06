const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /const newTag = tagInput\.trim\(\)\.replace\(\/,#\/\, ''\);/g;
// Actually the exact line is: const newTag = tagInput.trim().replace(/,$/, '');
const exactRegex = /const newTag = tagInput\.trim\(\)\.replace\(\/,#\/\, ''\);/; // wrong regex
const regex2 = /const newTag = tagInput\.trim\(\)\.replace\(\/,\$\/, ''\);/;
code = code.replace(regex2, `const newTag = tagInput.trim().replace(/,$/, '').toUpperCase();`);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated tags to be uppercase automatically");
