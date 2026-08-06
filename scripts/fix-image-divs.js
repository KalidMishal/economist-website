const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// Use div instead of figure to avoid browser sanitization stripping it during execCommand
const oldImgHtml = /const imgHtml = `.*?<\/figure><p><br><\/p>`;/s;
const newImgHtml = `const imgHtml = \`<div style="text-align: \${imageAlignment.includes('Center') ? 'center' : imageAlignment.includes('Left') ? 'left' : 'right'}; margin: 20px 0;"><img src="\${finalUrl}" alt="\${imageCaption}" style="max-width: \${imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px'}; height: auto; border-radius: 8px;" />\${imageCaption ? \`<div style="font-size: 12px; color: gray; margin-top: 8px;">\${imageCaption}\${imageCredit ? \` (Credit: \${imageCredit})\` : ''}</div>\` : ''}</div><p><br></p>\`;`;

code = code.replace(oldImgHtml, newImgHtml);

// Also add a fallback if execCommand fails
const execHtml = `document.execCommand('insertHTML', false, imgHtml);`;
const execFallback = `const inserted = document.execCommand('insertHTML', false, imgHtml);\n      if (!inserted) { document.execCommand('insertImage', false, finalUrl); }`;
code = code.replace(execHtml, execFallback);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated image insertion to use divs instead of figure");
