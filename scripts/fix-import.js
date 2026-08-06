const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf-8');

code = code.replace(/import React, \{ useState, useRef \} from 'react';/, "import React, { useState, useRef, useEffect } from 'react';");

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Added useEffect import');
