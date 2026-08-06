const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /      \/\/ Create elements manually to avoid execCommand \('insertHTML'\) flakiness[\s\S]*?checkFormats\(\);\s+\}/;

const replacement = `      const imgHtml = \`<figure style="text-align: \${imageAlignment.includes('Center') ? 'center' : imageAlignment.includes('Left') ? 'left' : 'right'}; margin: 20px 0;"><img src="\${finalUrl}" alt="\${imageCaption}" style="max-width: \${imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px'}; height: auto; border-radius: 8px;" />\${imageCaption ? \`<figcaption style="font-size: 12px; color: gray; margin-top: 8px;">\${imageCaption}\${imageCredit ? \` (Credit: \${imageCredit})\` : ''}</figcaption>\` : ''}</figure><p><br></p>\`;
      
      document.execCommand('insertHTML', false, imgHtml);
      checkFormats();
    }`;

if (code.match(regex)) {
  code = code.replace(regex, replacement);
} else {
  console.log("Could not find manual DOM insertion logic");
}

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Restored insertHTML for images");
