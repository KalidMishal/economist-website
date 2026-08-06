const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Add savedRange state
const stateInjection = `  const [imageAlignment, setImageAlignment] = useState('Center (No Wrap)');
  const [savedRange, setSavedRange] = useState<Range | null>(null);`;
code = code.replace(/  const \[imageAlignment, setImageAlignment\] = useState\('Center \(No Wrap\)'\);/, stateInjection);


// 2. Update the Insert Image button to save the range
const insertImgBtn = `<button onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
                  setSavedRange(selection.getRangeAt(0));
                } else {
                  setSavedRange(null);
                }
                setIsImageModalOpen(true);
              }} className="text-[#e65c2b] bg-orange-50 hover:bg-orange-100 font-bold text-[11px] uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 ml-2 transition-colors">`;

code = code.replace(/<button onClick=\{\(\) => setIsImageModalOpen\(true\)\} className="text-\[#e65c2b\] bg-orange-50 hover:bg-orange-100 font-bold text-\[11px\] uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 ml-2 transition-colors">/, insertImgBtn);


// 3. Update handleInsertImage to restore range and insert
const handleInsertImageUpdated = `  const handleInsertImage = () => {
    if (!imageUrl && !imageFile) return;
    
    let finalUrl = imageUrl;
    if (imageFile) {
      finalUrl = URL.createObjectURL(imageFile);
    }

    const imgHtml = \`<figure style="text-align: \${imageAlignment.includes('Center') ? 'center' : imageAlignment.includes('Left') ? 'left' : 'right'}; margin: 20px 0;"><img src="\${finalUrl}" alt="\${imageCaption}" style="max-width: \${imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px'}; height: auto; border-radius: 8px;" />\${imageCaption ? \`<figcaption style="font-size: 12px; color: gray; margin-top: 8px;">\${imageCaption}\${imageCredit ? \` (Credit: \${imageCredit})\` : ''}</figcaption>\` : ''}</figure><p><br></p>\`;
    
    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (savedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      } else {
        // If no range saved, append to the end of the editor
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      document.execCommand('insertHTML', false, imgHtml);
    }
    
    setImageUrl('');`;

// We need to replace the old handleInsertImage.
// It starts with:
//   const handleInsertImage = () => {
//     if (!imageUrl && !imageFile) return;
// 
// and ends with:
//     setImageUrl('');
const regex = /  const handleInsertImage = \(\) => \{\s+if \(!imageUrl && !imageFile\) return;[\s\S]*?setImageUrl\(''\);/;
code = code.replace(regex, handleInsertImageUpdated);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated image insert logic");
