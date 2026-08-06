const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

// 1. Re-add border to the contentEditable div
const oldClass = /className="w-full min-h-\[400px\] text-lg text-gray-800 focus:ring-0 outline-none pb-12 bg-transparent transition-colors/;
// Adding the border, rounded corners, padding, and bottom margin so it doesn't touch the line.
// 'mb-8' creates space between the inner grey border and the straight line below it.
const newClass = `className="w-full min-h-[400px] text-lg text-gray-800 border border-gray-200 rounded-xl p-8 mb-8 focus:ring-0 outline-none bg-transparent transition-colors`;
code = code.replace(oldClass, newClass);

// 2. Adjust the tags section styling
// It's currently: <div className="mt-8 pt-8 border-t border-gray-100">
// Let's make it look more like the screenshot (grey line).
const oldTags = /<div className="mt-8 pt-8 border-t border-gray-100">/;
const newTags = `<div className="pt-8 border-t border-gray-200">`;
code = code.replace(oldTags, newTags);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log("Re-added inner grey border and updated tags styling.");
