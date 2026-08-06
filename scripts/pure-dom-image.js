const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /\/\/ 1\. Let the browser handle the complex cursor insertion logic securely[\s\S]*?\}, 10\);\n\s*\}/s;

const replacement = `// 1. Force focus and selection
        if (savedRange && selection) {
          selection.removeAllRanges();
          selection.addRange(savedRange);
        } else {
          const r = document.createRange();
          r.selectNodeContents(editorRef.current);
          r.collapse(false);
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(r);
          }
        }

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
              selection.removeAllRanges();
              selection.addRange(finalRange);
            } else {
              // Move cursor after img
              const finalRange = document.createRange();
              finalRange.setStartAfter(img);
              selection.removeAllRanges();
              selection.addRange(finalRange);
            }
          } else {
            editorRef.current.appendChild(img);
          }
        } catch (e) {
          console.error("DOM insertion failed, fallback to append", e);
          editorRef.current.appendChild(img);
        }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Rewritten image insertion to use pure DOM Nodes directly");
