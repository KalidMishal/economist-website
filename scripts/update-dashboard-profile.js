const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf8');
code = code.replace(
  /const \[user, setUser\] = useState<any>\(null\);/,
  `const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    fullName: 'Mishal',
    bio: 'Writer User',
    linkedin: '',
    photo: '/profile-mishal.jpg'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    } else if (user && user.email) {
       setProfileData(prev => ({...prev, photo: '/profile-mishal.jpg'}));
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };`
);

code = code.replace(/import React, \{ useState, useEffect \} from 'react';/, "import React, { useState, useEffect, useRef } from 'react';");

// Update Change photo button
code = code.replace(
  /<button className="text-sm font-bold text-\[\#1a65d6\] hover:underline mb-1">Change photo<\/button>/,
  `<button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-[#1a65d6] hover:underline mb-1">Change photo</button>
  <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />`
);

// Update Profile img tag in modal
code = code.replace(
  /<img src="\/profile-mishal\.jpg" alt="Profile" className="w-full h-full object-cover" onError=\{\(e\) => \{ e\.currentTarget\.style\.display = 'none'; \}\} \/>/,
  `<img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/profile-mishal.jpg'; }} />`
);

// Update Full Name input
code = code.replace(
  /<input type="text" defaultValue="Mishal" className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-\[\#1a65d6\]" \/>/,
  `<input type="text" value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" />`
);

// Update Bio input
code = code.replace(
  /<textarea defaultValue="Writer User" rows=\{3\} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-\[\#1a65d6\] resize-none"><\/textarea>/,
  `<textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] resize-none"></textarea>`
);

// Update LinkedIn input
code = code.replace(
  /<input type="text" placeholder="https:\/\/www\.linkedin\.com\/in\/your-profile" className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-\[\#1a65d6\]" \/>/,
  `<input type="text" value={profileData.linkedin} onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})} placeholder="https://www.linkedin.com/in/your-profile" className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" />`
);

// Update Save Changes button
code = code.replace(
  /<button onClick=\{\(\) => setIsSettingsOpen\(false\)\} className="flex-1 py-2\.5 bg-\[\#00508f\] hover:bg-blue-900 rounded font-bold text-\[13px\] text-white transition-colors">SAVE CHANGES<\/button>/,
  `<button onClick={() => { localStorage.setItem('userProfile', JSON.stringify(profileData)); setIsSettingsOpen(false); }} className="flex-1 py-2.5 bg-[#00508f] hover:bg-blue-900 rounded font-bold text-[13px] text-white transition-colors">SAVE CHANGES</button>`
);

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Updated profile settings');
