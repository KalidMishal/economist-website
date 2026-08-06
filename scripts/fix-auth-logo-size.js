const fs = require('fs');

const files = ['src/app/login/page.tsx', 'src/app/register/page.tsx'];

for (const file of files) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replace(/className="h-\[115px\]/g, 'className="h-[25px]');
    fs.writeFileSync(file, code);
    console.log(`Updated logo size in ${file}`);
  }
}
