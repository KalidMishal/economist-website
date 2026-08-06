const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Fix the toolbar button to use onMouseDown for preserving focus
const insertBtnRegex = /<button onClick=\{\(\) => \{\s+const selection = window\.getSelection\(\);[\s\S]*?setIsImageModalOpen\(true\);\s+\}\}/;
const newInsertBtn = `<button 
              onMouseDown={(e) => {
                e.preventDefault(); // Prevents focus from leaving the editor
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
                  setSavedRange(selection.getRangeAt(0).cloneRange());
                } else {
                  setSavedRange(null);
                }
              }}
              onClick={() => setIsImageModalOpen(true)}`;

if (code.match(insertBtnRegex)) {
  code = code.replace(insertBtnRegex, newInsertBtn);
} else {
  console.log("Could not find insert button regex");
}


// 2. Fix handleInsertImage to use DOM API for guaranteed insertion
const handleInsertImageUpdated = `  const handleInsertImage = () => {
    if (!imageUrl && !imageFile) return;
    
    let finalUrl = imageUrl;
    if (imageFile) {
      finalUrl = URL.createObjectURL(imageFile);
    }

    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      let range;
      
      if (savedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
        range = savedRange;
      } else {
        range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

      // Create elements manually to avoid execCommand ('insertHTML') flakiness
      const figure = document.createElement('figure');
      figure.style.textAlign = imageAlignment.includes('Center') ? 'center' : imageAlignment.includes('Left') ? 'left' : 'right';
      figure.style.margin = '20px 0';
      
      const img = document.createElement('img');
      img.src = finalUrl;
      img.alt = imageCaption;
      img.style.maxWidth = imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px';
      img.style.height = 'auto';
      img.style.borderRadius = '8px';
      figure.appendChild(img);
      
      if (imageCaption) {
        const caption = document.createElement('figcaption');
        caption.style.fontSize = '12px';
        caption.style.color = 'gray';
        caption.style.marginTop = '8px';
        caption.textContent = imageCaption + (imageCredit ? \` (Credit: \${imageCredit})\` : '');
        figure.appendChild(caption);
      }
      
      const p = document.createElement('p');
      p.appendChild(document.createElement('br'));
      
      const fragment = document.createDocumentFragment();
      fragment.appendChild(figure);
      fragment.appendChild(p);
      
      // Delete whatever is selected if it's not collapsed
      range.deleteContents();
      
      // Insert our fragment
      range.insertNode(fragment);
      
      // Move cursor right after the newly inserted <p> tag
      range.setStartAfter(p);
      range.collapse(true);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Re-trigger content format check so it highlights if necessary
      checkFormats();
    }
    
    setImageUrl('');`;

const handleRegex = /  const handleInsertImage = \(\) => \{\s+if \(!imageUrl && !imageFile\) return;[\s\S]*?setImageUrl\(''\);/;
if (code.match(handleRegex)) {
  code = code.replace(handleRegex, handleInsertImageUpdated);
} else {
  console.log("Could not find handleInsertImage regex");
}

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated DOM insertion logic");
