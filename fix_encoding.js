const fs = require('fs');
const path = require('path');

function replaceGarbledText(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace common garbled UTF-8 sequences
  content = content.replace(/â†’/g, '&rarr;')
                   .replace(/â€”/g, '&mdash;')
                   .replace(/â€™/g, '&rsquo;')
                   .replace(/â€œ/g, '&ldquo;')
                   .replace(/â€\x9D/g, '&rdquo;')
                   .replace(/â€ /g, '&rdquo;')
                   .replace(/âž”/g, '&rarr;')
                   .replace(/â€˜/g, '&lsquo;');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceGarbledText(fullPath);
    }
  });
}

walkDir('src/app');
