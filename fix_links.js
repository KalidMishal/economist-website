const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Add hover underlines to all headings that have group-hover:text-[#003a6a] or hover:text-[#00508f]
  
  const targetGroupClasses = 'group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a]';
  const targetHoverClasses = 'hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a]';
  
  // Replace anything with group-hover:text-[#003a6a] inside className="..."
  // using a simpler string replacement
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if it's an h3 or h4
    if (line.includes('<h3') || line.includes('<h4')) {
      if (line.includes('group-hover:text-[#003a6a]') && !line.includes('group-hover:underline')) {
        line = line.replace('group-hover:text-[#003a6a]', 'group-hover:text-[#003a6a] ' + targetGroupClasses);
      }
      
      if (line.includes('hover:text-[#003a6a]') && !line.includes('hover:underline') && !line.includes('group-hover')) {
        line = line.replace('hover:text-[#003a6a]', 'hover:text-[#003a6a] ' + targetHoverClasses);
      }
      
      if (line.includes('hover:text-[#00508f]') && !line.includes('hover:underline')) {
        line = line.replace('hover:text-[#00508f]', 'hover:text-[#00508f] ' + targetHoverClasses);
      }
    }
    
    // Check if it's a card in the topics page that needs to be wrapped in Link
    // In topics pages, we have <h4 ... cursor-pointer> inside a flex column.
    // If it's a cursor-pointer heading but not in a group, we can just let NextJS Link wrap it, or it might already be wrapped.
    // Actually, in games page, it's NOT wrapped in a Link.
    
    lines[i] = line;
  }
  
  content = lines.join('\n');
  
  // 2. Wrap games page cards manually because their structure is different
  // E.g. in src/app/topics/games/page.tsx, there are <h3 ... cursor-pointer>...
  // We can just find cursor-pointer and if it's inside a div, we should probably just manually wrap the image and text in Next.js Link.
  
  // Ensure import Link from 'next/link'; exists
  if (content !== original) {
    if (!content.includes("import Link from 'next/link'") && !content.includes('import Link from "next/link"')) {
      content = "import Link from 'next/link';\n" + content;
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed links in:', filePath);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

walkDir('src/app');
