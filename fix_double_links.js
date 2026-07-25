const fs = require('fs');

function fixDoubleLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We are looking for something like:
  // <Link href="/article/andy-burnham-mps">
  //   <Link href="/article/fallback-article" className="group"><h3 ...>
  //     Text
  //   </h3></Link>
  // </Link>

  // We can use a regex to match:
  // <Link href="([^"]*)">\s*<Link href="[^"]*" className="group">(<h[34][^>]*>[\s\S]*?<\/h[34]>)<\/Link>\s*<\/Link>
  
  // Let's replace it with just:
  // <Link href="$1" className="group">
  //   $2 (but with group-hover classes instead of hover if it was using hover)
  // </Link>

  content = content.replace(
    /<Link href="([^"]*)">\s*<Link href="[^"]*" className="group">(<h[34][^>]*>[\s\S]*?<\/h[34]>)<\/Link>\s*<\/Link>/g,
    (match, p1, p2) => {
      // The inner heading might have 'hover:text-[#003a6a]' instead of 'group-hover:text-[#003a6a]' because it wasn't a group originally.
      let newHeading = p2.replace(/hover:text-/g, 'group-hover:text-')
                         .replace(/hover:underline/g, 'group-hover:underline')
                         .replace(/hover:decoration-/g, 'group-hover:decoration-')
                         .replace(/hover:underline-offset-/g, 'group-hover:underline-offset-');
      return `<Link href="${p1}" className="group">\n${newHeading}\n</Link>`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed double links in:', filePath);
}

fixDoubleLinks('src/app/page.tsx');
