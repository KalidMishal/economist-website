const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Remove the misplaced tags footer from the sidebar
const sidebarMisplaced = `
                <div className="pt-8 border-t border-gray-200">
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

if (code.includes(sidebarMisplaced)) {
  code = code.replace(sidebarMisplaced, `              </div>`);
} else {
  console.log("Could not find misplaced tags");
}

// 2. Put the tags footer in the correct place, right after the contentEditable div
const correctTagsFooter = `              />

              <div className="mt-4 pt-8 border-t border-gray-200">
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
              </div>`;

const editorTarget = `[&_pre]:text-sm"
              />`;

if (code.includes(editorTarget)) {
  code = code.replace(editorTarget, correctTagsFooter);
}

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed tags footer placement.");
