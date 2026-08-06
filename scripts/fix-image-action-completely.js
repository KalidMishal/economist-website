const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const regex = /const handleImageAction = \(action: string, e: React\.MouseEvent\) => \{[\s\S]*?\}\);[\s]*\};/;

const newLogic = `const handleImageAction = (action: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedFigure) return;
    
    const img = selectedFigure.querySelector('img');
    if (!img) return;

    if (action === 'SIZE_S') {
      img.style.maxWidth = '250px';
    } else if (action === 'SIZE_M') {
      img.style.maxWidth = '450px';
    } else if (action === 'SIZE_FULL') {
      img.style.maxWidth = '100%';
    } else if (action === 'ALIGN_LEFT') {
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
      const next = selectedFigure.nextSibling;
      if (next) {
        if (next.nextSibling) {
          selectedFigure.parentNode?.insertBefore(selectedFigure, next.nextSibling);
        } else {
          selectedFigure.parentNode?.appendChild(selectedFigure);
        }
      }
    } else if (action === 'DELETE') {
      selectedFigure.remove();
      setSelectedFigure(null);
      return;
    }
    
    // update position
    setTimeout(() => {
      if (selectedFigure && editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        const figureRect = selectedFigure.getBoundingClientRect();
        setFigurePosition({
          top: figureRect.top - editorRect.top + editorRef.current.scrollTop - 60,
          left: figureRect.left - editorRect.left + (figureRect.width / 2) - 190
        });
      }
    });
  };`;

code = code.replace(regex, newLogic);
fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed handleImageAction completely');
