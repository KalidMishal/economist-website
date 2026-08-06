const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf-8');

// Update header row to combine Status & Actions
code = code.replace(
  /<div className="w-\[100px\]">Status<\/div>\s*<div className="w-\[100px\] text-right">Actions<\/div>/g,
  '<div className="w-[200px] text-right">Status & Actions</div>'
);

// Update data row to combine Status & Actions
const oldRow = `<div className="w-[100px] pt-1">
                      <span className="bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Draft</span>
                    </div>
                    <div className="w-[100px] pt-1 text-right flex items-center justify-end gap-3">`;

const newRow = `<div className="w-[200px] pt-1 flex items-center justify-end gap-5">
                      <span className="bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Draft</span>
                      <div className="flex items-center gap-3">`;

code = code.replace(oldRow, newRow);
// also need to close the extra div
code = code.replace(
  /<button onClick=\{\(\) => \{\s*localStorage\.removeItem\('draftPost'\);\s*setDrafts\(\[\]\);\s*\}\} className="text-gray-400 hover:text-red-500">\s*<svg[^>]+><polyline[^>]+><\/polyline><path[^>]+><\/path><\/svg>\s*<\/button>\s*<\/div>/g,
  `<button onClick={() => {
                        localStorage.removeItem('draftPost');
                        setDrafts([]);
                      }} className="text-gray-400 hover:text-red-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                      </div>
                    </div>`
);


fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Fixed dashboard table layout');
