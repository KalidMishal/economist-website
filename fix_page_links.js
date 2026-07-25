const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find images not wrapped in Link and wrap them
  // This is a bit tricky with regex, but we can assume if there's no "<Link" right before the image, it's not wrapped.
  // A simple way is to replace all `<img ` with `<Link href="/article/fallback-article"><img ` and the closing `/>` or `>` with `'/></Link>'
  // But we have to be careful about images already inside Links. Let's just do it manually for the ones that don't have a Link around them.
  // Actually, we can use a regex that matches `(<!<Link[^>]*>\s*)<img[^>]+>` but javascript doesn't support variable length lookbehinds.
  
  // Let's just find `<div className="w-full md:w-[25%]` and make them Links!
  content = content.replace(/<div className="(w-full md:w-\[25%\][^"]* flex flex-col[^"]*)"/g, '<Link href="/article/fallback-article" className="$1 group"');
  // Then we need to replace the closing `</div>` for those... this is hard with regex.

  // Let's just wrap all `<h4>` elements that aren't already wrapped in `<Link>`.
  // And wrap all `<img>` elements that aren't already wrapped in `<Link>`.
  
  let lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if line contains img but not Link
    if (line.includes('<img') && !line.includes('<Link') && !lines[i-1]?.includes('<Link')) {
      // Don't wrap the top ad or logos
      if (!line.includes('Advertisement') && !line.includes('logo') && !line.includes('signature')) {
        line = line.replace(/(<img[^>]+>)/, '<Link href="/article/fallback-article">$1</Link>');
      }
    }
    
    // Check if line contains h3 or h4 but not Link
    if ((line.includes('<h3') || line.includes('<h4')) && !line.includes('<Link') && !lines[i-1]?.includes('<Link')) {
      // Just wrap the inner text? No, it spans multiple lines usually.
      // Let's look for the start and end of the h3/h4 block.
    }
    
    lines[i] = line;
  }
  
  content = lines.join('\n');
  
  // Better approach for headers:
  // Find <h4...>...</h4> and if it's not preceded by `<Link` in the previous few characters, wrap it.
  content = content.replace(/(<h[34][^>]*>[\s\S]*?<\/h[34]>)/g, (match, p1, offset, string) => {
    let before = string.substring(Math.max(0, offset - 30), offset);
    if (!before.includes('<Link')) {
      return `<Link href="/article/fallback-article" className="group">${p1}</Link>`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed page links in:', filePath);
}

processFile('src/app/page.tsx');
