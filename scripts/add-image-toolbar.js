const fs = require('fs');

let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Add state variables
const stateVars = `  const [imageAlignment, setImageAlignment] = useState('Center (No Wrap)');
  const [selectedFigure, setSelectedFigure] = useState<HTMLElement | null>(null);
  const [figurePosition, setFigurePosition] = useState({ top: 0, left: 0 });`;

code = code.replace(/  const \[imageAlignment, setImageAlignment\] = useState\('Center \(No Wrap\)'\);/, stateVars);

// 2. Add handlers
const handlers = `  const handleEditorClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const figure = target.closest('figure');
      if (figure && editorRef.current) {
        setSelectedFigure(figure);
        // Calculate position relative to editor container
        const editorRect = editorRef.current.getBoundingClientRect();
        const figureRect = figure.getBoundingClientRect();
        setFigurePosition({
          top: figureRect.top - editorRect.top + editorRef.current.scrollTop - 50,
          left: figureRect.left - editorRect.left + (figureRect.width / 2) - 190
        });
      }
    } else {
      setSelectedFigure(null);
    }
  };

  const handleImageAction = (action: string, e: React.MouseEvent) => {
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
      selectedFigure.style.float = 'none';
    } else if (action === 'ALIGN_CENTER') {
      selectedFigure.style.textAlign = 'center';
      selectedFigure.style.float = 'none';
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
      selectedFigure.style.margin = '0 20px 20px 0';
    } else if (action === 'FLOAT_RIGHT') {
      selectedFigure.style.float = 'right';
      selectedFigure.style.margin = '0 0 20px 20px';
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
          top: figureRect.top - editorRect.top + editorRef.current.scrollTop - 50,
          left: figureRect.left - editorRect.left + (figureRect.width / 2) - 190
        });
      }
    }, 50);
  };

  const handleInsertImage =`;

code = code.replace(/  const handleInsertImage =/, handlers);

// 3. Attach onClick to editor and make its wrapper relative so toolbar can be positioned inside it
// Editor wrapper is already relative? Wait, let's look at it.
// Actually, I can just attach onClick to the editor div.
const editorDiv = `              <div 
              ref={editorRef}
              onClick={handleEditorClick}
              contentEditable`;
code = code.replace(/              <div \s*ref={editorRef}\s*contentEditable/m, editorDiv);

// Add relative positioning wrapper to editor Area if not present
// Replace: <div className="flex-1 px-10 pt-10 pb-10 overflow-y-auto flex flex-col">
const editorArea = `<div className="flex-1 px-10 pt-10 pb-10 overflow-y-auto flex flex-col relative" onScroll={() => setSelectedFigure(null)}>`;
code = code.replace(/<div className="flex-1 px-10 pt-10 pb-10 overflow-y-auto flex flex-col">/, editorArea);

// 4. Inject Toolbar inside Editor Area, right after <textarea> and before contentEditable div
const toolbarJSX = `            {selectedFigure && (
              <div 
                className="absolute z-[50] bg-[#1a1b26] text-white rounded-lg shadow-xl flex items-center px-4 py-2 gap-4"
                style={{ top: \`\${figurePosition.top}px\`, left: \`\${figurePosition.left}px\` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Size</span>
                  <button onClick={(e) => handleImageAction('SIZE_S', e)} className="text-xs font-bold hover:text-white text-gray-300">S</button>
                  <button onClick={(e) => handleImageAction('SIZE_M', e)} className="text-xs font-bold hover:text-white text-gray-300">M</button>
                  <button onClick={(e) => handleImageAction('SIZE_FULL', e)} className="text-xs font-bold hover:text-white text-gray-300">FULL</button>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => handleImageAction('ALIGN_LEFT', e)} className="text-gray-300 hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="15" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('ALIGN_CENTER', e)} className="text-gray-300 hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('ALIGN_RIGHT', e)} className="text-gray-300 hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="9" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => handleImageAction('MOVE_UP', e)} className="text-gray-300 hover:text-white" title="Move Up">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('MOVE_DOWN', e)} className="text-gray-300 hover:text-white" title="Move Down">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('FLOAT_LEFT', e)} className="text-gray-300 hover:text-white" title="Float Left">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('FLOAT_RIGHT', e)} className="text-gray-300 hover:text-white" title="Float Right">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <button onClick={(e) => handleImageAction('DELETE', e)} className="text-[#fca5a5] hover:text-red-400" title="Delete">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            )}
            <div`;
code = code.replace(/            <div \s*ref={editorRef}/m, toolbarJSX);


// Also add a little outline when an image is selected. Let's do that with global styles or a simple effect, 
// actually the user's mockup shows a blue border around the image when it's selected. 
// We can add logic to add/remove a class or inline style.
// Let's modify the handleEditorClick and handleImageAction to add/remove a blue border.
const selectImgLogic = `
  // Effect to add blue border to selected image
  React.useEffect(() => {
    if (editorRef.current) {
      const figures = editorRef.current.querySelectorAll('figure');
      figures.forEach(f => {
        const img = f.querySelector('img');
        if (img) {
          if (f === selectedFigure) {
            img.style.outline = '2px solid #3b82f6';
            img.style.outlineOffset = '2px';
          } else {
            img.style.outline = 'none';
          }
        }
      });
    }
  }, [selectedFigure]);
  
  const handleInsertImage`;

code = code.replace(/  const handleInsertImage/, selectImgLogic);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Successfully injected Image Toolbar!');
