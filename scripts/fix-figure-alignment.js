const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// We need to update handleInsertImage's figure alignment logic
const oldAlign = `
        const figure = document.createElement('figure');
        figure.style.margin = '20px 0';
        
        if (imageAlignment.includes('Center')) {
          figure.style.textAlign = 'center';
        } else if (imageAlignment.includes('Right')) {
          figure.style.textAlign = 'right';
        } else {
          figure.style.textAlign = 'left';
        }
`;

const newAlign = `
        const figure = document.createElement('figure');
        
        if (imageAlignment.includes('Center')) {
          figure.style.textAlign = 'center';
          figure.style.float = 'none';
          figure.style.margin = '20px auto';
        } else if (imageAlignment.includes('Right')) {
          if (imageAlignment.includes('Wrap')) {
            figure.style.float = 'right';
            figure.style.margin = '5px 0 20px 20px';
          } else {
            figure.style.textAlign = 'right';
            figure.style.float = 'none';
            figure.style.margin = '20px 0';
          }
        } else {
          if (imageAlignment.includes('Wrap')) {
            figure.style.float = 'left';
            figure.style.margin = '5px 20px 20px 0';
          } else {
            figure.style.textAlign = 'left';
            figure.style.float = 'none';
            figure.style.margin = '20px 0';
          }
        }
`;

code = code.replace(oldAlign, newAlign);

// Update preview div to use flow-root to clear floats!
code = code.replace(
  /className="article-content prose prose-lg max-w-none/g,
  'className="article-content prose prose-lg max-w-none flow-root'
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed float alignment and flow-root');
