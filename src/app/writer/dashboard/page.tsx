'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WriterDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Published');
  const [drafts, setDrafts] = useState<any[]>([]);
  const [trash, setTrash] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };
  const [profileData, setProfileData] = useState({ fullName: 'Mishal', bio: 'Writer User', linkedin: '', photo: '/profile-mishal.jpg' });
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    let email = '';
    if (user && user.email) {
      email = user.email;
    }
    const storedProfile = localStorage.getItem(`userProfile_${email}`) || localStorage.getItem('userProfile');
    if (storedProfile) {
      try { setProfileData(JSON.parse(storedProfile)); } catch(e) {}
    } else if (user && user.email) {
       setProfileData(prev => ({...prev, photo: '/profile-mishal.jpg'}));
    }
  }, [user]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setProfileData({ ...profileData, photo: dataUrl });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.includes('tab=drafts')) {
        setActiveTab('Drafts');
      } else if (window.location.search.includes('tab=pending')) {
        setActiveTab('Pending review');
      }
    }
    const draft = localStorage.getItem('draftPost');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setDrafts(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (e) {}
    }
    const trashData = localStorage.getItem('trashPost');
    if (trashData) {
      try { setTrash(JSON.parse(trashData)); } catch(e) {}
    }
    const pendingData = localStorage.getItem('pendingPost');
    if (pendingData) {
      try {
        const parsed = JSON.parse(pendingData);
        setPending(Array.isArray(parsed) ? parsed : [parsed]);
      } catch(e) {}
    }
    const sessionToast = sessionStorage.getItem('toastMessage');
    if (sessionToast) {
      setToastMessage(sessionToast);
      sessionStorage.removeItem('toastMessage');
      setTimeout(() => setToastMessage(''), 3000);
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'writer') {
        router.push('/login');
      } else {
        setUser(parsedUser);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f0f0f] font-sans">
      {/* Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200 py-5 relative z-[100]">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div className="flex items-center gap-4 relative">
              <img src="/Logo 2 Newyork capital.svg" alt="Newyork Capital" className="h-[25px] w-auto object-contain" />
              <span className="bg-[#eef5ff] text-[#1a65d6] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded relative z-10">Writer Portal</span>
            </div>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 hover:border-gray-300 px-2 py-1.5 rounded-full transition-all shadow-sm">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative">
                  <img src={profileData.photo} alt={profileData.fullName} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                   <span className="hidden text-[#003a6a] font-bold text-xs">{profileData.fullName.charAt(0)}</span>
                </div>
                <div className="absolute top-1.5 left-7 w-2 h-2 bg-green-500 border border-white rounded-full z-10 pointer-events-none"></div>
               <span className="text-sm font-medium px-1">{profileData.fullName}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-500 mr-1 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[110%] w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-[200]">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900 leading-none mb-1">{profileData.fullName}</p>
                  <p className="text-xs text-gray-500 mb-2 truncate">mishalzuhrie@gmail.com</p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Writer</span>
                </div>
                <div className="py-1 border-b border-gray-100">
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile Settings
                  </button>
                </div>
                <div className="py-1">
                  <button onClick={() => { localStorage.removeItem('user'); router.push('/login'); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          {/* Global Toast Message */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 bg-[#0f0f0f] text-white px-6 py-3 rounded-lg shadow-xl font-bold text-[14px] z-[999] flex items-center gap-3 animate-fade-in-up">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {toastMessage}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-8 mt-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[28px] font-extrabold text-[#0f0f0f]">Posts</h1>
          <button onClick={() => router.push('/writer/new-post?mode=new')} className="bg-[#1a65d6] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2 rounded-full flex items-center gap-2 transition-colors shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Post
          </button>
        </div>
        
        {/* Tabs */}
        
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6 px-1">
          {['Published', 'Drafts', 'Pending review', 'Trash'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium text-[15px] pb-3 border-b-2 transition-colors ${activeTab === tab ? 'text-[#1a65d6] border-[#1a65d6]' : 'text-gray-500 hover:text-gray-800 border-transparent'}`}
            >
              {tab} 
              {tab === 'Drafts' && drafts.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{drafts.length}</span>}
              {tab === 'Pending review' && pending.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pending.length}</span>}
              {tab === 'Trash' && trash.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{trash.length}</span>}
            </button>
          ))}
        </div>


        {/* Content Box */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden min-h-[500px] flex flex-col relative">
          
          {/* Search Bar inside Content Box */}
          <div className={`w-full flex justify-end p-4 border-b border-gray-100 ${activeTab === 'Published' ? 'hidden' : ''}`}>
            <div className="relative w-[240px]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f3f4f6] text-sm rounded-full pl-9 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#1a65d6]/20 transition-shadow"
              />
            </div>
          </div>

          {/* Drafts List */}
          {activeTab === 'Drafts' && drafts.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1">Post Title & Summary</div>
                <div className="w-[100px]">Category</div>
                <div className="w-[100px]">Date</div>
                <div className="w-[80px]">Status</div>
                <div className="w-[240px] text-right">Actions</div>
              </div>
              
              {/* Draft Rows */}
              {drafts
                .map((draft, originalIdx) => ({ draft, originalIdx }))
                .filter(({ draft }) => (draft.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ draft, originalIdx }) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = draft.content || '';
                const textContent = tempDiv.textContent || tempDiv.innerText || '';
                const summary = textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');

                return (
                  <div key={originalIdx} className="flex items-start px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-6">
                      {draft.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={draft.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight">{draft.title || 'Untitled Draft'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                      <div className="w-[100px] pt-1">
                        <span className="text-[13px] font-bold text-gray-800">{draft.mainCategory || '-'}</span>
                      </div>
                      <div className="w-[100px] pt-1">
                        <span className="text-[13px] text-gray-500">{draft.date || '-'}</span>
                      </div>
                      <div className="w-[80px] pt-1">
                        <span className="bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Draft</span>
                      </div>
                      <div className="w-[240px] pt-1 flex items-center justify-end gap-3">
                        <button onClick={() => router.push(`/writer/new-post?mode=edit&idx=${originalIdx}`)} className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">Edit Post</button>
                        <button onClick={() => {
                          const itemToTrash = drafts[originalIdx];
                          const currentTrash = [...trash, itemToTrash];
                          setTrash(currentTrash);
                          localStorage.setItem('trashPost', JSON.stringify(currentTrash));
                          
                          const newDrafts = drafts.filter((_, i) => i !== originalIdx);
                          setDrafts(newDrafts);
                          if (newDrafts.length > 0) {
                            localStorage.setItem('draftPost', JSON.stringify(newDrafts));
                          } else {
                            localStorage.removeItem('draftPost');
                          }
                          showToast('Article moved to trash');
                        }} className="text-gray-400 hover:text-red-500">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Pending List */}
          {activeTab === 'Pending review' && pending.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1">Post Title & Summary</div>
                <div className="w-[100px]">Category</div>
                <div className="w-[100px]">Date</div>
                <div className="w-[80px]">Status</div>
                <div className="w-[240px] text-right">Actions</div>
              </div>
              
              {/* Pending Rows */}
              {pending
                .map((item, originalIdx) => ({ item, originalIdx }))
                .filter(({ item }) => (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ item, originalIdx }) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.content || '';
                const textContent = tempDiv.textContent || tempDiv.innerText || '';
                const summary = textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');

                return (
                  <div key={originalIdx} className="flex items-start px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-6">
                      {item.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight">{item.title || 'Untitled Post'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    
                    <div className="w-[100px] pt-1">
                      <span className="text-[13px] font-bold text-gray-800">{item.mainCategory || '-'}</span>
                    </div>
                    <div className="w-[100px] pt-1">
                      <span className="text-[13px] text-gray-500">{item.date || '-'}</span>
                    </div>
                    <div className="w-[80px] pt-1">
                      <span className="bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">PENDING</span>
                    </div>
                    <div className="w-[240px] pt-1 flex items-center justify-end gap-3">
                      <button onClick={() => router.push(`/writer/new-post?mode=edit_pending&idx=${originalIdx}`)} className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">Edit Post</button>
                      <button onClick={() => {
                        const itemToTrash = pending[originalIdx];
                        const currentTrash = [...trash, itemToTrash];
                        setTrash(currentTrash);
                        localStorage.setItem('trashPost', JSON.stringify(currentTrash));
                        
                        const newPending = pending.filter((_, i) => i !== originalIdx);
                        setPending(newPending);
                        if (newPending.length > 0) {
                          localStorage.setItem('pendingPost', JSON.stringify(newPending));
                        } else {
                          localStorage.removeItem('pendingPost');
                        }
                        showToast('Article moved to trash');
                      }} className="text-gray-400 hover:text-red-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Trash List */}
          {activeTab === 'Trash' && trash.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full">
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1">Post Title & Summary</div>
                <div className="w-[100px]">Category</div>
                <div className="w-[100px]">Date</div>
                <div className="w-[80px]">Status</div>
                <div className="w-[240px] text-right">Actions</div>
              </div>
              
              {trash
                .map((item, originalIdx) => ({ item, originalIdx }))
                .filter(({ item }) => (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ item, originalIdx }) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.content || '';
                const textContent = tempDiv.textContent || tempDiv.innerText || '';
                const summary = textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');

                return (
                  <div key={originalIdx} className="flex items-start px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-6">
                      {item.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight">{item.title || 'Untitled Draft'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                      <div className="w-[100px] pt-1">
                        <span className="text-[13px] font-bold text-gray-800">{item.mainCategory || '-'}</span>
                      </div>
                      <div className="w-[100px] pt-1">
                        <span className="text-[13px] text-gray-500">{item.date || '-'}</span>
                      </div>
                      <div className="w-[80px] pt-1">
                        <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">TRASH</span>
                      </div>
                      <div className="w-[240px] pt-1 flex items-center justify-end gap-4">
                        <button onClick={() => {
                          const currentDrafts = [...drafts, item];
                          setDrafts(currentDrafts);
                          localStorage.setItem('draftPost', JSON.stringify(currentDrafts));
                          const newTrash = trash.filter((_, i) => i !== originalIdx);
                          setTrash(newTrash);
                          localStorage.setItem('trashPost', JSON.stringify(newTrash));
                          showToast('Article Restored successfully');
                        }} className="text-gray-800 hover:text-[#1a65d6] text-[13px] font-bold">Restore</button>
                        <button onClick={() => {
                          if (window.confirm('Are you sure you want to permanently delete this article? This action cannot be undone.')) {
                            const newTrash = trash.filter((_, i) => i !== originalIdx);
                            setTrash(newTrash);
                            localStorage.setItem('trashPost', JSON.stringify(newTrash));
                            showToast('Article Deleted Permanently');
                          }
                        }} className="text-gray-800 hover:text-[#1a65d6] text-[13px] font-bold">Delete Permanently</button>
                      </div>
                    </div>
                );
              })}
            </div>
          ) : (activeTab === 'Drafts' && drafts.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) || (activeTab === 'Pending review' && pending.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) || (activeTab === 'Trash' && trash.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="relative w-[120px] h-[120px] mb-6 flex items-center justify-center">
                <div className="absolute top-2 left-0 w-4 h-4 bg-[#1f2937] rounded-sm transform -rotate-12"></div>
                <div className="absolute right-0 top-6 w-16 h-16 border-t-2 border-r-2 border-[#fbcfe8] rounded-tr-full"></div>
                
                <div className="absolute bottom-4 left-6 w-12 h-6 bg-[#fbbf24] rounded-b-full"></div>
                
                <div className="absolute right-2 bottom-8 w-3 h-3 bg-[#34d399] rounded-full"></div>
                
                <div className="absolute top-4 right-8 w-1 h-1 bg-[#1f2937] rounded-full"></div>
                <div className="absolute bottom-6 right-12 w-1 h-1 bg-[#1f2937] rounded-full"></div>

                {/* Main Blue Box */}
                <div className="relative z-10 w-12 h-12 bg-[#1a65d6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform rotate-6">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0f0f0f] mb-2">Share what's on your mind</h3>
              <p className="text-gray-500 text-sm mb-6">Create or import posts to start publishing.</p>
              
              <button onClick={() => router.push('/writer/new-post')} className="text-[#1a65d6] hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Post
              </button>
            </div>
          ) : null}

        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden shadow-2xl relative">
            <div className="h-1 w-full bg-[#c11010]"></div>
            
            <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="p-8 pb-6">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Profile Settings</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Manage Your Account</p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 relative">
                  <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/profile-mishal.jpg'; }} />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-10 pointer-events-none"></div>
                </div>
                <div>
                  <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-[#1a65d6] hover:underline mb-1">Change photo</button>
                  <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
                  <p className="text-xs text-gray-500 mb-2">{user.email || 'mishalzuhrie@gmail.com'}</p>
                  <span className="inline-block bg-[#eef5ff] text-[#1a65d6] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Writer</span>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Bio</label>
                  <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] resize-none"></textarea>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">LinkedIn Profile</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a65d6] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <input type="text" value={profileData.linkedin} onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})} placeholder="https://www.linkedin.com/in/your-profile" className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">Shown on your article bylines so readers can connect with you.</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between gap-4">
              <button onClick={() => setIsSettingsOpen(false)} className="flex-1 py-2.5 border border-gray-300 rounded font-bold text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">CANCEL</button>
              <button onClick={() => {
    if (user) {
      localStorage.setItem(`userProfile_${user.email}`, JSON.stringify(profileData));
    }
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsSettingsOpen(false);
  }} className="flex-1 py-2.5 bg-[#00508f] hover:bg-blue-900 rounded font-bold text-[13px] text-white transition-colors">SAVE CHANGES</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
