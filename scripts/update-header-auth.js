const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Header.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add state variables
content = content.replace(
  '  const pathname = usePathname();',
    const pathname = usePathname();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({ fullName: '', photo: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        // Default to a google-style profile if logged in
        setProfileData({
          fullName: parsed.name || 'Mishal Zuhrie',
          photo: 'https://randomuser.me/api/portraits/men/32.jpg'
        });
      } catch(e) {}
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    window.location.reload();
  };
);

// 2. Replace Log In with conditionally rendered Profile
const targetLogInBlock =             <Link href="/login" className="hover:text-[#E3120B] transition-colors hidden lg:block">
              Log in
            </Link>;

const replacementLogInBlock =             {user ? (
              <div className="relative hidden lg:block">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 focus:outline-none"
                >
                  <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 top-[120%] w-64 bg-white border border-gray-200 shadow-xl py-2 z-[200]">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 leading-none mb-1">{profileData.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email || 'mishalzuh@gmail.com'}</p>
                    </div>
                    <div className="py-1 border-b border-gray-100">
                      <Link href="/reader/dashboard" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        Readers Dashboard
                      </Link>
                      <Link href="/reader/profile-settings" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Profile Settings
                      </Link>
                    </div>
                    <div className="py-1">
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out Terminal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hover:text-[#E3120B] transition-colors hidden lg:block">
                Log in
              </Link>
            )};

content = content.replace(targetLogInBlock, replacementLogInBlock);

fs.writeFileSync(filePath, content);
console.log('Fixed Header!');
