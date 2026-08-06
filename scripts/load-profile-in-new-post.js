const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

const regex = /const draft = localStorage\.getItem\('draftPost'\);/;
const replacement = `const profile = localStorage.getItem('userProfile');
      if (profile) {
        try { setProfileData(JSON.parse(profile)); } catch(e) {}
      }
      const draft = localStorage.getItem('draftPost');`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Added profile load from localStorage to new-post');
