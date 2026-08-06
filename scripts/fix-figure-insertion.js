const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Add onClick to contentEditable
code = code.replace(
  /<div ref=\{editorRef\} contentEditable/g, 
  '<div ref={editorRef} contentEditable onClick={handleEditorClick}'
);

// 2. Modify handleInsertImage to use <figure>
const oldInsertDOM = `
        // 2. Pure DOM insertion - 100% reliable
        const img = document.createElement('img');
        img.src = finalUrl;
        img.alt = imageCaption || 'Article image';
        img.style.maxWidth = imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px';
        img.style.height = 'auto';
        img.style.borderRadius = '8px';
        img.style.display = 'block';
        if (imageAlignment.includes('Center')) img.style.margin = '20px auto';
        else if (imageAlignment.includes('Right')) img.style.margin = '20px 0 20px auto';
        else img.style.margin = '20px 0';

        try {
          const currentRange = selection?.getRangeAt(0);
          if (currentRange) {
            currentRange.deleteContents();
            currentRange.insertNode(img);
            
            // Add caption text if exists
            if (imageCaption) {
              const cap = document.createElement('div');
              cap.style.fontSize = '12px';
              cap.style.color = 'gray';
              cap.style.marginTop = '8px';
              cap.innerText = imageCaption + (imageCredit ? \` (Credit: \${imageCredit})\` : '');
              
              // We must use a range to insert after img reliably
              const afterImgRange = document.createRange();
              afterImgRange.setStartAfter(img);
              afterImgRange.insertNode(cap);
              
              // Move cursor after caption
              const finalRange = document.createRange();
              finalRange.setStartAfter(cap);
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(finalRange);
              }
            } else {
              // Move cursor after img
              const finalRange = document.createRange();
              finalRange.setStartAfter(img);
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(finalRange);
              }
            }
          } else {
            editorRef.current.appendChild(img);
          }
        } catch(e) {
          editorRef.current.appendChild(img);
        }
`;

const newInsertDOM = `
        // 2. Pure DOM insertion using <figure> wrapper for toolbar selection
        const figure = document.createElement('figure');
        figure.style.margin = '20px 0';
        
        if (imageAlignment.includes('Center')) {
          figure.style.textAlign = 'center';
        } else if (imageAlignment.includes('Right')) {
          figure.style.textAlign = 'right';
        } else {
          figure.style.textAlign = 'left';
        }
        
        const img = document.createElement('img');
        img.src = finalUrl;
        img.alt = imageCaption || 'Article image';
        img.style.maxWidth = imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px';
        img.style.height = 'auto';
        img.style.borderRadius = '8px';
        img.style.display = 'inline-block'; // allow text-align to center it
        
        figure.appendChild(img);

        if (imageCaption || imageCredit) {
          const cap = document.createElement('figcaption');
          cap.style.fontSize = '14px';
          cap.style.color = '#767676';
          cap.style.marginTop = '8px';
          cap.style.fontStyle = 'italic';
          cap.style.fontFamily = 'serif';
          cap.innerText = (imageCaption || '') + (imageCredit ? \` (Credit: \${imageCredit})\` : '');
          figure.appendChild(cap);
        }

        try {
          const currentRange = selection?.getRangeAt(0);
          if (currentRange) {
            currentRange.deleteContents();
            currentRange.insertNode(figure);
            
            // Move cursor after figure
            const finalRange = document.createRange();
            finalRange.setStartAfter(figure);
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(finalRange);
            }
          } else {
            editorRef.current.appendChild(figure);
          }
        } catch(e) {
          editorRef.current.appendChild(figure);
        }
`;

code = code.replace(oldInsertDOM, newInsertDOM);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed image insertion to use <figure> and bound click event');
