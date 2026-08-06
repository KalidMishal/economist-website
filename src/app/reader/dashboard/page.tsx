'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReaderProfileSettingsModal from '@/components/ReaderProfileSettingsModal';

export default function ReaderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [profileData, setProfileData] = useState({ fullName: '', photo: '' });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Removed the 'reader' role check to allow writers to view it too, since user asked to show 'Writer'
      setUser(parsedUser);
      
      const storedProfile = localStorage.getItem(`userProfile_${parsedUser.email}`) || localStorage.getItem('userProfile');
      if (storedProfile) {
        try { 
          setProfileData(JSON.parse(storedProfile)); 
        } catch(e) {}
      } else {
        setProfileData({
          fullName: parsedUser.name || 'Mishal Zuhrie',
          photo: 'https://randomuser.me/api/portraits/men/32.jpg'
        });
      }
      
      const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
      setSavedArticles(bookmarks);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleRemoveBookmark = (slug: string) => {
    const updatedBookmarks = savedArticles.filter(a => a.slug !== slug);
    setSavedArticles(updatedBookmarks);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    router.push('/login');
  };

  if (!user) return <div className="min-h-screen bg-[#fafafc] flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc]">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-[#eaeaea] h-[72px] relative flex items-center z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Left: Back to News */}
          <button onClick={() => router.back()} className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-900 font-medium transition-colors w-1/3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to News
          </button>

          {/* Center: Title */}
          <div className="flex justify-center w-1/3">
            <h1 className="text-[20px] font-serif font-black tracking-wider text-[#0f2d4a] uppercase text-center" style={{ textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.1)"}}>
              READERS DASHBOARD
            </h1>
          </div>

          {/* Right: Profile Dropdown */}
          <div className="flex justify-end w-1/3 relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
            >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 relative">
              <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://randomuser.me/api/portraits/men/32.jpg'; }} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full z-10 pointer-events-none"></div>
            </div>
            <span className="text-xs font-bold text-gray-800 tracking-wide">{profileData.fullName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-[115%] w-[240px] bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">{profileData.fullName}</p>
                <p className="text-[11px] text-gray-500 mb-2 truncate">{user.email || 'reader@gmail.com'}</p>
                <span className="inline-block bg-[#f2f4f7] text-[#333] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {user.role === 'writer' ? 'WRITER' : 'READER'}
                </span>
              </div>
              <div className="py-1 border-b border-gray-50">
                <button onClick={() => { setIsSettingsModalOpen(true); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile Settings
                </button>
              </div>
              <div className="py-1">
                <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-[13px] text-[#c11010] font-bold hover:bg-red-50 flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-10 mt-2">
        {/* Saved Articles Section Header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4 mb-6 relative">
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3120B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              <polyline points="10 2 10 10 13 7 16 10 16 2"></polyline>
            </svg>
            <h2 className="text-[17px] font-sans font-black tracking-widest text-[#0f2d4a]">
              SAVED ARTICLES
            </h2>
          </div>
          <div className="bg-[#f2f5f9] text-[#556987] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
            {savedArticles.length} ARTICLES
          </div>
          <div className="absolute bottom-[-1px] left-0 w-48 h-[1px] bg-[#0f2d4a]"></div>
        </div>

        {/* Saved Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedArticles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-400 font-serif">
              You haven't saved any articles yet.
            </div>
          ) : (
            savedArticles.map((article: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-[#eaeaea] overflow-hidden group hover:shadow-md transition-shadow relative">
                {/* Image Section */}
                <Link href={`/article/${article.slug}`}>
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100 cursor-pointer">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                
                {/* Trash Icon (Floating above image) */}
                <button onClick={() => handleRemoveBookmark(article.slug)} className="absolute top-3 right-3 w-7 h-7 bg-black/40 hover:bg-black/60 rounded-md flex items-center justify-center transition-colors backdrop-blur-sm z-10" aria-label="Remove from saved">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>

                {/* Content Section */}
                <Link href={`/article/${article.slug}`}>
                  <div className="p-5 flex flex-col justify-between h-44 cursor-pointer">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[10px] font-extrabold uppercase tracking-widest">
                        <span className="text-[#00508f]">{article.category ? article.category.split('|')[0].trim() : ''}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-400">{article.date}</span>
                      </div>
                      <h3 className="font-serif text-[17px] font-bold leading-snug text-gray-900 line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      BY {article.author}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Profile Settings Modal Overlay */}
      <ReaderProfileSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        onProfileUpdate={(newProfile) => setProfileData(newProfile)}
      />
    </div>
  );
}
