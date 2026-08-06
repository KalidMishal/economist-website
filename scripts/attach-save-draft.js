const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /<button className="text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 border border-gray-600 rounded transition-colors hover:border-gray-400 flex items-center gap-2">/g;
code = code.replace(regex, `<button onClick={handleSaveDraft} className="text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 border border-gray-600 rounded transition-colors hover:border-gray-400 flex items-center gap-2">`);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Attached handleSaveDraft to the actual header button');
