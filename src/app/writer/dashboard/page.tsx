'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ReaderProfileSettingsModal from '@/components/ReaderProfileSettingsModal';

const safeSetLocal = (key: string, val: string) => {
  try {
    window.localStorage.setItem(key, val);
  } catch (e) {
    console.warn('localStorage quota exceeded or unavailable', e);
  }
};
export default function WriterDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{id?: string | number, name: string, email: string, role: string, photo?: string} | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Published');
  const [published, setPublished] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [trash, setTrash] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [rejected, setRejected] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  
  const extractTextFromHtml = (html: string) => {
    if (typeof window === 'undefined') return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    const figures = temp.querySelectorAll('figure');
    figures.forEach(f => f.remove());
    
    return temp.innerText.trim();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  
  const handleStatusUpdate = async (post: any, newStatus: string) => {
    if (!post || !post.id) return;
    try {
      const payload = {
        title: post.title,
        subtitle: post.subtitle,
        content: post.content,
        mainCategory: post.main_category || post.mainCategory,
        selectedSubCats: typeof post.sub_categories === 'string' ? JSON.parse(post.sub_categories) : post.sub_categories,
        tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags,
        cardSummary: post.card_summary || post.cardSummary,
        focusKeyword: post.focus_keyword || post.focusKeyword,
        metaDescription: post.meta_description || post.metaDescription,
        readDuration: post.read_duration || post.readDuration,
        imageUrl: post.image_url || post.imageUrl,
        status: newStatus
      };
      const res = await fetch(`http://localhost:5000/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast(newStatus === 'trash' ? 'Article moved to trash' : 'Article Restored successfully');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          fetch(`http://localhost:5000/api/writer/posts?author_id=${parsedUser.id}`)
            .then(res => res.json())
            .then(data => {
              if (data.success && data.posts) {
                setPublished(data.posts.filter((p: any) => p.status === 'published'));
                setDrafts(data.posts.filter((p: any) => p.status === 'draft'));
                setPending(data.posts.filter((p: any) => p.status === 'pending'));
              setRejected(data.posts.filter((p: any) => p.status === 'rejected'));
                setTrash(data.posts.filter((p: any) => p.status === 'trash'));
              }
            });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePermanentDelete = async (postId: string) => {
    if (!postId || !window.confirm('Are you sure you want to permanently delete this article? This action cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Article Deleted Permanently');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          fetch(`http://localhost:5000/api/writer/posts?author_id=${parsedUser.id}`)
            .then(res => res.json())
            .then(data => {
              if (data.success && data.posts) {
                setPublished(data.posts.filter((p: any) => p.status === 'published'));
                setDrafts(data.posts.filter((p: any) => p.status === 'draft'));
                setPending(data.posts.filter((p: any) => p.status === 'pending'));
              setRejected(data.posts.filter((p: any) => p.status === 'rejected'));
                setTrash(data.posts.filter((p: any) => p.status === 'trash'));
              }
            });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };
  const [profileData, setProfileData] = useState({ fullName: 'Mishal', bio: 'Writer User', linkedin: '', photo: '/profile-mishal.jpg' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.includes('tab=drafts')) {
        setActiveTab('Drafts');
      } else if (window.location.search.includes('tab=pending')) {
        setActiveTab('Pending review');
      }
    }
    
    const sessionToast = sessionStorage.getItem('toastMessage');
    if (sessionToast) {
      setToastMessage(sessionToast);
      sessionStorage.removeItem('toastMessage');
      setTimeout(() => setToastMessage(''), 3000);
    }
    
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    
    // Fetch fresh user profile from backend to verify role
    fetch(`http://localhost:5000/api/users/${parsedUser.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          const freshUser = { ...parsedUser, ...data.user };
          safeSetLocal('user', JSON.stringify(freshUser));
          
          if (freshUser.role !== 'writer') {
            if (freshUser.role === 'admin') router.push('/admin/dashboard');
            else if (freshUser.role === 'reader') router.push('/reader/dashboard');
            else router.push('/');
            return;
          }
          
          setUser(freshUser);
          setProfileData({
            fullName: data.user.name || '',
            bio: data.user.bio || '',
            linkedin: data.user.linkedin_url || '',
            photo: data.user.profile_picture || '/profile-mishal.jpg'
          });

          // Fetch posts from backend
          fetch(`http://localhost:5000/api/writer/posts?author_id=${freshUser.id}`)
            .then(res => res.json())
            .then(postData => {
              if (postData.success && postData.posts) {
                setPublished(postData.posts.filter((p: any) => p.status === 'published'));
                setDrafts(postData.posts.filter((p: any) => p.status === 'draft'));
                setPending(postData.posts.filter((p: any) => p.status === 'pending'));
                setRejected(postData.posts.filter((p: any) => p.status === 'rejected'));
                setTrash(postData.posts.filter((p: any) => p.status === 'trash'));
              }
            })
            .catch(err => console.error("Error fetching posts:", err));
        } else {
          router.push('/login');
        }
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        // Fallback to local storage role if network fails
        if (parsedUser.role !== 'writer') {
          router.push('/login');
        } else {
          setUser(parsedUser);
        }
      });
  }, [router]);

  if (!user) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f0f0f] font-sans">
      {/* Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200 py-5 relative z-[100]">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 md:gap-6">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div className="flex items-center gap-2 md:gap-4 relative">
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
               <span className="hidden md:inline-block text-sm font-medium px-1">{profileData.fullName}</span>
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
                  <button onClick={() => { setIsProfileOpen(false); router.push(`/author/${user?.name?.toLowerCase().replace(/\s+/g, '-') || user?.id}`); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    Writer Page
                  </button>
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile Settings
                  </button>
                </div>
                <div className="py-1">
                  <button onClick={() => { localStorage.removeItem('user'); localStorage.removeItem('userProfile'); Object.keys(localStorage).forEach(k => { if (k.startsWith('userProfile_')) localStorage.removeItem(k); }); router.push('/login'); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
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
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-4 md:p-8 mt-4 md:mt-4 overflow-hidden">
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
        
        <div className="flex items-center gap-4 md:gap-6 border-b border-gray-200 mb-6 px-1 overflow-x-auto whitespace-nowrap custom-scrollbar-hide">
          {['Published', 'Drafts', 'Pending review', 'Rejected', 'Trash'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 font-medium text-[15px] pb-3 border-b-2 transition-colors ${activeTab === tab ? 'text-[#1a65d6] border-[#1a65d6]' : 'text-gray-500 hover:text-gray-800 border-transparent'}`}
            >
              {tab} 
              {tab === 'Published' && published.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{published.length}</span>}
              {tab === 'Drafts' && drafts.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{drafts.length}</span>}
              {tab === 'Pending review' && pending.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pending.length}</span>}
              {tab === 'Rejected' && rejected.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{rejected.length}</span>}
              {tab === 'Trash' && trash.length > 0 && <span className="ml-1 bg-[#f0f5ff] text-[#1a65d6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{trash.length}</span>}
            </button>
          ))}
        </div>


        {/* Content Box */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden min-h-[500px] flex flex-col relative">
          
          {/* Search Bar inside Content Box */}
          <div className="w-full flex justify-end p-4 border-b border-gray-100">
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

          {activeTab === 'Published' && published.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full overflow-x-auto custom-scrollbar-hide pb-4">
              <div className="min-w-[1050px] md:min-w-[800px]">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1 pr-12">Post Title & Summary</div>
                <div className="w-[160px] md:w-[130px]">Category</div>
                <div className="w-[140px] md:w-[110px]">Date</div>
                <div className="w-[130px] md:w-[100px]">Status</div>
                <div className="w-[150px] md:w-[120px] text-right">Actions</div>
              </div>
              
              {/* Published Rows */}
              {published
                .map((item, originalIdx) => ({ item, originalIdx }))
                .filter(({ item }) => (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ item, originalIdx }) => {
                const summary = item.card_summary || item.subtitle || (extractTextFromHtml(item.content || '').substring(0, 150) + '...');
  
                return (
                  <div key={originalIdx} className="flex items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-12">
                      {item.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight line-clamp-1">{item.title || 'Untitled Post'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    
                    <div className="w-[160px] md:w-[130px]">
                      <span className="text-[10px] font-bold uppercase text-[#E3120B]">{item.main_category || 'World'}</span>
                    </div>
                    <div className="w-[140px] md:w-[110px] text-[13px] text-gray-500 font-medium">
                      {formatDate(item.updated_at || item.date)}
                    </div>
                    <div className="w-[130px] md:w-[100px]">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800">
                        Published
                      </span>
                    </div>
                  <div className="w-[150px] md:w-[120px] text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={item.id ? `/article/${item.slug || item.id}` : '#'} target="_blank" className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">View</Link>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
            </div>
          ) : activeTab === 'Drafts' && drafts.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full overflow-x-auto custom-scrollbar-hide pb-4">
              <div className="min-w-[1050px] md:min-w-[800px]">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1 pr-12">Post Title & Summary</div>
                <div className="w-[160px] md:w-[130px]">Category</div>
                <div className="w-[140px] md:w-[110px]">Date</div>
                <div className="w-[130px] md:w-[100px]">Status</div>
                <div className="w-[200px] md:w-[240px] text-right">Actions</div>
              </div>
              
                            {/* Draft Rows */}
              {drafts
                .map((draft, originalIdx) => ({ draft, originalIdx }))
                .filter(({ draft }) => (draft.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ draft, originalIdx }) => {
                const summary = draft.card_summary || draft.subtitle || (extractTextFromHtml(draft.content || '').substring(0, 150) + '...');

                return (
                  <div key={originalIdx} className="flex items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-12">
                      {draft.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={draft.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight line-clamp-1">{draft.title || 'Untitled Draft'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    <div className="w-[160px] md:w-[130px]">
                      <span className="text-[13px] font-bold text-gray-800">{draft.mainCategory || '-'}</span>
                    </div>
                    <div className="w-[140px] md:w-[110px]">
                      <span className="text-[13px] text-gray-500">{formatDate(draft.updated_at || draft.date)}</span>
                    </div>
                    <div className="w-[130px] md:w-[100px]">
                      <span className="bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">Draft</span>
                    </div>
                    <div className="w-[200px] md:w-[240px] flex items-center justify-end gap-3">
                      <button onClick={() => router.push(`/writer/new-post?mode=edit&id=${draft.id}`)} className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">Edit Post</button>
                      <button onClick={async () => {
                        const itemToTrash = drafts[originalIdx];
                        try {
                          const res = await fetch(`http://localhost:5000/api/posts/${itemToTrash.id}/status`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'trash' })
                          });
                          if (res.ok) {
                            showToast('Article moved to trash');
                            window.location.reload(); 
                          } else {
                            showToast('Failed to move to trash');
                          }
                        } catch (e) {
                          showToast('Network error');
                        }
                      }} className="text-gray-400 hover:text-red-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          ) : null}

          {/* Pending List */}
          {activeTab === 'Pending review' && pending.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full overflow-x-auto custom-scrollbar-hide pb-4">
              <div className="min-w-[1050px] md:min-w-[800px]">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1 pr-12">Post Title & Summary</div>
                <div className="w-[160px] md:w-[130px]">Category</div>
                <div className="w-[140px] md:w-[110px]">Date</div>
                <div className="w-[130px] md:w-[100px]">Status</div>
                <div className="w-[200px] md:w-[240px] text-right">Actions</div>
              </div>
              
              {/* Pending Rows */}
              {pending
                .map((item, originalIdx) => ({ item, originalIdx }))
                .filter(({ item }) => (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ item, originalIdx }) => {
                const summary = item.card_summary || item.subtitle || (extractTextFromHtml(item.content || '').substring(0, 150) + '...');

                return (
                  <div key={originalIdx} className="flex items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-12">
                      {item.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight line-clamp-1">{item.title || 'Untitled Post'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    
                    <div className="w-[160px] md:w-[130px]">
                      <span className="text-[13px] font-bold text-gray-800">{item.mainCategory || '-'}</span>
                    </div>
                    <div className="w-[140px] md:w-[110px]">
                      <span className="text-[13px] text-gray-500">{formatDate(item.updated_at || item.date)}</span>
                    </div>
                    <div className="w-[130px] md:w-[100px]">
                      <span className="bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">PENDING</span>
                    </div>
                    <div className="w-[200px] md:w-[240px] flex items-center justify-end gap-3">
                      <button onClick={() => { setSelectedReason(item.rejection_reason || "No reasons provided by admin."); setIsReasonModalOpen(true); }} className="bg-[#e3120b] text-white px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-red-800 transition-colors">Reason</button>
                      <button onClick={() => router.push(`/writer/new-post?mode=edit_pending&id=${item.id}`)} className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">Edit Post</button>
                      <button onClick={async () => {
                        const itemToTrash = pending[originalIdx];
                        try {
                          const res = await fetch(`http://localhost:5000/api/posts/${itemToTrash.id}/status`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'trash' })
                          });
                          if (res.ok) {
                            showToast('Article moved to trash');
                            window.location.reload(); 
                          } else {
                            showToast('Failed to move to trash');
                          }
                        } catch (e) {
                          showToast('Network error');
                        }
                      }} className="text-gray-400 hover:text-red-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
</div>
) : activeTab === 'Rejected' && rejected.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full overflow-x-auto custom-scrollbar-hide pb-4">
              <div className="min-w-[1050px] md:min-w-[800px]">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1 pr-12">Post Title & Summary</div>
                <div className="w-[160px] md:w-[130px]">Category</div>
                <div className="w-[140px] md:w-[110px]">Date</div>
                <div className="w-[130px] md:w-[100px]">Status</div>
                <div className="w-[200px] md:w-[240px] text-right">Actions</div>
              </div>
              
              {/* Rejected Rows */}
              {rejected
                .map((item, originalIdx) => ({ item, originalIdx }))
                .filter(({ item }) => (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ item, originalIdx }) => {
                const summary = item.card_summary || item.subtitle || (extractTextFromHtml(item.content || '').substring(0, 150) + '...');

                return (
                  <div key={originalIdx} className="flex items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-12">
                      {item.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight line-clamp-1">{item.title || 'Untitled Post'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    
                    <div className="w-[160px] md:w-[130px]">
                      <span className="text-[13px] font-bold text-gray-800">{item.mainCategory || '-'}</span>
                    </div>
                    <div className="w-[140px] md:w-[110px]">
                      <span className="text-[13px] text-gray-500">{formatDate(item.updated_at || item.date)}</span>
                    </div>
                    <div className="w-[130px] md:w-[100px]">
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">REJECTED</span>
                    </div>
                    <div className="w-[200px] md:w-[240px] flex items-center justify-end gap-3">
                      <button onClick={() => { setSelectedReason(item.rejection_reason || "No reasons provided by admin."); setIsReasonModalOpen(true); }} className="bg-[#e3120b] text-white px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-red-800 transition-colors">Reason</button>
                      <button onClick={() => router.push(`/writer/new-post?mode=edit_pending&id=${item.id}`)} className="text-[#1a65d6] hover:text-blue-800 text-[13px] font-bold">Edit Post</button>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          ) : activeTab === 'Trash' && trash.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
            <div className="w-full overflow-x-auto custom-scrollbar-hide pb-4">
              <div className="min-w-[1050px] md:min-w-[800px]">
              {/* Header row */}
              <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3 mb-2 mt-4 px-6">
                <div className="flex-1 pr-12">Post Title & Summary</div>
                <div className="w-[160px] md:w-[130px]">Category</div>
                <div className="w-[140px] md:w-[110px]">Date</div>
                <div className="w-[130px] md:w-[100px]">Status</div>
                <div className="w-[200px] md:w-[240px] text-right">Actions</div>
              </div>
              
              {/* Trash Rows */}
              {trash
                .map((item, originalIdx) => ({ item, originalIdx }))
                .filter(({ item }) => (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map(({ item, originalIdx }) => {
                const summary = item.card_summary || item.subtitle || (extractTextFromHtml(item.content || '').substring(0, 150) + '...');

                return (
                  <div key={originalIdx} className="flex items-center px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex-1 flex gap-4 pr-12">
                      {item.imageUrl && (
                        <div className="w-[60px] h-[60px] rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[#0f0f0f] text-[15px] mb-1 leading-tight line-clamp-1">{item.title || 'Untitled Post'}</h3>
                        <p className="text-[13px] text-gray-600 leading-snug line-clamp-2">{summary}</p>
                        <span className="text-[11px] text-gray-400 font-sans mt-2">5 min read</span>
                      </div>
                    </div>
                    
                    <div className="w-[160px] md:w-[130px]">
                      <span className="text-[13px] font-bold text-gray-800">{item.mainCategory || '-'}</span>
                    </div>
                    <div className="w-[140px] md:w-[110px]">
                      <span className="text-[13px] text-gray-500">{formatDate(item.updated_at || item.date)}</span>
                    </div>
                    <div className="w-[130px] md:w-[100px]">
                      <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">TRASH</span>
                    </div>
                    <div className="w-[200px] md:w-[240px] flex items-center justify-end gap-4">
                      <button onClick={() => {
                        const currentDrafts = [...drafts, item];
   if (item && item.id) {
     fetch(`http://localhost:5000/api/posts/${item.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'draft' })
     }).catch(console.error);
   }
   setDrafts(currentDrafts);
   safeSetLocal('draftPost', JSON.stringify(currentDrafts));
   const newTrash = trash.filter((_, i) => i !== originalIdx);
   setTrash(newTrash);
   safeSetLocal('trashPost', JSON.stringify(newTrash));
   showToast('Article Restored successfully');
                      }} className="text-gray-800 hover:text-[#1a65d6] text-[13px] font-bold">Restore</button>
                      <button onClick={() => {
                        if (window.confirm('Are you sure you want to permanently delete this article? This action cannot be undone.')) {
     const itemToDelete = trash[originalIdx];
     if (itemToDelete && itemToDelete.id) {
       fetch(`http://localhost:5000/api/posts/${itemToDelete.id}`, { method: 'DELETE' }).catch(console.error);
     }
     const newTrash = trash.filter((_, i) => i !== originalIdx);
     setTrash(newTrash);
     safeSetLocal('trashPost', JSON.stringify(newTrash));
     showToast('Article Deleted Permanently');
  }
                      }} className="text-gray-800 hover:text-[#1a65d6] text-[13px] font-bold">Delete Permanently</button>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          ) : (activeTab === 'Published' && published.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) || (activeTab === 'Drafts' && drafts.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) || (activeTab === 'Pending review' && pending.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) || (activeTab === 'Rejected' && rejected.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) || (activeTab === 'Trash' && trash.filter(d => (d.title || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0) ? (
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
  
      {isReasonModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
          <div className="bg-white p-6 max-w-md w-full mx-4 shadow-xl border-t-4 border-[#e3120b]">
            <h2 className="text-xl font-bold mb-4 font-serif uppercase tracking-widest text-[#e3120b]">Rejection Reason</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 text-gray-700 text-[14px] leading-relaxed mb-6 whitespace-pre-wrap">
              {selectedReason}
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setIsReasonModalOpen(false)} 
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 uppercase tracking-wider text-[13px] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>

      {/* Settings Modal */}
      <ReaderProfileSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onProfileUpdate={() => {}}
      />

      
    </div>
  );
}
