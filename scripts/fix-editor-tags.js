const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Remove border and large padding from contentEditable
const oldClass = /className="w-full min-h-\[400px\] text-lg text-gray-800 border border-gray-100 hover:border-gray-200 focus:border-gray-300 focus:ring-0 outline-none rounded-xl p-6 pb-24 mb-10 bg-transparent transition-colors/;
const newClass = `className="w-full min-h-[400px] text-lg text-gray-800 focus:ring-0 outline-none pb-12 bg-transparent transition-colors`;
code = code.replace(oldClass, newClass);

// 2. Add Tags footer below the contentEditable
const tagsFooter = `              />

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Tags:</span>
                  {tags.length > 0 ? tags.map(tag => (
                    <span key={tag} className="text-[12px] font-bold text-[#1a65d6] bg-[#f0f5ff] px-3 py-1.5 rounded uppercase tracking-wider">
                      #{tag}
                    </span>
                  )) : (
                    <span className="text-[12px] text-gray-400 italic">No tags added yet</span>
                  )}
                </div>
              </div>
            </div>`;

// Find the closing </div> of the Editor Area
const editorEndRegex = /              \/>\s*<\/div>/;
if (code.match(editorEndRegex)) {
  code = code.replace(editorEndRegex, tagsFooter);
}

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated editor styles and added tags footer");
