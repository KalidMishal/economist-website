const fs = require('fs');
const path = require('path');

function fixUseClient(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('"use client"')) {
    // Remove "use client" from wherever it is
    content = content.replace(/['"]use client['"];?\s*/g, '');
    
    // Remove BOM if present at the start of string
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    
    // Add "use client" exactly at the top
    content = '"use client";\n' + content;
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed use client in:', filePath);
  }
}

const topicsDir = 'src/app/topics';
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      fixUseClient(fullPath);
    }
  });
}

walkDir(topicsDir);
