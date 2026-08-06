const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /const imgHtml = \`<div style="text-align.*?if \(\!inserted\) \{ document\.execCommand\('insertImage', false, finalUrl\); \}/s;

const replacement = `const wrapper = document.createElement('span');
        wrapper.style.display = 'block';
        wrapper.style.textAlign = imageAlignment.includes('Center') ? 'center' : imageAlignment.includes('Left') ? 'left' : 'right';
        wrapper.style.margin = '20px 0';

        const img = document.createElement('img');
        img.src = finalUrl;
        img.alt = imageCaption;
        img.style.maxWidth = imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px';
        img.style.height = 'auto';
        img.style.borderRadius = '8px';
        img.style.display = 'inline-block';
        
        wrapper.appendChild(img);

        if (imageCaption) {
          const caption = document.createElement('span');
          caption.style.display = 'block';
          caption.style.fontSize = '12px';
          caption.style.color = 'gray';
          caption.style.marginTop = '8px';
          caption.innerText = imageCaption + (imageCredit ? \` (Credit: \${imageCredit})\` : '');
          wrapper.appendChild(caption);
        }

        const spacer = document.createElement('p');
        spacer.innerHTML = '<br>';

        const frag = document.createDocumentFragment();
        frag.appendChild(wrapper);
        frag.appendChild(spacer);

        range.deleteContents();
        range.insertNode(frag);

        // Safely move cursor after the inserted elements
        try {
          range.setStartAfter(spacer);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } catch(e) {
          console.error("Cursor placement failed:", e);
        }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Replaced image insertion with robust DOM node insertion");
