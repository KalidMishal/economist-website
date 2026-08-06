const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

// Replace Caption/Credit generation
const oldCapLogic = `        if (imageCaption || imageCredit) {
          const cap = document.createElement('figcaption');
          cap.style.fontSize = '14px';
          cap.style.color = '#767676';
          cap.style.marginTop = '8px';
          cap.style.fontStyle = 'italic';
          cap.style.fontFamily = 'serif';
          cap.innerText = (imageCaption || '') + (imageCredit ? \` (Credit: \${imageCredit})\` : '');
          figure.appendChild(cap);
        }`;

const newCapLogic = `        if (imageCaption || imageCredit) {
          const cap = document.createElement('figcaption');
          cap.style.display = 'flex';
          cap.style.justifyContent = 'space-between';
          cap.style.alignItems = 'flex-start';
          cap.style.fontSize = '14px';
          cap.style.color = '#767676';
          cap.style.marginTop = '8px';
          cap.style.fontFamily = 'serif';
          
          const capText = document.createElement('span');
          capText.innerText = imageCaption || '';
          capText.style.textAlign = 'left';
          capText.style.fontStyle = 'italic';
          
          const creditText = document.createElement('span');
          creditText.innerText = imageCredit ? imageCredit.toUpperCase() : '';
          creditText.style.textAlign = 'right';
          creditText.style.fontSize = '10px';
          creditText.style.fontWeight = 'bold';
          creditText.style.color = '#a0a0a0';
          creditText.style.marginLeft = '16px';
          
          cap.appendChild(capText);
          cap.appendChild(creditText);
          figure.appendChild(cap);
        }`;

code = code.replace(oldCapLogic, newCapLogic);

// Fix imageUrl onChange to clear imageFile
code = code.replace(
  /onChange=\{\(e\) => setImageUrl\(e\.target\.value\)\}/g,
  `onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}`
);

// We should also make sure img.src is properly formed if they forgot http
const oldImgSrc = `        const img = document.createElement('img');
        img.src = finalUrl;`;

const newImgSrc = `        const img = document.createElement('img');
        if (finalUrl && !finalUrl.startsWith('blob:') && !finalUrl.startsWith('http')) {
          finalUrl = 'https://' + finalUrl;
        }
        img.src = finalUrl;`;

code = code.replace(oldImgSrc, newImgSrc);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed caption layout and image url');
