const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

// Replace handleImageAction alignment logic
const oldAlignLogic = `      } else if (action === 'ALIGN_LEFT') {
        selectedFigure.style.textAlign = 'left';
        selectedFigure.style.float = 'none';
      } else if (action === 'ALIGN_CENTER') {
        selectedFigure.style.textAlign = 'center';
        selectedFigure.style.float = 'none';
        selectedFigure.style.margin = '20px auto';
      } else if (action === 'ALIGN_RIGHT') {
        selectedFigure.style.textAlign = 'right';
        selectedFigure.style.float = 'none';
      } else if (action === 'MOVE_UP') {
        const prev = selectedFigure.previousElementSibling;
        if (prev) {
          selectedFigure.parentNode?.insertBefore(selectedFigure, prev);
        }
      } else if (action === 'MOVE_DOWN') {
        const next = selectedFigure.nextElementSibling;
        if (next) {
          selectedFigure.parentNode?.insertBefore(next, selectedFigure);
        }
      } else if (action === 'FLOAT_LEFT') {
          selectedFigure.style.float = 'left';
          selectedFigure.style.margin = '5px 20px 20px 0';
        } else if (action === 'FLOAT_RIGHT') {
          selectedFigure.style.float = 'right';
          selectedFigure.style.margin = '5px 0 20px 20px';
        } else if (action === 'DELETE') {`;

const newAlignLogic = `      } else if (action === 'ALIGN_LEFT') {
        selectedFigure.style.textAlign = 'left';
        selectedFigure.style.float = 'left';
        selectedFigure.style.margin = '5px 20px 20px 0';
      } else if (action === 'ALIGN_CENTER') {
        selectedFigure.style.textAlign = 'center';
        selectedFigure.style.float = 'none';
        selectedFigure.style.margin = '20px auto';
      } else if (action === 'ALIGN_RIGHT') {
        selectedFigure.style.textAlign = 'right';
        selectedFigure.style.float = 'right';
        selectedFigure.style.margin = '5px 0 20px 20px';
      } else if (action === 'MOVE_UP') {
        const prev = selectedFigure.previousSibling;
        if (prev) {
          selectedFigure.parentNode?.insertBefore(selectedFigure, prev);
        }
      } else if (action === 'MOVE_DOWN') {
        let next = selectedFigure.nextSibling;
        if (next) {
          // If inserting before the next's next sibling, it effectively moves it down
          selectedFigure.parentNode?.insertBefore(selectedFigure, next.nextSibling);
        }
      } else if (action === 'DELETE') {`;

code = code.replace(oldAlignLogic, newAlignLogic);

// Remove FLOAT_LEFT and FLOAT_RIGHT buttons
const floatButtons = `
                    <button onClick={(e) => handleImageAction('FLOAT_LEFT', e)} className="text-gray-300 hover:text-white" title="Float Left">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button onClick={(e) => handleImageAction('FLOAT_RIGHT', e)} className="text-gray-300 hover:text-white" title="Float Right">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>`;
// Try to replace exactly if exact matches or use regex
code = code.replace(
  /<button onClick=\{\(e\) => handleImageAction\('FLOAT_LEFT'[^<]+<svg[^>]+><polyline[^>]+><\/polyline><\/svg>[\s\n]+<\/button>[\s\n]+<button onClick=\{\(e\) => handleImageAction\('FLOAT_RIGHT'[^<]+<svg[^>]+><polyline[^>]+><\/polyline><\/svg>[\s\n]+<\/button>/g,
  ''
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Updated image action logic');
