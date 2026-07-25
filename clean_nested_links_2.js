const fs = require('fs');

function fixRemainingNestedLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const splitMarker = 'This week" Section';
  const index = content.indexOf(splitMarker);
  
  if (index === -1) {
    console.error("Could not find split marker");
    return;
  }

  const before = content.substring(0, index);
  let after = content.substring(index);

  // Fix <img> wrapped in <Link>
  // e.g. <Link href="/article/fallback-article"><img src="..." ... /></Link>
  after = after.replace(/<Link href="[^"]*">\s*(<img[^>]*>)\s*<\/Link>/g, '$1');

  // Fix <h...> wrapped in <Link className="group">
  // e.g. <Link href="/article/fallback-article" className="group"><h4 ...>...</h4></Link>
  after = after.replace(/<Link href="[^"]*" className="group">\s*(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)\s*<\/Link>/g, '$1');

  fs.writeFileSync(filePath, before + after, 'utf8');
  console.log('Fixed remaining double links in lower half of:', filePath);
}

fixRemainingNestedLinks('src/app/page.tsx');
