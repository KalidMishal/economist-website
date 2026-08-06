const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// Add handleSaveDraft function
const insertPos = code.indexOf('const handleInsertImage = () => {');
const saveDraftFn = `
  const handleSaveDraft = () => {
    const draftContent = editorRef.current?.innerHTML || previewContent || '';
    const draftData = {
      title,
      subtitle,
      content: draftContent,
      mainCategory,
      imageUrl,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    localStorage.setItem('draftPost', JSON.stringify(draftData));
    router.push('/writer/dashboard?tab=drafts');
  };
`;
code = code.slice(0, insertPos) + saveDraftFn + code.slice(insertPos);

// Attach it to the Save Draft button
// The button has: <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1a65d6] uppercase tracking-wider px-4 py-2 rounded transition-colors">
code = code.replace(/<button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-\[#1a65d6\] uppercase tracking-wider px-4 py-2 rounded transition-colors">/g, 
  `<button onClick={handleSaveDraft} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1a65d6] uppercase tracking-wider px-4 py-2 rounded transition-colors">`);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Added handleSaveDraft to new-post');
