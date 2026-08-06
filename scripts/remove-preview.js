const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /<div className="flex gap-4">[\s\S]*?setIsPreviewMode\(true\)[\s\S]*?<\/button>\s*<\/div>/;
if (regex.test(code)) {
  code = code.replace(regex, '');
  fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
  console.log('Removed via regex successfully!');
} else {
  console.log('Could not find the target code.');
}
