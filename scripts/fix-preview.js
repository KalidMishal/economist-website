const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Hide the editor instead of unmounting it so innerHTML is preserved
// Find: {!isPreviewMode && (
//       <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans overflow-x-hidden">
const oldEditorWrap = /\{\!isPreviewMode && \(\s*<div className="min-h-screen flex flex-col bg-\[#f8f9fa\] font-sans overflow-x-hidden">/;
const newEditorWrap = `<div className={\`min-h-screen flex flex-col bg-[#f8f9fa] font-sans overflow-x-hidden \${isPreviewMode ? 'hidden' : ''}\`}>`;
code = code.replace(oldEditorWrap, newEditorWrap);

// Remove the closing )} for !isPreviewMode
const oldClosing = /        \} \/\* End of Details Tab \*\/\n      \)\}\s*\{\/\* Right Column: Settings Sidebar \*\/\n/;
// Actually, earlier there's a )}. Let's find the closing tag just before {isPreviewMode &&
const oldClosing2 = /\s*<\/div>\s*<\/div>\s*\)\}\s*\{isPreviewMode && \(/s;
const newClosing2 = `\n      </div>\n      </div>\n      {isPreviewMode && (`;
code = code.replace(oldClosing2, newClosing2);


// 2. Change Sarah Jenkins to Writer Name
code = code.replace(/Sarah Jenkins/g, 'Writer Name');

// 3. Re-add the tags rendering to the bottom of the Editor Area
// After:
// className="w-full min-h-[400px] text-lg text-gray-800 border border-gray-200 rounded-xl p-8 mb-8 focus:ring-0 outline-none bg-transparent transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 empty:before:pointer-events-none empty:before:block [&_a]:text-[#e65c2b] [&_a]:underline [&_a]:transition-all [&_a:hover]:text-[#ff7a45] [&_a:hover]:[text-shadow:0_0_8px_rgba(230,92,43,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e65c2b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-mono [&_pre]:text-sm"
//             />

const oldEditorNode = /className="w-full min-h-\[400px\].*?"\s*\/>/;
const newEditorNode = `className="w-full min-h-[400px] text-lg text-gray-800 border border-gray-200 rounded-xl p-8 focus:ring-0 outline-none bg-transparent transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 empty:before:pointer-events-none empty:before:block [&_a]:text-[#e65c2b] [&_a]:underline [&_a]:transition-all [&_a:hover]:text-[#ff7a45] [&_a:hover]:[text-shadow:0_0_8px_rgba(230,92,43,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e65c2b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-mono [&_pre]:text-sm"
            />
            {tags.length > 0 && (
              <div className="mt-8 mb-4 border-t border-gray-200 pt-6 flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mr-2">TAGS:</span>
                {tags.map(tag => (
                  <span key={tag} className="text-[12px] font-bold text-[#e65c2b] bg-orange-50 px-3 py-1.5 rounded uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            )}`;

code = code.replace(oldEditorNode, newEditorNode);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed preview mounting, writer name, and tags");
