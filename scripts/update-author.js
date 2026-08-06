const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// Replace the author image
code = code.replace(
  /<img src="https:\/\/randomuser\.me\/api\/portraits\/women\/44\.jpg" alt="Author" className="w-10 h-10 rounded-full object-cover" \/>/g,
  '<img src="/profile-mishal.jpg" alt="Mishal" className="w-10 h-10 rounded-full object-cover" onError={(e) => { e.currentTarget.src = "https://randomuser.me/api/portraits/women/44.jpg" }} />'
);

// Replace the author name
code = code.replace(
  />\s*Writer Name\s*<\/span>/g,
  '>Mishal</span>'
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Updated author profile in preview mode');
