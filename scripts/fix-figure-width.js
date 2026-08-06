const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const oldFigureCreation = `        const figure = document.createElement('figure');
        
        if (imageAlignment.includes('Center')) {`;

const newFigureCreation = `        const figure = document.createElement('figure');
        figure.style.width = 'fit-content';
        figure.style.maxWidth = '100%';
        
        if (imageAlignment.includes('Center')) {`;

code = code.replace(oldFigureCreation, newFigureCreation);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Fixed figure width for captions');
