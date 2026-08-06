const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Fix Layout scrolling so the page scrolls instead of the inner div
// Left Column
const oldLeftCol = /<div className={`relative flex flex-col h-\[calc\(100vh-140px\)\] \$\{\!isSidebarVisible \? 'max-w-\[950px\]' : ''\}`\}>/;
const newLeftCol = `<div className={\`relative flex flex-col \${!isSidebarVisible ? 'max-w-[950px]' : ''}\`}>`;
code = code.replace(oldLeftCol, newLeftCol);

// Editor Area
const oldEditorArea = /<div className="flex-1 px-10 pt-10 pb-10 overflow-y-auto flex flex-col relative" onScroll=\{\(\) => setSelectedFigure\(null\)\}>/;
const newEditorArea = `<div className="flex-1 px-10 pt-10 pb-10 flex flex-col relative">`;
code = code.replace(oldEditorArea, newEditorArea);

// Right Column Sidebar
const oldRightCol = /<div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-\[calc\(100vh-140px\)\]">/;
const newRightCol = `<div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-140px)] sticky top-[140px]">`;
code = code.replace(oldRightCol, newRightCol);


// 2. Fix the tags styling to match the screenshot exactly 
// In the screenshot they are plain text uppercase tags, not boxes!
const oldTagsRender = /<span key=\{tag\} className="text-\[12px\] font-bold text-\[#1a65d6\] bg-\[#f0f5ff\] px-3 py-1\.5 rounded uppercase tracking-wider">\s*#\{tag\}\s*<\/span>/g;
const newTagsRender = `<span key={tag} className="text-[12px] font-bold text-[#1a65d6] uppercase tracking-wider">#{tag}</span>`;
code = code.replace(oldTagsRender, newTagsRender);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated layout to fix scroll and tags styling");
