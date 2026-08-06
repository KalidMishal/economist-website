const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove hardcoded <br> tags from the Stories most read by subscribers section
content = content.replace(/<br className="hidden lg:block" \/>/g, ' ');

fs.writeFileSync(filePath, content);
console.log('Removed forced line breaks!');
