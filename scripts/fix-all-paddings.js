const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let code = fs.readFileSync(fullPath, 'utf8');
      if (code.includes('px-4 xl:px-0')) {
        code = code.replace(/px-4 xl:px-0/g, 'w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]');
        fs.writeFileSync(fullPath, code);
        console.log(`Updated padding in ${fullPath}`);
      }
    }
  }
}

processDirectory('src');
