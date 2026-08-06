const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const oldIncrease = `  const handleIncreaseFontSize = () => {
    let currentSize = parseInt(document.queryCommandValue('fontSize')) || 3;
    if (currentSize < 7) {
      execCommand('fontSize', (currentSize + 1).toString());
    }
  };`;

const newIncrease = `  const handleIncreaseFontSize = () => {
    let currentSize = parseInt(document.queryCommandValue('fontSize')) || 3;
    // Increase limit up to 10
    if (currentSize < 10) {
      const newSize = currentSize + 1;
      execCommand('fontSize', newSize <= 7 ? newSize.toString() : '7');
      
      // For sizes > 7, execCommand caps at 7, so we manually override with CSS for the newly created font tags
      if (newSize > 7) {
        setTimeout(() => {
          if (editorRef.current) {
            const fonts = editorRef.current.querySelectorAll('font[size="7"]');
            fonts.forEach(font => {
              if (newSize === 8) font.style.fontSize = '64px';
              if (newSize === 9) font.style.fontSize = '80px';
              if (newSize === 10) font.style.fontSize = '96px';
            });
          }
        }, 10);
      }
    }
  };`;

code = code.replace(oldIncrease, newIncrease);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Increased font size limit');
