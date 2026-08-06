const fs = require('fs');
let code = fs.readFileSync('src/app/writer/new-post/page.tsx', 'utf8');

// Add state for profile data
code = code.replace(
  /const \[title, setTitle\] = useState\(''\);/,
  `const [title, setTitle] = useState('');
  const [profileData, setProfileData] = useState({ fullName: 'Mishal', linkedin: '#', photo: '/profile-mishal.jpg' });`
);

// Load from localStorage in useEffect
code = code.replace(
  /const draftData = localStorage\.getItem\('draftPost'\);/,
  `const draftData = localStorage.getItem('draftPost');
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        setProfileData(JSON.parse(storedProfile));
      } catch (e) {}
    }`
);

// Update rendering of Author Block
code = code.replace(
  /<img src="\/profile-mishal\.jpg" alt="Mishal" className="w-10 h-10 rounded-full object-cover" \n*onError=\{\(e\) => \{ e\.currentTarget\.src = "https:\/\/randomuser\.me\/api\/portraits\/women\/44\.jpg" \}\} \/>/,
  `<img src={profileData.photo} alt={profileData.fullName} className="w-10 h-10 rounded-full object-cover" onError={(e) => { e.currentTarget.src = "/profile-mishal.jpg" }} />`
);

code = code.replace(
  /<span className="text-\[14px\] font-bold text-\[\#0f0f0f\] cursor-pointer \n*hover:underline">Mishal<\/span>\n*\s*<a href="\#"/g,
  `<span className="text-[14px] font-bold text-[#0f0f0f] cursor-pointer hover:underline">{profileData.fullName}</span>
                          <a href={profileData.linkedin || '#'} target="_blank" rel="noopener noreferrer"`
);

fs.writeFileSync('src/app/writer/new-post/page.tsx', code);
console.log('Updated new-post author profile data');
