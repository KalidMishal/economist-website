const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Add ref={editorRef} to the contentEditable div
code = code.replace(/<\s*div\s+contentEditable/g, '<div ref={editorRef} contentEditable');

// 2. Add useEffect to load draft data on mount
const insertPos = code.indexOf('return (');
const loadDraftHook = `
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const draft = localStorage.getItem('draftPost');
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setTitle(parsed.title || '');
          setSubtitle(parsed.subtitle || '');
          setMainCategory(parsed.mainCategory || '');
          setImageUrl(parsed.imageUrl || '');
          if (parsed.content && editorRef.current) {
            editorRef.current.innerHTML = parsed.content;
          }
        } catch(e) {}
      }
    }
  }, []);
`;
code = code.slice(0, insertPos) + loadDraftHook + '\n  ' + code.slice(insertPos);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed editorRef and added draft loader');
