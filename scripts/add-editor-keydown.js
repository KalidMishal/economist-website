const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const keydownHandler = `  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      const node = selection.anchorNode;
      if (!node) return;
      
      const figure = node.nodeType === 3 ? node.parentElement?.closest('figure') : (node as HTMLElement).closest?.('figure');
      
      if (figure) {
        e.preventDefault();
        const p = document.createElement('p');
        p.appendChild(document.createElement('br'));
        if (figure.nextSibling) {
          figure.parentNode?.insertBefore(p, figure.nextSibling);
        } else {
          figure.parentNode?.appendChild(p);
        }
        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        // Normal enter behavior, but let's ensure we are using paragraphs
        document.execCommand('defaultParagraphSeparator', false, 'p');
      }
    }
  };`;

// Insert the handler before handleEditorClick
code = code.replace(
  /  const handleEditorClick = \(e: React\.MouseEvent\) => \{/g,
  keydownHandler + '\n\n  const handleEditorClick = (e: React.MouseEvent) => {'
);

// Add onKeyDown to the editor div
code = code.replace(
  /onClick=\{handleEditorClick\}/g,
  'onClick={handleEditorClick}\n                onKeyDown={handleEditorKeyDown}'
);

// We should also make sure the editor starts with a paragraph so users can click anywhere
// I will use an effect for that
const effectCode = `  React.useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    if (editorRef.current && editorRef.current.innerHTML === '') {
      editorRef.current.innerHTML = '<p><br></p>';
    }
  }, []);`;

code = code.replace(
  /  \/\/ Effect to add blue border/g,
  effectCode + '\n\n  // Effect to add blue border'
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Added editor keydown and click-anywhere fix');
