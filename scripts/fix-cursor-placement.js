const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const oldCursorLogic = `              // Move cursor after figure
              const finalRange = document.createRange();
              finalRange.setStartAfter(figure);
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(finalRange);
              }`;

const newCursorLogic = `              // Insert an empty paragraph after the figure to ensure clean typing
              const p = document.createElement('p');
              p.appendChild(document.createElement('br'));
              if (figure.nextSibling) {
                figure.parentNode.insertBefore(p, figure.nextSibling);
              } else {
                figure.parentNode.appendChild(p);
              }
              
              // Move cursor inside the new paragraph
              const finalRange = document.createRange();
              finalRange.setStart(p, 0);
              finalRange.collapse(true);
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(finalRange);
              }`;

code = code.replace(oldCursorLogic, newCursorLogic);

// Ensure display block on figure
code = code.replace(
  /figure\.style\.float = 'left';/g,
  "figure.style.display = 'block';\n              figure.style.float = 'left';"
);
code = code.replace(
  /figure\.style\.float = 'right';/g,
  "figure.style.display = 'block';\n              figure.style.float = 'right';"
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed cursor placement after image insert');
