const fs = require('fs');

const filesToUpdate = [
  'src/app/subscribe/page.tsx',
  'src/app/topics/[slug]/page.tsx',
  'src/app/weekly-edition/page.tsx',
  'src/components/Footer.tsx',
  'src/components/SubscriptionBanner.tsx'
];

for (const file of filesToUpdate) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replace(/max-w-\[1380px\]/g, 'max-w-[1600px]');
    fs.writeFileSync(file, code);
    console.log(`Updated max-w to 1600px in ${file}`);
  }
}
