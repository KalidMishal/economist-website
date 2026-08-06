const fs = require('fs');
let code = fs.readFileSync('src/app/writer/dashboard/page.tsx', 'utf8');

// Replace top right badge
code = code.replace(
  /<div onClick=\{\(\) => setIsProfileOpen\(!isProfileOpen\)\} className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 hover:border-gray-300 px-2 py-1\.5 rounded-full transition-all shadow-sm">[\s\S]*?<div className="w-7 h-7 rounded overflow-hidden bg-gray-200 flex items-center justify-center">[\s\S]*?<img src="\/profile-mishal\.jpg" alt="Mishal" className="w-full h-full object-cover" onError=\{\(e\) => \{ e\.currentTarget\.style\.display = 'none'; e\.currentTarget\.nextElementSibling\?\.classList\.remove\('hidden'\); \}\} \/>[\s\S]*?<span className="hidden text-\[\#003a6a\] font-bold text-xs">M<\/span>[\s\S]*?<\/div>[\s\S]*?<span className="text-sm font-medium px-1">Mishal<\/span>/,
  `<div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 hover:border-gray-300 px-2 py-1.5 rounded-full transition-all shadow-sm">
                <div className="w-7 h-7 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img src={profileData.photo} alt={profileData.fullName} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                   <span className="hidden text-[#003a6a] font-bold text-xs">{profileData.fullName.charAt(0)}</span>
                </div>
               <span className="text-sm font-medium px-1">{profileData.fullName}</span>`
);

// Replace dropdown name
code = code.replace(
  /<p className="text-sm font-bold text-gray-900 leading-none mb-1">mishal<\/p>/,
  '<p className="text-sm font-bold text-gray-900 leading-none mb-1">{profileData.fullName}</p>'
);

fs.writeFileSync('src/app/writer/dashboard/page.tsx', code);
console.log('Fixed profile header to use profileData');
