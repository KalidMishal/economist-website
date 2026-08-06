const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// Add state for editor content
code = code.replace(/const \[tags, setTags\] = useState<string\[\]>\(\[\]\);/, `const [tags, setTags] = useState<string[]>([]);\n    const [previewContent, setPreviewContent] = useState('');`);

// Update setIsPreviewMode(true) calls
code = code.replace(/onClick=\{\(\) => setIsPreviewMode\(true\)\}/g, `onClick={() => { if (editorRef.current) { setPreviewContent(editorRef.current.innerHTML); } setIsPreviewMode(true); }}`);

// Update the dangerouslySetInnerHTML
code = code.replace(/dangerouslySetInnerHTML=\{\{ __html: editorRef\.current\?\.innerHTML \|\| '<p>Start writing your article\.\.\.<\/p>' \}\}/g, `dangerouslySetInnerHTML={{ __html: previewContent || '<p>Start writing your article...</p>' }}`);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Fixed preview content syncing");
