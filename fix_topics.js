const fs = require('fs');
const path = require('path');

function processTopicsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Let's find image and text blocks. They are typically inside `<div className="... flex flex-row ...">` or `<div className="... flex flex-col ...">`
  // An easy way to wrap them is to look for the image tags and their parent containers.
  // Actually, we can just replace `<img src=` with `<Link href="/article/fallback-article"><img src=` and `/>` with `/></Link>` for the images,
  // and for the titles, they are already `h3` or `h4`. We can wrap the `h3`/`h4` content in a `Link`.
  // BUT the user wants the WHOLE card clickable (like on the homepage).
  
  // Since the topics pages use standard layouts, let's just make the image clickable and the title clickable separately if we can't easily wrap the whole card.
  // "when click the image also should go to correct details page"
  
  // Wrap all images in Link (if not already wrapped)
  content = content.replace(/(<img[^>]+>)/g, (match) => {
    // Check if it's already inside a Link by looking around (hard with pure regex, but we can assume it's not if it's a topics page)
    return `<Link href="/article/fallback-article">${match}</Link>`;
  });
  
  // Convert h3/h4 with cursor-pointer to Links
  content = content.replace(/<h([34])([^>]*)>([^<]*)<\/h\1>/g, (match, p1, p2, p3) => {
    if (p2.includes('cursor-pointer')) {
      return `<Link href="/article/fallback-article"><h${p1}${p2}>${p3}</h${p1}></Link>`;
    }
    return match;
  });

  // Ensure import Link from 'next/link'; exists
  if (content !== original) {
    if (!content.includes("import Link from 'next/link'") && !content.includes('import Link from "next/link"')) {
      content = "import Link from 'next/link';\n" + content;
    }
    // Clean up double Links if any
    content = content.replace(/<Link href="[^"]*">\s*<Link/g, '<Link');
    content = content.replace(/<\/Link>\s*<\/Link>/g, '</Link>');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed topics links in:', filePath);
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
      processTopicsFile(fullPath);
    }
  });
}

walkDir(topicsDir);
