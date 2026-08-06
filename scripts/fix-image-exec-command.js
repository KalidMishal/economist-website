const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

const regex = /const wrapper = document\.createElement\('span'\);[\s\S]*?console\.error\("Cursor placement failed:", e\);\n\s*\}/;

const replacement = `// 1. Let the browser handle the complex cursor insertion logic securely
        const success = document.execCommand('insertImage', false, finalUrl);
        
        if (success) {
          // 2. Find the newly inserted image and wrap/style it
          setTimeout(() => {
            if (!editorRef.current) return;
            const images = editorRef.current.querySelectorAll('img');
            let newImg = null;
            // Find the image with matching src
            for (let i = 0; i < images.length; i++) {
              if (images[i].src === finalUrl || images[i].src.includes(finalUrl)) {
                newImg = images[i];
                break;
              }
            }

            if (newImg) {
              // Apply styles to the image
              newImg.style.maxWidth = imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px';
              newImg.style.height = 'auto';
              newImg.style.borderRadius = '8px';
              newImg.style.display = 'inline-block';

              // Create wrapper
              const wrapper = document.createElement('span');
              wrapper.style.display = 'block';
              wrapper.style.textAlign = imageAlignment.includes('Center') ? 'center' : imageAlignment.includes('Left') ? 'left' : 'right';
              wrapper.style.margin = '20px 0';
              
              // Insert wrapper before image, then move image inside
              newImg.parentNode.insertBefore(wrapper, newImg);
              wrapper.appendChild(newImg);

              // Add caption
              if (imageCaption) {
                const caption = document.createElement('span');
                caption.style.display = 'block';
                caption.style.fontSize = '12px';
                caption.style.color = 'gray';
                caption.style.marginTop = '8px';
                caption.innerText = imageCaption + (imageCredit ? \` (Credit: \${imageCredit})\` : '');
                wrapper.appendChild(caption);
              }

              checkFormats();
            }
          }, 10);
        }`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Updated to use execCommand(insertImage) with DOM post-processing");
