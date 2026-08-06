const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// Update textarea to auto-resize
const oldTextarea = /<textarea\s+placeholder="Add Subheading \/ Deck\.\.\."\s+rows=\{2\}\s+value=\{subtitle\}\s+onChange=\{\(e\) => setSubtitle\(e\.target\.value\)\}\s+className="w-full text-xl font-serif text-gray-700 placeholder:text-gray-300 border-none outline-none focus:ring-0 mb-12 resize-none bg-transparent"\s+\/>/;

const newTextarea = `<textarea 
                placeholder="Add Subheading / Deck..." 
                rows={2}
                value={subtitle}
                onChange={(e) => {
                  setSubtitle(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="w-full text-xl font-serif text-gray-700 placeholder:text-gray-300 border-none outline-none focus:ring-0 mb-12 resize-none bg-transparent overflow-hidden"
              />`;

code = code.replace(oldTextarea, newTextarea);

// Update contentEditable to add more padding at the bottom (pb-32 instead of p-6) so it's clearer
// Actually, let's remove flex-1 from it and let it naturally expand.
// Wait, if it has a border, the user wants the "background box and space to increase".
// So if we remove flex-1, it will perfectly wrap the text.
const oldContentEditableClass = /className="w-full flex-1 min-h-\[400px\] text-lg text-gray-800 border border-gray-100 hover:border-gray-200 focus:border-gray-300 focus:ring-0 outline-none rounded-xl p-6 bg-transparent transition-colors/;
const newContentEditableClass = `className="w-full min-h-[400px] text-lg text-gray-800 border border-gray-100 hover:border-gray-200 focus:border-gray-300 focus:ring-0 outline-none rounded-xl p-6 pb-24 mb-10 bg-transparent transition-colors`;
code = code.replace(oldContentEditableClass, newContentEditableClass);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated textarea and editor box");
